const express= require('express');
const mongoose = require('mongoose');

//To unblock the data which come from other servers
const cors= require('cors');
//For read the user data from sign-up and seller page
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoString = process.env.DATABASE_URL


/* Routes */
const CourseRouter = require('./routes/courseRoute');
const UserRouter = require('./routes/userRoute');
const EnrollmentRouter = require('./routes/enrollmentRoute');

const corsOptions = {
    origin: 'http://localhost:3000/',  // Replace with your frontend domain
    credentials: true,  // Allows the browser to send cookies
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());



// mongodb database
// mongoose.default.connect(mongoString)
//     .then(() => console.log('DB Connected!'));

mongoose.default.connect(mongoString)
    .then(()=>{
        console.log('DB connected !');
    }).catch((error)=>{
    console.log(error);
});

app.listen(3001, ()=>{
    console.log('sdgp service Stared on port 3001');
})


app.use('/api/enrollmentRoute', EnrollmentRouter);
app.use('/api/courseRoute', CourseRouter);
app.use('/api/userRoutes', UserRouter);
