import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Layers, FileQuestion, Bot, User, GraduationCap } from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Tổng quan' },
  { path: '/flashcards', icon: Layers, label: 'Flashcard' },
  { path: '/quiz', icon: FileQuestion, label: 'Trắc nghiệm' },
  { path: '/ai', icon: Bot, label: 'AI Trợ lý' },
  { path: '/profile', icon: User, label: 'Hồ sơ' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-5 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
        <GraduationCap className="w-8 h-8 text-primary" />
        <span className="font-bold text-xl text-primary">LinguaMind</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500">
        <p>© 2025 LinguaMind</p>
        <p>Phiên bản 1.0</p>
      </div>
    </aside>
  );
}