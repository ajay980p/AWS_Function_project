import express from 'express';
import { invokeAddTask, invokeDeleteTask, invokeGetTasks } from '../services/lambdaService';

const router = express.Router();


router.get('/getTask', async (req, res) => {
    try {
        const response = await invokeGetTasks();
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});



router.post('/addTask', async (req, res) => {
    try {
        const response = await invokeAddTask(req.body);

        res.status(200).json({ message: 'Task added', data: response });
    } catch (err) {
        console.error("Error calling Lambda:", err);
        res.status(500).json({ error: 'Failed to add task' });
    }
});




router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const response = await invokeDeleteTask({ id: req.params.id });
        res.status(200).json({ message: 'Task deleted', data: response });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

export default router;