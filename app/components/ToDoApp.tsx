'use client'
import React, { useState } from 'react'
import AddTaskForm from './AddTaskForm'
import ToDoList from './ToDoList'

const ToDoApp = () => {
    const [tasks, setTasks] = useState<string[]>([])

    const addTask = (task: string) => {
        setTasks([...tasks, task])
    }
    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-6">ToDo App</h1>
            <AddTaskForm onAddTask={addTask} />
            <ToDoList tasks={tasks} />
        </div>
    )
}

export default ToDoApp