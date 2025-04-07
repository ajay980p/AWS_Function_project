import React, { useState } from 'react';

interface Props {
    onAdd: (title: string) => void;
}

const AddTaskForm: React.FC<Props> = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title);
        setTitle('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                margin: '20px 0'
            }}
        >
            <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{
                    padding: '10px 15px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    width: '300px'
                }}
            />
            <button
                type="submit"
                style={{
                    backgroundColor: '#1890ff',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.2s'
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1677cc')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#1890ff')}
            >
                Add Task
            </button>
        </form>
    );
};

export default AddTaskForm;