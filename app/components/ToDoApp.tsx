'use client';
import React, { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import ToDoList from './ToDoList';

const ToDoApp = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks');
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (task: string) => {
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task }),
            });

            if (!response.ok) throw new Error('Failed to add task');
            setTasks((prevTasks) => [...prevTasks, task]);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (index: number) => {
        try {
            const response = await fetch('/api/tasks', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ index }),
            });

            if (!response.ok) throw new Error('Failed to delete task');
            setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
            console.error("Error deleting task:", error);
        }
    };

    const editTask = async (index: number, updatedTask: string) => {
        if (!updatedTask.trim()) {
            console.error("Task cannot be empty");
            return;
        }

        try {
            const response = await fetch('/api/tasks', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ index, updatedTask }),
            });

            if (!response.ok) throw new Error('Failed to update task');
            setTasks((prevTasks) => {
                const newTasks = [...prevTasks];
                newTasks[index] = updatedTask;
                return newTasks;
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
            console.error("Error updating task:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-6">ToDo App</h1>
            {loading && <p>Loading tasks...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <AddTaskForm onAddTask={addTask} />
            <ToDoList tasks={tasks} onEditTask={editTask} onDeleteTask={deleteTask} />
        </div>
    );
};

export default ToDoApp;
