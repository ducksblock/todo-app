'use client'
import React, { useState } from 'react'

interface AddTaskFormProps {
    onAddTask: (task: string) => void
}

const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
    const [newTask, setNewTask] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newTask.trim()) {
            onAddTask(newTask)
            setNewTask('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
            <input
                type='text'
                placeholder='Add new task'
                className="input input-bordered w-full mb-2"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button type='submit' className="btn btn-primary w-full">
                Add Task
            </button>
        </form>
    )
}

export default AddTaskForm