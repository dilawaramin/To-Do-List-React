import React, {useState, useEffect} from 'react';


function Addtask( {addTask, taskList} ) {

    const DEFAULT_DATE = 'None';
    const DEFAULT_DESC = 'None';

    // Get the subsequent id
    const getLastTaskId = () => {
        if (taskList.length === 0) return null;
        return taskList[taskList.length - 1].id;
    };

    // Task Object
    const [taskObject, setTaskObject] = useState({
        title: "",
        description: DEFAULT_DESC,
        dueDate: DEFAULT_DATE
    });

    // Input data
    const [task, setTask] = useState('');

    // placeholder click state
    const [throwaway, setThrowaway] = useState(0);


    // Dynamic text input
    const change = event => {
        setTask(event.target.value)
    };

    // Click function to enter text
    const click = () => {
        // debugging
        console.log(`Current task: ${taskObject.title}`);
        console.log(taskList)

        // calculate new id
        const lastTaskId = getLastTaskId();
        const newId = (lastTaskId === null ? 0 : lastTaskId) + 1;
        setTaskObject(prevState => ({
            ...prevState,
            title: task,
            description: DEFAULT_DESC,
            dueDate: DEFAULT_DATE,
            id: newId
        }), setThrowaway(throwaway + 1))
    };

    // send data back 
    const sendData = async (taskObject) => {

        // validate data before sending
        if (!taskObject.title || !taskObject.description || !taskObject.dueDate) {
            console.error('Validation Failed: Title, Description, and Due Date are required.');
            return;
        };


        try {
            const response = await fetch('http://localhost:5004/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskObject)
            });

            // check response(?)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // check response
            const data = await response.json();
            console.log('Success:', data);

        } catch (error) {
            console.error('Error: ', error)
        }
    }

    // Send data back
    useEffect(() => {
        console.log(`Updated user: ${taskObject.title}`)
        sendData(taskObject)
        addTask(prevTasks => [...prevTasks, taskObject])
    }, [throwaway])



    return(
        <div>
            <button onClick={click}>Add Task</button>
            <input 
                type='text' 
                className='add-task-input' placeholder="Add a new task" 
                onChange={change}/>
        </div>
    )
}

export default Addtask