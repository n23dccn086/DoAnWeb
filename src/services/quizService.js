import api from './api';

export const getQuizzes = () => api.get('/quizzes');
export const getQuiz = (id) => api.get(`/quizzes/${id}`);
export const createQuiz = (data) => api.post('/quizzes', data);
export const submitQuiz = (quizId, answers) => api.post(`/quizzes/${quizId}/submit`, { answers });