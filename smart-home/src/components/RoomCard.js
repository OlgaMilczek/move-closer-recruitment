import { useState } from 'react'; 
import { Link } from 'react-router-dom';

//Components import
import SwitchSlider from './SwitchSlider';
import TrashButton from './TrashButton';
import DeleteMessage from './DeleteMessage';

import './RoomCard.css';

function RoomCard({id, room , toggleRoom, delRoom }) {
    const [roomRemoved, setRoomRemoved] = useState(false);
    const handleToggle = () => {
        toggleRoom(id);
    };

    const deleteRoom = () => {
        delRoom(id);
        setRoomRemoved(false);
    };

    if (!roomRemoved) {
        return (
            <Link to={`/room/${id}`}>
                <div className = 'room'>
                    <h4 className='room__name'>{ room.name }</h4>
                    <p className = 'room__devices'>{ room.deviceList.length } devices</p>
                    <div className = 'room__trash'>
                        <TrashButton onClick = { () => setRoomRemoved(true) } />
                    </div>
                    <SwitchSlider toggleAction = {handleToggle} checkedValue = { room.roomSwitchOn }/>
                </div>
            </Link>
        );
    } else {
        return (
            <div className = 'room'>
                <DeleteMessage  
                    deleteAction = {deleteRoom} 
                    CancelAction = {() => setRoomRemoved(false)} 
                    elementName = {'room'}
                />
            </div>
        );
    }
}

export default RoomCard;