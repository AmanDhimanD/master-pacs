// app.js
const express = require('express');
const app = express();
const dbconfig = require('./db/olddb.config');
const userRoutes = require('./routes/UserRoutes.js');
const userAuthRoutes = require('./routes/UserAuthRoutes.js')
const patientRoutes = require('./routes/patientsRouters/PatientsRoute.js')
const studyRoutes = require('./routes/studyRouters/StudyRoute.js')
const seriesRoutes = require('./routes/seriesRouters/SeriesRoute.js')
const imageRoutes = require('./routes/imageRouters/ImageRoute.js')
const authVar = require('./middlewares/authMiddleware.js');
//const connectToDatabase = require('./db/olddb.config');
const connectDB = require('./db/db.config.js');
const fileUpload = require("express-fileupload");
const allRoutes = require('./routes/allRoutes')
const getallstudydata = require('./routes/getallstudydata')
const alldatapostmethod = require('./routes/alldatapostmethod')
const savebookmarks = require('./routes/savebookmarks.js')

const DataImageRoute = require('./routes/alldataimages/DataImageRoute.js')

const session = require('express-session');
const mongoose = require('mongoose')

const cors = require('cors')

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// accept the files with large

//app.use(cors({
//origin: 'http://localhost:3000', // Allow requests from this origin
//credentials: true, // Include cookies in the requests (if applicable)
//}));

// const allowedOrigins = ['https://admindemo-five.vercel.app', 'http://localhost:3000', 'https://user-newdemo.vercel.app', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://localhost:3001', 'http://localhost:8080/', 'https://viwer-study-main.vercel.app', 'http://127.0.0.1:8080'];

const allowedOrigins = ['http://localhost:4001', 'http://localhost:4000', 'http://127.0.0.1:8080']


app.use(cors({
  origin: allowedOrigins, // Allow requests from these origins
  credentials: true, // Include cookies in the requests (if applicable)
}));

// This handles OPTIONS requests for all routes
app.options('*', cors());

//app.use((req, res, next) => {
//res.header('Access-Control-Allow-Origin', 'https://admindemo-five.vercel.app');
//res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//next();
//});
//app.use((req, res, next) => {
//res.header('Access-Control-Allow-Origin', 'https://user-newdemo.vercel.app');
// res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// next();
//});

app.use((req, res, next) => {
  // Check the origin of the incoming request
  if (req.headers.origin === 'https://admindemo-five.vercel.app') {
    // Set CORS headers for the first origin
    res.header('Access-Control-Allow-Origin', 'https://admindemo-five.vercel.app');
  } else if (req.headers.origin === 'https://user-newdemo.vercel.app') {
    // Set CORS headers for the second origin
    res.header('Access-Control-Allow-Origin', 'https://user-newdemo.vercel.app');
  }
  else if (req.headers.origin === 'http://127.0.0.1:8080') {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  }
  else if(req.headers.origin === 'http://localhost:4001') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4001');
  }
  else if (req.headers.origin === 'http://localhost:4000') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
  }
  

  // Set common CORS headers for allowed methods and headers
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

// This handles OPTIONS requests for all routes
app.options('*', cors());

app.options('*', cors()); // This handles OPTIONS requests for all routes

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: "100mb", extended: true, parameterLimit: 1000000 }));
//app.use(cors())


//app.use(fileUpload({ useTempFiles: true }));
// Configuration DB
//dbconfig();


/* ========================================  Session Part  ======================================== */
app.use(session({
  secret: 'demo', // Replace with your secret key
  resave: false,
  saveUninitialized: true
}));
/* Session Schema */
const sessionSchema = new mongoose.Schema({
  userId: String,
  email: String,
  userIP: String,
  lastLogin: String,
});
const Session = mongoose.model('Session', sessionSchema);
// create new user
app.use('/session', async (req, res) => {
  try {
    const email = req.body.email;
    const userIP = req.body.ip;
    // Try to find an existing session document with the given email
    const existingSession = await Session.findOne({ email });

    // Get the current time in "HH:mm" format
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

    if (existingSession) {
      // If an existing session is found, update the lastLoginTime field with the current time
      existingSession.lastLogin = currentTime;
      existingSession.userIP = userIP;
      existingSession.email = email;
      await existingSession.save();
      console.log(existingSession)
      res.json(existingSession);
    } else {
      // If no existing session is found, create a new session document with the email and the current time
      const sessionDetails = new Session({
        email,
        userIP,
        lastLogin: currentTime,
      });
      await sessionDetails.save();
      res.json(sessionDetails);
    }
  } catch (error) {
    console.error('Error in session route:', error);
    res.status(500).send('Something went wrong!');
  }
});

//session manage
/* ========================================  Session Part  ======================================== */


app.use('/userauth', userAuthRoutes)
// PATIENT           
app.use('/api', patientRoutes)
// Use the study routesF
app.use('/api/studies', studyRoutes);
// Use the series routes
app.use('/api/series', seriesRoutes);
// Use the images routes
app.use('/api/images', imageRoutes);
/* ========================================  Data send according to the .net application Part  ========================================  */
//############### Work Properly 
app.use('/api/data/images', DataImageRoute);
/* ========================================  Data send according to the .net application Part ========================================  */



//all data get For DataTabels
app.use('/api/', allRoutes)
app.use('/api/', getallstudydata)

/* 
          -------------- New Version API for get/post/put/delete all data -------------- 
*/
app.use('/api/v2/', alldatapostmethod)

/* ======================================== Add to Acadmics ======================================== */

app.use('/api/v2', savebookmarks)


/* ======================================== Add to Acadmics ======================================== */

// all For the Viwer
// Serve the uploaded images
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 8000
//Connect to the database before listening
connectDB().then(() => {
  app.listen(port, () => {
    console.log("Listening for Requests");
  })
})
