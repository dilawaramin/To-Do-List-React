import * as React from 'react';

function Task( {taskName, onDelete} ) {



    return(

        <div className='task'>
            <div className='task-check'>
                <button 
                    className='checkbox'>
                        
                </button>
            </div>
            <div className='task-description'>
                <h3>{taskName}</h3>
            </div>
            <div className='delete-button-div'>
                <button 
                    onClick={() => onDelete(taskName.id)}
                    className='delete-button'>
                    Delete
                </button>
            </div>
        </div>
    )

};


export default Task