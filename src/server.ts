import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error-middleware';

//import routes
import { routes } from './routes';

const app = express();

//app config
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(3333, () => {
  console.log('HTTP server running on port 3333!');
});