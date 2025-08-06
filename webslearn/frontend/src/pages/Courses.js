import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="bg-main text-white min-h-screen">
      <Header />
      <main className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-accent">Khóa Học</h1>
          <p className="text-gray-300 text-lg">Khám phá các khóa học chất lượng cao được thiết kế dành cho bạn</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-gradient-to-br from-card to-main p-6 rounded-xl border border-custom hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
              <div className="mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-white">{course.title}</h2>
                <p className="text-gray-400 mb-4 line-clamp-3">{course.description}</p>
              </div>
              
              <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                <span>Miễn phí</span>
                <span>⭐ 4.8 (120 đánh giá)</span>
              </div>
              
              <button
                onClick={() => handleEnroll(course.id)}
                className="w-full bg-accent hover:bg-accent/80 text-header px-4 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Xem Chi Tiết
              </button>
            </div>
          ))}
        </div>
        
        {courses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Chưa có khóa học nào</h3>
            <p className="text-gray-400 mb-6">Các khóa học sẽ được cập nhật sớm</p>
            <button className="bg-accent hover:bg-accent/80 text-header px-6 py-3 rounded-lg font-semibold transition-all duration-200">
              Thông báo khi có khóa học mới
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Courses;