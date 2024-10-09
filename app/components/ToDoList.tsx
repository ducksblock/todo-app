'use client';
import { useState } from 'react';

interface ToDoListProps {
    tasks: string[];
    onDeleteTask: (index: number) => void;
    onEditTask: (index: number, updatedTask: string) => void;
}

const ToDoList = ({ tasks, onDeleteTask, onEditTask }: ToDoListProps) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
    const [currentTask, setCurrentTask] = useState<string>('');

    const handleEdit = (index: number) => {
        if (currentTask.trim()) {
            console.log(`Updating task at index ${index} with value: ${currentTask}`);
            onEditTask(index, currentTask);
            setCurrentTask('');
            setCurrentTaskIndex(null);
        } else {
            console.error("Cannot save an empty task");
        }
    };

    const handleCancelEdit = () => {
        setCurrentTask('');
        setCurrentTaskIndex(null);
    };

    return (
        <ul className='list-none'>
            {tasks.length === 0 ? (
                <li className="p-2 text-gray-500">Add tasks to get started ✨</li>
            ) : (
                tasks.map((task, i) => (
                    <li key={i} className="border-b p-2 flex justify-between">
                        {currentTaskIndex === i ? (
                            <>
                                <input
                                    type='text'
                                    value={currentTask}
                                    onChange={(e) => setCurrentTask(e.target.value)}
                                    className='input input-bordered w-full'
                                    placeholder="Edit task..."
                                />
                                <button
                                    onClick={() => handleEdit(i)}
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
                                <span>{task}</span>
                                <div>
                                    <button
                                        onClick={() => {
                                            setCurrentTask(task);
                                            setCurrentTaskIndex(i);
                                        }}
                                        className='btn btn-outline btn-info ml-2'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='btn btn-outline btn-error ml-2'
                                        onClick={() => onDeleteTask(i)}
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
