import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { pool } from './db';
import header from './routes/header';
import jwtAuth from './routes/jwtAuth';
import todos from './routes/todos';

config();
const app = express();
const PORT = (process.env.PORT || 3001) as number;

app.use(cors());
app.use(morgan('dev'));

// The only way we can get data from frontend is accessing the object of 'req.body'
// express.json() gives us the access of body
app.use(express.json());

async function startServer() {
  try {
    // Connect to the database
    await pool.connect();
    console.log('Connected to the database!');

    // Start listening to the port
    app.listen(PORT, (err?: Error) => {
      ``;
      if (err) {
        return console.log('The error for listening the port:', err);
      }
      console.log(`Server is successfully listening to ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Building routes for Login
app.use('/auth', jwtAuth);

// Building routes for accessing user_email to show on the header
app.use('/header', header);

// Building routes for Todo List
app.use('/todos', todos);

startServer();
