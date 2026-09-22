import { useState, useEffect } from 'react';
import { Search, Volume2, BookMarked, Book } from '../components/Icons';
import DisplayToggle from '../components/DisplayToggle';
import { searchJisho } from '../services/jisho';
import { formatJapanese } from '../utils/helpers';
import { playAudio } from '../utils/tts';
import './Dictionary.css';

export default function Dictionary({ progress, onBookmark, displayMode, setDisplayMode }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!hasSearched && results.length === 0) {
      const loadDefaults = async () => {
        setLoading(true);
        try {
          const data = await searchJisho('nihongo'); // Default word
          setResults(data);
        } catch (err) {
          // silently fail for defaults
        } finally {
          setLoading(false);
        }
      };
      loadDefaults();
    }
  }, [hasSearched, results.length]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const data = await searchJisho(query);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch dictionary results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderResult = (item) => {
    // Format the Japanese based on displayMode
    const displayWord = formatJapanese(item, displayMode);
    
    // Always keep track of what the actual reading/word is for audio
    const audioText = item.word || item.reading;
    
    // For bookmarking, we might want to pass the word object or just the word
    const isBookmarked = progress?.bookmarkedVocab?.includes(audioText);

    return (
      <div key={item.id} className="dictionary-card">
        <div className="dictionary-card-header">
          <div className="dictionary-card-jp">
            <h2>{displayWord}</h2>
            {/* If in kanji mode and word has kanji, show reading. If in romaji mode, don't show extra reading as displayWord IS romaji */}
            {displayMode === 'kanji' && item.word && item.word !== item.reading && (
              <span className="dictionary-card-reading">{item.reading}</span>
            )}
            {/* If in kana mode, we only show reading, so no extra reading needed. */}
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
    <div className="dictionary-page page-enter">
      <div className="dictionary-header-wrapper">
        <div className="dictionary-header-text">
          <h1>Dictionary Search</h1>
          <p>Search Jisho.org for words, phrases, and translations dynamically.</p>
        </div>
        <DisplayToggle displayMode={displayMode} setDisplayMode={setDisplayMode} inline={true} />
      </div>

      <form className="dictionary-search-form" onSubmit={handleSearch}>
        <div className="dictionary-search-wrapper">
          <Search size={20} className="dictionary-search-icon" />
          <input
            type="text"
            className="dictionary-search-input"
            placeholder="Search in English, Romaji, or Japanese..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="dictionary-search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div className="dictionary-results">
        {loading && (
          <div className="dictionary-loading">
            <div className="loading-spinner"></div>
            <p>Fetching results...</p>
          </div>
        )}

        {error && <div className="dictionary-error">{error}</div>}

        {!loading && !error && results.length > 0 && (
          <div className="dictionary-cards">
            {results.map(renderResult)}
          </div>
        )}

        {!loading && !error && hasSearched && results.length === 0 && (
          <div className="dictionary-empty">
            <Search size={48} />
            <h3>No words found</h3>
            <p>Try searching for something else.</p>
          </div>
        )}

        {!hasSearched && results.length === 0 && !loading && (
          <div className="dictionary-empty">
            <Book size={48} />
            <h3>Search the Dictionary</h3>
            <p>Type a word above to see meanings, readings, and hear pronunciations.</p>
          </div>
        )}
      </div>
    </div>
  );
}
