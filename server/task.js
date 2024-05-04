/*----------------------------------------------------------
    Schema template for Mongoose
 ----------------------------------------------------------*/
import mongoose from 'mongoose';

const taskObject = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    completed: Boolean,
    id: Number
});

export default taskObject;