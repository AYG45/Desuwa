import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { lessonTracks, isLessonUnlocked } from '../data/lessons';
import { BookOpen, CheckCircle, Lock, Play, ArrowLeft, Star, Sparkles } from '../components/Icons';
import './Lessons.css';

export default function Lessons({ progress }) {
  const [activeTrack, setActiveTrack] = useState('hiragana');

  const completedLessons = useMemo(() => progress.completedLessons || [], [progress.completedLessons]);

  const currentTrackData = lessonTracks[activeTrack];

  // Calculate track progress
  const trackStats = useMemo(() => {
    const total = currentTrackData.lessons.length;
    const completed = currentTrackData.lessons.filter(l => completedLessons.includes(l.id)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  }, [currentTrackData, completedLessons]);

  return (
    <div className="lessons-page page-enter" id="lessons-page">
      {/* Header */}
      <div className="lessons-header">
        <div>
          <h1>Guided Lessons</h1>
          <p>Learn step-by-step with mnemonics, pronunciation tips, and active practice</p>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="track-tabs">
        {Object.entries(lessonTracks).map(([key, track]) => {
          const trackCompleted = track.lessons.filter(l => completedLessons.includes(l.id)).length;
          return (
            <button
              key={key}
              className={`track-tab ${activeTrack === key ? 'active' : ''}`}
              onClick={() => setActiveTrack(key)}
            >
              <span className="track-tab-icon" style={{ borderColor: track.color }}>
                {track.icon}
              </span>
              <div className="track-tab-info">
                <span className="track-tab-title">{track.title}</span>
                <span className="track-tab-count">
                  {trackCompleted}/{track.lessons.length} lessons
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Track Overview Banner */}
      <div className="track-banner">
        <div className="track-banner-main">
          <div className="track-banner-badge" style={{ background: currentTrackData.color }}>
            {currentTrackData.icon}
          </div>
          <div>
            <h2>{currentTrackData.title} Course</h2>
            <p>{currentTrackData.description}</p>
          </div>
        </div>
        <div className="track-progress-summary">
          <div className="track-progress-bar-bg">
            <div
              className="track-progress-bar-fill"
              style={{ width: `${trackStats.percentage}%` }}
            />
          </div>
          <span className="track-progress-text">
            {trackStats.completed} of {trackStats.total} completed ({trackStats.percentage}%)
          </span>
        </div>
      </div>

      {/* Lessons Roadmap / List */}
      <div className="lessons-list">
        {currentTrackData.lessons.map((lesson, idx) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isUnlocked = isLessonUnlocked(lesson.id, completedLessons);

          return (
            <div
              key={lesson.id}
              className={`lesson-card ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`}
            >
              <div className="lesson-number">
                {isCompleted ? (
                  <CheckCircle size={22} color="#2ed573" />
                ) : !isUnlocked ? (
                  <Lock size={20} color="var(--text-tertiary)" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              <div className="lesson-body">
                <div className="lesson-body-header">
                  <h3 className="lesson-title">{lesson.title}</h3>
                  {isCompleted && <span className="lesson-tag-completed">Completed</span>}
                </div>
                <p className="lesson-subtitle">{lesson.subtitle}</p>

                {/* Character preview pills */}
                <div className="lesson-chars-preview">
                  {lesson.chars.map((c) => (
                    <span key={c.char} className="lesson-char-chip">
                      <strong>{c.char}</strong>
                      <small>{c.romaji}</small>
                    </span>
                  ))}
                </div>
              </div>

              <div className="lesson-action">
                {isUnlocked ? (
                  <Link
                    to={`/lessons/${activeTrack}/${lesson.id}`}
                    className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} lesson-btn`}
                  >
                    <Play size={16} />
                    {isCompleted ? 'Review' : 'Start'}
                  </Link>
                ) : (
                  <div className="lesson-locked-badge">
                    <Lock size={14} /> Locked
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
