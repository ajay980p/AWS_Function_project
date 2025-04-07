import express, { Request, Response } from 'express';
import request from 'supertest';
import taskRoutes from '../routes/taskRoutes';
import * as lambdaService from '../services/lambdaService';

// mock service
jest.mock('../src/services/lambdaService');

const app = express();
app.use(express.json());
app.use('/api', taskRoutes);

describe('Task Routes (Functional via Jest)', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });


    // For GET Request to get all the Task
    it('should fetch tasks via GET /api/getTask', async () => {
        const mockData = "";
        (lambdaService.invokeGetTasks as jest.Mock).mockResolvedValue(mockData);

        const response = await request(app).get('/api/getTask');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
        expect(lambdaService.invokeGetTasks).toHaveBeenCalledTimes(1);
    });


    // For Post request like ADD Task
    it('should add task via POST /api/addTask', async () => {
        const task = { title: 'new task' };
        const mockResult = { id: '123', title: 'new task' };

        (lambdaService.invokeAddTask as jest.Mock).mockResolvedValue(mockResult);

        const response = await request(app).post('/api/addTask').send(task);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Task added',
            data: mockResult,
        });
        expect(lambdaService.invokeAddTask).toHaveBeenCalledWith(task);
    });

});