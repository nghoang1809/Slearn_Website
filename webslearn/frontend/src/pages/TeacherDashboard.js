import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInstructorCourses } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'instructor') {
          navigate('/login');
          return;
        }
        
        const response = await getInstructorCourses();
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [navigate]);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Bảng Điều Khiển Giảng Viên
              </h1>
              <p className="text-gray-300 text-lg">Chào mừng trở lại! Quản lý khóa học và học viên của bạn tại đây.</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-teal-400">{courses.length}</p>
                <p className="text-gray-400 text-sm">Khóa học</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/courses/add')} 
              className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tạo Khóa Học Mới
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Thống Kê
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Khóa Học Của Bạn ({courses.length})
          </h2>
        </div>

        {courses.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-12 text-center border border-gray-700">
            <div className="mb-6">
              <svg className="w-20 h-20 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Chưa có khóa học nào</h3>
            <p className="text-gray-400 mb-6 text-lg">Hãy tạo khóa học đầu tiên của bạn để bắt đầu!</p>
            <button 
              onClick={() => navigate('/courses/add')} 
              className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-black px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Tạo Khóa Học Ngay
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:from-gray-750 hover:to-gray-800 transition-all duration-300 border border-gray-700 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/20">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-teal-500/20 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                    Đang hoạt động
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white line-clamp-2">{course.title}</h3>
                <p className="text-gray-400 mb-4 text-sm line-clamp-3">{course.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">ID Khóa học:</span>
                    <span className="text-gray-300 font-mono">#{course.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Số học viên tối đa:</span>
                    <span className="text-teal-400 font-semibold">{course.max_students}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ngày tạo:</span>
                    <span className="text-gray-300">{new Date(course.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 border-t border-gray-700 pt-4">
                  <button 
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="flex-1 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Xem
                  </button>
                  <button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    QL HV
                  </button>
                  <button className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Sửa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TeacherDashboard;