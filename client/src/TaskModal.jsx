import React, {useState, useRef} from 'react';
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
        // focus the cursor to the end
        setTimeout(() => {
            if (descriptionRef.current) {
                descriptionRef.current.focus();
                const length = descriptionRef.current.value.length;
                descriptionRef.current.setSelectionRange(length, length);
            }
        }, 0);
    };


    // hit enter or escape on textarea
    const handleKey = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            // debugging
            handleSave();
            changeState()
        }
        if (event.key === 'Escape') {
            // debugging
            changeState();
        }
    }


    // set textarea height
    const adjustHeight = (element) => {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    };


    // textarea cursor position helper func
    const descriptionRef = useRef(null);


    // set the description to whatever is updated
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);

        adjustHeight(e.target)
    };


    // handle save of desc
    const handleSave = () => {
        setIsEditing(false);

        // set the task objects description
        const finalDescription = description.trim() === '' ? 'None' : description;
        taskObj.description = finalDescription;

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
                    <div 
                        className="task-modal-body"
                        >

                        {isEditing ? (
                            <textarea
                                className='modal-input-desc'
                                ref={descriptionRef}
                                type="text"
                                value={description}
                                onChange={handleDescriptionChange}
                                onKeyDown={handleKey}
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
                        onClick={() => {
                            handleSave();
                            changeState()
                        }}
                    >SAVE</button>
                </div>
            </div>
        </div>
    )
}

export default TaskModal