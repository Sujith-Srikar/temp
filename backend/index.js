import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary";
import path from "path";
import cors from "cors";
dotenv.config();

//Configure Cloudinary correctly
cloudinary.v2.config({

    cloud_name: process.env.CLOUD_NAME,  //Use uppercase env variables (standard convention)
    api_key: process.env.CLOUD_API,      
    api_secret: process.env.CLOUD_SECRET,

});

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Fixed the typo
app.use(cookieParser());

// Root route with a response
// app.get("/", (req, res) => {
//     res.send("Welcome to the API ioho!");
// });

// Importing routes
import userRoutes from './routes/userRoutes.js';
import pinRoutes from './routes/pinRoutes.js';

// Using routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Start server and connect to DB
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await connectDb(); // Ensure DB is connected before serving requests
});
