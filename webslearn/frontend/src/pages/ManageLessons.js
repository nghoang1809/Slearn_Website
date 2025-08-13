// src/pages/ManageLessons.js
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getLessonsOfCourse, 
  addLessonToCourse, 
  uploadLessonFile, 
  updateLesson, 
  deleteLesson, 
  reorderLessons,
  deleteCourse
} from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ManageLessons = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newLesson, setNewLesson] = useState({ 
    title: '', 
    description: '', 
    pdf_url: '', 
    youtube_url: '', 
    file: null 
  });
  const [edit, setEdit] = useState(null);

  const loadLessons = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getLessonsOfCourse(courseId);
      setLessons(res.data || []);
    } catch (err) {
      console.error('Load lessons error:', err);
      setError('Không thể tải danh sách bài học.');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('File selected:', selectedFile);
    
    setNewLesson(prev => ({ 
      ...prev, 
      file: selectedFile || null, 
      pdf_url: selectedFile ? '' : prev.pdf_url // Clear PDF URL if file selected
    }));
  };

  const handleAddNewLesson = async (e) => {
    e.preventDefault();
    
    if (!newLesson.title.trim()) {
      alert('Tiêu đề không được để trống');
      return;
    }

    // Validate that either file or PDF URL or YouTube URL is provided
    if (!newLesson.file && !newLesson.pdf_url.trim() && !newLesson.youtube_url.trim()) {
      alert('Vui lòng thêm ít nhất một trong: file upload, PDF URL hoặc YouTube URL');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (newLesson.file) {
        // Upload file
        console.log('Uploading file:', newLesson.file);
        const formData = new FormData();
        formData.append('file', newLesson.file);
        formData.append('title', newLesson.title.trim());
        formData.append('description', newLesson.description.trim());
        formData.append('youtube_url', newLesson.youtube_url.trim() || '');
        
        // Log FormData content for debugging
        for (let pair of formData.entries()) {
          console.log('FormData:', pair[0], pair[1]);
        }
        
        const response = await uploadLessonFile(courseId, formData);
        console.log('Upload response:', response);
      } else {
        // Add lesson with URLs only
        console.log('Adding lesson with URLs');
        const lessonData = { 
          title: newLesson.title.trim(), 
          description: newLesson.description.trim(), 
          pdf_url: newLesson.pdf_url.trim() || null, 
          youtube_url: newLesson.youtube_url.trim() || null 
        };
        console.log('Lesson data:', lessonData);
        
        const response = await addLessonToCourse(courseId, lessonData);
        console.log('Add lesson response:', response);
      }
      
      // Reset form
      setNewLesson({ title: '', description: '', pdf_url: '', youtube_url: '', file: null });
      const fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = '';
      
      // Reload lessons
      await loadLessons();
      alert('Bài học đã được thêm thành công!');
      
    } catch (err) {
      console.error('Add lesson error:', err);
      console.error('Error response:', err.response?.data);
      
      let errorMessage = 'Thêm bài học thất bại';
      if (err.response?.data?.message) {
        errorMessage += ': ' + err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage += ': ' + err.response.data.error;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!edit.title.trim()) {
      alert('Tiêu đề không được để trống');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateLesson(edit.id, { 
        title: edit.title.trim(), 
        description: edit.description.trim(), 
        pdf_url: edit.pdf_url?.trim() || null, 
        youtube_url: edit.youtube_url?.trim() || null 
      });
      setEdit(null);
      await loadLessons();
      alert('Cập nhật bài học thành công!');
    } catch (err) {
      console.error('Update lesson error:', err);
      alert('Cập nhật thất bại: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLesson = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài học này?')) return;
    try {
      await deleteLesson(id);
      await loadLessons();
      alert('Xóa bài học thành công!');
    } catch (err) {
      console.error('Delete lesson error:', err);
      alert('Xóa thất bại: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleReorder = async (newList) => {
    const ids = newList.map(l => l.id);
    try {
      await reorderLessons(courseId, ids);
    } catch (err) {
      console.error('Reorder error:', err);
      alert('Lỗi khi sắp xếp lại. Tải lại trang để xem thứ tự chính xác.');
      loadLessons();
    }
  };

  const handleMove = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= lessons.length) return;
    const newList = [...lessons];
    const [movedItem] = newList.splice(fromIndex, 1);
    newList.splice(toIndex, 0, movedItem);
    setLessons(newList);
    handleReorder(newList);
  };

  const handleDeleteCourse = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa toàn bộ khóa học này?')) return;
    try {
      await deleteCourse(courseId);
      alert('Khóa học đã được xóa!');
      navigate('/dashboard/teacher');
    } catch (err) {
      console.error('Delete course error:', err);
      alert('Xóa khóa học thất bại: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="bg-main min-h-screen">
        <Header />
        <div className="container mx-auto p-8 text-center text-gray-300">Đang tải...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-main min-h-screen">
        <Header />
        <div className="container mx-auto p-8 text-center text-red-500">{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-main text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <button onClick={() => navigate(-1)} className="text-accent underline mb-4">
          ← Quay lại
        </button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quản lý bài học</h1>
          <button 
            onClick={handleDeleteCourse} 
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            Xóa khóa học
          </button>
        </div>

        {/* Form thêm bài học mới */}
        <form onSubmit={handleAddNewLesson} className="bg-card p-6 rounded-lg mb-8 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Thêm bài học mới</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tiêu đề bài học *</label>
            <input 
              type="text"
              placeholder="Nhập tiêu đề bài học" 
              value={newLesson.title} 
              onChange={e => setNewLesson(prev => ({ ...prev, title: e.target.value }))} 
              required 
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-accent focus:outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mô tả</label>
            <textarea 
              placeholder="Mô tả ngắn về bài học" 
              value={newLesson.description} 
              onChange={e => setNewLesson(prev => ({ ...prev, description: e.target.value }))} 
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-accent focus:outline-none" 
              rows={3} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload File</label>
            <input 
              id="file-input" 
              type="file" 
              accept=".pdf,.doc,.docx,.mp4,.avi,.mov,.wmv,.jpg,.jpeg,.png,.gif" 
              onChange={handleFileChange} 
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-header hover:file:bg-accent/80 border border-gray-700 rounded-lg" 
            />
            <p className="text-xs text-gray-500 mt-1">Hỗ trợ: PDF, DOC, DOCX, video (MP4, AVI, MOV, WMV), hình ảnh</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">PDF URL (nếu không upload file)</label>
            <input 
              type="url"
              placeholder="https://example.com/document.pdf" 
              value={newLesson.pdf_url} 
              disabled={!!newLesson.file} 
              onChange={e => setNewLesson(prev => ({ ...prev, pdf_url: e.target.value }))} 
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-accent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">YouTube URL</label>
            <input 
              type="url"
              placeholder="https://www.youtube.com/watch?v=..." 
              value={newLesson.youtube_url} 
              onChange={e => setNewLesson(prev => ({ ...prev, youtube_url: e.target.value }))} 
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-accent focus:outline-none" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="bg-accent hover:bg-accent/80 px-6 py-3 rounded-lg text-header font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Đang thêm...' : 'Thêm bài học'}
          </button>
        </form>

        {/* Danh sách bài học */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold mb-4">Danh sách bài học ({lessons.length})</h3>
          
          {lessons.length === 0 ? (
            <div className="bg-card p-8 rounded-lg text-center text-gray-400">
              <p>Chưa có bài học nào. Hãy thêm bài học đầu tiên!</p>
            </div>
          ) : (
            lessons.map((lesson, idx) => (
              <div key={lesson.id} className="bg-card p-4 rounded-lg flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-semibold text-lg mb-2">
                    {idx + 1}. {lesson.title}
                  </div>
                  {lesson.description && (
                    <div className="text-sm text-gray-400 mb-2">{lesson.description}</div>
                  )}
                  <div className="flex gap-4 text-xs text-gray-500">
                    {lesson.pdf_url && (
                      <span className="bg-blue-600 px-2 py-1 rounded">📄 PDF</span>
                    )}
                    {lesson.youtube_url && (
                      <span className="bg-red-600 px-2 py-1 rounded">▶️ Video</span>
                    )}
                    {lesson.file_url && (
                      <span className="bg-green-600 px-2 py-1 rounded">📎 File</span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <button 
                    onClick={() => handleMove(idx, idx - 1)} 
                    disabled={idx === 0} 
                    className="px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Di chuyển lên"
                  >
                    ↑
                  </button>
                  <button 
                    onClick={() => handleMove(idx, idx + 1)} 
                    disabled={idx === lessons.length - 1} 
                    className="px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Di chuyển xuống"
                  >
                    ↓
                  </button>
                  <button 
                    onClick={() => setEdit({ ...lesson })} 
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded transition-colors"
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDeleteLesson(lesson.id)} 
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal sửa bài học */}
      {edit && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-card text-white p-6 rounded-lg w-full max-w-md border border-custom max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Sửa bài học</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tiêu đề *</label>
                <input 
                  type="text"
                  value={edit.title} 
                  onChange={e => setEdit(prev => ({ ...prev, title: e.target.value }))} 
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-accent focus:outline-none" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Mô tả</label>
                <textarea 
                  value={edit.description || ''} 
                  onChange={e => setEdit(prev => ({ ...prev, description: e.target.value }))} 
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-accent focus:outline-none" 
                  rows={4} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">PDF URL</label>
                <input 
                  type="url"
                  value={edit.pdf_url || ''} 
                  onChange={e => setEdit(prev => ({ ...prev, pdf_url: e.target.value }))} 
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-accent focus:outline-none" 
                  placeholder="https://example.com/document.pdf" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">YouTube URL</label>
                <input 
                  type="url"
                  value={edit.youtube_url || ''} 
                  onChange={e => setEdit(prev => ({ ...prev, youtube_url: e.target.value }))} 
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-accent focus:outline-none" 
                  placeholder="https://www.youtube.com/watch?v=..." 
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setEdit(null)} 
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={handleSaveEdit} 
                disabled={isSubmitting} 
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ManageLessons;