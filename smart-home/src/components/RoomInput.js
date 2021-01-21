import { useRef, useEffect } from 'react';  

import AddButton from './AddButton';

function RoomInput({setIsRoomAdd, isRoomAdd, setRoomName, roomName, addRoom }) {
    const cancelInput = useRef(null);

    const handleClickOutside = (e) => {
        if (cancelInput.current !== null && !cancelInput.current.contains(e.target)) {
            setIsRoomAdd(false);
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

    if (!isRoomAdd) {
        return <AddButton onClick = {() => setIsRoomAdd(true)} />;
    } else {
        return <div className='display__flex' ref={cancelInput}>
            <input 
                placeholder= 'Enter room name' 
                onChange = {(e) => setRoomName(e.target.value)}
                value ={roomName}
            />
            <AddButton onClick = {addRoom} />
        </div>;
    }
}

export default RoomInput;