import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('API is working');
});

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url); // Log every request
  next();
});
// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));
