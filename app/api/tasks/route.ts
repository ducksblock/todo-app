'use server';
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Task from "@/models/Task";

export async function GET() {
    try {
        await connectToDatabase()
        const tasks = await Task.find()
        return NextResponse.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks: ', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }

}

export async function POST(request: Request) {
    try {
        await connectToDatabase()
        const { title } = await request.json();
        const task = new Task({ title })
        await task.save()
        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error('Error adding tasks: ', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        await connectToDatabase()
        const { id, title, completed } = await request.json();

        const updatedTask = await Task.findByIdAndUpdate(id, { title, completed }, { new: true })

        if (!updatedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Task updated', task: updatedTask });
    } catch (error) {
        console.error('Error updating task: ', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        await connectToDatabase()
        const { id } = await request.json();

        const deletedTask = await Task.findOneAndDelete(id)

        if (!deletedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Task deleted' });
    } catch (error) {
        console.error('Error deleting task: ', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}