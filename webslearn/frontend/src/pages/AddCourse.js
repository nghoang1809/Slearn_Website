import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [classCode, setClassCode] = useState('');
  const [description, setDescription] = useState('');
  const [maxStudents, setMaxStudents] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !classCode || !description || !maxStudents) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      const payload = {
        title,
        description,
        max_students: parseInt(maxStudents, 10),
        class_code: classCode
      };

      const res = await createCourse(payload);
      console.log('Create course response:', res.data);

      alert('Course created successfully!');

      // Đọc ID từ backend trả về
      const courseId = res.data.id || res.data.course?.id;
      if (courseId) {
        navigate(`/courses/${courseId}/add-lesson`);
      } else {
        navigate('/dashboard/teacher');
      }
    } catch (error) {
      console.error('Error creating course:', error);

      if (error.response) {
        alert(`Failed to create course: ${error.response.data.message || 'Server error'}`);
      } else {
        alert('Failed to create course. Please check your connection and try again.');
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label>Course Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label>Class Code</label>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label>Max Students</label>
            <input
              type="number"
              value={maxStudents}
              onChange={(e) => setMaxStudents(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-400 text-black px-4 py-2 rounded"
            >
              Create Course
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddCourse;
