// Thuật toán SM-2 đơn giản cho spaced repetition
export function calculateNextReview(difficulty, currentInterval, currentEaseFactor) {
  let easeFactor = currentEaseFactor;
  let interval = currentInterval;

  if (difficulty === 'easy') {
    easeFactor += 0.1;
    if (interval === 0) interval = 1;
    else if (interval === 1) interval = 3;
    else interval = Math.round(interval * easeFactor);
  } else if (difficulty === 'medium') {
    // giữ nguyên interval
    if (interval === 0) interval = 1;
    else if (interval === 1) interval = 2;
    else interval = Math.round(interval * easeFactor * 0.8);
  } else if (difficulty === 'hard') {
    easeFactor -= 0.2;
    interval = Math.max(1, Math.round(interval * 0.5));
  }

  easeFactor = Math.max(1.3, easeFactor);
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return { interval, easeFactor, nextReviewDate };
}