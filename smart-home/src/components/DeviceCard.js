import { useState } from 'react';

//Components import
import SwitchSlider from './SwitchSlider';
import TrashButton from './TrashButton';
import DeleteMessage from './DeleteMessage';

import './DeviceCard.css'; 

import availableDevices from '../available-devices';

//Font awsome import for icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DeviceCard({device, toggleDevice, setSlider, deleteDevice , id  }) {
    const [sliderValue, setSliderValue] = useState(device.sliderValue);
    const [deviceRemoved, setDeviceRemoved] = useState(false);
    
    let deviceInfo = null;
    let deviceSlider = null;

    const handleToggle = () => {
        toggleDevice(id);
    };

    const handleSlider = () => {
        setSlider(id, sliderValue);
    };

    const handleRangeChange = (e) => {
        const numericValue = Number(e.target.value);
        setSliderValue(numericValue);
    };

    const deleteThisDevice = () => {
        setDeviceRemoved(false);
        deleteDevice( id );
    };

    if (device.slider) {
        const [minRange, maxRange] = device.sliderRange;

        deviceSlider = <div className = 'device-card__slider'>
            <input 
                type = "range" 
                min = {minRange} 
                max = {maxRange} 
                value = {sliderValue} 
                onMouseUp = {handleSlider} 
                onTouchEnd = {handleSlider} 
                onChange = {handleRangeChange}
            />
        </div>;

        const infoText = `${availableDevices[device.name].sliderDescription}: 
        ${sliderValue} 
        ${availableDevices[device.name].sliderUnits}`;

        deviceInfo = <p className ='device-card__detail'>{infoText}</p>;
    }
    if (!deviceRemoved) {
        return (
            <div className ='device-card'>
                <FontAwesomeIcon icon = {availableDevices[device.name].icon} className ='device-card__icon'/>
                <div className ='device-card__info'>
                    <h4 className ='device-card__name'>{device.name}</h4>
                    {deviceInfo}
                </div>
                <SwitchSlider toggleAction = {handleToggle} checkedValue = {device.powerOn}/>
                {deviceSlider}
                <div className = 'device-card__trash'>
                    <TrashButton onClick = {() => setDeviceRemoved(true)} />
                </div>
            </div>
        );
    } else {
        return (
            <div className = 'device-card__delete'>
                <DeleteMessage  
                    deleteAction = {deleteThisDevice}
                    CancelAction = {() => setDeviceRemoved(false)} 
                    elementName = {'device'}
                />
            </div>
        );
    }
}

export default DeviceCard;