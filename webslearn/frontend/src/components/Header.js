import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'instructor') {
      return '/dashboard/teacher';
    } else if (user?.role === 'student') {
      return '/dashboard/student';
    }
    return '/login';
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, className = '' }) => (
    <Link
      to={to}
      className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${
        isActiveLink(to)
          ? 'bg-accent/20 text-accent border border-accent/50'
          : 'text-gray-300 hover:text-white hover:bg-card/50'
      } ${className}`}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-header backdrop-blur-sm text-white border-b border-custom sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-bold text-accent">
              WebsLearn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Trang chủ</NavLink>
            <NavLink to="/courses">Khóa học</NavLink>
            <NavLink to="/entertainment">Giải trí</NavLink>
            
            {user ? (
              <>
                <NavLink to={getDashboardLink()}>
                  Dashboard
                </NavLink>
                <div className="flex items-center ml-4 space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-header">
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-300 hidden lg:inline">
                      Xin chào, {user.username}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white hover:bg-card/50 px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center ml-4 space-x-2">
                <NavLink to="/login">Đăng nhập</NavLink>
                <Link
                  to="/register"
                  className="bg-accent hover:bg-accent/80 text-header px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-custom">
            <nav className="flex flex-col space-y-2">
              <NavLink to="/" className="block">Trang chủ</NavLink>
              <NavLink to="/courses" className="block">Khóa học</NavLink>
              <NavLink to="/entertainment" className="block">Giải trí</NavLink>
              
              {user ? (
                <>
                  <NavLink to={getDashboardLink()} className="block">
                    Dashboard
                  </NavLink>
                  <div className="pt-2 border-t border-custom">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-header">
                          {user.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-300">
                        Xin chào, {user.username}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left text-gray-300 hover:text-white hover:bg-card/50 px-3 py-2 rounded-lg transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-2 border-t border-custom space-y-2">
                  <NavLink to="/login" className="block">Đăng nhập</NavLink>
                  <Link
                    to="/register"
                    className="block bg-accent hover:bg-accent/80 text-header px-3 py-2 rounded-lg font-medium transition-all duration-200 text-center"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;