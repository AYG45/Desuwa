import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import CharacterGrid from './pages/CharacterGrid';
import KanaChart from './pages/KanaChart';
import Practice from './pages/Practice';
import Vocabulary from './pages/Vocabulary';
import Profile from './pages/Profile';
import Review from './pages/Review';
import Lessons from './pages/Lessons';
import LessonView from './pages/LessonView';
import Grammar from './pages/Grammar';
import { getStorageData, setStorageData, defaultProgress, getTodayStr } from './utils/helpers';
import { createSRSItem } from './utils/srs';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

export default function App() {
  const [progress, setProgress] = useState(() =>
    getStorageData('desuwa-progress', defaultProgress)
  );
  
  const [displayMode, setDisplayMode] = useState(() => 
    getStorageData('desuwa-display', 'kanji')
  );

  // Persist progress to localStorage on every change
  useEffect(() => {
    setStorageData('desuwa-progress', progress);
  }, [progress]);

  // Persist displayMode
  useEffect(() => {
    setStorageData('desuwa-display', displayMode);
  }, [displayMode]);

  // Apply saved theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('desuwa-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Track active date
  const trackActivity = useCallback(() => {
    const today = getTodayStr();
    setProgress((prev) => {
      if (prev.activeDates.includes(today)) return prev;
      return {
        ...prev,
        activeDates: [...prev.activeDates, today],
      };
    });
  }, []);

  // Learn a character (hiragana/katakana/kanji)
  const handleLearnCharacter = useCallback(
    (type, char) => {
      trackActivity();
      setProgress((prev) => {
        const key =
          type === 'hiragana'
            ? 'learnedHiragana'
            : type === 'katakana'
            ? 'learnedKatakana'
            : 'learnedKanji';

        if (prev[key].includes(char)) return prev;

        const currentSRS = prev.srsItems || [];
        const itemId = `${type}-${char}`;
        const newSRS = currentSRS.some((i) => i.id === itemId)
          ? currentSRS
          : [...currentSRS, createSRSItem(itemId, type, char)];

        return {
          ...prev,
          [key]: [...prev[key], char],
          srsItems: newSRS,
          xp: prev.xp + 5,
          lessonsCompleted: prev.lessonsCompleted + 1,
        };
      });
    },
    [trackActivity]
  );

  // Quiz complete
  const handleQuizComplete = useCallback(
    ({ correct, total, xpEarned, date }) => {
      trackActivity();
      setProgress((prev) => ({
        ...prev,
        xp: prev.xp + xpEarned,
        quizzesTaken: prev.quizzesTaken + 1,
        correctAnswers: prev.correctAnswers + correct,
        totalAnswers: prev.totalAnswers + total,
      }));
    },
    [trackActivity]
  );

  // Bookmark vocab
  const handleBookmark = useCallback((word) => {
    setProgress((prev) => {
      const bookmarks = prev.bookmarkedVocab.includes(word)
        ? prev.bookmarkedVocab.filter((w) => w !== word)
        : [...prev.bookmarkedVocab, word];
      return { ...prev, bookmarkedVocab: bookmarks };
    });
  }, []);

  // SRS Review item update
  const handleReviewItem = useCallback((updatedItem) => {
    trackActivity();
    setProgress((prev) => {
      const items = (prev.srsItems || []).map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      if (!items.find((i) => i.id === updatedItem.id)) {
        items.push(updatedItem);
      }
      return {
        ...prev,
        srsItems: items,
        xp: prev.xp + 5,
      };
    });
  }, [trackActivity]);

  // Add item to SRS
  const handleAddSRSItem = useCallback((newItem) => {
    setProgress((prev) => {
      const currentItems = prev.srsItems || [];
      if (currentItems.some((i) => i.id === newItem.id)) return prev;
      return {
        ...prev,
        srsItems: [...currentItems, newItem],
      };
    });
  }, []);

  // Complete a guided lesson
  const handleCompleteLesson = useCallback((lessonId, track) => {
    trackActivity();
    setProgress((prev) => {
      const completed = prev.completedLessons || [];
      if (completed.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...completed, lessonId],
        xp: prev.xp + 20,
        lessonsCompleted: prev.lessonsCompleted + 1,
      };
    });
  }, [trackActivity]);

  // Complete a grammar lesson
  const handleCompleteGrammar = useCallback((grammarId) => {
    trackActivity();
    setProgress((prev) => {
      const completed = prev.completedGrammar || [];
      if (completed.includes(grammarId)) return prev;
      return {
        ...prev,
        completedGrammar: [...completed, grammarId],
        xp: prev.xp + 15,
      };
    });
  }, [trackActivity]);

  // Reset
  const handleResetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-layout">
        {/* Ambient Background */}
        <div className="ambient-bg" aria-hidden="true">
          <div className="ambient-orb" />
          <div className="ambient-orb" />
          <div className="ambient-orb" />
        </div>

        {/* Navigation */}
        <Navbar progress={progress} displayMode={displayMode} setDisplayMode={setDisplayMode} />

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Home progress={progress} displayMode={displayMode} />}
            />
            <Route
              path="/lessons"
              element={<Lessons progress={progress} />}
            />
            <Route
              path="/lessons/:track/:lessonId"
              element={
                <LessonView
                  progress={progress}
                  onCompleteLesson={handleCompleteLesson}
                  onAddSRSItem={handleAddSRSItem}
                />
              }
            />
            <Route
              path="/grammar"
              element={
                <Grammar
                  progress={progress}
                  onCompleteGrammar={handleCompleteGrammar}
                />
              }
            />
            <Route
              path="/review"
              element={
                <Review
                  progress={progress}
                  onReviewItem={handleReviewItem}
                />
              }
            />
            <Route
              path="/learn"
              element={
                <Learn
                  progress={progress}
                  displayMode={displayMode}
                  onLearnCharacter={handleLearnCharacter}
                />
              }
            />
            <Route
              path="/learn/:type"
              element={
                <CharacterGrid
                  progress={progress}
                  onLearnCharacter={handleLearnCharacter}
                  displayMode={displayMode}
                />
              }
            />
            <Route
              path="/practice"
              element={
                <Practice
                  progress={progress}
                  onQuizComplete={handleQuizComplete}
                  displayMode={displayMode}
                />
              }
            />
            <Route
              path="/chart"
              element={<KanaChart displayMode={displayMode} />}
            />
            <Route
              path="/vocabulary"
              element={
                <Vocabulary
                  progress={progress}
                  onBookmark={handleBookmark}
                  displayMode={displayMode}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  progress={progress}
                  onResetProgress={handleResetProgress}
                  displayMode={displayMode}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
