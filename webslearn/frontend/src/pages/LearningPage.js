// src/pages/LearningPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLessonsOfCourse, getCourseDetails } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LearningPage = () => {
  const { id: courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [cRes, lRes] = await Promise.all([getCourseDetails(courseId), getLessonsOfCourse(courseId)]);
        setCourse(cRes.data);
        setLessons(lRes.data || []);
        if (lRes.data && lRes.data.length) setSelected(lRes.data[0]);
      } catch (err) { console.error(err); }
    })();
  }, [courseId]);

  return (
    <div className="bg-main text-white min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 container mx-auto px-6 py-8 gap-6">
        <aside className="w-72 bg-card p-4 rounded overflow-y-auto">
          <h3 className="font-semibold mb-3">{course?.title || 'Khóa học'}</h3>
          <ul className="space-y-2">
            {lessons.map(l => (
              <li key={l.id}>
                {/* Sửa lỗi cú pháp tại đây */}
                <button onClick={() => setSelected(l)} className={`w-full text-left p-2 rounded ${selected?.id === l.id ? 'bg-accent text-black' : 'hover:bg-accent/20'}`}>{l.title}</button>
              </li>
            ))}
          </ul>
          {/* Sửa lỗi cú pháp tại đây */}
          <Link to={`/courses/${courseId}`} className="block mt-4 text-accent underline">← Quay lại chi tiết khóa</Link>
        </aside>

        <section className="flex-1 bg-card p-6 rounded overflow-y-auto">
          {selected ? (
            <div>
              <h2 className="text-2xl font-bold mb-3">{selected.title}</h2>
              {selected.description && <p className="mb-4">{selected.description}</p>}

              {/* YouTube embed */}
              {selected.youtube_url && (() => {
                const m = selected.youtube_url.match(/[?&]v=([^&]+)/) || selected.youtube_url.match(/youtu\.be\/([^?&]+)/);
                const id = m ? m[1] : null;
                return id ? <iframe src={`https://www.youtube.com/embed/${id}`} className="w-full aspect-video mb-4" title={selected.title} allowFullScreen /> : <a href={selected.youtube_url} className="text-accent underline">{selected.youtube_url}</a>;
              })()}

              {/* File/pdf */}
              {selected.file_url?.endsWith('.pdf') ? <iframe src={selected.file_url} title={selected.title} className="w-full h-[600px] mb-4" style={{border:0}} /> : selected.file_url ? <a href={selected.file_url} target="_blank" rel="noreferrer" className="text-accent underline">Tải file</a> : selected.pdf_url?.endsWith('.pdf') ? <iframe src={selected.pdf_url} title={selected.title} className="w-full h-[600px] mb-4" style={{border:0}} /> : selected.pdf_url ? <a href={selected.pdf_url} target="_blank" rel="noreferrer" className="text-accent underline">Xem tài liệu</a> : <p className="text-gray-400">Không có nội dung để hiển thị.</p>}
            </div>
          ) : <p className="text-gray-400">Chưa có bài học để hiển thị.</p>}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default LearningPage;