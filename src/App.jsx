import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FlashcardProvider } from './context/FlashcardContext';
import { QuizProvider } from './context/QuizContext';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Dashboard from './pages/Dashboard';
import FlashcardPage from './pages/FlashcardPage';
import QuizPage from './pages/QuizPage';
import AIPage from './pages/AIPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

function App() {
  // Giả sử đã đăng nhập để demo (bỏ qua xác thực)
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <AuthProvider>
      <FlashcardProvider>
        <QuizProvider>
          <Router>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/flashcards" element={<FlashcardPage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/ai" element={<AIPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
              </div>
            </div>
          </Router>
        </QuizProvider>
      </FlashcardProvider>
    </AuthProvider>
  );
}

export default App;