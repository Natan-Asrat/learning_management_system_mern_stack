require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/auth-routes/index');
const mediaRoutes = require('./routes/instructor-routes/media-routes');
const instructorCourseRoutes = require('./routes/instructor-routes/course-routes')
const studentViewCourseRoutes = require('./routes/student-routes/course-routes')
const orderRoutes = require('./routes/student-routes/order-routes')
const studentBoughtCourseRoutes = require('./routes/student-routes/student-course-routes');
const studentProgressRoutes = require('./routes/student-routes/course-progress')


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;
const corsOptions = {
  origin: CLIENT_URL,
  methods : ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json());
mongoose.connect(MONGO_URI).then(() => {
    console.log("mongodb is connected");
    app.use('/auth', authRoutes);
    app.use('/media', mediaRoutes);
    app.use('/instructor/course', instructorCourseRoutes);
    app.use('/student/course', studentViewCourseRoutes);
    app.use('/student/order', orderRoutes);
    app.use('/student/bought', studentBoughtCourseRoutes);
    app.use('/student/progress', studentProgressRoutes)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((err) => {console.log(err)}) ;
   