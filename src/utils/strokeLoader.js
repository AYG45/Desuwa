// Stroke data loader and parser for HanziWriter
// Supports Japanese Kana (Hiragana/Katakana via AnimCJK) and Kanji (via hanzi-writer-data)

const strokeCache = new Map();

/**
 * Flip Y coordinates in an SVG path string within a given height.
 */
function flipPathY(pathD, height = 1024) {
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

    const upperCmd = currentCmd.toUpperCase();
    if (upperCmd === 'Z') {
      i++;
      continue;
    }

    if (upperCmd === 'H') {
      result += token;
      i++;
    } else if (upperCmd === 'V') {
      const y = parseFloat(token);
      result += (currentCmd === 'V' ? (height - y) : (-y));
      i++;
    } else if (upperCmd === 'C') {
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

    if (i < tokens.length) result += ' ';
  }

  return result.trim();
}

/**
 * Parse AnimCJK SVG into HanziWriter-compatible format.
 */
function parseAnimCJKSvg(svgText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');

  const outlinePaths = doc.querySelectorAll('path[id]');
  const animPaths = doc.querySelectorAll('path[clip-path]');

  const strokeGroups = new Map();
  outlinePaths.forEach(path => {
    const id = path.getAttribute('id');
    const match = id && id.match(/d(\d+)([a-z]?)$/);
    if (match) {
      const strokeNum = match[1];
      if (!strokeGroups.has(strokeNum)) {
        strokeGroups.set(strokeNum, []);
      }
      strokeGroups.set(strokeNum, [...strokeGroups.get(strokeNum), path.getAttribute('d')]);
    }
  });

  const strokes = [];
  for (const [, paths] of strokeGroups) {
    strokes.push(paths.join(' '));
  }

  const medians = [];
  const animGrouped = new Map();
  animPaths.forEach(path => {
    const clipRef = path.getAttribute('clip-path');
    const clipMatch = clipRef && clipRef.match(/c(\d+)/);
    if (clipMatch) {
      const strokeNum = clipMatch[1];
      if (!animGrouped.has(strokeNum)) {
        animGrouped.set(strokeNum, []);
      }
      animGrouped.get(strokeNum).push(path.getAttribute('d'));
    }
  });

  for (const [, paths] of animGrouped) {
    const points = [];
    const allPathStr = paths[0];
    const coordRegex = /(-?\d+(?:\.\d+)?)\s*[,\s]\s*(-?\d+(?:\.\d+)?)/g;
    let coordMatch;
    while ((coordMatch = coordRegex.exec(allPathStr)) !== null) {
      const x = parseFloat(coordMatch[1]);
      const y = parseFloat(coordMatch[2]);
      points.push([Math.round(x), Math.round(1024 - y)]);
    }
    if (points.length > 0) {
      medians.push(points);
    }
  }

  if (strokes.length === 0) {
    throw new Error('No stroke data found in SVG');
  }

  const flippedStrokes = strokes.map(strokePath => flipPathY(strokePath, 1024));

  return {
    strokes: flippedStrokes,
    medians: medians,
  };
}

/**
 * Fetch and parse stroke data for a character (with memory caching).
 */
export async function loadStrokeData(char) {
  if (strokeCache.has(char)) {
    return strokeCache.get(char);
  }

  const codePoint = char.codePointAt(0);
  const isKana = (codePoint >= 0x3040 && codePoint <= 0x309F) ||
                 (codePoint >= 0x30A0 && codePoint <= 0x30FF);

  if (isKana) {
    const url = `https://raw.githubusercontent.com/parsimonhi/animCJK/master/svgsJaKana/${codePoint}.svg`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Kana stroke data not found');
    const svgText = await res.text();
    const data = parseAnimCJKSvg(svgText);
    strokeCache.set(char, data);
    return data;
  } else {
    const url = `https://cdn.jsdelivr.net/npm/hanzi-writer-data@latest/${char}.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Kanji stroke data not found');
    const data = await res.json();
    strokeCache.set(char, data);
    return data;
  }
}
