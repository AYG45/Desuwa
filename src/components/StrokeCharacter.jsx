import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { loadStrokeData } from '../utils/strokeLoader';
import { RefreshCw } from './Icons';
import './StrokeCharacter.css';

const StrokeCharacter = forwardRef(function StrokeCharacter(
  {
    char,
    size = 200,
    autoAnimate = true,
    showReplayButton = false,
    onAnimationStart,
    onAnimationComplete,
  },
  ref
) {
  const containerRef = useRef(null);
  const writerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStrokeData, setHasStrokeData] = useState(true);

  // Expose replay method and state to parent components
  useImperativeHandle(ref, () => ({
    replay: () => handleReplay(),
    isAnimating,
    hasStrokeData,
  }));

  const handleReplay = () => {
    if (!writerRef.current || isAnimating) return;
    setIsAnimating(true);
    onAnimationStart && onAnimationStart();
    writerRef.current.animateCharacter({
      onComplete: () => {
        setIsAnimating(false);
        onAnimationComplete && onAnimationComplete();
      },
    });
  };

  // Initialize and animate
  useEffect(() => {
    if (!char || !containerRef.current) return;

    let isMounted = true;
    setHasStrokeData(true);

    // Clear previous SVG
    containerRef.current.innerHTML = '';
    writerRef.current = null;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const strokeColor = isLight ? '#121212' : '#ffffff';
    const outlineColor = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)';

    try {
      const writer = HanziWriter.create(containerRef.current, char, {
        width: size,
        height: size,
        padding: Math.round(size * 0.08),
        showOutline: true,
        showCharacter: true,
        strokeAnimationSpeed: 1.1,
        delayBetweenStrokes: 220,
        strokeColor: strokeColor,
        outlineColor: outlineColor,
        highlightColor: isLight ? '#8b2500' : '#ffd93d',
        highlightOnComplete: true,
        charDataLoader: (targetChar, onComplete, onErr) => {
          loadStrokeData(targetChar)
            .then((data) => {
              if (isMounted) {
                setHasStrokeData(true);
                onComplete(data);
              }
            })
            .catch((err) => {
              if (isMounted) {
                setHasStrokeData(false);
                onErr && onErr(err);
              }
            });
        },
      });

      writerRef.current = writer;

      if (autoAnimate) {
        setIsAnimating(true);
        onAnimationStart && onAnimationStart();
        writer.animateCharacter({
          onComplete: () => {
            if (isMounted) {
              setIsAnimating(false);
              onAnimationComplete && onAnimationComplete();
            }
          },
        });
      }
    } catch {
      if (isMounted) setHasStrokeData(false);
    }

    return () => {
      isMounted = false;
      if (writerRef.current) {
        try {
          writerRef.current.cancelQuiz();
        } catch {}
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [char, size, autoAnimate]);

  return (
    <div className="stroke-char-wrapper">
      {/* Background calligraphy grid guidelines */}
      <div
        className="stroke-canvas-container"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg
          className="stroke-canvas-grid"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <line
            x1={size / 2}
            y1={0}
            x2={size / 2}
            y2={size}
            strokeDasharray="4 4"
          />
          <line
            x1={0}
            y1={size / 2}
            x2={size}
            y2={size / 2}
            strokeDasharray="4 4"
          />
        </svg>

        {/* HanziWriter mounts into this ref */}
        <div ref={containerRef} className="stroke-canvas-target" />

        {/* Fallback if stroke data cannot be loaded */}
        {!hasStrokeData && (
          <div className="stroke-fallback-char" style={{ fontSize: `${size * 0.55}px` }}>
            {char}
          </div>
        )}
      </div>

      {/* Optional In-component Replay Strokes Button */}
      {showReplayButton && hasStrokeData && (
        <button
          className="stroke-replay-btn"
          onClick={handleReplay}
          disabled={isAnimating}
          title="Watch stroke order animation again"
        >
          <RefreshCw size={15} className={isAnimating ? 'spin-anim' : ''} />
          <span>{isAnimating ? 'Drawing...' : 'Replay Strokes'}</span>
        </button>
      )}
    </div>
  );
});

export default StrokeCharacter;
