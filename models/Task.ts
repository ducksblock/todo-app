import mongoose, { Document, Schema } from "mongoose";

interface TaskInterface extends Document {
    title: string;
    completed: string;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: false }
}, {
    timestamps: true,
})

const Task = mongoose.models.Task || mongoose.model<TaskInterface>('Task', TaskSchema);

export default Task;