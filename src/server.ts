import express from 'express';
import userRoutes from './infrastructure/routes/userRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB  from './config/db';

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
