/**
 * Service to fetch data from Jisho API via a CORS proxy
 */

const JISHO_API_URL = '/api/jisho/search/words?keyword=';

export const searchJisho = async (keyword) => {
  if (!keyword || !keyword.trim()) return [];

  try {
    const targetUrl = `${JISHO_API_URL}${encodeURIComponent(keyword)}`;
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return formatJishoData(data.data || []);
  } catch (error) {
    console.error('Error fetching from Jisho API:', error);
    return [];
  }
};

const formatJishoData = (rawData) => {
  return rawData.map((item) => {
    // Jisho provides multiple japanese representations, we usually take the first one
    const primaryJapanese = item.japanese?.[0] || {};
    const word = primaryJapanese.word || '';
    const reading = primaryJapanese.reading || '';
    
    // Meanings (senses)
    const senses = item.senses || [];
    const englishMeanings = senses
      .slice(0, 3) // Take up to 3 senses to keep it clean
      .map(s => s.english_definitions.join(', '))
      .filter(Boolean);
      
    // Tags (e.g. JLPT level)
    const tags = item.jlpt || [];
    let jlpt = '';
    if (tags.length > 0) {
      const match = tags[0].match(/jlpt-n(\d)/);
      if (match) jlpt = `N${match[1]}`;
    }

    return {
      id: item.slug || Math.random().toString(),
      word: word,
      reading: reading,
      meanings: englishMeanings,
      jlpt: jlpt,
      isCommon: item.is_common || false,
    };
  });
};
