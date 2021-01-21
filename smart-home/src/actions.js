import actionsTypes from './state-manager/actionsTypes'; 

export const addRoomAction = (newRoom) => (
    {
        type: actionsTypes.ADD_ROOM,
        payload: {
            newRoom,
        }
    }
);

export const deleteRoomAction = (removedRoomId) => (
    {
        type: actionsTypes.REMOVE_ROME,
        payload: {
            removedRoomId,
        }
    }
);

export const toggleRoomAction = (toggledRoomId) => (
    {
        type: actionsTypes.TOGGLE_ROOM,
        payload: {
            toggledRoomId,
        }
    }
);


export const deleteDeviceAction = (roomId , deviceId) => (
    {
        type: actionsTypes.REMOVE_DEVICE,
        payload: {
            roomId,
            deviceId
        }
    }
);

export const toggleDeviceAction = (roomId, deviceId) => (
    {
        type: actionsTypes.TOGGLE_DEVICE,
        payload: {
            roomId,
            deviceId,
        }
    }
);

export const setSlider = (roomId, deviceId, numericValue) => (
    {
        type: actionsTypes.SET_SLIDER,
        payload: {
            roomId,
            deviceId,
            numericValue
        }
    }
);




