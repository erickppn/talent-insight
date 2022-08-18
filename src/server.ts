import express from 'express';
import cors from 'cors';

//import routes
import { routes } from './routes';

const app = express();

//app config
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('HTTP server running on port 3333!');
});