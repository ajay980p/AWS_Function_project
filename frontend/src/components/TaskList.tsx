import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Task {
    id: string;
    title: string;
}

interface Props {
    tasks: Task[];
    onDelete: (id: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onDelete }) => {
    const handleDelete = (id: string) => {
        onDelete(id);
        toast.success('Task deleted successfully');
    };

    return (
        <div style={{ padding: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Sr No.</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task.id}>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{index + 1}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.title}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    style={{
                                        backgroundColor: '#ff4d4f',
                                        color: 'white',
                                        border: 'none',
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;