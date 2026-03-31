import { useState } from 'react';
import { generateFlashcards, generateQuiz } from '../services/aiService';

export function useAIGeneration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateFlashcardSet = async (topic) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateFlashcards(topic);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateQuizFromText = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateQuiz(text);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateFlashcardSet, generateQuizFromText, loading, error };
}