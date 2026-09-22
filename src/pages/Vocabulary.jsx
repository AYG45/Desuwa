import { useState, useMemo } from 'react';
import { vocabulary, vocabCategories } from '../data/vocabulary';
import { Search, MessageCircle, User, Star, Tent, Calendar, Play, Volume2 } from '../components/Icons';
import { playAudio } from '../utils/tts';
import { formatJapanese } from '../utils/helpers';
import './Vocabulary.css';

const getCategoryIcon = (key) => {
  switch(key) {
    case 'greetings': return <MessageCircle size={14} />;
    case 'people': return <User size={14} />;
    case 'food': return <Star size={14} />;
    case 'places': return <Tent size={14} />;
    case 'time': return <Calendar size={14} />;
    case 'verbs': return <Play size={14} />;
    case 'adjectives': return <Star size={14} />;
    default: return null;
  }
};

export default function Vocabulary({ progress, onBookmark, displayMode }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredVocab = useMemo(() => {
    return vocabulary.filter((item) => {
      const matchesSearch =
        !search ||
        item.word.includes(search) ||
        item.reading.toLowerCase().includes(search.toLowerCase()) ||
        item.meaning.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === 'all' || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="vocab-page page-enter" id="vocab-page">
      <div className="vocab-header">
        <h1>Vocabulary</h1>
        <p>Browse and study JLPT N5 vocabulary words</p>
      </div>

      {/* Search */}
      <div className="vocab-search-bar">
        <div className="vocab-search-wrapper">
          <span className="vocab-search-icon"><Search size={16} /></span>
          <input
            type="text"
            className="vocab-search-input"
            placeholder="Search in Japanese, romaji, or English..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="vocab-search"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="vocab-categories">
        <button
          className={`vocab-category-btn ${category === 'all' ? 'active' : ''}`}
          onClick={() => setCategory('all')}
        >
          All
        </button>
        {Object.entries(vocabCategories).map(([key, cat]) => (
          <button
            key={key}
            className={`vocab-category-btn ${category === key ? 'active' : ''}`}
            onClick={() => setCategory(key)}
          >
            {getCategoryIcon(key)} {cat.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="vocab-count">
        Showing {filteredVocab.length} of {vocabulary.length} words
      </div>

      {/* Word List */}
      <div className="vocab-list">
        {filteredVocab.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const isBookmarked = progress.bookmarkedVocab.includes(item.word);
          const catInfo = vocabCategories[item.category];

          return (
            <div
              key={index}
              className={`vocab-item ${isExpanded ? 'vocab-item-expanded' : ''}`}
              onClick={() => toggleExpand(index)}
            >
              <div className="vocab-item-jp">
                <div className="vocab-item-word">{formatJapanese(item, displayMode)}</div>
                {displayMode === 'kanji' && item.word !== item.reading && (
                  <div className="vocab-item-reading">{item.reading}</div>
                )}
              </div>

              <div className="vocab-item-meaning">{item.meaning}              </div>
              
              <button 
                className="vocab-item-play-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  playAudio(item.word);
                }} 
                aria-label="Play pronunciation"
              >
                <Volume2 size={16} />
              </button>

              <div
                className="vocab-item-category"
                style={{
                  background: catInfo ? `${catInfo.color}15` : undefined,
                  color: catInfo?.color,
                }}
              >
                {getCategoryIcon(item.category)} {catInfo?.label}
              </div>

              <button
                className={`vocab-item-bookmark ${isBookmarked ? 'bookmarked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmark(item.word);
                }}
                aria-label="Bookmark"
              >
                {isBookmarked ? '★' : '☆'}
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="vocab-item-details" onClick={(e) => e.stopPropagation()}>
                  <div className="vocab-item-example">
                    <div className="vocab-item-example-jp">
                      {item.example.split('—')[0]}
                    </div>
                    <div className="vocab-item-example-en">
                      {item.example.split('—')[1] || ''}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredVocab.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon"><Search size={48} /></div>
            <h3>No words found</h3>
            <p>Try a different search term or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
