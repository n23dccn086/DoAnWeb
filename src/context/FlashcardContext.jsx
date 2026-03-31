import { createContext, useState, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FlashcardContext = createContext();

export const useFlashcard = () => useContext(FlashcardContext);

export const FlashcardProvider = ({ children }) => {
  const [decks, setDecks] = useLocalStorage('flashcard-decks', []);
  const [currentDeck, setCurrentDeck] = useState(null);

  const addDeck = (deck) => setDecks([...decks, { ...deck, id: Date.now(), createdAt: new Date() }]);
  const updateDeck = (id, updated) => setDecks(decks.map(d => d.id === id ? { ...d, ...updated } : d));
  const deleteDeck = (id) => setDecks(decks.filter(d => d.id !== id));

  return (
    <FlashcardContext.Provider value={{ decks, currentDeck, setCurrentDeck, addDeck, updateDeck, deleteDeck }}>
      {children}
    </FlashcardContext.Provider>
  );
};