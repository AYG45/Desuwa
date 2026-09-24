import { useState, useEffect, useRef, useCallback } from 'react';
import HanziWriter from 'hanzi-writer';
import { hiraganaBasic } from '../data/hiragana';
import { katakanaBasic } from '../data/katakana';
import { kanjiN5 } from '../data/kanji';
import { Search, Play, RefreshCw, Pencil, X } from './Icons';
import './StrokePractice.css';

const CHAR_TABS = [
  { id: 'hiragana', label: 'Hiragana' },
  { id: 'katakana', label: 'Katakana' },
  { id: 'kanji', label: 'Kanji' },
];

/**
 * Parse AnimCJK SVG into HanziWriter-compatible JSON format.
 * AnimCJK uses 1024x1024 viewBox (same as HanziWriter) but Y is NOT flipped.
 * HanziWriter expects Y-flipped coordinates (0 at bottom, 1024 at top = 900 in their system).
 * 
 * The SVG has:
 *  - paths with `id` like "z12354d1", "z12354d2" etc → these are stroke outlines  
 *  - paths with `clip-path` → these are animation/median paths
 *  - strokes with same number but different letters (d3a, d3b) are sub-strokes of one stroke
 */
function parseAnimCJKSvg(svgText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');

  // Get stroke outline paths (paths with id like "z*d*")
  const outlinePaths = doc.querySelectorAll('path[id]');
  // Get animation paths (paths with clip-path)
  const animPaths = doc.querySelectorAll('path[clip-path]');

  // Group outlines by stroke number: d1, d2, d3a, d3b → group by number
  const strokeGroups = new Map();
  outlinePaths.forEach(path => {
    const id = path.getAttribute('id');
    // Extract stroke number — match pattern like "d1", "d2", "d3a", "d3b"
    const match = id.match(/d(\d+)([a-z]?)$/);
    if (match) {
      const strokeNum = match[1];
      if (!strokeGroups.has(strokeNum)) {
        strokeGroups.set(strokeNum, []);
      }
      strokeGroups.set(strokeNum, [...strokeGroups.get(strokeNum), path.getAttribute('d')]);
    }
  });

  // Build strokes array — combine sub-strokes (a, b parts) into single path strings
  const strokes = [];
  for (const [, paths] of strokeGroups) {
    // For HanziWriter, each stroke needs to be a single path. 
    // We concatenate sub-stroke paths.
    strokes.push(paths.join(' '));
  }

  // Build medians from animation paths
  // AnimCJK animation paths are simple M/L paths with coordinates
  const medians = [];
  // Group animation paths by their clip-path reference (same stroke)
  const animGrouped = new Map();
  animPaths.forEach(path => {
    const clipRef = path.getAttribute('clip-path');
    // Extract stroke reference from clip-path url
    const clipMatch = clipRef.match(/c(\d+)/);
    if (clipMatch) {
      const strokeNum = clipMatch[1];
      if (!animGrouped.has(strokeNum)) {
        animGrouped.set(strokeNum, []);
      }
      animGrouped.get(strokeNum).push(path.getAttribute('d'));
    }
  });

  for (const [, paths] of animGrouped) {
    // Parse the first animation path for this stroke group to get median points
    // AnimCJK paths look like: "M 174,258 251,308 440,306 697,241"
    const points = [];
    const allPathStr = paths[0]; // Use first animation path
    const coordRegex = /(-?\d+(?:\.\d+)?)\s*[,\s]\s*(-?\d+(?:\.\d+)?)/g;
    let coordMatch;
    while ((coordMatch = coordRegex.exec(allPathStr)) !== null) {
      const x = parseFloat(coordMatch[1]);
      const y = parseFloat(coordMatch[2]);
      // HanziWriter expects Y-flipped: y' = 900 - (y * 900/1024) approximately
      // Actually HanziWriter uses a coordinate system where Y goes from bottom (0) to top (900)
      // AnimCJK Y goes from top (0) to bottom (1024)
      // The transform is: hwY = 900 - (animY * 900 / 1024)
      // But we also need X scaled: hwX = animX * 900 / 1024 + some offset
      // Actually, looking at HanziWriter source, it uses 0-1024 internally too, but Y-flipped
      // So: hwX = x, hwY = 1024 - y (simple flip in 1024x1024 space)
      points.push([Math.round(x), Math.round(1024 - y)]);
    }
    if (points.length > 0) {
      medians.push(points);
    }
  }

  // If we have fewer medians than strokes (because sub-strokes shared animation),
  // that's fine — HanziWriter handles it.

  if (strokes.length === 0) {
    throw new Error('No stroke data found in SVG');
  }

  // We need to Y-flip the stroke outlines too
  // Transform all Y coordinates in the SVG path data
  const flippedStrokes = strokes.map(strokePath => {
    return flipPathY(strokePath, 1024);
  });

  return {
    strokes: flippedStrokes,
    medians: medians,
  };
}

