import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import courseRoutes from './routes/course.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import orderRoutes from './routes/order.routes.js';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();
const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
// }));
// app.options("*", cors());/
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Explicitly handle OPTIONS requests to prevent blocking actual requests
app.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(204); // Important: Respond to OPTIONS requests immediately
});


const port = process.env.PORT || 3121;
const DB_URI = process.env.MONGO_URI;

async function startServer() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB');
    
    // Defining routes
    app.use("/api/v1/course", courseRoutes);
    app.use("/api/v1/user", userRoutes);
    app.use("/api/v1/admin", adminRoutes);
    app.use("/api/v1/order", orderRoutes);
    //cloudinary configuration code 
    cloudinary.config({ 
      cloud_name: process.env.cloud_name, 
      api_key: process.env.api_key, 
      api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
  });
    
    // Start the server after successful DB connection
    app.listen(port, () => {
      console.log(`Running on ${port}`);
    });
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

startServer();
