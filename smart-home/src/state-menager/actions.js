import produce from 'immer';

//Function to adding new room to state
function addRoom(oldRooms, newRoom) {
    //Used immer to create new rooms state
    return produce(oldRooms, draftRooms => {
        draftRooms.push(newRoom);
    });
}

//Function for inimitable delete rooms
function removeRoom(oldRooms, deletedRoomId) {
    return produce(oldRooms, draftRooms => {
        draftRooms = [
            ...draftRooms.slice(0, deletedRoomId),
            ...draftRooms.slice(deletedRoomId+1)
        ];
    });
}

function toggleRoom(toggledRoom) {
    return;
}

export {addRoom, removeRoom, toggleRoom };