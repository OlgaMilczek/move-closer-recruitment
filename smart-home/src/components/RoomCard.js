import { useState } from 'react'; 
import { Link } from 'react-router-dom';

//Font awsome import for icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './RoomCard.css';

function RoomPage(props) {
    const [roomRemoved, setRoomRemoved] = useState(false);
    const handleToggle = () => {
        props.toggleRoom(props.id);
    };

    const deleteRoom = () => {
        props.delRoom(props.id);
    };

    if (!roomRemoved) {
        return (
            <div className = 'room'>
                <Link to={`/room/${props.id}`}>
                    <h4 className='room__name'>{props.room.name}</h4>
                </Link>
                <p className = 'room__devices'>{props.room.deviceList.length} devices</p>
                <button className = 'delBtn' onClick = {() => setRoomRemoved(true)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
                <label className="switch">
                    <input type="checkbox" id="togBtn" onChange ={handleToggle} checked = {props.room.roomSwitchOn}/>
                    <div className="slider round">
                        <span className="on">On</span>
                        <span className="off">Off</span>
                    </div>
                </label>
            </div>
        );
    } else {
        return (
            <div className = 'room'>
                <p className='room__message' >Are you sure you want to delete this room? </p>
                <div  className='room__btn-container'>
                    <button className = 'room__btn' onClick = {deleteRoom}>Yes</button>
                    <button className = 'room__btn' onClick = {() => setRoomRemoved(false)}>No</button>
                </div>
            </div>
        );
    }
}

export default RoomPage;