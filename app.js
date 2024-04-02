const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars').create({
  extname: '.hbs', // Set extension of handlebars files
  defaultLayout: 'main', // Set default layout file
  layoutsDir: __dirname + '/views/layouts/', // Set directory for layout files
  runtimeOptions:{allowProtoPropertiesByDefault:true,
  allowedProtoMethodsByDefault:true},
  helpers: { // Define helpers here
    ifEquals: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    }
  }
});
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configure Handlebars
app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs');

// Configure express-session middleware
app.use(session({
  secret:process.env.SESSION_SECRET, // Add a secret key here
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI,
    ttl: 60 * 60 * 24, // session TTL  
  }),
}));
 
// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

