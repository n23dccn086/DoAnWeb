import Button from '../components/common/Button';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-primary">LinguaMind</h2>
        <p className="text-center text-gray-500 mb-6">Đăng nhập để bắt đầu học</p>
        <input type="email" placeholder="Email" className="w-full mb-3 p-3 border rounded-lg" />
        <input type="password" placeholder="Mật khẩu" className="w-full mb-4 p-3 border rounded-lg" />
        <Button variant="primary" className="w-full">Đăng nhập</Button>
        <p className="text-center text-sm mt-4">Chưa có tài khoản? <a href="#" className="text-primary">Đăng ký</a></p>
      </div>
    </div>
  );
}