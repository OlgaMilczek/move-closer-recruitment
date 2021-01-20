import actionsTypes from './actionsTypes'; 

export const addRoomAction = (newRoom) => (
    {
        type: actionsTypes.ADD_ROOM,
        payload: {
            newRoom: newRoom,
        }
    }
);

export const deleteRoomAction = (roomId) => (
    {
        type: actionsTypes.REMOVE_ROME,
        payload: {
            removedRoomId: roomId,
        }
    }
);

export const toggleRoomAction = (roomId) => (
    {
        type: actionsTypes.TOGGLE_ROOM,
        payload: {
            toggledRoomId: roomId,
        }
    }
);



