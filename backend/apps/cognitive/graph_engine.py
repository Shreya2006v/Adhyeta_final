"""
Cognitive graph engine using NetworkX.
Generates Three.js-ready JSON for the frontend visualization.
"""
import networkx as nx
from .models import CognitiveNode, CognitiveEdge


# Default knowledge graph templates per subject
SUBJECT_TEMPLATES = {
    "mathematics": [
        ("Algebra", "Linear Equations", "Algebra"),
        ("Algebra", "Quadratic Equations", "Algebra"),
        ("Calculus", "Derivatives", "Calculus"),
        ("Calculus", "Integrals", "Calculus"),
        ("Statistics", "Probability", "Statistics"),
        ("Statistics", "Distributions", "Statistics"),
    ],
    "physics": [
        ("Mechanics", "Newton's Laws", "Mechanics"),
        ("Mechanics", "Work & Energy", "Mechanics"),
        ("Electricity", "Ohm's Law", "Electricity"),
        ("Electricity", "Circuits", "Electricity"),
        ("Waves", "Sound", "Waves"),
        ("Waves", "Light", "Waves"),
    ],
    "chemistry": [
        ("Organic", "Hydrocarbons", "Organic"),
        ("Organic", "Functional Groups", "Organic"),
        ("Inorganic", "Periodic Table", "Inorganic"),
        ("Inorganic", "Chemical Bonding", "Inorganic"),
        ("Physical", "Thermodynamics", "Physical"),
    ],
    "computer science": [
        ("DSA", "Arrays", "DSA"),
        ("DSA", "Linked Lists", "DSA"),
        ("DSA", "Trees", "DSA"),
        ("Algorithms", "Sorting", "Algorithms"),
        ("Algorithms", "Graph Algorithms", "Algorithms"),
        ("OOP", "Classes & Objects", "OOP"),
        ("OOP", "Inheritance", "OOP"),
    ],
}


def _mastery_to_color(score: float) -> str:
    """Map mastery score to a color for visualization."""
    if score >= 80:
        return "#22c55e"   # green — mastered
    elif score >= 60:
        return "#f59e0b"   # amber — learning
    elif score >= 40:
        return "#f97316"   # orange — needs work
    else:
        return "#ef4444"   # red — weak


def build_cognitive_map(user) -> dict:
    """Build and return the cognitive map JSON for a user."""
    nodes = CognitiveNode.objects.filter(user=user)
    edges = CognitiveEdge.objects.filter(user=user).select_related(
        "source_node", "target_node"
    )

    # Build NetworkX graph
    G = nx.DiGraph()
    for node in nodes:
        G.add_node(
            node.id,
            label=node.topic,
            subject=node.subject,
            mastery=node.mastery_score,
            is_weak=node.is_weak,
        )

    for edge in edges:
        G.add_edge(
            edge.source_node_id,
            edge.target_node_id,
            relationship=edge.relationship_type,
            weight=edge.weight,
        )

    # Find weak topics (mastery < 50%)
    weak_topics = [
        {"topic": node.topic, "subject": node.subject, "score": node.mastery_score}
        for node in nodes
        if node.mastery_score < 50
    ]

    # Compute suggested next topics (neighbors of weak nodes with higher mastery)
    next_suggestions = []
    for node in nodes:
        if node.mastery_score < 50 and node.id in G:
            for neighbor_id in G.neighbors(node.id):
                neighbor_data = G.nodes.get(neighbor_id, {})
                if neighbor_data.get("mastery", 0) > node.mastery_score:
                    next_suggestions.append(neighbor_data.get("label", ""))

    return {
        "nodes": [
            {
                "id": node.id,
                "label": node.topic,
                "subject": node.subject,
                "parent": node.parent_topic,
                "mastery_score": node.mastery_score,
                "is_weak": node.is_weak,
                "color": _mastery_to_color(node.mastery_score),
            }
            for node in nodes
        ],
        "edges": [
            {
                "source": edge.source_node_id,
                "target": edge.target_node_id,
                "type": edge.relationship_type,
                "weight": edge.weight,
            }
            for edge in edges
        ],
        "mastery_scores": {node.topic: node.mastery_score for node in nodes},
        "weak_topics": weak_topics,
        "suggestions": list(set(next_suggestions))[:5],
        "stats": {
            "total_nodes": G.number_of_nodes(),
            "total_edges": G.number_of_edges(),
            "avg_mastery": (
                sum(n.mastery_score for n in nodes) / len(nodes) if nodes else 0
            ),
        },
    }


def initialize_subject_graph(user, subject: str):
    """Create default cognitive nodes for a subject if none exist."""
    subject_lower = subject.lower()
    template = SUBJECT_TEMPLATES.get(subject_lower, [])

    nodes_created = []
    for parent, topic, group in template:
        node, _ = CognitiveNode.objects.get_or_create(
            user=user,
            subject=subject,
            topic=topic,
            defaults={"parent_topic": parent, "mastery_score": 0.0},
        )
        nodes_created.append(node)

    # Create prerequisite edges between nodes of same group
    group_nodes = {}
    for i, (parent, topic, group) in enumerate(template):
        node = nodes_created[i]
        if group not in group_nodes:
            group_nodes[group] = []
        group_nodes[group].append(node)

    for group, group_node_list in group_nodes.items():
        for i in range(len(group_node_list) - 1):
            CognitiveEdge.objects.get_or_create(
                user=user,
                source_node=group_node_list[i],
                target_node=group_node_list[i + 1],
                defaults={"relationship_type": "prerequisite"},
            )
