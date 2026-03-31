import api from './api';

export const getDecks = () => api.get('/flashcards/decks');
export const getDeck = (id) => api.get(`/flashcards/decks/${id}`);
export const createDeck = (data) => api.post('/flashcards/decks', data);
export const updateDeck = (id, data) => api.put(`/flashcards/decks/${id}`, data);
export const deleteDeck = (id) => api.delete(`/flashcards/decks/${id}`);
export const recordCardReview = (cardId, difficulty) => api.post('/flashcards/review', { cardId, difficulty });