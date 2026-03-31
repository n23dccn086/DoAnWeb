export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

export const REVIEW_INTERVALS = {
  [DIFFICULTY_LEVELS.EASY]: [1, 3, 7, 14, 30, 60],
  [DIFFICULTY_LEVELS.MEDIUM]: [1, 2, 4, 7, 14, 28],
  [DIFFICULTY_LEVELS.HARD]: [0, 1, 2, 4, 7, 14]
};

export const APP_NAME = 'LinguaMind';
export const DEFAULT_AVATAR = '/default-avatar.png';