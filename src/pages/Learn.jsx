import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { Pencil, CheckCircle } from '../components/Icons';
import { hiraganaBasic } from '../data/hiragana';
import { katakanaBasic } from '../data/katakana';
import { kanjiN5, kanjiLevels } from '../data/kanji';
import './Learn.css';

export default function Learn({ progress }) {
  const navigate = useNavigate();
  const tracks = [
    {
      id: 'hiragana',
      icon: 'あ',
      title: 'Hiragana',
      desc: 'Master the basic Japanese phonetic alphabet used for native words.',
      total: hiraganaBasic.length,
      learned: progress.learnedHiragana.length,
      color: '#e94560',
      path: '/learn/hiragana',
      chars: '46 characters',
    },
    {
      id: 'katakana',
      icon: 'ア',
      title: 'Katakana',
      desc: 'Learn the alphabet used for foreign words, loanwords, and emphasis.',
      total: katakanaBasic.length,
      learned: progress.learnedKatakana.length,
      color: '#7c5cbf',
      path: '/learn/katakana',
      chars: '46 characters',
    },
    {
      id: 'kanji',
      icon: '漢',
      title: 'Kanji',
      desc: 'Study Chinese characters adopted into Japanese writing. Start with N5.',
      total: kanjiN5.length,
      learned: progress.learnedKanji.length,
      color: '#3498db',
      path: '/learn/kanji',
      chars: `${kanjiN5.length} N5 kanji`,
    },
  ];

  return (
    <div className="learn-page page-enter" id="learn-page">
      <div className="learn-page-header">
        <h1>Learn Japanese</h1>
        <p>Choose a writing system to study. Click any character to flip and learn it.</p>
      </div>

      {/* Learning Tracks */}
      <div className="learn-tracks">
        {tracks.map((track, i) => (
          <Link
            key={track.id}
            to={track.path}
            className="learn-track-card"
            id={`track-${track.id}`}
            style={{
              animationDelay: `${i * 0.1}s`,
              '--track-color': track.color,
            }}
          >
            <div
              className="learn-track-icon"
              style={{
                background: `${track.color}15`,
                color: track.color,
              }}
            >
              {track.icon}
            </div>
            <div className="learn-track-title">{track.title}</div>
            <div className="learn-track-desc">{track.desc}</div>
            <div className="learn-track-meta">
              <span className="learn-track-meta-item">
                <Pencil size={14} style={{marginRight: '4px'}} /> {track.chars}
              </span>
              <span className="learn-track-meta-item">
                <CheckCircle size={14} style={{marginRight: '4px'}} /> {track.learned} learned
              </span>
            </div>
            <div className="learn-track-progress">
              <ProgressBar
                value={track.learned}
                max={track.total}
                color={track.color}
                size="sm"
              />
            </div>
            <style>{`
              #track-${track.id}::before {
                background: ${track.color};
                opacity: 0;
              }
              #track-${track.id}:hover::before {
                opacity: 1;
              }
            `}</style>
          </Link>
        ))}
      </div>

      {/* JLPT Kanji Levels */}
      <section className="kanji-levels">
        <div className="section-header">
          <h2>JLPT Kanji Levels</h2>
          <p>Progress through official JLPT difficulty levels</p>
        </div>
        <div className="kanji-level-cards">
          {Object.entries(kanjiLevels).map(([key, level]) => {
            const isAvailable = key === 'N5';
            return (
              <div
                key={key}
                className={`kanji-level-card ${!isAvailable ? 'locked' : ''}`}
                onClick={() => {
                  if (isAvailable) navigate('/learn/kanji');
                }}
              >
                <div
                  className="kanji-level-badge"
                  style={{
                    background: `${level.color}15`,
                    color: level.color,
                  }}
                >
                  {level.label}
                </div>
                <div className="kanji-level-title">{level.description}</div>
                <div className="kanji-level-count">
                  {level.count} characters
                </div>
                {isAvailable ? (
                  <ProgressBar
                    value={progress.learnedKanji.length}
                    max={kanjiN5.length}
                    color={level.color}
                    size="sm"
                    showValue={false}
                  />
                ) : (
                  <div className="kanji-level-lock">Coming soon</div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
