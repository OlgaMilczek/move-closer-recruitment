import { useRef, useEffect } from 'react';  

import AddButton from './AddButton';

function RoomInput(props) {
    const cancelInput = useRef(null);

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
        return <AddButton onClick = {() => props.setIsRoomAdd(true)} />;
    } else {
        return <div className='display__flex' ref={cancelInput}>
            <input 
                placeholder= 'Enter room name' 
                onChange = {(e) => props.setRoomName(e.target.value)}
                value ={props.roomName}
            />
            <AddButton onClick = {props.addRoom} />
        </div>;
    }
}

export default RoomInput;