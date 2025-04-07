import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const getTasks = () => axios.get(`${API_BASE}/getTask`);
export const addTask = (title: string) => axios.post(`${API_BASE}/addTask`, { title });
export const deleteTask = (id: string) => axios.delete(`${API_BASE}/deleteTask/${id}`);