// ═══════════════════════════════════════════════
//  ADHYETA AI — Complete Mock Data
// ═══════════════════════════════════════════════

export const studentProfile = {
  name: 'Arjun Mehta',
  year: '3rd',
  branch: 'CS-AI',
  college: 'VIT Pune',
  xp: 12450,
  rank: 7,
  totalStudents: 340,
  streak: 23,
  focusScore: 78,
  studyHoursThisWeek: 31.5,
  goal: 'GATE 2026',
  strongSubjects: ['Algorithms', 'DBMS'],
  weakSubjects: ['Operating Systems', 'Computer Networks'],
  joinedDate: 'Aug 2024',
  avatarInitials: 'AM',
  consistencyScore: 82,
  totalStudyHours: 486,
  testsCompleted: 34,
  avgAccuracy: 74,
};

export const weeklyStudyData = [
  { day: 'Mon', hours: 4.5, focus: 72 },
  { day: 'Tue', hours: 3.2, focus: 65 },
  { day: 'Wed', hours: 5.8, focus: 81 },
  { day: 'Thu', hours: 2.1, focus: 58 },
  { day: 'Fri', hours: 6.2, focus: 85 },
  { day: 'Sat', hours: 4.8, focus: 76 },
  { day: 'Sun', hours: 5.4, focus: 80 },
];

export const subjectRadarData = [
  { subject: 'DSA', score: 88 },
  { subject: 'DBMS', score: 82 },
  { subject: 'ML', score: 71 },
  { subject: 'Math', score: 68 },
  { subject: 'CN', score: 51 },
  { subject: 'OS', score: 44 },
];

export const leaderboardData = [
  { rank: 1, name: 'Rohan Verma', branch: 'CS-AI', xp: 15200, streak: 31, medals: ['🥇','🥇','🥈'], change: 2 },
  { rank: 2, name: 'Priya Sharma', branch: 'CS', xp: 14860, streak: 28, medals: ['🥇','🥈','🥉'], change: 1 },
  { rank: 3, name: 'Aryan Patel', branch: 'ECE', xp: 14200, streak: 19, medals: ['🥈','🥉','🥉'], change: -1 },
  { rank: 4, name: 'Sneha Kulkarni', branch: 'CS-AI', xp: 13900, streak: 35, medals: ['🥇','🥈'], change: 3 },
  { rank: 5, name: 'Karan Mehta', branch: 'CS', xp: 13400, streak: 22, medals: ['🥈','🥉'], change: 0 },
  { rank: 6, name: 'Meera Desai', branch: 'MECH', xp: 12790, streak: 17, medals: ['🥉'], change: 1 },
  { rank: 7, name: 'Arjun Mehta', branch: 'CS-AI', xp: 12450, streak: 23, medals: ['🥉'], change: 2, isCurrentUser: true },
  { rank: 8, name: 'Divya Nair', branch: 'CS', xp: 12100, streak: 14, medals: [], change: -1 },
  { rank: 9, name: 'Rahul Singh', branch: 'ECE', xp: 11800, streak: 21, medals: [], change: 1 },
  { rank: 10, name: 'Ananya Joshi', branch: 'CS-AI', xp: 9900, streak: 16, medals: [], change: -2 },
];

export const upcomingTasks = [
  { id: 1, title: 'OS Mock Test', subject: 'OS', dueIn: '2 days', urgency: 'high', icon: '📋', done: false },
  { id: 2, title: 'CN Chapter 4 Review', subject: 'CN', dueIn: 'tomorrow', urgency: 'medium', icon: '📖', done: false },
  { id: 3, title: 'DSA Practice — Trees', subject: 'DSA', dueIn: 'today', urgency: 'low', icon: '🌲', done: true },
  { id: 4, title: 'Weekly Performance Review', subject: 'General', dueIn: '5 days', urgency: 'none', icon: '📊', done: false },
];

export const examCountdown = [
  { name: 'OS Mock', daysLeft: 6, urgency: 'high' },
  { name: 'CN Test', daysLeft: 12, urgency: 'medium' },
  { name: 'GATE Mock', daysLeft: 28, urgency: 'low' },
];

export const activityHeatmap = Array.from({ length: 84 }, (_, i) => ({
  day: i,
  hours: Math.random() > 0.15 ? Math.round(Math.random() * 8 * 10) / 10 : 0,
  xp: Math.floor(Math.random() * 200),
}));

export const mockResults = [
  { subject: 'DSA', score: 88, color: '#00FFA3' },
  { subject: 'DBMS', score: 76, color: '#FFB347' },
  { subject: 'OS', score: 52, color: '#FF4D6D' },
];

