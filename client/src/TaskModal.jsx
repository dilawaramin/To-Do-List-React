import React, {useState, useEffect} from 'react';
import './taskmodal.css';

function TaskModal( {taskObj, changeState, handleUpdate}) {
    // stops propogation of click event, needed for blur
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    // needed to get updated description data
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(taskObj.description);

    // turning description into input field
    const handleDescriptionClick = () => {
        setIsEditing(true);
    };

    // set the description to whatever is updated
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    // handle save of desc
    const handleSave = () => {
        setIsEditing(false);

        // set the task objects description
        taskObj.description = description;

        // call function to update back end
        handleUpdate(taskObj)
    }



    return (
        <div 
            className='modal-blur'
            onClick={() => changeState()}
        >
            <div 
                className='task-modal'
                onClick={(e) => stopPropagation(e)}
            >
                <div className="task-modal-text">
                    <div className='task-modal-title'>
                        <h2>{taskObj.title}</h2>
                    </div>
                    <div className="task-modal-body">

                        {isEditing ? (
                                <input
                                className='modal-input-desc'
                                type="text"
                                value={description}
                                onChange={handleDescriptionChange}
                                onBlur={handleSave} // Save on losing focus
                                autoFocus
                            />
                        ) : (
                            <p onClick={handleDescriptionClick}>
                                {description}
                            </p>
                        )}

                    </div>
                </div>
                <div className='task-modal-buttons'>
                    <button 
                        className='modal-buttons modal-cancel'
                        onClick={() => changeState()}
                    >CANCEL</button>
                    <button 
                        className='modal-buttons'
                        onClick={handleSave}
                    >SAVE</button>
                </div>
            </div>
        </div>
    )
}

export default TaskModal