import { useState } from 'react';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

//Import React components. 
import DeviceCard from './DeviceCard';
import DeviceInput from './DeviceInput';

import './RoomPage.css';

function RoomPage({ match }, homeState, dispatch) {
    const [isDeviceAdded, setIsDeviceAdded] = useState(false);
    const [deviceName, setDeviceName] = useState('');

    const currentRoomId = Number(match.params.id);
    const currentRoom = homeState.roomList[currentRoomId];

    const deleteDevice = (deviceId) => {
        if (typeof deviceId !== 'number') {
            throw new Error('Device id should be typ of number');
        }
        dispatch(actions.deleteDeviceAction(currentRoomId, deviceId));
    };

    const addDevice = () => {
        if (deviceName === '') {
            alert('Enter device name');
        } else {
            setIsDeviceAdded(false);
            dispatch(actions.addDeviceAction(currentRoomId, deviceName));
            setDeviceName('');
        }
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
        <div className ='room-page'>
            <div className ='room-page__header'>
                <Link to='/' className ='room-page__back'>
                    <FontAwesomeIcon icon = {faArrowLeft} />
                </Link>
                <h3 className ='room-page__name'>{currentRoom.name}</h3>
                <div className='room-page__header__add'>
                    <DeviceInput 
                        addDevice = {addDevice} 
                        isDeviceAdded ={isDeviceAdded}
                        setIsDeviceAdd={setIsDeviceAdded}
                        deviceName = {deviceName}
                        setDeviceName ={setDeviceName}
                    />
                </div>
            </div>
            <div className ='room-page__devices'>
                {devicesContainers}
            </div>

        </div>
    );
}

export default RoomPage;