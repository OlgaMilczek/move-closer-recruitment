import { useRef, useEffect } from 'react';  

//Font awsome import for icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function RoomInput(props) {
    const cancelInput = useRef(null);

    let addButton = (onClick) => {
        return <button className='header__button' onClick = {onClick}>
            <FontAwesomeIcon icon={faPlus} />
        </button>;
    };

    const handleClickOutside = (e) => {
        if (cancelInput.current !== null && !cancelInput.current.contains(e.target)) {
            props.setIsRoomAdd(false);
        }
    };

    useEffect(() => {
        //Component did mount - add event listener for cancel add room form.
        document.addEventListener('mousedown', handleClickOutside);
        return function cleanUp() {
            //Component did unmount - cleanUp.
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    if (!props.isRoomAdd) {
        return addButton(() => props.setIsRoomAdd(true));
    } else {
        return <div className='header__input' ref={cancelInput}>
            <input 
                placeholder= 'Enter room name' 
                onChange = {(e) => props.setRoomName(e.target.value)}
                value ={props.roomName}
            />
            {addButton(props.addRoom)}
        </div>;
    }
}

export default RoomInput;