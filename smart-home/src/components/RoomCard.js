import { useState } from 'react'; 
import { Link } from 'react-router-dom';

//Components import
import SwitchSlider from './SwitchSlider';
import TrashButton from './TrashButton';
import DeleteMessage from './DeleteMessage';

import './RoomCard.css';

function RoomCard(props) {
    const [roomRemoved, setRoomRemoved] = useState(false);
    const handleToggle = () => {
        props.toggleRoom(props.id);
    };

    const deleteRoom = () => {
        props.delRoom(props.id);
        setRoomRemoved(false);
    };

    if (!roomRemoved) {
        return (
            <Link to={`/room/${props.id}`}>
                <div className = 'room'>
                    <h4 className='room__name'>{props.room.name}</h4>
                    <p className = 'room__devices'>{props.room.deviceList.length} devices</p>
                    <div className = 'room__trash'>
                        <TrashButton onClick = { () => setRoomRemoved(true) } />
                    </div>
                    <SwitchSlider toggleAction = {handleToggle} checkedValue = {props.room.roomSwitchOn}/>
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