export const featuresData = [
  { title: 'ADHYETA Adaptation', desc: 'ADHYETA AI analyzes your Learning load in real-time and adapts content to how your brain processes information.', icon: 'Brain', size: 'large', color: '#6366F1', emoji: '🧠' },
  { title: 'Focus Zone', desc: 'Immersive study sessions with biometric-style flow detection and spatial soundscapes.', icon: 'Timer', size: 'normal', color: '#EF4444', emoji: '🎯' },
  { title: 'Dynamic Quizzes', desc: 'AI-generated tests that evolve based on your accuracy, targeting weak nodes with precision.', icon: 'ClipboardCheck', size: 'normal', color: '#F59E0B', emoji: '📋' },
  { title: 'Learning Mapping', desc: 'Visualize your knowledge landscape as a ADHYETA mesh — peaks for mastery, valleys for gaps.', icon: 'Map', size: 'large', color: '#06B6D4', emoji: '🗺️' },
  { title: 'Momentum Engine', desc: 'Build Learning inertia with daily streaks, XP rewards, and tiered institutional rankings.', icon: 'Flame', size: 'normal', color: '#FB923C', emoji: '🔥' },
  { title: 'ADHYETA Mentor', desc: 'A 24/7 hyper-intelligent tutor that maintains your entire learning context across subjects.', icon: 'MessageSquare', size: 'normal', color: '#3B82F6', emoji: '🤖' },
];

export const testimonials = [
  { name: 'Riya Kapoor', college: 'IIT Bombay', quote: 'ADHYETA AI helped me understand my own Learning patterns. My GATE score improved by 45 marks in 3 months.', rating: 5, initials: 'RK', role: 'GATE 2025 AIR 23' },
  { name: 'Vikram Rao', college: 'NIT Trichy', quote: 'The Focus Zone is transformative. I went from 2 hours of study to consistently hitting 6+ hours of deep work daily.', rating: 5, initials: 'VR', role: 'Software Engineer @ Google' },
  { name: 'Anita Deshmukh', college: 'BITS Pilani', quote: 'The ADHYETA Mentor explains concepts with perfect analogies. It is like having a friend who knows exactly what you find hard.', rating: 5, initials: 'AD', role: 'CS Final Year' },
  { name: 'Sahil Jain', college: 'VIT Pune', quote: 'The competitive features in ADHYETA AI keep me locked in. My rank improved from #120 to #15 in just 8 weeks.', rating: 4, initials: 'SJ', role: 'UPSC Aspirant' },
  { name: 'Prerna Singh', college: 'DTU Delhi', quote: 'The Learning map showed me exactly where my fundamental gaps were. Targeted ADHYETA study changed everything.', rating: 5, initials: 'PS', role: 'IAS 2025 Qualifier' },
  { name: 'Aditya Kumar', college: 'IIIT Hyderabad', quote: 'Best adaptive learning platform on the market. The AI-recalibrated mock tests are incredibly accurate to real exams.', rating: 5, initials: 'AK', role: 'Placed @ Microsoft' },
];

export const chatHistory = [
  { id: 1, topic: 'Process Scheduling — OS', time: '2h ago', messages: 12, tags: ['OS', 'Theory'] },
  { id: 2, topic: 'TCP/IP Fundamentals', time: 'yesterday', messages: 8, tags: ['CN', 'Networking'] },
  { id: 3, topic: 'Binary Tree MCQs', time: '2 days ago', messages: 15, tags: ['DSA', 'Practice'] },
  { id: 4, topic: 'SQL vs NoSQL deep dive', time: '3 days ago', messages: 9, tags: ['DBMS'] },
  { id: 5, topic: 'Gradient Descent intuition', time: '5 days ago', messages: 6, tags: ['ML', 'Math'] },
];

