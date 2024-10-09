'use client'
import React, { useState } from 'react'
import AddTaskForm from './AddTaskForm'
import ToDoList from './ToDoList'

const ToDoApp = () => {
    const [tasks, setTasks] = useState<string[]>([])

    const addTask = (task: string) => {
        setTasks([...tasks, task])
    }

    const deleteTask = (task: string) => {
        setTasks(tasks.filter(t => t != task))
    }

    const editTask = (index: number, updatedTask: string) => {
        const newTasks = [...tasks];
        newTasks[index] = updatedTask;
        setTasks(newTasks);
    };


    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-6">ToDo App</h1>
            <AddTaskForm onAddTask={addTask} />
            <ToDoList tasks={tasks} onEditTask={editTask} onDeleteTask={deleteTask} />
        </div>
    )
}

export default ToDoApp