import Task from "./Task";
import React, {useEffect, useState} from 'react'
import Addtask from "./Addtask";
import TaskComplete from "./TaskComplete";

function TaskContainer() {

    // local list for testing:
    // const tasks = ["Task Number 1", "Task Number 2", "Task Number 3", "Task Number 4", "Task Number 5"]

    const [taskList, setTaskList] = useState([]);



    // complete task function
    const completeTask = (task) => {
        setTaskList(prevTask => {
            // find the passed task and change completed property 
            return prevTask.map(t => {
                if (t.id === task.id) {
                    t.completed = true;
                    return {...t};
    
                }
                
                return t;
            })
        })
        

    }


    // delete function
    const deleteTask = async (taskId) => {
        // request to server first
        fetch(`http://localhost:5004/api/tasks/${taskId}`, {method: 'DELETE'})
        .then(response => {
            if (!response.ok) {
                // catch errors in response
                throw new Error('Network response was not ok (delete)')
            }
        // update local list if server deletion success
        setTaskList(prevTasks => prevTasks.filter(task => task.id !== taskId))
        })
        // catch errors
        .catch(error => console.error('Error deleting task: ', error));
    };


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
                if (Array.isArray(data) || data === null) {
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
 
            {taskList.map((taskname) => {
                if (taskname.completed === false) {
                    return (
                    <Task 
                    key={taskname.id} 
                    taskName={taskname.title}
                    task={taskname} 
                    onCheck={() => completeTask(taskname)}
                    onDelete={() => deleteTask(taskname.id)}
                />
                    )
                }}
            )}

            <Addtask 
                addTask={setTaskList} 
                taskList={taskList}/>

            <div className='task-container-header'>
                <h2 className='sub-heading-text'>Completed Tasks:</h2>
            </div>     
            
            {taskList.map((taskname) => {
                if (taskname.completed === true) {
                    return (
                    <TaskComplete 
                    key={taskname.id} 
                    taskName={taskname.title}
                    onDelete={() => deleteTask(taskname.id)}
                />
                    )
                }}
            )}


        </section>
    );
}

export default TaskContainer