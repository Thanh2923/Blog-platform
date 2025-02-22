// Bước 1: Cài đặt cơ bản
// Chạy lệnh sau để khởi tạo dự án:
// npm init -y
// npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet morgan nodemon

// Bước 2: Cấu trúc thư mục
/*
/blog-platform
│── /src
│   │── /models
│   │   ├── /schemas
│   │   │   ├── user.schema.js
│   │   │   ├── post.schema.js
│   │   │   └── comment.schema.js
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   └── comment.model.js
│   │── /services
│   │   ├── user.service.js
│   │   ├── post.service.js
│   │   └── comment.service.js
│   │── /controllers
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   └── comment.controller.js
│   │── /routers
│   │   ├── user.router.js
│   │   ├── post.router.js
│   │   └── comment.router.js
│   │── app.js
│   │── server.js
│── .env
│── package.json
*/

// Bước 3: Tạo file .env
/*
PORT=5000
MONGO_URI=mongodb://localhost:27017/blog_platform
JWT_SECRET=your_jwt_secret_key
*/

// Bước 4: Tạo Schemas và Models










// Bước 5: Tạo Services






// Bước 6: Tạo Controllers







// Bước 7: Tạo Routers






// Bước 8: Kết nối MongoDB trong app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const indexRouter = require('./routers');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/api', indexRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = app;

