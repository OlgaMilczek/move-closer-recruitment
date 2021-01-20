import actionsTypes from './actionsTypes';
import { produce } from 'immer';

//Reducer for state management. 
const reducer = (state, action) => {
    //Switch for different actions on the state. 
    switch (action.type) {

    case actionsTypes.ADD_ROOM: 
        return state.addRoom(action.payload.newRoom);
    case actionsTypes.REMOVE_ROME: 
        return state.removeRoom(action.payload.removedRoomId);

    case actionsTypes.TOGGLE_ROOM: 
        return produce(state, draft => {
            draft.roomList[action.payload.toggledRoomId] = draft.roomList[action.payload.toggledRoomId].toggleRoom();
        });
        
    default:
        return state;
    }
};

export default reducer;
