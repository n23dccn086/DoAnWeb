import { createContext, useState, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useLocalStorage('quizzes', []);
  const [quizResults, setQuizResults] = useLocalStorage('quiz-results', []);

  const addQuiz = (quiz) => setQuizzes([...quizzes, { ...quiz, id: Date.now(), createdAt: new Date() }]);
  const saveResult = (quizId, score, total, answers) => {
    setQuizResults([...quizResults, { quizId, score, total, answers, date: new Date() }]);
  };

  return (
    <QuizContext.Provider value={{ quizzes, quizResults, addQuiz, saveResult }}>
      {children}
    </QuizContext.Provider>
  );
};