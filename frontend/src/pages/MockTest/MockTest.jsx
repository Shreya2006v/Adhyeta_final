import { useState } from 'react';
import TestSelection from '../../components/test/TestSelection';
import ActiveTest from '../../components/test/ActiveTest';
import TestResults from '../../components/test/TestResults';
import api from '../../lib/axios';

export default function MockTest() {
  const [phase, setPhase] = useState('select'); // select | loading | test | submitting | results
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [questions, setQuestions] = useState([]);
  const [testContext, setTestContext] = useState(null);
  const [resultsData, setResultsData] = useState(null);

  const selectAnswer = (qi, ai) => setAnswers(prev => ({ ...prev, [qi]: ai }));
  const toggleFlag = (qi) => setFlagged(prev => { 
    const n = new Set(prev); 
    if (n.has(qi)) n.delete(qi); else n.add(qi); 
    return n; 
  });

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      submitTest();
    }
  };

  const handlePrev = () => {
    setCurrentQ(Math.max(0, currentQ - 1));
  };

  const handleJump = (index) => {
    setCurrentQ(index);
  };

  const handleRetry = () => {
    setPhase('select');
    setAnswers({});
    setCurrentQ(0);
    setFlagged(new Set());
    setQuestions([]);
  };

  const handleSelectTopic = async (subjectInfo) => {
    setPhase('loading');
    try {
      const res = await api.post('/mocktest/generate/', {
        subject: subjectInfo.name,
        difficulty: subjectInfo.difficulty.toLowerCase(),
        num_questions: 5 // Keeping it to 5 for fast AI generation
      });
      setQuestions(res.data.data.questions_json);
      setTestContext(res.data.data);
      setPhase('test');
    } catch (err) {
      console.error(err);
      alert('Failed to generate AI Mock Test. Please try again.');
      setPhase('select');
    }
  };

  const submitTest = async () => {
    setPhase('submitting');
    try {
      const res = await api.post('/mocktest/submit/', {
        test_id: testContext.id,
        answers: answers,
        time_taken_minutes: 10
      });
      setResultsData(res.data.data);
      setPhase('results');
    } catch (err) {
      console.error(err);
      alert('Failed to submit test.');
      setPhase('test');
    }
  };

  return (
    <div>
      {phase === 'select' && (
        <TestSelection onSelect={handleSelectTopic} />
      )}

      {phase === 'loading' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <div style={{
            width: 40, height: 40, border: '3px solid transparent',
            borderTopColor: 'var(--accent-primary)', borderRadius: '50%',
            animation: 'spinSlow 1s linear infinite', marginBottom: '24px'
          }} />
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Synthesizing Node Matrix...
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>ADHYETA is analyzing Groq streams to generate your test.</p>
        </div>
      )}

      {phase === 'submitting' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <div style={{
            width: 40, height: 40, border: '3px solid transparent',
            borderTopColor: 'var(--accent-warn)', borderRadius: '50%',
            animation: 'spinSlow 1s linear infinite', marginBottom: '24px'
          }} />
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Processing Analysis...
          </h2>
        </div>
      )}
      
      {phase === 'test' && questions && questions.length > 0 && (
        <ActiveTest 
          question={questions[currentQ]}
          subject={testContext?.subject || "MOCK"}
          currentIndex={currentQ}
          totalQuestions={questions.length}
          answers={answers}
          flagged={flagged}
          onSelectAnswer={selectAnswer}
          onToggleFlag={toggleFlag}
          onPrev={handlePrev}
          onNext={handleNext}
          onJump={handleJump}
          onSubmit={submitTest}
        />
      )}

      {phase === 'results' && resultsData && (
        <TestResults 
          answers={answers}
          questions={questions}
          analysis={resultsData.analysis}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
