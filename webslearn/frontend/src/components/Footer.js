const Footer = () => {
  return (
    <footer className="bg-header text-white border-t border-custom">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xl font-bold text-accent">WebsLearn</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Nền tảng học tập trực tuyến hiện đại, mang đến trải nghiệm học tập tuyệt vời cho mọi người.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Liên kết</h4>
            <ul className="space-y-2">
              <li><a href="/courses" className="text-gray-300 hover:text-accent transition-colors">Khóa học</a></li>
              <li><a href="/entertainment" className="text-gray-300 hover:text-accent transition-colors">Giải trí</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-accent transition-colors">Về chúng tôi</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Liên hệ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: slearn@example.com</li>
              <li>Phone: +84 902 128 79</li>
              <li>Ho Chi Minh City, Viet Nam</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-custom mt-8 pt-6 text-center">
          <p className="text-gray-300">© 2025 WebsLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;