import React, {useState, useEffect} from 'react';
import './taskmodal.css';

function TaskModal( {taskObj}) {


    return (

        <div className='task-modal'>
            <div className='task-modal-title'>
                <h2>{taskObj.title}</h2>
            </div>
            <div className="task-modal-body">
                <p>
                    {taskObj.description}
                </p>
            </div>
            <div className='task-modal-buttons'>
                <button>CANCEL</button>
                <button>SAVE</button>
            </div>
        </div>
    )
}

export default TaskModal