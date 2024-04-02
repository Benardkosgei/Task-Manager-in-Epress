const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User'); // Import User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const session = require('express-session'); // Import express-session for session management

// Home Page Route
router.get('/', (req, res) => {
  res.render('home/home', { title: 'Home' });
});

 // User Registration Route (GET)
router.get('/register', (req, res) => {
  res.render('register');
});

// User Registration Route (POST)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// User Login Route (GET)
router.get('/login', (req, res) => {
  res.render('login');
});

// User Login Route (POST)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid email or password');
    }
    req.session.userId = user._id; // Store user ID in session
    req.session.isAuthenticated = true;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// Logout Route
router.get('/logout', (req, res) => {
  // Clear the session data
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
    // Redirect to the login page after logout
    res.redirect('/login');
  });
});

// Authentication Middleware
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};
 
// Requires Authentication
router.get('/dashboard', requireAuth, async (req, res) => {
    try {
        const allTasks = await Task.find();
        res.render('dashboard', { title: 'Dashboard', tasks: allTasks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// CRUD Routes for Tasks
// 1. Read Route (GET): Display all tasks
router.get('/tasks', async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.render('tasks/index', { tasks: allTasks });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
//View only
router.get('/view_tasks', async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.render('tasks/alltasks', { tasks: allTasks });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// 2. Create Route (GET): Render form for creating new task
router.get('/tasks/create', requireAuth,(req, res) => {
  res.render('tasks/create');
});

// 3. Create Route (POST): Handle form submission to create new task
router.post('/tasks', async (req, res) => {
  try {
    await Task.create(req.body);
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// 4. Edit Route (GET): Render form for editing task
router.get('/tasks/edit/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.render('tasks/edit', { task });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// 5. Update Route (POST): Handle form submission to update task
router.post('/tasks/edit/:id', async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete Task Route (GET): Render confirmation dialog for deleting task
router.get('/tasks/delete/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.render('tasks/delete', { task });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// 7. Delete Route (POST): Handle deletion of task
router.post('/tasks/delete/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
