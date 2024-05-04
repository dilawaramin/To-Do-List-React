import React, { useEffect, useState } from 'react';
import TaskModal from './TaskModal';
import trash from './icons/trash-can.png';




function Task( {taskName, task, onCheck, onDelete} ) {

    // task modal function
    const [modalState, setModalState] = useState(false);

    return(

        <>
        <div 
            className='task'
            onClick={() => setModalState(!modalState)}
        >
            <div className='task-check'>
                <button 
                    className='checkbox'
                    onClick={() => onCheck(task)}
                    
                >
                    <p className='checkmark'>✔</p>
                </button>
                
            </div>
            <div className='task-description'>
                <h3>{taskName}</h3>
            </div>
            <div className='delete-button-div'>
                <button 
                    className='delete-button'
                    onClick={() => onDelete(taskName.id)}>
                        <img 
                            className="trash-image"
                            src={trash}/>
                </button>
            </div>
        </div>
        {modalState ? 
            <TaskModal
                changeState={setModalState}
                taskObj={task}
            /> : null}
        </>
    )

};


export default Task