/**
 * Flip Y coordinates in an SVG path string within a given height.
 * This handles M, L, C, Q, Z, and implicit coordinates.
 */
function flipPathY(pathD, height) {
  // Replace all Y coordinates. SVG paths have coordinate pairs like "660 211" or "660,211"
  // We need to parse the path properly.
  // Simple approach: use regex to flip coordinates in pairs
  const tokens = pathD.match(/[MmLlCcQqSsTtAaZzHhVv]|[-+]?(?:\d+\.?\d*|\.\d+)/g);
  if (!tokens) return pathD;

  let result = '';
  let i = 0;
  let currentCmd = '';

  while (i < tokens.length) {
    const token = tokens[i];

    if (/^[A-Za-z]$/.test(token)) {
      currentCmd = token;
      result += token;
      i++;
      continue;
    }

    // Based on the command, we know which values are X and which are Y
    const upperCmd = currentCmd.toUpperCase();
    if (upperCmd === 'Z') {
      i++;
      continue;
    }

    if (upperCmd === 'H') {
      // Horizontal line — single X value, no flip needed
      result += token;
      i++;
    } else if (upperCmd === 'V') {
      // Vertical line — single Y value, flip it
      const y = parseFloat(token);
      result += (currentCmd === 'V' ? (height - y) : (-y));
      i++;
    } else if (upperCmd === 'C') {
      // Cubic bezier: 3 pairs of coordinates
      for (let p = 0; p < 3 && i < tokens.length; p++) {
        const x = tokens[i] || '0';
        const y = tokens[i + 1] || '0';
        if (p > 0) result += ' ';
        if (currentCmd === 'C') {
          result += `${x} ${height - parseFloat(y)}`;
        } else {
          result += `${x} ${-parseFloat(y)}`;
        }
        i += 2;
      }
    } else if (upperCmd === 'Q' || upperCmd === 'S') {
      // Quadratic/smooth: 2 pairs
      for (let p = 0; p < 2 && i < tokens.length; p++) {
        const x = tokens[i] || '0';
        const y = tokens[i + 1] || '0';
        if (p > 0) result += ' ';
        if (currentCmd === upperCmd) {
          result += `${x} ${height - parseFloat(y)}`;
        } else {
          result += `${x} ${-parseFloat(y)}`;
        }
        i += 2;
      }
    } else {
      // M, L, T and implicit coords — pairs of x,y
      const x = token;
      const y = tokens[i + 1];
      if (y !== undefined && /^[-+]?(?:\d+\.?\d*|\.\d+)$/.test(y)) {
        if (currentCmd === upperCmd) {
          result += `${x} ${height - parseFloat(y)}`;
        } else {
          result += `${x} ${-parseFloat(y)}`;
        }
        i += 2;
      } else {
        result += token;
        i++;
      }
    }

    // Add space separator
    if (i < tokens.length) result += ' ';
  }


  return result.trim();
}

