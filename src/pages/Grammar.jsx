import { useState, useMemo } from 'react';
import { grammarLessons, grammarCategories } from '../data/grammar';
import { playAudio } from '../utils/tts';
import {
  BookOpen,
  CheckCircle,
  Volume2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Trophy,
  Check,
  X,
} from '../components/Icons';
import './Grammar.css';

export default function Grammar({ progress, onCompleteGrammar }) {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeLessonId, setActiveLessonId] = useState(null);

  // Exercise state for the active lesson
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedExercises, setSubmittedExercises] = useState(false);

  const completedGrammar = useMemo(
    () => progress.completedGrammar || [],
    [progress.completedGrammar]
  );

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return grammarLessons.filter((l) => {
      const matchLevel = selectedLevel === 'all' || l.level === selectedLevel;
      const matchCat = selectedCategory === 'all' || l.category === selectedCategory;
      return matchLevel && matchCat;
    });
  }, [selectedLevel, selectedCategory]);

  const activeLesson = useMemo(() => {
    return grammarLessons.find((l) => l.id === activeLessonId) || null;
  }, [activeLessonId]);

  // Overall stats
  const totalLessons = grammarLessons.length;
  const completedCount = completedGrammar.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Exercise handling
  const handleSelectChoice = (exerciseIdx, choiceIdx) => {
    if (submittedExercises) return;
    setUserAnswers((prev) => ({
      ...prev,
      [exerciseIdx]: choiceIdx,
    }));
  };

  const handleCheckExercises = () => {
    setSubmittedExercises(true);
    // If all or majority correct, mark completed
    if (activeLesson && onCompleteGrammar) {
      const correctCount = activeLesson.exercises.reduce((acc, ex, idx) => {
        return userAnswers[idx] === ex.answer ? acc + 1 : acc;
      }, 0);
      if (correctCount >= Math.ceil(activeLesson.exercises.length / 2)) {
        onCompleteGrammar(activeLesson.id);
      }
    }
  };

  const handleOpenLesson = (lessonId) => {
    setActiveLessonId(lessonId);
    setUserAnswers({});
    setSubmittedExercises(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveLessonId(null);
    setUserAnswers({});
    setSubmittedExercises(false);
  };

  return (
    <div className="grammar-page page-enter" id="grammar-page">
      {/* Detail / Study Mode */}
      {activeLesson ? (
        <div className="grammar-detail-view">
          <button className="grammar-back-btn" onClick={handleBackToList}>
            <ArrowLeft size={18} />
            <span>All Grammar Lessons</span>
          </button>

          <div className="grammar-detail-header">
            <div className="grammar-meta-row">
              <span className="grammar-level-badge">{activeLesson.level}</span>
              <span
                className="grammar-category-badge"
                style={{
                  background: `${grammarCategories[activeLesson.category]?.color}20`,
                  color: grammarCategories[activeLesson.category]?.color,
                }}
              >
                {grammarCategories[activeLesson.category]?.label}
              </span>
              {completedGrammar.includes(activeLesson.id) && (
                <span className="grammar-done-badge">
                  <CheckCircle size={14} /> Completed
                </span>
              )}
            </div>
            <h1>{activeLesson.title}</h1>
            <p className="grammar-detail-desc">{activeLesson.description}</p>
          </div>

          {/* Key Point Callout */}
          <div className="grammar-keypoint-card">
            <Sparkles size={22} color="#ffd93d" />
            <div className="grammar-keypoint-content">
              <strong>Grammar Rule:</strong>
              <div className="grammar-keypoint-formula">{activeLesson.keyPoint}</div>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="grammar-section">
            <h3>How It Works</h3>
            <div className="grammar-explanation-card">
              {activeLesson.explanation.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Examples Section */}
          <div className="grammar-section">
            <h3>Example Sentences</h3>
            <div className="grammar-examples-grid">
              {activeLesson.examples.map((ex, i) => (
                <div key={i} className="grammar-example-card">
                  <div className="example-jp-group">
                    <span className="example-jp">{ex.japanese}</span>
                    <span className="example-reading">{ex.reading}</span>
                  </div>
                  <div className="example-en">{ex.english}</div>
                  <button
                    className="example-audio-button"
                    onClick={() => playAudio(ex.japanese)}
                    title="Play sentence audio"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Exercises Section */}
          <div className="grammar-section">
            <h3>Practice Exercises</h3>
            <div className="grammar-exercises-list">
              {activeLesson.exercises.map((ex, exIdx) => {
                const selected = userAnswers[exIdx];
                const isCorrect = selected === ex.answer;

                return (
                  <div key={exIdx} className="grammar-exercise-card">
                    <div className="exercise-question-row">
                      <span className="exercise-num">Q{exIdx + 1}</span>
                      <div className="exercise-prompt">
                        {ex.sentence ? (
                          <div className="exercise-sentence">
                            {ex.sentence}
                            {ex.hint && <small className="exercise-hint">({ex.hint})</small>}
                          </div>
                        ) : (
                          <div className="exercise-text-q">{ex.question}</div>
                        )}
                      </div>
                    </div>

                    <div className="exercise-choices-grid">
                      {ex.choices.map((choice, choiceIdx) => {
                        let choiceClass = 'exercise-choice-btn';
                        if (selected === choiceIdx) {
                          choiceClass += ' selected';
                        }
                        if (submittedExercises) {
                          if (choiceIdx === ex.answer) {
                            choiceClass += ' correct-answer';
                          } else if (selected === choiceIdx && !isCorrect) {
                            choiceClass += ' wrong-answer';
                          }
                        }

                        return (
                          <button
                            key={choiceIdx}
                            className={choiceClass}
                            onClick={() => handleSelectChoice(exIdx, choiceIdx)}
                            disabled={submittedExercises}
                          >
                            <span>{choice}</span>
                            {submittedExercises && choiceIdx === ex.answer && (
                              <Check size={16} />
                            )}
                            {submittedExercises && selected === choiceIdx && !isCorrect && (
                              <X size={16} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Check Exercises Bar */}
            <div className="grammar-check-bar">
              {!submittedExercises ? (
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleCheckExercises}
                  disabled={Object.keys(userAnswers).length === 0}
                >
                  Check Answers
                </button>
              ) : (
                <div className="grammar-results-bar">
                  <div className="grammar-score-summary">
                    <Trophy size={20} color="#ffd93d" />
                    <span>
                      Score:{' '}
                      {activeLesson.exercises.reduce((acc, ex, idx) => {
                        return userAnswers[idx] === ex.answer ? acc + 1 : acc;
                      }, 0)}{' '}
                      / {activeLesson.exercises.length} correct
                    </span>
                  </div>
                  <button className="btn btn-primary" onClick={handleBackToList}>
                    Done & Back to Lessons
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* List / Overview Mode */
        <>
          <div className="grammar-header">
            <div>
              <h1>Japanese Grammar (JLPT N5 – N1)</h1>
              <p>Sentence structures, key patterns, and practical rules from beginner to advanced</p>
            </div>
          </div>

          {/* Progress Overview Banner */}
          <div className="grammar-progress-banner">
            <div className="grammar-progress-info">
              <div className="grammar-progress-header">
                <h3>Your Grammar Mastery</h3>
                <span className="grammar-progress-counter">
                  {completedCount} of {totalLessons} Points Mastered ({progressPercent}%)
                </span>
              </div>
              <div className="grammar-progress-track">
                <div
                  className="grammar-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* JLPT Level Tabs */}
          <div className="grammar-category-tabs" style={{ marginBottom: '10px' }}>
            {['all', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => {
              const count =
                lvl === 'all'
                  ? grammarLessons.length
                  : grammarLessons.filter((l) => l.level === lvl).length;
              return (
                <button
                  key={lvl}
                  className={`cat-tab ${selectedLevel === lvl ? 'active' : ''}`}
                  onClick={() => setSelectedLevel(lvl)}
                  style={{ fontWeight: 700 }}
                >
                  {lvl === 'all' ? 'All Levels' : `JLPT ${lvl}`} ({count})
                </button>
              );
            })}
          </div>

          {/* Category Tabs */}
          <div className="grammar-category-tabs">
            <button
              className={`cat-tab ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All ({grammarLessons.length})
            </button>
            {Object.entries(grammarCategories).map(([key, cat]) => {
              const count = grammarLessons.filter((l) => l.category === key).length;
              return (
                <button
                  key={key}
                  className={`cat-tab ${selectedCategory === key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(key)}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Grammar Lessons Grid */}
          <div className="grammar-grid">
            {filteredLessons.map((item, index) => {
              const isCompleted = completedGrammar.includes(item.id);
              const catInfo = grammarCategories[item.category];

              return (
                <div
                  key={item.id}
                  className={`grammar-card ${isCompleted ? 'completed' : ''}`}
                  onClick={() => handleOpenLesson(item.id)}
                >
                  <div className="grammar-card-top">
                    <div className="grammar-card-badges">
                      <span className="grammar-level-pill">{item.level}</span>
                      <span
                        className="grammar-cat-pill"
                        style={{
                          background: `${catInfo?.color}18`,
                          color: catInfo?.color,
                        }}
                      >
                        {catInfo?.label}
                      </span>
                    </div>
                    {isCompleted && (
                      <span className="grammar-check-icon">
                        <CheckCircle size={18} color="#2ed573" />
                      </span>
                    )}
                  </div>

                  <h3 className="grammar-card-title">{item.title}</h3>
                  <p className="grammar-card-desc">{item.description}</p>

                  <div className="grammar-card-formula">
                    <code>{item.keyPoint}</code>
                  </div>

                  <div className="grammar-card-footer">
                    <span className="grammar-card-count">
                      {item.examples.length} examples · {item.exercises.length} exercises
                    </span>
                    <span className="grammar-card-arrow">
                      <ChevronRight size={18} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
