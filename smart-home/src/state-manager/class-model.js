import {immerable, produce} from 'immer';
import { v4 as uuidv4 } from 'uuid';

import availableDevices from '../available-devices';

//File for class model for state-structure. 

class Device {

    constructor(name) {
        /*Device constructor get one arguments name: 
        string, rest of arguments are taken from availableDevices file.
        Device is immerable class to ensure state immutable*/
        if (availableDevices[name] === undefined) {
            throw new Error('No such device!');
        }
        this[immerable] = true;
        this.name = availableDevices[name].name;
        this.slider = availableDevices[name].slider; 
        this.isNonToggled = availableDevices[name].isNonToggled;
        this.powerOn = true;
        this.id = uuidv4();
        if (this.slider) {
            this.sliderValue = availableDevices[name].defaultValue;
            this.sliderRange = availableDevices[name].sliderRange;
        }
    }

    toggleSwitch() {
        return produce(this, draft => {
            draft.powerOn = !draft.powerOn;
        });
    }

    setSliderValue(newValue) {
        return produce(this, draft => {
            if (draft.slider) {
                draft.sliderValue = newValue;
            }
        });
    }
}

class Room {
    constructor(name) {
        /*Room constructor get one arguments name: string
        Room is immerable class to ensure state immutable*/
        this[immerable] = true;
        this.name = name; 
        this.deviceList = [];
        this.roomSwitchOn = true;
        //this.previously Power On are use for store previous room configuration after room toggling. 
        this.previouslyPowerOn = [];
    }

    addDevice(name) {
        //This function return new Room with added device
        let newDevice = new Device(name);

        return produce(this, draft => {
            draft.deviceList.push(newDevice);
        });
    }

    removeDevice(deviceId) {
        //This function return new Room with removed device
        return produce(this, draft => {
            draft.deviceList.splice(deviceId, 1);
        });
    }

    toggleRoom() {
        //This function return new Room object with toggled devices. 
        //Devices which can not be switch of from room level are still running. 
        return produce (this, draft => {
            if (this.roomSwitchOn) {
                /*When room is switch on current state is move to previous state
                 and device which can be switch off are switch off. */
                draft.roomSwitchOn = false;
                // Save ids of devices powered on.
                draft.previouslyPowerOn = draft.deviceList.filter(device => device.powerOn).map(device => device.id);
                draft.deviceList = draft.deviceList.map(device => {
                    // Don't turn off if important || or if turned off already
                    if (device.isNonToggled || !device.powerOn) {
                        return device;
                    } else { 
                        return device.toggleSwitch();
                    }
                });
            } else {
                draft.deviceList = draft.deviceList.map(device => {
                    // Don't turn on if turned on && only if was turned on before
                    if (!device.powerOn && draft.previouslyPowerOn.includes(device.id)) {
                        return device.toggleSwitch();
                    } else { 
                        return device;
                    }
                });
                draft.previouslyPowerOn = [];
                draft.roomSwitchOn = true;
            }
        });
    }
}

class Home {
    constructor(owner) {
        /*Home is constructor get one arguments owner: string 
        (in future after adding log in function, 
        can get an object with id and photo and so on)
        Home is immerable class to ensure state immutable*/
        this[immerable] = true;

        this.owner = owner;
        this.roomList = [];

        this.createDefaultRoom('Living room');
    }

    addRoom(roomName) {
        let newRoom = new Room(roomName);

        return produce(this, draft => {
            draft.roomList.push(newRoom);
        });
    }

    removeRoom(roomId) {
        return produce(this, draft => {
            draft.roomList.splice(roomId, 1);
        });
    }

    createDefaultRoom(name) {
        //Function to create room example
        //Can be only run by constructor.
        let defaultRoom = new Room(name);
        let fridge = new Device('Fridge');
        let lamp = new Device('Lamp');
        let TV = new Device('TV');

        let defaultWC = new Room('Bathroom');
        let lampWC = new Device('Lamp');

        defaultRoom.deviceList.push(fridge);
        defaultRoom.deviceList.push(lamp);
        defaultRoom.deviceList.push(TV);

        defaultWC.deviceList.push(lampWC);

        this.roomList.push(defaultRoom);
        this.roomList.push(defaultWC);
    }

}

export {Home, Room, Device}; 