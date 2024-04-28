import express from 'express'
import cors from 'cors';
import fs from 'fs';
import path from 'path';


const app = express() 
app.use(cors());
app.use(express.json());


// local list for testing 
/*const taskList = ["Make breakfast", "Walk the cat", "Task Number 3", "finish react project", "Calc homework"]; */ 


// GET route to send tasks
app.get("/api/tasks", (req, res) => {

    const basePath = process.cwd();

    const filePath = path.join(basePath,  'tasks.json')

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading file: ", err);
            return res.status(500).json({ message: "Failed to load tasks."})
        }
        res.json(JSON.parse(data));
        console.log("Data Sent!")
    })

});


// POST route to receive tasks from client
app.post('/api/tasks', (req, res) => {
    console.log('Post was called')
    const basePath = process.cwd();
    const filePath = path.join(basePath, 'tasks.json')

    // extract task from request
    const newTask = req.body;

    // Check if the request body is empty or essential fields are missing
    if (!newTask || Object.keys(newTask).length === 0 || !newTask.title || !newTask.description || !newTask.dueDate) {
        return res.status(400).json({ message: "Invalid request: Task data is incomplete or missing." });
    }

    // convert existing tasks.json into a string for mutation
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file: ", err);
            return res.status(500).json({ message: "Failed to read tasks."});
        }

        // Add new task to string
        const tasks = JSON.parse(data);
        tasks.push(newTask);

        // Write the string back to the tasks file
        fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8', (err) => {
            // check for errors, and then send success response
            if (err) {
                console.error("Error writing file: ", err);
                return res.status(500).json({ message: "Failed to update tasks."});
            }
            res.status(201).json({ message: "Task added successfully!" });
        })
    })
    


})

const PORT = 5004;
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)}); 