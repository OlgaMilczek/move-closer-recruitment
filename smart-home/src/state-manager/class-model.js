import {immerable, produce} from 'immer';

//File for class model for state-structure. 

class Device {

    constructor(name, slider, isNonToggled) {
        /*Device constructor get three arguments name: 
        string, slider: boolean, isNonToggled: boolean
        Divice is immerable class to ensure state immutable*/
        this[immerable] = true;
        this.name = name;
        this.slider = slider; 
        this.isNonToggled = isNonToggled;
        this.powerOn = true;
        if (this.slider) {
            this.sliderValue = 0;
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
        //this.previousState are use for store previous room configuration after room toggling. 
        this.previousState = [];
    }

    addDevice(name, slider, isNonToggled) {
        //This function return new Room with added device
        let newDevice = new Device(name, slider, isNonToggled);

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
                draft.previousState = draft.deviceList;
                draft.deviceList = draft.deviceList.map(device => {
                    if (device.isNonToggled) {
                        return device;
                    } else {
                        return device.toggleSwitch();
                    }
                });
            } else {
                draft.deviceList =  draft.previousState; 
                draft.previousState = [];
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
        let defaultRoom = new Room(name);
        let fridge = new Device('fridge', false, true);
        let lamp = new Device('lamp', true, false);

        defaultRoom.deviceList.push(fridge);
        defaultRoom.deviceList.push(lamp);

        this.roomList.push(defaultRoom);
    }

}

export {Home, Room, Device}; 