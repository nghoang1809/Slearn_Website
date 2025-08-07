
import { useState, useEffect } from 'react';
import { getEntertainment } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Entertainment = () => {
  const [entertainment, setEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntertainment = async () => {
      try {
        const response = await getEntertainment();
        setEntertainment(response.data);
      } catch (error) {
        console.error('Error fetching entertainment:', error);
        // Set default content if API fails
        setEntertainment([
          {
            id: 1,
            type: 'video',
            title: 'Big Buck Bunny',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'A fun animated short film'
          },
          {
            id: 2,
            type: 'news',
            title: 'Tech Education Trends 2025',
            content: 'Online learning continues to grow with AI integration.',
            date: '2025-01-15'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchEntertainment();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Entertainment & News</h1>
          <p className="text-gray-300">Take a break from learning with fun content and stay updated with the latest news.</p>
        </div>

        <div className="space-y-8">
          {/* Video Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              🎬 Featured Videos
            </h2>
            
            {entertainment.filter(e => e.type === 'video').length > 0 ? (
              <div className="space-y-4">
                {entertainment.filter(e => e.type === 'video').map((video) => (
                  <div key={video.id} className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                    <p className="text-gray-300 mb-3">{video.description}</p>
                    <video 
                      controls 
                      className="w-full max-w-2xl mx-auto rounded-lg"
                      poster="/logo192.png"
                    >
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No videos available at the moment.</p>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Educational animations</li>
                    <li>• Fun learning videos</li>
                    <li>• Student showcases</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* News Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              📰 Latest News
            </h2>
            
            {entertainment.filter(e => e.type === 'news').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entertainment.filter(e => e.type === 'news').map((news) => (
                  <div key={news.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{news.title}</h3>
                      {news.date && (
                        <span className="text-sm text-gray-400">
                          {new Date(news.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300">{news.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No news available at the moment.</p>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Stay Tuned</h3>
                  <p className="text-gray-300">We'll keep you updated with:</p>
                  <ul className="text-gray-300 space-y-1 mt-2">
                    <li>• Platform updates and new features</li>
                    <li>• Educational trends and insights</li>
                    <li>• Community highlights</li>
                  </ul>
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <p className="text-blue-200 text-sm">
                <span className="font-semibold">Disclaimer:</span> All content is for educational and entertainment purposes only.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Entertainment;