export const chatMessages = [
  { role: 'user', content: 'Explain process scheduling in OS with a real-world analogy' },
  {
    role: 'ai',
    content: `## Process Scheduling 🎯\n\nThink of it like a **restaurant kitchen** with one chef (CPU) and many orders (processes).\n\n### The Analogy\n- **FCFS**: Orders cooked in the sequence they arrive. Simple, but a complex dish holds up everyone.\n- **SJF**: Chef picks the quickest dish first. Efficient, but complex orders might never get cooked.\n- **Round Robin**: Chef spends 5 minutes on each order, rotating. Everyone gets served gradually.\n- **Priority**: VIP orders first. Regular customers might wait forever (starvation).\n\n### Key Insight\nThe OS scheduler is that chef — constantly deciding which process gets CPU time next.\n\n\`\`\`\nProcess  Burst  Priority\nP1       10ms   3\nP2       5ms    1  ← runs first (highest priority)\nP3       8ms    2\n\`\`\`\n\nThe choice of algorithm affects **throughput**, **waiting time**, and **response time**.`
  },
  { role: 'user', content: 'Can you give me practice MCQs on this?' },
  {
    role: 'ai',
    content: `## Practice MCQs — Process Scheduling\n\n**Q1.** In Round Robin scheduling with quantum = 4ms, if processes P1(5ms), P2(3ms), P3(8ms) arrive at t=0, what is the order of completion?\n\n- A) P2, P1, P3\n- B) P1, P2, P3\n- C) P2, P3, P1\n- D) P1, P3, P2\n\n**Q2.** Which scheduling algorithm can cause starvation?\n\n- A) FCFS\n- B) Round Robin\n- C) Priority Scheduling\n- D) None of the above\n\n**Q3.** The convoy effect is associated with:\n\n- A) SJF\n- B) FCFS\n- C) Round Robin\n- D) Multilevel Queue\n\n*Try answering before I reveal the solutions! 💡*`
  },
];

export const testQuestions = [
  {
    id: 1, subject: 'DSA', difficulty: 2, question: 'What is the time complexity of searching in a balanced BST?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correct: 1, flagged: false,
    explanation: 'A balanced BST has height log(n), and search traverses from root to leaf, giving O(log n) time complexity.'
  },
  {
    id: 2, subject: 'OS', difficulty: 2, question: 'Which scheduling algorithm can lead to the convoy effect?',
    options: ['SJF', 'FCFS', 'Round Robin', 'Priority'], correct: 1, flagged: false,
    explanation: 'FCFS causes the convoy effect when a long process holds the CPU while shorter processes wait behind it.'
  },
  {
    id: 3, subject: 'DBMS', difficulty: 1, question: 'Which normal form eliminates transitive dependencies?',
    options: ['1NF', '2NF', '3NF', 'BCNF'], correct: 2, flagged: false,
    explanation: '3NF eliminates transitive dependencies — where a non-key attribute depends on another non-key attribute.'
  },
  {
    id: 4, subject: 'CN', difficulty: 3, question: 'In TCP, what is the purpose of the three-way handshake?',
    options: ['Data transfer', 'Connection establishment', 'Error detection', 'Flow control'], correct: 1, flagged: false,
    explanation: 'The three-way handshake (SYN, SYN-ACK, ACK) establishes a reliable connection between client and server.'
  },
  {
    id: 5, subject: 'DSA', difficulty: 2, question: 'Which data structure is used for BFS traversal?',
    options: ['Stack', 'Queue', 'Priority Queue', 'Deque'], correct: 1, flagged: false,
    explanation: 'BFS uses a Queue (FIFO) to explore nodes level by level.'
  },
  {
    id: 6, subject: 'OS', difficulty: 3, question: 'What is the purpose of Translation Lookaside Buffer (TLB)?',
    options: ['Manage process scheduling', 'Speed up virtual-to-physical address translation', 'Handle page faults', 'Synchronize threads'], correct: 1, flagged: false,
    explanation: 'TLB is a hardware cache that stores recent virtual-to-physical page table translations, dramatically speeding up memory access.'
  },
  {
    id: 7, subject: 'ML', difficulty: 2, question: 'Which activation function can suffer from the "dying ReLU" problem?',
    options: ['Sigmoid', 'Tanh', 'ReLU', 'Softmax'], correct: 2, flagged: false,
    explanation: 'ReLU outputs 0 for all negative inputs. If a neuron gets stuck outputting 0 always, it "dies" and stops learning.'
  },
];

export const learningDNA = [
  { dimension: 'Visual Processing', value: 72 },
  { dimension: 'Analytical Depth', value: 85 },
  { dimension: 'Memory Retention', value: 68 },
  { dimension: 'Problem Solving', value: 91 },
  { dimension: 'Abstract Reasoning', value: 74 },
  { dimension: 'Speed', value: 63 },
];

