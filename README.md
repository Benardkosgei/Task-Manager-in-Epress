# TASK MANAGEMENT WEB APP
## Introduction
This project is a web application built using Express.js, a minimalist web framework for Node.js. It provides functionality for managing tasks, user authentication, and CRUD operations on tasks.

## Features
- User Registration: Users can register with a username, email, and password.
- User Login: Registered users can log in to access their dashboard.
- User Authentication: Routes are protected to ensure only authenticated users can access certain features.
- Task Management: Users can create, view, edit, and delete tasks.
- Dashboard: Users have access to a dashboard where they can view their tasks and manage them.

## Technologies Used
- **Express.js**: Used as the web application framework.
- **MongoDB**: Database system used to store user and task data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Handlebars**: Template engine for rendering views.
- **bcrypt**: Library used for password hashing.
- **express-session**: Middleware for session management.
- **connect-mongo**: MongoDB session store for Express.js.

## Getting Started
To get started with this project, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository_url>
   ```

2. **Install dependencies**:
   ```
   cd <project_folder>
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory of the project and add the following environment variables:
   ```
   MONGODB_URI=<your_mongodb_uri>
   SESSION_SECRET=<your_session_secret>
   ```

4. **Start the server**:
   ```
   node app.js
   ```

5. **Access the application**:
   Open a web browser and navigate to `http://localhost:3000` to access the application.

## Folder Structure
- **routes**: Contains route handlers for different parts of the application.
- **models**: Defines Mongoose schemas for user and task data.
- **views**: Contains Handlebars templates for rendering views.
- **public**: Stores static assets such as CSS files and client-side JavaScript.

## Author
benardkosgei

---
 
