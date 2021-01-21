import { useRef, useEffect } from 'react';  

import AddButton from './AddButton';

import availableDevices from '../available-devices';

function DeviceInput({ addDevice, isDeviceAdded, setIsDeviceAdd, deviceName, setDeviceName }) {
    const cancelInput = useRef(null);
    const deviceOption = [];
    let optionNr = 1;

    const handleClickOutside = (e) => {
        if (cancelInput.current !== null && !cancelInput.current.contains(e.target)) {
            setIsDeviceAdd(false);
        }
    };

    useEffect(() => {
        //Component did mount - add event listener for cancel add device form.
        document.addEventListener('mousedown', handleClickOutside);
        return function cleanUp() {
            //Component did unmount - cleanUp.
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    const defaultOptionValue = <option value="" key = {0} disabled = {true} hidden = {true}>Choose device</option>;
    deviceOption.push(defaultOptionValue);

    for (let propName in availableDevices) {
        let key = optionNr++;
        const option = <option key = {key} value={propName}>{propName}</option>;
        deviceOption.push(option);
    }

    if (!isDeviceAdded) {
        return <AddButton onClick = {() => setIsDeviceAdd(true)} />;
    } else {
        return <div className='display__flex' ref={cancelInput}>
            <select className='margin-left-right-1' onChange = {(e) => setDeviceName(e.target.value)}>
                {deviceOption}
            </select>
            <AddButton onClick = {() => addDevice(deviceName)} />
        </div>;
    }
}

export default DeviceInput;