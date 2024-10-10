'use client';
import { useState } from 'react';

interface Task {
    _id: string;
    title: string;
}

interface ToDoListProps {
    tasks: Task[];
    onDeleteTask: (id: string) => void;
    onEditTask: (id: string, updatedTask: string) => void;
}

const ToDoList = ({ tasks, onDeleteTask, onEditTask }: ToDoListProps) => {
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
    const [currentTask, setCurrentTask] = useState<string>('');

    const handleEdit = (id: string) => {
        if (currentTask.trim()) {
            console.log(`Updating task with ID ${id} with value: ${currentTask}`);
            onEditTask(id, currentTask);
            setCurrentTask('');
            setCurrentTaskId(null);
        } else {
            console.error("Cannot save an empty task");
        }
    };

    const handleCancelEdit = () => {
        setCurrentTask('');
        setCurrentTaskId(null);
    };

    return (
        <ul className='list-none'>
            {tasks.length === 0 ? (
                <li className="p-2 text-gray-500">Add tasks to get started ✨</li>
            ) : (
                tasks.map((task) => (
                    <li key={task._id} className="border-b p-2 flex justify-between">
                        {currentTaskId === task._id ? (
                            <>
                                <input
                                    type='text'
                                    value={currentTask}
                                    onChange={(e) => setCurrentTask(e.target.value)}
                                    className='input input-bordered w-full'
                                    placeholder="Edit task..."
                                />
                                <button
                                    onClick={() => handleEdit(task._id)}
                                    className='btn btn-outline btn-success ml-2'
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className='btn btn-outline btn-error ml-2'
                                >
                                    Close
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{task.title}</span>
                                <div>
                                    <button
                                        onClick={() => {
                                            setCurrentTask(task.title);
                                            setCurrentTaskId(task._id);
                                        }}
                                        className='btn btn-outline btn-info ml-2'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='btn btn-outline btn-error ml-2'
                                        onClick={() => onDeleteTask(task._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))
            )}
        </ul>
    );
};

export default ToDoList;