import { useState } from 'react';

//Components import
import SwitchSlider from './SwitchSlider';
import TrashButton from './TrashButton';
import DeleteMessage from './DeleteMessage';

import './DeviceCard.css'; 

import availableDevices from '../available-devices';

//Font awsome import for icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DeviceCard(props) {
    const [sliderValue, setSliderValue] = useState(props.device.sliderValue);
    const [deviceRemoved, setDeviceRemoved] = useState(false);
    
    let deviceInfo = null;
    let deviceSlider = null;

    const handleToggle = () => {
        props.toggleDevice(props.id);
    };

    const handleSlider = () => {
        props.setSlider(props.id, sliderValue);
    };

    const handleRangeChange = (e) => {
        const numericValue = Number(e.target.value);
        setSliderValue(numericValue);
    };

    const deleteDevice = () => {
        setDeviceRemoved(false);
        props.deleteDevice(props.id);
    };

    if (props.device.slider) {
        const minRange = props.device.sliderRange[0];
        const maxRange = props.device.sliderRange[1];

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

        const infoText = `${availableDevices[props.device.name].sliderDescription}: 
        ${sliderValue} 
        ${availableDevices[props.device.name].sliderUnits}`;

        deviceInfo = <p className ='device-card__detail'>{infoText}</p>;
    }
    if (!deviceRemoved) {
        return (
            <div className ='device-card'>
                <FontAwesomeIcon icon = {availableDevices[props.device.name].icon} className ='device-card__icon'/>
                <div className ='device-card__info'>
                    <h4 className ='device-card__name'>{props.device.name}</h4>
                    {deviceInfo}
                </div>
                <SwitchSlider toggleAction = {handleToggle} checkedValue = {props.device.powerOn}/>
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
                    deleteAction = {deleteDevice} 
                    CancelAction = {() => setDeviceRemoved(false)} 
                    elementName = {'device'}
                />
            </div>
        );
    }
}

export default DeviceCard;