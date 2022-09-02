const express = require('express');
const dotenv = require('dotenv');
const RoomRoutes = require('./routes/roomRoutes');
const ReviewsRoutes = require('./routes/reviewRoutes');
const ReservationRoutes = require('./routes/reservationRoutes');
const CategoryRoutes = require('./routes/categoryRoutes');
//  API Security
//  Sanitize Data
const mongoSanitize = require('express-mongo-sanitize');
//  Set Security Headers
const helmet = require('helmet');
//  Prevent cross site scripting
const xss = require('xss-clean');
//  protect against HTTP Parameter Pollution attacks
const hpp = require('hpp');
//  Rate Limit
const rateLimit = require('express-rate-limit');
dotenv.config();
const cors = require('cors');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// DB connection
connectDB();
//  initialize app
const app = express();

const PORT = process.env.PORT || 8080;
// //middlewares
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(limiter);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// //  Routes
app.use('/api/v2/rooms', RoomRoutes);
app.use('/api/v2/reviews', ReviewsRoutes);
app.use('/api/v2/reservation', ReservationRoutes);
app.use('/api/v2/category', CategoryRoutes);
app.use('/api/v2/gallery', require('./routes/galleryRoutes'));
app.use('/api/v2/blog', require('./routes/blogRoutes'));
app.use('/api/v2/auth', require('./routes/authRoutes'));
app.use('/api/v2/stats', require('./routes/statsRoutes'));

// //  404 route
app.use('*', (req, res) =>
  res.status(404).json({ message: 'The requested route does not exist' })
);
// //  Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
