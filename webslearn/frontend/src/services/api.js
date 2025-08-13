import axios from 'axios';

// Địa chỉ API
const API_URL = 'http://localhost:5000/api'; // Đảm bảo đúng địa chỉ và port

// Tạo instance axios với base URL
const api = axios.create({
  baseURL: API_URL,
});

// Thêm interceptor để tự động gắn token vào header nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============ AUTHENTICATION ============
export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);
export const getProfile = () => api.get('/profile');

// ============ COURSES ============
export const getCourses = () => api.get('/courses');
export const createCourse = (data) => api.post('/courses', data);
export const getCourseDetails = (id) => api.get(`/courses/${id}`);
export const getInstructorCourses = () => api.get('/instructor/courses');
export const getStudentCourses = () => api.get('/student/courses');
export const deleteCourse = (courseId) => api.delete(`/courses/${courseId}`);

// ============ ENROLLMENTS ============
export const enrollCourse = (courseId) =>
  api.post('/enrollments', { course_id: courseId });

// ============ ENTERTAINMENT ============
export const getEntertainment = () => api.get('/entertainment');

// ============ LESSONS ============
export const addLessonToCourse = (courseId, data) =>
  api.post(`/courses/${courseId}/lessons`, data);

export const getLessonsOfCourse = (courseId) =>
  api.get(`/courses/${courseId}/lessons`);

export const uploadLessonFile = (courseId, formData) =>
  api.post(`/courses/${courseId}/lessons/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateLesson = (lessonId, data) =>
  api.put(`/lessons/${lessonId}`, data);

export const deleteLesson = (lessonId) =>
  api.delete(`/lessons/${lessonId}`);

export const reorderLessons = (courseId, lessonIds) =>
  api.post(`/courses/${courseId}/lessons/reorder`, { lessons: lessonIds });


// ============ VIDEOS ============
export const addVideoToCourse = (courseId, data) =>
  api.post(`/courses/${courseId}/videos`, data);

export default api;
