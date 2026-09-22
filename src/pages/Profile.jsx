import StatsCard from '../components/StatsCard';
import ProgressBar from '../components/ProgressBar';
import { hiraganaBasic } from '../data/hiragana';
import { katakanaBasic } from '../data/katakana';
import { kanjiN5 } from '../data/kanji';
import { getLevel, calculateStreak, formatNumber } from '../utils/helpers';
import { Sprout, Target, Book, BookOpen, Flame, Star, Trophy, Rocket, User, Pencil, CheckCircle, Calendar, Trash2 } from '../components/Icons';
import ThemeToggle from '../components/ThemeToggle';
import './Profile.css';

const ACHIEVEMENTS = [
  { id: 'first_lesson', icon: <Sprout size={24} color="#2ed573" />, name: 'First Steps', desc: 'Complete your first lesson', check: (p) => p.lessonsCompleted >= 1 },
  { id: 'hiragana_10', icon: <Pencil size={24} color="#e94560" />, name: 'Hiragana Learner', desc: 'Learn 10 hiragana', check: (p) => p.learnedHiragana.length >= 10 },
  { id: 'hiragana_all', icon: <Book size={24} color="#e94560" />, name: 'Hiragana Master', desc: 'Learn all 46 hiragana', check: (p) => p.learnedHiragana.length >= 46 },
  { id: 'katakana_10', icon: <Pencil size={24} color="#3498db" />, name: 'Katakana Learner', desc: 'Learn 10 katakana', check: (p) => p.learnedKatakana.length >= 10 },
  { id: 'katakana_all', icon: <Book size={24} color="#3498db" />, name: 'Katakana Master', desc: 'Learn all 46 katakana', check: (p) => p.learnedKatakana.length >= 46 },
  { id: 'kanji_10', icon: <BookOpen size={24} color="#7c5cbf" />, name: 'Kanji Beginner', desc: 'Learn 10 kanji', check: (p) => p.learnedKanji.length >= 10 },
  { id: 'quiz_5', icon: <Target size={24} color="#ffa502" />, name: 'Quiz Taker', desc: 'Take 5 quizzes', check: (p) => p.quizzesTaken >= 5 },
  { id: 'streak_3', icon: <Flame size={24} color="#ff6b81" />, name: 'On Fire', desc: '3-day streak', check: (p) => calculateStreak(p.activeDates) >= 3 },
  { id: 'streak_7', icon: <Flame size={24} color="#e17055" />, name: 'Dedicated', desc: '7-day streak', check: (p) => calculateStreak(p.activeDates) >= 7 },
  { id: 'level_5', icon: <Star size={24} color="#fdcb6e" />, name: 'Rising Star', desc: 'Reach level 5', check: (p) => getLevel(p.xp).level >= 5 },
  { id: 'accuracy_90', icon: <Trophy size={24} color="#ffeaa7" />, name: 'Sharp Mind', desc: '90% quiz accuracy', check: (p) => p.totalAnswers >= 10 && (p.correctAnswers / p.totalAnswers) >= 0.9 },
  { id: 'xp_1000', icon: <Rocket size={24} color="#fd79a8" />, name: 'XP Hunter', desc: 'Earn 1000 XP', check: (p) => p.xp >= 1000 },
];