export default function StrokePractice() {
  const [activeTab, setActiveTab] = useState('hiragana');
  const [selectedChar, setSelectedChar] = useState(null);
  const [charSearch, setCharSearch] = useState('');
  const [mode, setMode] = useState('animate'); // 'animate' | 'quiz'
  const [quizState, setQuizState] = useState(null); // null | 'active' | 'complete'
  const [mistakeCount, setMistakeCount] = useState(0);
  const [strokesCompleted, setStrokesCompleted] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [charNotFound, setCharNotFound] = useState(false);
  const writerRef = useRef(null);
  const containerRef = useRef(null);

  const getCharList = () => {
    switch (activeTab) {
      case 'hiragana':
        return hiraganaBasic.map((h) => ({ char: h.char, label: h.romaji }));
      case 'katakana':
        return katakanaBasic.map((k) => ({ char: k.char, label: k.romaji }));
      case 'kanji':
        return kanjiN5.map((k) => ({ char: k.char, label: k.meaning }));
      default:
        return [];
    }
  };

  const charList = getCharList();

  const filteredChars = charList.filter((c) => {
    if (!charSearch) return true;
    return (
      c.char.includes(charSearch) ||
      c.label.toLowerCase().includes(charSearch.toLowerCase())
    );
  });

  // Cleanup writer on unmount or when character changes
  const destroyWriter = useCallback(() => {
    if (writerRef.current) {
      // HanziWriter doesn't have a destroy method, so we clear the container
      writerRef.current = null;
    }
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    setQuizState(null);
    setMistakeCount(0);
    setStrokesCompleted(0);
    setTotalStrokes(0);
    setCharNotFound(false);
  }, []);

  // Initialize HanziWriter when selectedChar changes
  useEffect(() => {
    if (!selectedChar || !containerRef.current) return;

    destroyWriter();

    // Small delay to let container clear
    const timeout = setTimeout(() => {
      if (!containerRef.current) return;

      try {
        const writer = HanziWriter.create(containerRef.current, selectedChar, {
          width: 280,
          height: 280,
          padding: 20,
          showOutline: true,
          showCharacter: mode === 'animate',
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 300,
          strokeColor: '#ffffff',
          outlineColor: 'rgba(255, 255, 255, 0.15)',
          drawingColor: '#a0a0a0',
          drawingWidth: 12,
          radicalColor: '#666666',
          highlightColor: '#ffffff',
          highlightOnComplete: true,
          charDataLoader: (char, onComplete, onErr) => {
            const codePoint = char.codePointAt(0);
            const isKana = (codePoint >= 0x3040 && codePoint <= 0x309F) || // Hiragana
                           (codePoint >= 0x30A0 && codePoint <= 0x30FF);   // Katakana

            if (isKana) {
              // Fetch from AnimCJK for kana characters
              const svgUrl = `https://raw.githubusercontent.com/parsimonhi/animCJK/master/svgsJaKana/${codePoint}.svg`;
              fetch(svgUrl)
                .then(res => {
                  if (!res.ok) throw new Error('not found');
                  return res.text();
                })
                .then(svgText => {
                  try {
                    const data = parseAnimCJKSvg(svgText);
                    setCharNotFound(false);
                    onComplete(data);
                  } catch (e) {
                    setCharNotFound(true);
                    onErr && onErr(e);
                  }
                })
                .catch(() => {
                  setCharNotFound(true);
                  onErr && onErr(new Error('Kana data not found'));
                });
            } else {
              // Kanji — use standard hanzi-writer-data
              fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@latest/${char}.json`)
                .then(res => {
                  if (!res.ok) throw new Error('not found');
                  return res.json();
                })
                .then(data => {
                  setCharNotFound(false);
                  onComplete(data);
                })
                .catch(() => {
                  setCharNotFound(true);
                  onErr && onErr(new Error('Character not found'));
                });
            }
          },
        });

        writerRef.current = writer;

        if (mode === 'animate') {
          writer.animateCharacter();
        } else {
          writer.quiz({
            onMistake: (strokeData) => {
              setMistakeCount((m) => m + 1);
            },
            onCorrectStroke: (strokeData) => {
              setStrokesCompleted(strokeData.strokeNum + 1);
              setTotalStrokes(strokeData.totalStrokes);
            },
            onComplete: (summaryData) => {
              setTotalStrokes(summaryData.totalStrokes);
              setStrokesCompleted(summaryData.totalStrokes);
              setQuizState('complete');
            },
          });
          setQuizState('active');
        }
      } catch (err) {
        setCharNotFound(true);
      }
    }, 50);

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedChar, mode, destroyWriter]);

  const handleReplay = () => {
    if (writerRef.current && mode === 'animate') {
      writerRef.current.animateCharacter();
    }
  };

  const handleRetryQuiz = () => {
    setMistakeCount(0);
    setStrokesCompleted(0);
    setQuizState(null);
    // Re-trigger by toggling selectedChar
    const char = selectedChar;
    setSelectedChar(null);
    setTimeout(() => setSelectedChar(char), 50);
  };

  const handleCharSelect = (char) => {
    setSelectedChar(char);
    setCharNotFound(false);
  };

  const handleCloseModal = () => {
    setSelectedChar(null);
    destroyWriter();
  };

  return (
    <div className="stroke-practice">
      {/* Character Selection */}
      <div className="stroke-picker">
        {/* Tabs */}
        <div className="stroke-tabs">
          {CHAR_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`stroke-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedChar(null);
                destroyWriter();
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="stroke-char-search">
          <Search size={14} />
          <input
            type="text"
            placeholder="Filter characters..."
            value={charSearch}
            onChange={(e) => setCharSearch(e.target.value)}
          />
        </div>

        {/* Character Grid */}
        <div className="stroke-char-grid">
          {filteredChars.map((c) => (
            <button
              key={c.char}
              className={`stroke-char-btn ${selectedChar === c.char ? 'active' : ''}`}
              onClick={() => handleCharSelect(c.char)}
              title={c.label}
            >
              <span className="stroke-char-jp">{c.char}</span>
              <span className="stroke-char-label">{c.label}</span>
            </button>
          ))}
          {filteredChars.length === 0 && (
            <div className="stroke-char-empty">No characters match</div>
          )}
        </div>
      </div>

      {/* Modal Drawing Area */}
      {selectedChar && (
        <div className="stroke-modal-overlay" onClick={handleCloseModal}>
          <div className="stroke-modal" onClick={(e) => e.stopPropagation()}>
            <button className="stroke-modal-close" onClick={handleCloseModal} aria-label="Close">
              <X size={24} />
            </button>

            {/* Mode Toggle */}
            <div className="stroke-mode-toggle">
              <button
                className={`stroke-mode-btn ${mode === 'animate' ? 'active' : ''}`}
                onClick={() => setMode('animate')}
              >
                <Play size={16} /> Watch
              </button>
              <button
                className={`stroke-mode-btn ${mode === 'quiz' ? 'active' : ''}`}
                onClick={() => setMode('quiz')}
              >
                <Pencil size={16} /> Practice
              </button>
            </div>

            {/* Canvas */}
            <div className="stroke-canvas-wrapper">
              <div
                ref={containerRef}
                className="stroke-canvas"
                id="stroke-writer-target"
              />

              {charNotFound && (
                <div className="stroke-not-found">
                  <p>Stroke data not available for this character.</p>
                </div>
              )}
            </div>

            {/* Character Info */}
            <div className="stroke-char-info">
              <span className="stroke-current-char">{selectedChar}</span>
              <span className="stroke-current-label">
                {charList.find((c) => c.char === selectedChar)?.label}
              </span>
            </div>

            {/* Controls */}
            <div className="stroke-controls">
              {mode === 'animate' && (
                <button className="btn btn-secondary btn-sm" onClick={handleReplay}>
                  <RefreshCw size={16} /> Replay
                </button>
              )}

              {mode === 'quiz' && quizState === 'active' && (
                <div className="stroke-quiz-status">
                  <div className="stroke-quiz-progress">
                    Strokes: {strokesCompleted}{totalStrokes > 0 ? `/${totalStrokes}` : ''}
                  </div>
                  <div className="stroke-quiz-mistakes">
                    Mistakes: {mistakeCount}
                  </div>
                </div>
              )}

              {mode === 'quiz' && quizState === 'complete' && (
                <div className="stroke-quiz-result">
                  <div className="stroke-quiz-complete-msg">
                    {mistakeCount === 0 ? '✨ Perfect!' : mistakeCount <= 2 ? '👍 Good job!' : '💪 Keep practicing!'}
                  </div>
                  <div className="stroke-quiz-summary">
                    {totalStrokes} strokes · {mistakeCount} mistake{mistakeCount !== 1 ? 's' : ''}
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={handleRetryQuiz}>
                    <RefreshCw size={16} /> Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

