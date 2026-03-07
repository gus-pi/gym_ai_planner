import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { profileRouter } from './routes/profileRoutes';
import { planRouter } from './routes/planRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); //whitelisting our server to be used by our client
app.use(cookieParser());
app.use(express.json());

//API routes
app.use('/api/profile', profileRouter);
app.use('/api/plan', planRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
