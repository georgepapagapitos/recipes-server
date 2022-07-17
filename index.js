import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import recipeRouter from './routes/recipe.router.js';
import authRouter from './routes/auth.router.js';
import userRouter from './routes/user.router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

const dbUrl = process.env.DB_CONNECTION_URL;
const port = process.env.PORT;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
  .catch((err) => console.error(err.message));
