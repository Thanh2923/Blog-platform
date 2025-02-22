const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const indexRouter = require('./routers');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Routes
app.use('/api', indexRouter);

module.exports = app;
