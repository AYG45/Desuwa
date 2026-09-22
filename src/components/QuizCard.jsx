import { useState, useEffect, useRef } from 'react';
import './QuizCard.css';

export default function QuizCard({
  question,
  options,
  correctAnswer,
  mode = 'choice', // 'choice' | 'typing'
  current,
  total,
  onAnswer,
  streak = 0,
}) {
  const [selected, setSelected] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setSelected(null);
    setTypedAnswer('');
    setFeedback(null);
    setDisabled(false);
    if (mode === 'typing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [question, mode]);

  const handleChoiceSelect = (option) => {
    if (disabled) return;
    setSelected(option);
    setDisabled(true);

    const isCorrect = option === correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  };

  const handleTypingSubmit = (e) => {
    e.preventDefault();
    if (disabled || !typedAnswer.trim()) return;
    setDisabled(true);

    const isCorrect =
      typedAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  };

  const progressPercent = total > 0 ? ((current) / total) * 100 : 0;

  return (
    <div className="quiz-card" id="quiz-card">
      {/* Progress */}
      <div className="quiz-card-progress">
        <span>{current + 1}</span>
        <div className="quiz-card-progress-bar">
          <div
            className="quiz-card-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span>{total}</span>
      </div>

      {/* Streak */}
      {streak >= 3 && (
        <div className="quiz-streak">
          {streak} streak!
        </div>
      )}

      {/* Question */}
      <div className="quiz-card-question">
        <div className="quiz-card-prompt">
          {mode === 'choice' ? 'What is the reading?' : 'Type the romaji:'}
        </div>
        <div className="quiz-card-character">{question}</div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`quiz-feedback ${feedback}`}>
          {feedback === 'correct'
            ? 'Correct!'
            : `The answer was: ${correctAnswer}`}
        </div>
      )}

      {/* Multiple Choice */}
      {mode === 'choice' && (
        <div className="quiz-options">
          {options.map((option, i) => {
            let className = 'quiz-option';
            if (disabled) {
              className += ' disabled';
              if (option === correctAnswer) className += ' correct';
              else if (option === selected) className += ' incorrect';
            } else if (option === selected) {
              className += ' selected';
            }

            return (
              <button
                key={i}
                className={className}
                onClick={() => handleChoiceSelect(option)}
                id={`quiz-option-${i}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {/* Typing */}
      {mode === 'typing' && (
        <form className="quiz-input-wrapper" onSubmit={handleTypingSubmit}>
          <input
            ref={inputRef}
            type="text"
            className={`quiz-input ${feedback || ''}`}
            value={typedAnswer}
            onChange={(e) => setTypedAnswer(e.target.value)}
            placeholder="Type romaji..."
            disabled={disabled}
            id="quiz-typing-input"
            autoComplete="off"
          />
          {!disabled && (
            <div style={{ marginTop: 12 }}>
              <button type="submit" className="btn btn-primary btn-sm">
                Check
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
