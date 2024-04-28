import Task from "./Task";
import React, {useEffect, useState} from 'react'
import Addtask from "./Addtask";

function TaskContainer() {

    // const tasks = ["Task Number 1", "Task Number 2", "Task Number 3", "Task Number 4", "Task Number 5"]

    const [taskList, setTaskList] = useState([]);

    // delete function
    const deleteTask = (taskId) => {
        setTaskList(prevTasks => prevTasks.filter(task => task.id !== taskId))
    }


    // Populate list of tasks from server
    useEffect(() => {
        fetch("http://localhost:5004/api/tasks").then(
            response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json()
            }
        ).then(
            data => {
                if (Array.isArray(data)) {
                    setTaskList(data)
                } else {
                    throw new Error('Data is not an array')
                }
            }
        )
        .catch(error => {
            console.error("Error fetching tasks: ", error);
            setTaskList([]);
        })
    }, [])

    return(
        <section className='task-container'>

            <div className='task-container-header'>
                <h2 className='sub-heading-text'>My Tasks:</h2>
            </div>     

            {taskList.map((taskname) => (
                <Task 
                    key={taskname.id} 
                    taskName={taskname.title} 
                    onDelete={() => deleteTask(taskname.id)}
                />
            ))}

            <Addtask 
                addTask={setTaskList} 
                taskList={taskList}/>
            


        </section>
    );
}

export default TaskContainer