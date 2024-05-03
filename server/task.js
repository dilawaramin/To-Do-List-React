import mongoose from 'mongoose';

const taskObject = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: {
        type: Date,
        default: () => Date.now(),
    },
    completed: Boolean,
    id: Number
});

export default taskObject;