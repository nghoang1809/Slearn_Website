import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-main text-white min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-header/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-accent">
              WebsLearn
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Nền tảng học tập trực tuyến hiện đại - Nâng cao trải nghiệm học tập với quản lý khóa học liền mạch
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/courses" 
                className="bg-accent hover:bg-accent/80 text-header px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Khám Phá Khóa Học
              </a>
              <a 
                href="/login" 
                className="bg-card hover:bg-gray-700 border border-custom hover:border-accent text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Trở Thành Giảng Viên
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Tính Năng Nổi Bật</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Khám phá những tính năng mạnh mẽ giúp bạn học tập và giảng dạy hiệu quả hơn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-card to-main p-8 rounded-xl border border-custom hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
              <div className="bg-accent/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Quản Lý Khóa Học</h3>
              <p className="text-gray-400">Tạo, quản lý và theo dõi tiến độ khóa học một cách dễ dàng và trực quan</p>
            </div>

            <div className="bg-gradient-to-br from-card to-main p-8 rounded-xl border border-custom hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
              <div className="bg-accent/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Quản Lý Học Viên</h3>
              <p className="text-gray-400">Theo dõi tiến độ học tập và tương tác với học viên một cách hiệu quả</p>
            </div>

            <div className="bg-gradient-to-br from-card to-main p-8 rounded-xl border border-custom hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
              <div className="bg-accent/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Thống Kê Chi Tiết</h3>
              <p className="text-gray-400">Phân tích dữ liệu học tập và báo cáo tiến độ một cách chi tiết</p>
            </div>

            <div className="bg-gradient-to-br from-card to-main p-8 rounded-xl border border-custom hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
              <div className="bg-success/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Responsive Design</h3>
              <p className="text-gray-400">Trải nghiệm mượt mà trên mọi thiết bị từ máy tính đến điện thoại</p>
            </div>

            <div className="bg-gradient-to-br from-card to-main p-8 rounded-xl border border-custom hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
              <div className="bg-accent/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Giải Trí & Thông Tin</h3>
              <p className="text-gray-400">Kết hợp học tập với giải trí và cập nhật tin tức giáo dục mới nhất</p>
            </div>

            <div className="bg-gradient-to-br from-card to-main p-8 rounded-xl border border-custom hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
              <div className="bg-danger/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Bảo Mật Cao</h3>
              <p className="text-gray-400">Hệ thống xác thực và bảo mật dữ liệu người dùng một cách an toàn</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-header">Sẵn Sàng Bắt Đầu?</h2>
          <p className="text-xl text-header/80 mb-8 max-w-2xl mx-auto">
            Tham gia cộng đồng học tập trực tuyến ngay hôm nay và khám phá hàng ngàn khóa học chất lượng
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register" 
              className="bg-header text-accent px-8 py-4 rounded-lg font-semibold text-lg hover:bg-header/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Đăng Ký Miễn Phí
            </a>
            <a 
              href="/courses" 
              className="bg-transparent border-2 border-header text-header px-8 py-4 rounded-lg font-semibold text-lg hover:bg-header hover:text-accent transition-colors"
            >
              Xem Khóa Học
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;