import { useState, useCallback } from 'react';
import QuizCard from '../components/QuizCard';
import StrokePractice from '../components/StrokePractice';
import { hiraganaBasic } from '../data/hiragana';
import { katakanaBasic } from '../data/katakana';
import { shuffleArray, getRandomSubset, getTodayStr } from '../utils/helpers';
import { Rocket, RefreshCw, Pencil } from '../components/Icons';
import './Practice.css';

const QUIZ_MODES = [
  { id: 'choice', icon: '', title: 'Multiple Choice', desc: 'Pick the correct reading' },
  { id: 'typing', icon: '', title: 'Type It', desc: 'Type the romaji answer' },
  { id: 'strokes', icon: '筆', title: 'Practice Strokes', desc: 'Trace stroke order' },
];

const CHAR_SETS = [
  { id: 'hiragana', label: 'Hiragana' },
  { id: 'katakana', label: 'Katakana' },
  { id: 'both', label: 'Both' },
];

const DIFFICULTIES = [
  { id: 10, label: '10 Questions' },
  { id: 20, label: '20 Questions' },
  { id: 30, label: '30 Questions' },
];

export default function Practice({ progress, onQuizComplete }) {
  const [mode, setMode] = useState('choice');
  const [charSet, setCharSet] = useState('hiragana');
  const [questionCount, setQuestionCount] = useState(10);
  const [quizState, setQuizState] = useState('setup'); // 'setup' | 'active' | 'results'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const startQuiz = useCallback(() => {
    let pool = [];
    if (charSet === 'hiragana' || charSet === 'both') {
      pool = [...pool, ...hiraganaBasic];
    }
    if (charSet === 'katakana' || charSet === 'both') {
      pool = [...pool, ...katakanaBasic];
    }

    const selected = getRandomSubset(pool, questionCount);

    const quizQuestions = selected.map((item) => {
      // Generate wrong options from the same pool
      const wrongPool = pool.filter((p) => p.romaji !== item.romaji);
      const wrongOptions = getRandomSubset(wrongPool, 3).map((w) => w.romaji);
      const options = shuffleArray([item.romaji, ...wrongOptions]);

      return {
        character: item.char,
        correctAnswer: item.romaji,
        options,
      };
    });

    setQuestions(quizQuestions);
    setCurrentIndex(0);
    setCorrect(0);
    setStreak(0);
    setMaxStreak(0);
    setQuizState('active');
  }, [charSet, questionCount]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrect((c) => c + 1);
      setStreak((s) => {
        const newStreak = s + 1;
        setMaxStreak((m) => Math.max(m, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    if (currentIndex + 1 >= questions.length) {
      // Quiz complete
      const finalCorrect = isCorrect ? correct + 1 : correct;
      const xpEarned = finalCorrect * 10 + maxStreak * 5;

      setTimeout(() => {
        setQuizState('results');
        onQuizComplete({
          correct: finalCorrect,
          total: questions.length,
          xpEarned,
          date: getTodayStr(),
        });
      }, 800);
    } else {
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
      }, 200);
    }
  };

  const resetQuiz = () => {
    setQuizState('setup');
    setQuestions([]);
    setCurrentIndex(0);
    setCorrect(0);
    setStreak(0);
    setMaxStreak(0);
  };

  const currentQ = questions[currentIndex];
  const finalScore = questions.length > 0
    ? Math.round((correct / questions.length) * 100)
    : 0;

  return (
    <div className="practice-page page-enter" id="practice-page">
      <div className="practice-header">
        <h1>Practice</h1>
        <p>Test your knowledge with quizzes and earn XP</p>
      </div>

      {/* Setup */}
      {quizState === 'setup' && (
        <>
          {/* Mode Selection */}
          <div className="practice-modes">
            {QUIZ_MODES.map((m) => (
              <div
                key={m.id}
                className={`practice-mode-card ${mode === m.id ? 'active' : ''}`}
                onClick={() => setMode(m.id)}
                id={`mode-${m.id}`}
              >
                <div className="practice-mode-icon">{m.icon}</div>
                <div className="practice-mode-title">{m.title}</div>
                <div className="practice-mode-desc">{m.desc}</div>
              </div>
            ))}
          </div>

          {/* Setup Panel — only show for quiz modes, not strokes */}
          {mode !== 'strokes' && (
          <div className="practice-setup">
            <div className="practice-setup-row">
              <span className="practice-setup-label">Characters</span>
              <div className="practice-setup-options">
                {CHAR_SETS.map((cs) => (
                  <button
                    key={cs.id}
                    className={`practice-setup-option ${charSet === cs.id ? 'active' : ''}`}
                    onClick={() => setCharSet(cs.id)}
                  >
                    {cs.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="practice-setup-row">
              <span className="practice-setup-label">Questions</span>
              <div className="practice-setup-options">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.id}
                    className={`practice-setup-option ${questionCount === d.id ? 'active' : ''}`}
                    onClick={() => setQuestionCount(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="btn btn-primary btn-lg practice-start-btn"
              onClick={startQuiz}
              id="start-quiz-btn"
            >
              <Rocket size={20} style={{marginRight: '8px'}} /> Start Quiz
            </button>
          </div>
          )}

          {/* Stroke Practice */}
          {mode === 'strokes' && (
            <StrokePractice />
          )}
        </>
      )}

      {/* Active Quiz */}
      {quizState === 'active' && currentQ && (
        <div className="practice-quiz-area">
          <QuizCard
            question={currentQ.character}
            options={currentQ.options}
            correctAnswer={currentQ.correctAnswer}
            mode={mode}
            current={currentIndex}
            total={questions.length}
            onAnswer={handleAnswer}
            streak={streak}
          />
        </div>
      )}

      {/* Results */}
      {quizState === 'results' && (
        <div className="practice-results">
          <div className="practice-results-icon">
            {finalScore >= 80 ? '' : finalScore >= 50 ? '' : ''}
          </div>
          <h2>
            {finalScore >= 80
              ? 'Amazing!'
              : finalScore >= 50
              ? 'Good job!'
              : 'Keep practicing!'}
          </h2>
          <p className="practice-results-subtitle">
            You completed the quiz with {correct}/{questions.length} correct answers
          </p>

          <div className="practice-results-stats">
            <div className="practice-results-stat">
              <div className="practice-results-stat-value" style={{ color: 'var(--success)' }}>
                {correct}
              </div>
              <div className="practice-results-stat-label">Correct</div>
            </div>
            <div className="practice-results-stat">
              <div className="practice-results-stat-value" style={{ color: 'var(--error)' }}>
                {questions.length - correct}
              </div>
              <div className="practice-results-stat-label">Wrong</div>
            </div>
            <div className="practice-results-stat">
              <div className="practice-results-stat-value" style={{ color: 'var(--warning)' }}>
                {maxStreak}
              </div>
              <div className="practice-results-stat-label">Best Streak</div>
            </div>
          </div>

          <div className="practice-results-xp">
            +{correct * 10 + maxStreak * 5} XP earned
          </div>

          <div className="practice-results-actions">
            <button
              className="btn btn-primary"
              onClick={startQuiz}
              id="retry-quiz-btn"
            >
              <RefreshCw size={20} style={{marginRight: '8px'}} /> Try Again
            </button>
            <button
              className="btn btn-secondary"
              onClick={resetQuiz}
              id="back-setup-btn"
            >
              ← Back to Setup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
