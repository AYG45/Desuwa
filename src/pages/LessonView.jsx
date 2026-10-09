import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { lessonTracks, getNextLessonId } from '../data/lessons';
import { playAudio } from '../utils/tts';
import { createSRSItem } from '../utils/srs';
import { shuffleArray } from '../utils/helpers';
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  ChevronRight,
  CheckCircle,
  X,
  Rocket,
  Play,
  Book,
  Award,
  RotateCcw,
} from '../components/Icons';
import StrokeCharacter from '../components/StrokeCharacter';
import './LessonView.css';

export default function LessonView({ progress, onCompleteLesson, onAddSRSItem }) {
  const { track = 'hiragana', lessonId } = useParams();
  const navigate = useNavigate();

  const currentTrackData = lessonTracks[track];
  const lesson = useMemo(() => {
    if (!currentTrackData) return null;
    return currentTrackData.lessons.find((l) => l.id === lessonId);
  }, [currentTrackData, lessonId]);

  // Phase: 'teach' | 'practice' | 'complete'
  const [phase, setPhase] = useState('teach');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const strokeRef = useRef(null);
  const [isReplaying, setIsReplaying] = useState(false);

  useEffect(() => {
    setIsReplaying(false);
  }, [currentCharIndex]);

  // Practice state
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);

  // Generate practice questions from the lesson characters
  useEffect(() => {
    if (!lesson) return;
    const questions = [];

    // 1. Kana -> Romaji
    lesson.chars.forEach((c) => {
      const wrongOptions = lesson.chars
        .filter((other) => other.char !== c.char)
        .map((other) => other.romaji);
      const choices = shuffleArray([c.romaji, ...wrongOptions.slice(0, 3)]);
      questions.push({
        prompt: `What is the reading for:`,
        display: c.char,
        correct: c.romaji,
        choices,
        type: 'kana-to-romaji',
      });
    });

    // 2. Romaji -> Kana
    lesson.chars.forEach((c) => {
      const wrongOptions = lesson.chars
        .filter((other) => other.char !== c.char)
        .map((other) => other.char);
      const choices = shuffleArray([c.char, ...wrongOptions.slice(0, 3)]);
      questions.push({
        prompt: `Select the character for:`,
        display: c.romaji,
        correct: c.char,
        choices,
        type: 'romaji-to-kana',
      });
    });

    setPracticeQuestions(shuffleArray(questions));
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="lesson-not-found">
        <h2>Lesson Not Found</h2>
        <p>The requested lesson could not be loaded.</p>
        <Link to="/lessons" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Lessons
        </Link>
      </div>
    );
  }

  const currentChar = lesson.chars[currentCharIndex];
  const nextLessonId = getNextLessonId(lesson.id);

  // Phase 1 navigation
  const handleNextChar = () => {
    if (currentCharIndex + 1 < lesson.chars.length) {
      setCurrentCharIndex((prev) => prev + 1);
    } else {
      // Transition to practice
      setPhase('practice');
      setCurrentQIndex(0);
      setSelectedChoice(null);
      setIsAnswerChecked(false);
      setPracticeScore(0);
    }
  };

  const handlePrevChar = () => {
    if (currentCharIndex > 0) {
      setCurrentCharIndex((prev) => prev - 1);
    }
  };

  // Phase 2: Practice answering
  const handleSelectChoice = (choice) => {
    if (isAnswerChecked) return;
    setSelectedChoice(choice);
    setIsAnswerChecked(true);

    const currentQ = practiceQuestions[currentQIndex];
    const isCorrect = choice === currentQ.correct;
    if (isCorrect) {
      setPracticeScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < practiceQuestions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setIsAnswerChecked(false);
    } else {
      // Finished practice — mark completed & enroll in SRS
      if (onCompleteLesson) {
        onCompleteLesson(lesson.id, track);
      }
      if (onAddSRSItem) {
        lesson.chars.forEach((c) => {
          const srsItem = createSRSItem(
            `${track}-${c.char}`,
            track,
            c.char,
            { reading: c.romaji, meaning: c.word ? `${c.word} (${c.wordMeaning})` : '' }
          );
          onAddSRSItem(srsItem);
        });
      }
      setPhase('complete');
    }
  };

  return (
    <div className="lesson-view-page page-enter" id="lesson-view-page">
      {/* Top Bar Navigation */}
      <div className="lesson-top-nav">
        <button className="lesson-back-btn" onClick={() => navigate('/lessons')}>
          <ArrowLeft size={18} />
          <span>Course Roadmap</span>
        </button>

        <div className="lesson-phase-indicators">
          <span className={`phase-pill ${phase === 'teach' ? 'active' : 'done'}`}>
            1. Learn
          </span>
          <span className={`phase-pill ${phase === 'practice' ? 'active' : phase === 'complete' ? 'done' : ''}`}>
            2. Practice
          </span>
          <span className={`phase-pill ${phase === 'complete' ? 'active' : ''}`}>
            3. Review Ready
          </span>
        </div>
      </div>

      {/* PHASE 1: TEACH */}
      {phase === 'teach' && currentChar && (
        <div className="teach-container">
          {/* Progress in current lesson */}
          <div className="teach-progress-bar">
            <div
              className="teach-progress-fill"
              style={{
                width: `${((currentCharIndex + 1) / lesson.chars.length) * 100}%`,
              }}
            />
          </div>
          <div className="teach-counter">
            Character {currentCharIndex + 1} of {lesson.chars.length}
          </div>

          <div className="teach-card">
            {/* Character Showcase */}
            <div className="char-hero">
              <StrokeCharacter
                ref={strokeRef}
                char={currentChar.char}
                size={180}
                onAnimationStart={() => setIsReplaying(true)}
                onAnimationComplete={() => setIsReplaying(false)}
              />
              <div className="char-romaji">{currentChar.romaji}</div>
              <div className="char-hero-actions">
                <button
                  className="char-action-btn"
                  onClick={() => strokeRef.current?.replay()}
                  disabled={isReplaying}
                  title="Watch stroke order animation again"
                >
                  <RotateCcw size={14} className={isReplaying ? 'spin-anim' : ''} />
                  <span>{isReplaying ? 'Drawing...' : 'Replay'}</span>
                </button>
                <button
                  className="char-action-btn"
                  onClick={() => playAudio(currentChar.char)}
                  title="Listen to pronunciation"
                >
                  <Volume2 size={14} />
                  <span>Listen</span>
                </button>
              </div>
            </div>

            {/* Teaching Info */}
            <div className="char-details">
              {/* Mnemonic */}
              <div className="detail-box mnemonic-box">
                <div className="detail-box-header">
                  <Sparkles size={18} color="#ffa502" />
                  <h4>Memory Mnemonic</h4>
                </div>
                <p>{currentChar.mnemonic}</p>
              </div>

              {/* Pronunciation Tip */}
              <div className="detail-box tip-box">
                <div className="detail-box-header">
                  <Volume2 size={18} color="#3498db" />
                  <h4>Sound Guide</h4>
                </div>
                <p>{currentChar.tip}</p>
              </div>

              {/* Example Word */}
              {currentChar.word && (
                <div className="detail-box word-box">
                  <div className="detail-box-header">
                    <Book size={18} color="#2ed573" />
                    <h4>Example Word</h4>
                  </div>
                  <div className="example-word-row">
                    <span className="example-word-jp">{currentChar.word}</span>
                    <span className="example-word-reading">[{currentChar.wordReading}]</span>
                    <span className="example-word-meaning">{currentChar.wordMeaning}</span>
                    <button
                      className="example-audio-mini"
                      onClick={() => playAudio(currentChar.word)}
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="teach-nav-controls">
            <button
              className="btn btn-secondary"
              onClick={handlePrevChar}
              disabled={currentCharIndex === 0}
            >
              Previous
            </button>
            <button className="btn btn-primary btn-lg" onClick={handleNextChar}>
              {currentCharIndex + 1 === lesson.chars.length ? (
                <>
                  Start Practice <Rocket size={18} />
                </>
              ) : (
                <>
                  Next Character <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: PRACTICE */}
      {phase === 'practice' && practiceQuestions.length > 0 && (() => {
        const currentQ = practiceQuestions[currentQIndex];
        return (
          <div className="practice-container">
            <div className="teach-progress-bar">
              <div
                className="teach-progress-fill"
                style={{
                  width: `${((currentQIndex + 1) / practiceQuestions.length) * 100}%`,
                }}
              />
            </div>
            <div className="teach-counter">
              Question {currentQIndex + 1} of {practiceQuestions.length}
            </div>

            <div className="practice-card">
              <p className="practice-prompt">{currentQ.prompt}</p>
              <div className="practice-display">{currentQ.display}</div>

              <div className="practice-options-grid">
                {currentQ.choices.map((choice, i) => {
                  let btnClass = 'practice-option-btn';
                  if (isAnswerChecked) {
                    if (choice === currentQ.correct) {
                      btnClass += ' correct';
                    } else if (choice === selectedChoice) {
                      btnClass += ' wrong';
                    }
                  }

                  return (
                    <button
                      key={i}
                      className={btnClass}
                      onClick={() => handleSelectChoice(choice)}
                      disabled={isAnswerChecked}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              {isAnswerChecked && (
                <div className="practice-feedback-bar">
                  <div className="feedback-result">
                    {selectedChoice === currentQ.correct ? (
                      <span className="feedback-correct">
                        <CheckCircle size={20} /> Correct!
                      </span>
                    ) : (
                      <span className="feedback-wrong">
                        <X size={20} /> Incorrect — correct was: <strong>{currentQ.correct}</strong>
                      </span>
                    )}
                  </div>
                  <button className="btn btn-primary" onClick={handleNextQuestion}>
                    {currentQIndex + 1 === practiceQuestions.length ? 'Finish Lesson' : 'Continue'}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* PHASE 3: COMPLETE */}
      {phase === 'complete' && (
        <div className="complete-container">
          <div className="complete-card">
            <div className="complete-icon">
              <Award size={52} color="#2ed573" />
            </div>
            <h2>Lesson Completed!</h2>
            <p className="complete-sub">
              You mastered <strong>{lesson.title}</strong> and added {lesson.chars.length} characters to your SRS Review Deck!
            </p>

            <div className="complete-chars-summary">
              <h4>Characters Learned:</h4>
              <div className="complete-chars-grid">
                {lesson.chars.map((c) => (
                  <div key={c.char} className="complete-char-badge">
                    <span className="c-glyph">{c.char}</span>
                    <span className="c-romaji">{c.romaji}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="complete-srs-banner">
              <Sparkles size={20} color="#ffd93d" />
              <div>
                <strong>Enrolled in Spaced Repetition (SRS)!</strong>
                <p>These items will appear in your Review Queue when it's time to test your retention.</p>
              </div>
            </div>

            <div className="complete-actions">
              {nextLessonId ? (
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    navigate(`/lessons/${track}/${nextLessonId}`);
                    setPhase('teach');
                    setCurrentCharIndex(0);
                  }}
                >
                  Next Lesson <ChevronRight size={18} />
                </button>
              ) : (
                <Link to="/lessons" className="btn btn-primary btn-lg">
                  Course Roadmap <CheckCircle size={18} />
                </Link>
              )}
              <Link to="/review" className="btn btn-secondary">
                View SRS Reviews
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
