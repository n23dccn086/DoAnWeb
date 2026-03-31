import QuizPlayer from '../components/quiz/QuizPlayer';

const sampleQuestions = [
  { id: 1, text: 'What is the past tense of "go"?', options: ['Goed', 'Went', 'Gone', 'Going'], correctAnswer: 'Went' },
  { id: 2, text: 'Choose the correct spelling:', options: ['Accommodate', 'Acommodate', 'Accomodate', 'Acommodate'], correctAnswer: 'Accommodate' },
];

export default function QuizPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Trắc nghiệm tiếng Anh</h1>
      <QuizPlayer questions={sampleQuestions} onComplete={(answers) => console.log(answers)} />
    </div>
  );
}