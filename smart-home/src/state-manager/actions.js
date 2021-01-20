import actionsTypes from './actionsTypes'; 

export const addRoom = (newRoom) => (
    {
        type: actionsTypes.ADD_ROOM,
        payload: {
            newRoom: newRoom,
        }
    }
);

