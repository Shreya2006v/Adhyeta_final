import { useState } from 'react';
import TestSelection from '../../components/test/TestSelection';
import ActiveTest from '../../components/test/ActiveTest';
import TestResults from '../../components/test/TestResults';
import { testQuestions } from '../../lib/mockData';

export default function MockTest() {
  const [phase, setPhase] = useState('select'); 
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());

  const selectAnswer = (qi, ai) => setAnswers(prev => ({ ...prev, [qi]: ai }));
  const toggleFlag = (qi) => setFlagged(prev => { 
    const n = new Set(prev); 
    if (n.has(qi)) n.delete(qi); else n.add(qi); 
    return n; 
  });

  const handleNext = () => {
    if (currentQ < testQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase('results');
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
  };

  return (
    <div>
      {phase === 'select' && (
        <TestSelection onSelect={() => setPhase('test')} />
      )}
      
      {phase === 'test' && (
        <ActiveTest 
          question={testQuestions[currentQ]}
          currentIndex={currentQ}
          totalQuestions={testQuestions.length}
          answers={answers}
          flagged={flagged}
          onSelectAnswer={selectAnswer}
          onToggleFlag={toggleFlag}
          onPrev={handlePrev}
          onNext={handleNext}
          onJump={handleJump}
          onSubmit={() => setPhase('results')}
        />
      )}

      {phase === 'results' && (
        <TestResults 
          answers={answers}
          questions={testQuestions}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
