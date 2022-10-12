import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from "path";
import fs from "fs";
import { errorMiddleware } from './middlewares/error-middleware';

//import routes
import { routes } from './routes';

const app = express();

//app config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use("/files/", express.static(path.resolve(__dirname, "../tmp/uploads")));

app.use(errorMiddleware);

app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running on port 3333!');
});