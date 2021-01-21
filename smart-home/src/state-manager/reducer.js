import actionsTypes from './actionsTypes';
import { produce } from 'immer';

//Reducer for state management. 
const reducer = (state, action) => {
    //Switch for different actions on the state. 
    switch (action.type) {

    case actionsTypes.SET_STORAGE: 
        return action.payload.newStorage;

    case actionsTypes.ADD_ROOM: 
        return state.addRoom(action.payload.newRoom);
    case actionsTypes.REMOVE_ROME: 
        return state.removeRoom(action.payload.removedRoomId);

    case actionsTypes.TOGGLE_ROOM: 
        return produce(state, draft => {
            draft.roomList[action.payload.toggledRoomId] = draft.roomList[action.payload.toggledRoomId].toggleRoom();
        });

    case actionsTypes.ADD_DEVICE: 
        return produce(state, draft => {
            const roomId = action.payload.roomId;
            const deviceName = action.payload.deviceName;
            draft.roomList[roomId] =  draft.roomList[roomId].addDevice(deviceName);
        });

    case actionsTypes.REMOVE_DEVICE: 
        return produce(state, draft => {
            const roomId = action.payload.roomId;
            const deviceId = action.payload.deviceId;
            draft.roomList[roomId] =  draft.roomList[roomId].removeDevice(deviceId);
        });
        
    case actionsTypes.TOGGLE_DEVICE:
        return produce(state, draft => {
            const roomId = action.payload.roomId;
            const deviceId = action.payload.deviceId;
            draft.roomList[roomId].deviceList[deviceId] = draft.roomList[roomId].deviceList[deviceId].toggleSwitch();
        });

    case actionsTypes.SET_SLIDER:
        return produce(state, draft => {
            const roomId = action.payload.roomId;
            const deviceId = action.payload.deviceId;
            const sliderValue = action.payload.numericValue;
            draft.roomList[roomId].deviceList[deviceId] = draft.roomList[roomId].deviceList[deviceId].setSliderValue(sliderValue);
        });

    default:
        return state;
    }
};

export default reducer;