export const achievements = [
  { emoji: '🔥', title: '23-Day Warrior', desc: 'Current streak of 23 days', unlocked: true, xp: 500 },
  { emoji: '🧠', title: 'Night Owl', desc: 'Studied past midnight 5 times', unlocked: true, xp: 200 },
  { emoji: '⚡', title: 'Speed Demon', desc: 'Completed a test in under 15 min', unlocked: true, xp: 150 },
  { emoji: '🎯', title: 'Sharpshooter', desc: '90%+ on 3 consecutive tests', unlocked: true, xp: 400 },
  { emoji: '💡', title: 'Curious Mind', desc: 'Asked 50+ AI questions', unlocked: true, xp: 300 },
  { emoji: '🏆', title: 'Top 10', desc: 'Entered global top 10', unlocked: true, xp: 750 },
  { emoji: '🌟', title: 'Perfect Score', desc: '100% on any mock test', unlocked: false, xp: 1000 },
  { emoji: '🚀', title: 'Marathon Runner', desc: '8+ hours in a single day', unlocked: false, xp: 600 },
];

export const performanceHistory = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  DSA: 60 + Math.floor(Math.random() * 30),
  OS:  35 + Math.floor(Math.random() * 30),
  CN:  40 + Math.floor(Math.random() * 25),
  DBMS: 65 + Math.floor(Math.random() * 25),
  ML:  50 + Math.floor(Math.random() * 30),
}));

export const LearningRiskData = [
  { name: 'Rohan V', engagement: 92, performance: 88, risk: 'low' },
  { name: 'Priya S', engagement: 88, performance: 82, risk: 'low' },
  { name: 'Aryan P', engagement: 75, performance: 71, risk: 'low' },
  { name: 'Sneha K', engagement: 90, performance: 90, risk: 'low' },
  { name: 'Karan M', engagement: 65, performance: 65, risk: 'medium' },
  { name: 'Meera D', engagement: 70, performance: 72, risk: 'low' },
  { name: 'Arjun M', engagement: 78, performance: 76, risk: 'low' },
  { name: 'Divya N', engagement: 50, performance: 52, risk: 'high' },
  { name: 'Rahul S', engagement: 42, performance: 48, risk: 'high' },
  { name: 'Ananya J', engagement: 30, performance: 45, risk: 'high' },
  { name: 'Ravi T', engagement: 80, performance: 78, risk: 'low' },
  { name: 'Nisha B', engagement: 55, performance: 58, risk: 'medium' },
  { name: 'Amit R', engagement: 60, performance: 63, risk: 'medium' },
  { name: 'Pooja G', engagement: 85, performance: 80, risk: 'low' },
];

export const focusSessionHistory = Array.from({ length: 84 }, (_, i) => ({
  day: i,
  sessions: Math.random() > 0.2 ? Math.floor(Math.random() * 4) : 0,
  totalMinutes: Math.random() > 0.2 ? 30 + Math.floor(Math.random() * 150) : 0,
  date: new Date(Date.now() - (83 - i) * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
}));

export const subjectMastery = {
  DSA:  [60, 65, 68, 72, 75, 78, 80, 83, 85, 86, 88, 88],
  OS:   [28, 30, 32, 35, 38, 40, 42, 44, 46, 48, 50, 52],
  CN:   [35, 37, 40, 42, 44, 46, 48, 49, 50, 51, 51, 52],
  DBMS: [62, 65, 68, 70, 72, 74, 76, 77, 79, 80, 81, 82],
  ML:   [45, 48, 52, 55, 57, 60, 62, 64, 66, 68, 70, 71],
};

export const aiInsights = [
  {
    type: 'warning',
    emoji: '⚠️',
    title: 'OS is your Learning bottleneck',
    body: 'Your OS score (44%) is 44 points below your DSA score. ADHYETA AI recommends a focused process scheduling session today.',
    action: 'Targeted OS session',
    actionPath: '/focus',
    color: '#EF4444',
  },
  {
    type: 'tip',
    emoji: '💡',
    title: 'Your ADHYETA peak is 8–11 PM',
    body: 'Your focus score is 23% higher during late evening sessions. ADHYETA adaptation suggests scheduling high-complexity topics then.',
    action: 'Plan my week',
    actionPath: '/focus',
    color: '#10B981',
  },
  {
    type: 'achievement',
    emoji: '🎯',
    title: '340 XP from Rank #6',
    body: 'Meera Desai is within striking distance. ADHYETA analysis shows two focused sessions today can bridge the gap.',
    action: 'Challenge rank',
    actionPath: '/leaderboard',
    color: '#F59E0B',
  },
];

export const mentorSuggestions = [
  'Explain with a ADHYETA analogy',
  'Generate 5 adaptive MCQs',
  'What are common exam traps?',
  'Simplify this concept',
  'Create a Learning mind map',
  'What should I target next?',
];
