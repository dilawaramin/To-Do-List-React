import * as React from 'react';
import trash from './icons/trash-can.png'

function Task( {taskName, onDelete} ) {



    return(

        <div className='task'>
            <div className='task-check'>
                <button className='checkbox'>
                    <img src=''/>
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
    )

};


export default Task