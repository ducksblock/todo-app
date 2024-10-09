'use client'
import { useState } from 'react'
interface ToDoListProps {
    tasks: string[]
    onDeleteTask: (task: string) => void
    onEditTask: (index: number, updatedTask: string) => void;
}

const ToDoList = ({ tasks, onDeleteTask, onEditTask }: ToDoListProps) => {
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [currentTask, setCurrentTask] = useState<string>('');

    const handleEdit = (index: number) => {
        if (currentTask.trim()) {
            onEditTask(index, currentTask);
            setIsEditing(null);
        }
    }

    return (
        <ul className='list-none'>
            {tasks.length === 0 ? (
                <li className="p-2 text-gray-500">Add tasks to get started ✨</li>

            ) : (
                tasks.map((task, i) => (
                    <li key={i} className="border-b p-2 flex justify-between">
                        {isEditing === i ? (
                            <>
                                <input
                                    type='text'
                                    value={currentTask}
                                    onChange={(e) => setCurrentTask(e.target.value)}
                                    className='input input-bordered w-full'
                                />
                                <button
                                    onClick={() => handleEdit(i)}
                                    className='btn btn-success ml-2'
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{task}</span>
                                <div>
                                    <button
                                        onClick={() => {
                                            setIsEditing(i)
                                            setCurrentTask(task)
                                        }}
                                        className='btn btn-outline btn-info'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='btn btn-outline btn-error'
                                        onClick={() => onDeleteTask(task)}
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
    )
}

export default ToDoList