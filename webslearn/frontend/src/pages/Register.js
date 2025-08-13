import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear specific error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Họ và tên không được để trống';
    } else if (formData.username.length < 2) {
      newErrors.username = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { confirmPassword, ...submitData } = formData;
      await register(submitData);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMsg = error.response?.data?.error || 'Đăng ký thất bại. Vui lòng thử lại.';
      setErrors({ general: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-main flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-header/10"></div>
      
      <div className="relative max-w-md w-full space-y-8">
        <div className="bg-card p-8 rounded-xl shadow-2xl border border-custom">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Đăng Ký</h2>
            <p className="text-gray-400">Tạo tài khoản để bắt đầu học tập với WebsLearn</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="bg-danger/20 border border-danger text-danger px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Họ và tên
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className={`bg-main border ${errors.username ? 'border-danger' : 'border-custom'} text-white pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
                {errors.username && (
                  <p className="text-danger text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-main border ${errors.email ? 'border-danger' : 'border-custom'} text-white pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                    placeholder="Nhập email của bạn"
                  />
                </div>
                {errors.email && (
                  <p className="text-danger text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-main border ${errors.password ? 'border-danger' : 'border-custom'} text-white pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                    placeholder="Tối thiểu 6 ký tự"
                  />
                </div>
                {errors.password && (
                  <p className="text-danger text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`bg-main border ${errors.confirmPassword ? 'border-danger' : 'border-custom'} text-white pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-danger text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                  Vai trò
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="bg-main border border-custom text-white pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  >
                    <option value="student">Học viên</option>
                    <option value="instructor">Giảng viên</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-header bg-accent hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang đăng ký...
                  </div>
                ) : (
                  'Đăng Ký'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-400">
                Đã có tài khoản?{' '}
                <Link to="/login" className="font-medium text-accent hover:text-accent/80 transition-colors">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center text-sm text-gray-400">
          Bằng việc đăng ký, bạn đồng ý với{' '}
          <a href="mailto:support@webslearn.com" className="text-accent hover:text-accent/80 transition-colors">
            Điều khoản sử dụng
          </a>{' '}
          và{' '}
          <a href="mailto:support@webslearn.com" className="text-accent hover:text-accent/80 transition-colors">
            Chính sách bảo mật
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;