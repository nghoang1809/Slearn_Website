const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set in .env file');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'webslearn',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Kiểm tra kết nối DB khi khởi động
db.getConnection()
  .then(conn => {
    console.log('Database connected');
    conn.release();
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token required' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Đăng ký
app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Kiểm tra email đã tồn tại
    const [users] = await db.query('SELECT id FROM Users WHERE email = ?', [email]);
    if (users.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    await db.query('INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)', 
      [username, email, hashedPassword, role]);
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).json({ message: 'Error registering' });
  }
});

// Đăng nhập
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    const user = users[0];

    // Thêm log để debug
    console.log('Login attempt:', email);
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('User found:', user);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Tạo khóa học
app.post('/api/courses', authenticateToken, async (req, res) => {
  if (req.user.role !== 'instructor') return res.status(403).json({ message: 'Access denied' });
  const { title, description, max_students, class_code } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Courses (title, description, instructor_id, max_students, class_code) VALUES (?, ?, ?, ?, ?)',
      [title, description, req.user.id, max_students, class_code]
    );
    // Trả về id của khóa học mới tạo
    res.status(201).json({ message: 'Course created', id: result.insertId });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Error creating course' });
  }
});

// Lấy danh sách khóa học
app.get('/api/courses', async (req, res) => {
  try {
    const [courses] = await db.query(`
      SELECT c.*, u.username as instructor_name 
      FROM Courses c 
      JOIN Users u ON c.instructor_id = u.id
    `);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Lấy chi tiết khóa học
app.get('/api/courses/:id', async (req, res) => {
  try {
    const [courses] = await db.query(`
      SELECT c.*, u.username as instructor_name 
      FROM Courses c 
      JOIN Users u ON c.instructor_id = u.id 
      WHERE c.id = ?
    `, [req.params.id]);
    
    if (courses.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(courses[0]);
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ message: 'Error fetching course details' });
  }
});

// Lấy khóa học của giáo viên
app.get('/api/instructor/courses', authenticateToken, async (req, res) => {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  try {
    const [courses] = await db.query(
      'SELECT * FROM Courses WHERE instructor_id = ?', 
      [req.user.id]
    );
    res.json(courses);
  } catch (error) {
    console.error('Error fetching instructor courses:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Lấy khóa học đã đăng ký của sinh viên
app.get('/api/student/courses', authenticateToken, async (req, res) => {
  try {
    const [courses] = await db.query(`
      SELECT c.*, e.enrolled_at, u.username as instructor_name
      FROM Courses c 
      JOIN Enrollments e ON c.id = e.course_id 
      JOIN Users u ON c.instructor_id = u.id
      WHERE e.user_id = ?
    `, [req.user.id]);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching student courses:', error);
    res.status(500).json({ message: 'Error fetching enrolled courses' });
  }
});

// Đăng ký khóa học
app.post('/api/enrollments', authenticateToken, async (req, res) => {
  const { course_id } = req.body;
  try {
    // Kiểm tra xem đã đăng ký chưa
    const [existing] = await db.query(
      'SELECT * FROM Enrollments WHERE user_id = ? AND course_id = ?', 
      [req.user.id, course_id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    await db.query(
      'INSERT INTO Enrollments (user_id, course_id) VALUES (?, ?)', 
      [req.user.id, course_id]
    );
    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling:', error);
    res.status(500).json({ message: 'Error enrolling in course' });
  }
});

// Entertainment endpoints
app.get('/api/entertainment', async (req, res) => {
  try {
    // Mock entertainment data - in real app, this would come from database
    const entertainmentData = [
      {
        id: 1,
        type: 'video',
        title: 'Big Buck Bunny',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'A fun animated short film'
      },
      {
        id: 2,
        type: 'video',
        title: 'Elephants Dream',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description: 'Another great animated short'
      },
      {
        id: 3,
        type: 'news',
        title: 'Tech Education Trends 2025',
        content: 'Online learning continues to grow with AI integration and personalized learning paths.',
        date: '2025-01-15'
      },
      {
        id: 4,
        type: 'news',
        title: 'Remote Learning Best Practices',
        content: 'New studies show that interactive content improves student engagement by 40%.',
        date: '2025-01-10'
      }
    ];
    
    res.json(entertainmentData);
  } catch (error) {
    console.error('Error fetching entertainment:', error);
    res.status(500).json({ message: 'Error fetching entertainment content' });
  }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, username, email, role FROM Users WHERE id = ?', 
      [req.user.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(users[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Thêm bài học (PDF/Youtube) cho khóa học
app.post('/api/courses/:id/lessons', authenticateToken, async (req, res) => {
  if (req.user.role !== 'instructor') return res.status(403).json({ message: 'Access denied' });
  const courseId = req.params.id;
  const { title, description, pdf_url, youtube_url } = req.body;
  try {
    await db.query(
      'INSERT INTO Lesson (course_id, title, description, pdf_url, youtube_url) VALUES (?, ?, ?, ?, ?)',
      [courseId, title, description, pdf_url, youtube_url]
    );
    res.status(201).json({ message: 'Lesson added to course' });
  } catch (error) {
    console.error('Error adding lesson:', error);
    res.status(500).json({ message: 'Error adding lesson to course' });
  }
});

// Lấy danh sách bài học của khóa học
app.get('/api/courses/:id/lessons', async (req, res) => {
  const courseId = req.params.id;
  try {
    const [lessons] = await db.query(
      'SELECT * FROM Lesson WHERE course_id = ? ORDER BY id ASC',
      [courseId]
    );
    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ message: 'Error fetching lessons' });
  }
});

// Route mặc định cho GET /
app.get('/', (req, res) => {
  res.send('WebsLearn backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));