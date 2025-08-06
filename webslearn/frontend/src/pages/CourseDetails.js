import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseDetails, enrollCourse, getLessonsOfCourse } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseDetails(id);
        setCourse(response.data);
        const lessonsRes = await getLessonsOfCourse(id);
        setLessons(lessonsRes.data);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Không thể tải thông tin khóa học');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    setError('');
    try {
      await enrollCourse(parseInt(id));
      alert('Đăng ký khóa học thành công!');
      navigate('/dashboard/student');
    } catch (error) {
      console.error('Error enrolling:', error);
      setError('Đăng ký thất bại. Bạn có thể đã đăng ký khóa học này rồi.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return (
    <div className="bg-main min-h-screen">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-300">Đang tải thông tin khóa học...</p>
        </div>
      </div>
    </div>
  );

  if (error && !course) return (
    <div className="bg-main min-h-screen">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="bg-danger/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-300 text-lg mb-4">{error}</p>
          <button 
            onClick={() => navigate('/courses')}
            className="bg-accent hover:bg-accent/80 text-header px-6 py-2 rounded-lg transition-colors"
          >
            Về trang khóa học
          </button>
        </div>
      </div>
    </div>
  );

  if (!course) return null;

  return (
    <div className="bg-main text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại danh sách khóa học
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-card to-main rounded-xl p-8 shadow-xl border border-custom">
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4 text-accent">
                  {course.title}
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-accent/20 rounded-lg p-4 text-center">
                  <div className="text-accent text-2xl font-bold">
                    {course.max_students}
                  </div>
                  <div className="text-gray-400 text-sm">Số học viên tối đa</div>
                </div>
                <div className="bg-accent/20 rounded-lg p-4 text-center">
                  <div className="text-accent text-2xl font-bold">12</div>
                  <div className="text-gray-400 text-sm">Bài học</div>
                </div>
                <div className="bg-success/20 rounded-lg p-4 text-center">
                  <div className="text-success text-2xl font-bold">4.8</div>
                  <div className="text-gray-400 text-sm">Đánh giá</div>
                </div>
                <div className="bg-accent/20 rounded-lg p-4 text-center">
                  <div className="text-accent text-2xl font-bold">8h</div>
                  <div className="text-gray-400 text-sm">Tổng thời gian</div>
                </div>
              </div>

              {/* Course Content */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Nội dung khóa học
                </h2>
                <div className="space-y-3">
                  {lessons.length === 0 ? (
                    <div className="text-gray-400">Chưa có bài học nào cho khóa học này.</div>
                  ) : (
                    lessons.map((lesson, idx) => (
                      <div key={lesson.id} className="bg-main/50 rounded-lg p-4 flex flex-col gap-2">
                        <h3 className="font-medium text-white">{lesson.title}</h3>
                        <p className="text-gray-400 text-sm">{lesson.description}</p>
                        {lesson.pdf_url && (
                          <a href={lesson.pdf_url} target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm">
                            Xem tài liệu PDF
                          </a>
                        )}
                        {lesson.youtube_url && (
                          <a href={lesson.youtube_url} target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm">
                            Xem video Youtube
                          </a>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-card to-main rounded-xl p-6 shadow-xl border border-custom sticky top-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {course.instructor_name || 'Chưa xác định'}
                </h3>
                <p className="text-gray-400">Giảng viên</p>
              </div>

              {error && (
                <div className="bg-danger/20 border border-danger text-danger px-4 py-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <button 
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-accent hover:bg-accent/80 text-header px-6 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2"
              >
                {enrolling ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang đăng ký...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Đăng ký khóa học
                  </>
                )}
              </button>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-custom">
                  <span className="text-gray-400">Miễn phí</span>
                  <span className="text-accent font-semibold">0 VND</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-custom">
                  <span className="text-gray-400">Cấp độ</span>
                  <span className="text-white">Cơ bản</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-custom">
                  <span className="text-gray-400">Ngôn ngữ</span>
                  <span className="text-white">Tiếng Việt</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-400">Chứng chỉ</span>
                  <span className="text-success">✓ Có</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-custom">
                <h4 className="font-semibold mb-3 text-white">Bạn sẽ học được:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Nắm vững kiến thức cơ bản
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Áp dụng vào thực tế
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Hoàn thành các dự án
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Nhận chứng chỉ hoàn thành
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;