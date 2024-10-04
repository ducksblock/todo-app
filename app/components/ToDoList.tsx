import React from 'react'
interface ToDoListProps {
    tasks: string[];
}

const ToDoList = ({ tasks }: ToDoListProps) => {
    return (
        <ul className='list-none'>
            {tasks.length === 0 ? (
                <li className="p-2 text-gray-500">Add tasks to get started ✨</li>

            ) : (
                tasks.map((task, i) => (
                    <li key={i} className="border-b p-2">
                        {task}
                    </li>
                ))
            )}
        </ul>
    )
}

export default ToDoList