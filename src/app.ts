import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(cookieParser());

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send("hello it's working");
});

app.use(globalErrorHandlers);
app.use(notFound);

export default app;
