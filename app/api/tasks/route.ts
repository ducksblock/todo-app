'use server';
import { NextResponse } from "next/server";

let tasks: string[] = [];

export async function GET() {
    return NextResponse.json(tasks);
}

export async function POST(request: Request) {
    const { task } = await request.json();
    tasks.push(task);
    return NextResponse.json({ message: 'Task added' }, { status: 201 });
}

export async function PUT(request: Request) {
    const { index, updatedTask } = await request.json();
    tasks[index] = updatedTask;
    return NextResponse.json({ message: 'Task updated' });
}

export async function DELETE(request: Request) {
    const { index } = await request.json();
    tasks.splice(index, 1);
    return NextResponse.json({ message: 'Task deleted' });
}
