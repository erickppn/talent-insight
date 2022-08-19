import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

//import routes
import { routes } from './routes';

const app = express();

//app config
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.status(400).json({
    error: true,
    message: error.message,
  });
});

app.listen(3333, () => {
  console.log('HTTP server running on port 3333!');
});