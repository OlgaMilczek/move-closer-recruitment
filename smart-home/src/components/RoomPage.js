import { Link } from 'react-router-dom';

import * as actions from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import DeviceCard from './DeviceCard';

import './RoomPage.css';

function RoomPage({ match }, homeState, dispatch) {
    const currentRoomId = Number(match.params.id);
    const currentRoom = homeState.roomList[currentRoomId];

    const deleteDevice = (deviceId) => {
        if (typeof deviceId !== 'number') {
            throw new Error('Device id should be typ of number');
        }
        dispatch(actions.deleteDeviceAction(currentRoomId, deviceId));
    };

    const toggleDevice = (deviceId) => {
        if (typeof deviceId !== 'number') {
            throw new Error('Device id should be typ of number');
        }
        dispatch(actions.toggleDeviceAction(currentRoomId, deviceId));
    };

    const setSlider = (deviceId, numericValue) => {
        if (typeof numericValue !== 'number') {
            throw new Error('Value should be typ of number');
        } else if (typeof deviceId !== 'number') {
            throw new Error('Device id should be typ of number');
        }
        dispatch(actions.setSlider(currentRoomId, deviceId, numericValue));
    };

    const devicesContainers = currentRoom.deviceList.map((device, id) => {
        return <DeviceCard 
            key={id} 
            id = {id} 
            device ={device} 
            toggleDevice = {toggleDevice} 
            setSlider = {setSlider}
            deleteDevice = {deleteDevice}
        />;
    });

    return (
        <div className ='room-side'>
            <div className ='room-side__header'>
                <Link to='/' className ='room-side__back'>
                    <FontAwesomeIcon icon = {faArrowLeft} />
                </Link>
                <h3 className ='room-side__name'>{currentRoom.name}</h3>
            </div>
            <div className ='room-side__devices'>
                {devicesContainers}
            </div>

        </div>
    );
}

export default RoomPage;