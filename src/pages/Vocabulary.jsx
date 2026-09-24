import { useState, useMemo } from 'react';
import { vocabulary, vocabCategories } from '../data/vocabulary';
import { searchJisho } from '../services/jisho';
import { Search, MessageCircle, User, Star, Tent, Calendar, Play, Volume2, BookMarked, Book } from '../components/Icons';
import { playAudio } from '../utils/tts';
import { formatJapanese } from '../utils/helpers';
import DisplayToggle from '../components/DisplayToggle';
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

export default function Vocabulary({ progress, onBookmark, displayMode, setDisplayMode }) {
  const [search, setSearch] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Jisho Dictionary states
  const [jishoResults, setJishoResults] = useState([]);
  const [jishoLoading, setJishoLoading] = useState(false);
  const [jishoError, setJishoError] = useState(null);
  const [hasSearchedJisho, setHasSearchedJisho] = useState(false);

  const filteredVocab = useMemo(() => {
    return vocabulary.filter((item) => {
      const matchesSearch =
        !search ||
        item.word.includes(search) ||
        item.reading.toLowerCase().includes(search.toLowerCase()) ||
        item.meaning.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [search]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSearchJisho = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setJishoLoading(true);
    setJishoError(null);
    setHasSearchedJisho(true);
    
    try {
      const data = await searchJisho(search);
      setJishoResults(data);
    } catch (err) {
      setJishoError('Failed to fetch dictionary results. Please try again.');
    } finally {
      setJishoLoading(false);
    }
  };

  const renderJishoResult = (item) => {
    const displayWord = formatJapanese(item, displayMode);
    const audioText = item.word || item.reading;
    const isBookmarked = progress?.bookmarkedVocab?.includes(audioText);

    return (
      <div key={item.id} className="dictionary-card">
        <div className="dictionary-card-header">
          <div className="dictionary-card-jp">
            <h2>{displayWord}</h2>
            {displayMode === 'kanji' && item.word && item.word !== item.reading && (
              <span className="dictionary-card-reading">{item.reading}</span>
            )}
          </div>
          <div className="dictionary-card-actions">
            <button 
              className="dictionary-play-btn" 
              onClick={() => playAudio(audioText)}
              aria-label="Play pronunciation"
            >
              <Volume2 size={20} />
            </button>
            {onBookmark && (
              <button 
                className={`dictionary-bookmark-btn ${isBookmarked ? 'active' : ''}`}
                onClick={() => onBookmark(audioText)}
                aria-label="Bookmark word"
              >
                <BookMarked size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="dictionary-card-meta">
          {item.isCommon && <span className="tag tag-common">Common</span>}
          {item.jlpt && <span className="tag tag-jlpt">{item.jlpt}</span>}
        </div>

        <div className="dictionary-card-meanings">
          <ol>
            {item.meanings.map((meaning, idx) => (
              <li key={idx}>{meaning}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  };

  return (
    <div className="vocab-page page-enter" id="vocab-page">
      <div className="vocab-header-wrapper">
        <div className="vocab-header">
          <h1>Vocabulary & Dictionary</h1>
          <p>Browse JLPT N5 vocabulary or search Jisho.org dynamically</p>
        </div>
        <DisplayToggle displayMode={displayMode} setDisplayMode={setDisplayMode} inline={true} />
      </div>

      {/* Search */}
      <div className="vocab-search-bar">
        <form className="vocab-search-form" onSubmit={handleSearchJisho}>
          <div className="vocab-search-wrapper dictionary-search-wrapper">
            <span className="vocab-search-icon"><Search size={16} /></span>
            <input
              type="text"
              className="vocab-search-input dictionary-search-input"
              placeholder="Search in Japanese, romaji, or English..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHasSearchedJisho(false); // Reset Jisho search state on new typing
                setJishoResults([]);
              }}
              id="vocab-search"
            />
            <button type="submit" className="dictionary-search-btn" disabled={jishoLoading}>
              {jishoLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
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

        {filteredVocab.length === 0 && search && !hasSearchedJisho && (
          <div className="empty-state">
            <div className="empty-state-icon"><Search size={48} /></div>
            <h3>No local words found</h3>
            <p>Press Search to look up "{search}" in the online dictionary</p>
          </div>
        )}

        {filteredVocab.length === 0 && !search && (
          <div className="empty-state">
            <div className="empty-state-icon"><Search size={48} /></div>
            <h3>No words found</h3>
            <p>Try a different search term or category</p>
          </div>
        )}
      </div>

      {/* Dictionary Results Section */}
      {(hasSearchedJisho || jishoLoading || jishoError) && (
        <div className="dictionary-results-section">
          <div className="dictionary-section-header">
            <h2>Online Dictionary Results</h2>
            <hr />
          </div>
          
          <div className="dictionary-results">
            {jishoLoading && (
              <div className="dictionary-loading">
                <div className="loading-spinner"></div>
                <p>Fetching results...</p>
              </div>
            )}

            {jishoError && <div className="dictionary-error">{jishoError}</div>}

            {!jishoLoading && !jishoError && jishoResults.length > 0 && (
              <div className="dictionary-cards">
                {jishoResults.map(renderJishoResult)}
              </div>
            )}

            {!jishoLoading && !jishoError && hasSearchedJisho && jishoResults.length === 0 && (
              <div className="dictionary-empty">
                <Search size={48} />
                <h3>No dictionary words found</h3>
                <p>No results found on Jisho for "{search}".</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
