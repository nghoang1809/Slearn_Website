// src/pages/ManageLessons.js
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonsOfCourse, addLessonToCourse, uploadLessonFile, updateLesson, deleteLesson, reorderLessons } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ManageLessons = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newLesson, setNewLesson] = useState({ title: '', description: '', pdf_url: '', youtube_url: '', file: null });
  const [edit, setEdit] = useState(null);

  const loadLessons = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getLessonsOfCourse(courseId);
      setLessons(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Không thể tải danh sách bài học.');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  const handleFileChange = e => setNewLesson(prev => ({ ...prev, file: e.target.files[0] || null, pdf_url: '' }));

  const handleAddNewLesson = async (e) => {
    e.preventDefault();
    if (!newLesson.title.trim()) return alert('Tiêu đề không được để trống');
    setIsSubmitting(true);
    try {
      if (newLesson.file) {
        const fd = new FormData();
        fd.append('file', newLesson.file);
        fd.append('title', newLesson.title);
        fd.append('description', newLesson.description);
        fd.append('youtube_url', newLesson.youtube_url || '');
        await uploadLessonFile(courseId, fd);
      } else {
        await addLessonToCourse(courseId, { title: newLesson.title, description: newLesson.description, pdf_url: newLesson.pdf_url || null, youtube_url: newLesson.youtube_url || null });
      }
      setNewLesson({ title: '', description: '', pdf_url: '', youtube_url: '', file: null });
      document.getElementById('file-input').value = ''; // Reset file input
      await loadLessons();
    } catch (err) {
      console.error(err);
      alert('Thêm bài học thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveEdit = async () => {
    setIsSubmitting(true);
    try {
      await updateLesson(edit.id, { title: edit.title, description: edit.description, pdf_url: edit.pdf_url || null, youtube_url: edit.youtube_url || null });
      setEdit(null);
      await loadLessons();
    } catch (err) {
      console.error(err);
      alert('Cập nhật thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài học này?')) return;
    try {
      await deleteLesson(id);
      await loadLessons();
    } catch (err) {
      console.error(err);
      alert('Xóa thất bại');
    }
  };
  
  const handleReorder = async (newList) => {
    const ids = newList.map(l => l.id);
    try {
      await reorderLessons(courseId, ids);
    } catch (err) {
      console.error(err);
      alert('Lỗi khi sắp xếp lại. Tải lại trang để xem thứ tự chính xác.');
      loadLessons(); // Tải lại để khôi phục thứ tự cũ nếu lỗi
    }
  };

  const handleMove = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= lessons.length) return;
    const newList = [...lessons];
    const [movedItem] = newList.splice(fromIndex, 1);
    newList.splice(toIndex, 0, movedItem);
    setLessons(newList);
    handleReorder(newList); // Gọi API để lưu thứ tự mới
  };

  if (loading) return <div className="bg-main min-h-screen"><Header /><div className="container mx-auto p-8 text-center text-gray-300">Đang tải...</div><Footer /></div>;
  if (error) return <div className="bg-main min-h-screen"><Header /><div className="container mx-auto p-8 text-center text-red-500">{error}</div><Footer /></div>;

  return (
    <div className="bg-main text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <button onClick={() => navigate(-1)} className="text-accent underline mb-4">← Quay lại</button>
        <h1 className="text-3xl font-bold mb-6">Quản lý bài học</h1>

        {/* Form thêm bài mới */}
        <form onSubmit={handleAddNewLesson} className="bg-card p-6 rounded-lg mb-8 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Thêm bài học mới</h2>
          <input placeholder="Tiêu đề bài học (*)" value={newLesson.title} onChange={e => setNewLesson(prev => ({ ...prev, title: e.target.value }))} required className="w-full p-2 bg-gray-800 rounded" />
          <textarea placeholder="Mô tả ngắn" value={newLesson.description} onChange={e => setNewLesson(prev => ({ ...prev, description: e.target.value }))} className="w-full p-2 bg-gray-800 rounded" rows={3} />
          <input id="file-input" type="file" accept=".pdf,.doc,.docx,video/*,image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-header hover:file:bg-accent/80" />
          <input placeholder="Hoặc dán URL file PDF" value={newLesson.pdf_url} disabled={!!newLesson.file} onChange={e => setNewLesson(prev => ({ ...prev, pdf_url: e.target.value }))} className="w-full p-2 bg-gray-800 rounded disabled:opacity-50" />
          <input placeholder="URL YouTube" value={newLesson.youtube_url} onChange={e => setNewLesson(prev => ({ ...prev, youtube_url: e.target.value }))} className="w-full p-2 bg-gray-800 rounded" />
          <button type="submit" disabled={isSubmitting} className="bg-accent px-6 py-2 rounded-lg text-header font-semibold disabled:opacity-50">
            {isSubmitting ? 'Đang thêm...' : 'Thêm bài học'}
          </button>
        </form>

        {/* Danh sách bài học */}
        <div className="space-y-3">
          {lessons.map((l, idx) => (
            <div key={l.id} className="bg-card p-4 rounded-lg flex justify-between items-start">
              <div>
                <div className="font-semibold text-lg">{idx + 1}. {l.title}</div>
                <div className="text-sm text-gray-400">{l.description}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleMove(idx, idx - 1)} disabled={idx === 0} className="px-2 py-1 bg-gray-600 rounded disabled:opacity-30">↑</button>
                <button onClick={() => handleMove(idx, idx + 1)} disabled={idx === lessons.length - 1} className="px-2 py-1 bg-gray-600 rounded disabled:opacity-30">↓</button>
                <button onClick={() => setEdit({ ...l })} className="px-3 py-1 bg-yellow-500 rounded">Sửa</button>
                <button onClick={() => handleDelete(l.id)} className="px-3 py-1 bg-red-600 rounded">Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal sửa bài học */}
      {edit && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-card text-white p-6 rounded-lg w-full max-w-md border border-custom">
            <h3 className="text-xl font-semibold mb-4">Sửa bài học</h3>
            <div className="space-y-3">
                <input value={edit.title} onChange={e => setEdit(prev => ({ ...prev, title: e.target.value }))} className="w-full p-2 bg-gray-800 rounded" />
                <textarea value={edit.description} onChange={e => setEdit(prev => ({ ...prev, description: e.target.value }))} className="w-full p-2 bg-gray-800 rounded" rows={4} />
                <input value={edit.pdf_url || ''} onChange={e => setEdit(prev => ({ ...prev, pdf_url: e.target.value }))} className="w-full p-2 bg-gray-800 rounded" placeholder="PDF URL" />
                <input value={edit.youtube_url || ''} onChange={e => setEdit(prev => ({ ...prev, youtube_url: e.target.value }))} className="w-full p-2 bg-gray-800 rounded" placeholder="YouTube URL" />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setEdit(null)} className="px-4 py-2 bg-gray-600 rounded-lg">Hủy</button>
              <button onClick={handleSaveEdit} disabled={isSubmitting} className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50">
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
