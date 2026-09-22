/**
 * Text-to-Speech Utility using Web Speech API
 */

export const playAudio = (text, lang = 'ja-JP') => {
  if (!window.speechSynthesis) {
    console.warn('SpeechSynthesis API is not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // Slightly slower for better clarity in learning

  // Try to find a high-quality Japanese voice if available
  const voices = window.speechSynthesis.getVoices();
  const jaVoices = voices.filter(v => v.lang.startsWith('ja'));
  
  if (jaVoices.length > 0) {
    // Prefer Google or native premium voices
    const premiumVoice = jaVoices.find(v => v.name.includes('Google') || v.name.includes('Premium'));
    utterance.voice = premiumVoice || jaVoices[0];
  }

  window.speechSynthesis.speak(utterance);
};
