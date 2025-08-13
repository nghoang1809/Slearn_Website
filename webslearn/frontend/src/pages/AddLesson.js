import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addLessonToCourse, uploadLessonFile } from '../services/api'; // Thêm import uploadLessonFile
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddLesson = () => {
  const { id: courseId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [file, setFile] = useState(null); // Thêm state cho file
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm state để disable button khi submit
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // Nếu có file, disable PDF URL để tránh conflict
    if (selectedFile) {
      setPdfUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Tiêu đề không được để trống');
      return;
    }
    if (!file && !pdfUrl.trim() && !youtubeUrl.trim()) {
      alert('Vui lòng thêm ít nhất một trong: file upload, PDF URL hoặc YouTube URL');
      return;
    }

    setIsSubmitting(true);
    try {
      if (file) {
        // Upload với file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title.trim());
        formData.append('description', description.trim());
        formData.append('youtube_url', youtubeUrl.trim() || '');
        await uploadLessonFile(courseId, formData);
      } else {
        // Thêm lesson với URL
        await addLessonToCourse(courseId, {
          title: title.trim(),
          description: description.trim(),
          pdf_url: pdfUrl.trim() || null,
          youtube_url: youtubeUrl.trim() || null
        });
      }
      alert('Thêm bài học thành công!');
      navigate(`/courses/${courseId}`);
    } catch (error) {
      console.error('Error adding lesson:', error);
      alert('Thêm bài học thất bại: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Thêm bài học cho khóa học</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label>Tiêu đề bài học *</label>
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
            <label>Upload File (PDF, DOC, DOCX, v.v.)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.mp4,.avi,.mov,.wmv,.jpg,.jpeg,.png,.gif"
              onChange={handleFileChange}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label>PDF URL (nếu không upload file)</label>
            <input
              type="text"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
              placeholder="https://..."
              disabled={!!file} // Disable nếu có file
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
            <button type="submit" disabled={isSubmitting} className="bg-teal-400 text-black px-4 py-2 rounded">
              {isSubmitting ? 'Đang thêm...' : 'Thêm bài học'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddLesson;