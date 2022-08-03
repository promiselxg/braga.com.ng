const express = require('express');
const dotenv = require('dotenv');
const RoomRoutes = require('./routes/roomRoutes');
const ReviewsRoutes = require('./routes/reviewRoutes');
const ReservationRoutes = require('./routes/reservationRoutes');
const CategoryRoutes = require('./routes/categoryRoutes');

dotenv.config();
const cors = require('cors');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// DB connection
connectDB();
//  initialize app
const app = express();

const PORT = process.env.PORT || 8080;
// //middlewares
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
