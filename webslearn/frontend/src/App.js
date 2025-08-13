import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import AddCourse from './pages/AddCourse';
import AddLesson from './pages/AddLesson';
import CourseDetails from './pages/CourseDetails';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ManageLessons from './pages/ManageLessons';
import LearningPage from './pages/LearningPage';
import Entertainment from './pages/Entertainment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/add" element={<AddCourse />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        {/* Route để thêm bài ngay sau khi tạo khoá */}
        <Route path="/courses/:id/add-lesson" element={<AddLesson />} />
        {/* Route quản lý bài học (dành cho instructor) */}
        <Route path="/courses/:id/manage-lessons" element={<ManageLessons />} />
        {/* Route trang học (learning) cho student */}
        <Route path="/courses/:id/learn" element={<LearningPage />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/entertainment" element={<Entertainment />} />
      </Routes>
    </Router>
  );
}

export default App;
