'use client';
import React, { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import ToDoList from './ToDoList';

const ToDoApp = () => {
    const [tasks, setTasks] = useState<any[]>([]);
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
                body: JSON.stringify({ title: task }),
            });

            if (!response.ok) throw new Error('Failed to add task');
            const data = await response.json();
            setTasks((prevTasks) => [...prevTasks, data]);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const response = await fetch('/api/tasks', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) throw new Error('Failed to delete task');

            setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
            console.error("Error deleting task:", error);
        }
    };


    const editTask = async (id: string, updatedTask: string) => {
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
                body: JSON.stringify({ id, title: updatedTask }),
            });


            if (!response.ok) throw new Error('Failed to update task');
            setTasks((prevTasks) => {
                return prevTasks.map(task =>
                    task._id === id ? { ...task, title: updatedTask } : task
                );
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