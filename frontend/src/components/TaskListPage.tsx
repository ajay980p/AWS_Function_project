import React, { useEffect, useState } from 'react';
import { getTasks, addTask, deleteTask } from '../api';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import 'react-toastify/dist/ReactToastify.css';

interface Task {
    id: string;
    title: string;
}

const TaskListPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user, logout } = useAuth0();

    const loadTasks = async () => {
        try {
            setLoading(true);
            const res = await getTasks();
            setTasks(res.data);
        } catch (err) {
            toast.error('Failed to load tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleAdd = async (title: string) => {
        try {
            await addTask(title);
            await loadTasks();
            toast.success('Task added successfully');
        } catch (err) {
            toast.error('Failed to add task');
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
            toast.success('🗑️ Task deleted successfully');
        } catch (err) {
            toast.error('Failed to delete task');
            console.error(err);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Task Manager</h1>
                <div>
                    <span>Welcome, {user?.name}</span>
                    <button
                        style={{ marginLeft: '10px' }}
                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    >
                        Log Out
                    </button>
                </div>
            </div>

            <AddTaskForm onAdd={handleAdd} />

            {loading ? (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading tasks...</p>
            ) : (
                <TaskList tasks={tasks} onDelete={handleDelete} />
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default TaskListPage;