export default function Profile({ progress, onResetProgress }) {
  const { level, progress: levelProgress } = getLevel(progress.xp);
  const streak = calculateStreak(progress.activeDates);
  const accuracy =
    progress.totalAnswers > 0
      ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100)
      : 0;

  // Generate heatmap data (last 16 weeks)
  const generateHeatmap = () => {
    const weeks = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let w = 15; w >= 0; w--) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (w * 7 + (6 - d)));
        const dateStr = date.toISOString().split('T')[0];
        const isActive = progress.activeDates.includes(dateStr);
        const isFuture = date > today;
        week.push({
          date: dateStr,
          active: isActive && !isFuture,
          future: isFuture,
        });
      }
      weeks.push(week);
    }
    return weeks;
  };

  const heatmapData = generateHeatmap();
  const unlockedAchievements = ACHIEVEMENTS.filter((a) => a.check(progress));

  return (
    <div className="profile-page page-enter" id="profile-page">
      {/* Profile Header */}
      <div className="profile-header" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <ThemeToggle compact={true} />
        </div>
        <div className="profile-avatar"><User size={48} color="var(--bg-primary)" /></div>
        <div className="profile-info">
          <h1 className="profile-name">Japanese Learner</h1>
          <p className="profile-subtitle">
            Learning since {progress.activeDates.length > 0
              ? new Date(progress.activeDates[0]).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : 'today'}
          </p>
          <div className="profile-level-row">
            <span className="profile-level-badge">Level {level}</span>
            <span className="profile-xp">{formatNumber(progress.xp)} XP</span>
            <div className="profile-level-bar-wrapper">
              <ProgressBar value={levelProgress} max={100} size="sm" showValue={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <StatsCard icon={<Flame size={24} />} label="Current Streak" value={`${streak} days`} color="#ffa502" />
        <StatsCard icon={<Pencil size={24} />} label="Quizzes Taken" value={progress.quizzesTaken} color="#7c5cbf" />
        <StatsCard icon={<Target size={24} />} label="Accuracy" value={`${accuracy}%`} color="#2ed573" />
        <StatsCard icon={<CheckCircle size={24} />} label="Correct Answers" value={progress.correctAnswers} color="#3498db" />
      </div>

      {/* Activity Heatmap */}
      <div className="profile-heatmap">
        <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Calendar size={20} /> Activity</h3>
        <div className="heatmap-grid">
          {heatmapData.map((week, wi) => (
            <div key={wi} className="heatmap-column">
              {week.map((day, di) => (
                <div
                  key={di}
                  className={`heatmap-cell ${day.active ? 'active-4' : ''} ${day.future ? '' : ''}`}
                  title={day.date}
                  style={day.future ? { opacity: 0.3 } : {}}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="heatmap-legend">
          <span>Less</span>
          <div className="heatmap-legend-cell heatmap-cell" style={{ background: 'var(--bg-tertiary)' }} />
          <div className="heatmap-legend-cell heatmap-cell active-1" />
          <div className="heatmap-legend-cell heatmap-cell active-2" />
          <div className="heatmap-legend-cell heatmap-cell active-3" />
          <div className="heatmap-legend-cell heatmap-cell active-4" />
          <span>More</span>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="section-header">
        <h2>Learning Progress</h2>
        <p>Track your character mastery</p>
      </div>
      <div className="profile-progress-grid">
        <div className="profile-progress-card">
          <div className="profile-progress-card-header">
            <span className="profile-progress-card-icon">あ</span>
            <span className="profile-progress-card-title">Hiragana</span>
            <span className="profile-progress-card-count">
              {progress.learnedHiragana.length}/{hiraganaBasic.length}
            </span>
          </div>
          <ProgressBar
            value={progress.learnedHiragana.length}
            max={hiraganaBasic.length}
            color="#e94560"
          />
        </div>
        <div className="profile-progress-card">
          <div className="profile-progress-card-header">
            <span className="profile-progress-card-icon">ア</span>
            <span className="profile-progress-card-title">Katakana</span>
            <span className="profile-progress-card-count">
              {progress.learnedKatakana.length}/{katakanaBasic.length}
            </span>
          </div>
          <ProgressBar
            value={progress.learnedKatakana.length}
            max={katakanaBasic.length}
            color="#7c5cbf"
          />
        </div>
        <div className="profile-progress-card">
          <div className="profile-progress-card-header">
            <span className="profile-progress-card-icon">漢</span>
            <span className="profile-progress-card-title">Kanji N5</span>
            <span className="profile-progress-card-count">
              {progress.learnedKanji.length}/{kanjiN5.length}
            </span>
          </div>
          <ProgressBar
            value={progress.learnedKanji.length}
            max={kanjiN5.length}
            color="#3498db"
          />
        </div>
      </div>

      {/* Achievements */}
      <div className="profile-achievements">
        <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Trophy size={20} /> Achievements ({unlockedAchievements.length}/{ACHIEVEMENTS.length})</h3>
        <div className="achievements-grid">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = achievement.check(progress);
            return (
              <div
                key={achievement.id}
                className={`achievement-card ${!unlocked ? 'locked' : ''}`}
              >
                <span className="achievement-icon">{achievement.icon}</span>
                <div className="achievement-info">
                  <div className="achievement-name">{achievement.name}</div>
                  <div className="achievement-desc">{achievement.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="profile-reset">
        <button
          className="profile-reset-btn"
          onClick={() => {
            if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
              onResetProgress();
            }
          }}
          id="reset-progress-btn"
        >
          <Trash2 size={16} /> Reset All Progress
        </button>
      </div>
    </div>
  );
}
