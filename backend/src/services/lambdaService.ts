import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const { API_GATEWAY_GET, API_GATEWAY_ADD, API_GATEWAY_DELETE } = process.env;

export const invokeGetTasks = async () => {
    try {
        const response = await axios.get(API_GATEWAY_GET as string);
        return response.data;
    } catch (error) {
        console.error("Error calling GET tasks API Gateway:", error);
        throw new Error("Failed to fetch tasks");
    }
};


export const invokeAddTask = async (task: { title: string }) => {
    try {
        const response = await axios.post(API_GATEWAY_ADD as string, task);
        return response.data;
    } catch (error) {
        console.error("Error calling ADD task API Gateway:", error);
        throw new Error("Failed to add task");
    }
};



export const invokeDeleteTask = async (task: { id: string }) => {
    const deleteUrl = (API_GATEWAY_DELETE as string).replace('{id}', task.id);
    try {
        const response = await axios.delete(deleteUrl);
        return response.data;
    } catch (error) {
        console.error("Error calling DELETE task API Gateway:", error);
        throw new Error("Failed to delete task");
    }
};