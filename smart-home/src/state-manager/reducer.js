import actionsTypes from './actionsTypes';
import {addRoom, removeRoom, toggleRoom } from './reducerFunctions';

//Reducer for state management. 
const reducer = (state = [], action) => {
    //Switch for different actions on the state. 
    switch (action.type) {

    case actionsTypes.ADD_ROOM: 
        return addRoom(state, action.payload.newRoom);
    case actionsTypes.REMOVE_ROME: 
        return removeRoom(state, action.payload.removedRoomId);

    case actionsTypes.TOGGLE_ROOM: 
        return toggleRoom(state, action.payload.toggledRoomId);
    default:
        return state;
    }
};

export default reducer;
