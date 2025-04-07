import express from 'express';
import taskRoutes from './routes/taskRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());


// ✅ Enable CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}));


app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});