import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addLessonToCourse } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddLesson = () => {
  const { id: courseId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLessonToCourse(courseId, {
        title,
        description,
        pdf_url: pdfUrl,
        youtube_url: youtubeUrl
      });
      alert('Thêm bài học thành công!');
      navigate(`/courses/${courseId}`);
    } catch (error) {
      alert('Thêm bài học thất bại!');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Thêm bài học cho khóa học</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label>Tiêu đề bài học</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
          <div>
            <label>Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label>PDF URL</label>
            <input
              type="text"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
              placeholder="https://..."
            />
          </div>
          <div>
            <label>Youtube URL</label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
              placeholder="https://youtube.com/..."
            />
          </div>
          <div className="space-x-4">
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-600 px-4 py-2 rounded">
              Quay lại
            </button>
            <button type="submit" className="bg-teal-400 text-black px-4 py-2 rounded">Thêm bài học</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddLesson;