import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

import mainRoutes from './routes/mainRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import authRoutes from './routes/authRoutes.js';

import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: '0000',
    resave: false,
    saveUninitialized: true,
}));


app.use('/main', mainRoutes);
app.use('/products', productsRoutes);
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
