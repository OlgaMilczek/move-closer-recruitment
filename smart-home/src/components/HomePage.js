import { useState } from 'react'; 

import './HomePage.css';

//Component import
import RoomInput from './RoomInput';
import RoomCard from './RoomCard';

function HomePage( { addNewRoom, homeState, delRoom, toggleRoom } ) {
    const [isRoomAdd, setIsRoomAdd] = useState(false);
    const [roomName, setRoomName] = useState('');

    const addRoom = () => {
        if (roomName === '') {
            alert('Enter room name');
        } else {
            setIsRoomAdd(false);
            addNewRoom(roomName);
            setRoomName('');
        }
    };

    const roomsContainer = homeState.roomList.map((room, id) => {
        return <RoomCard key={id} id = {id} room ={room} delRoom = {delRoom} toggleRoom = {toggleRoom}/>;
    });

    return (
        <div className='home-page'>
            <div className='home-page__header'>
                <div className = 'home-page__header__user-info'>
                    <img className = 'home-page__header__user-photo' src='user.png' alt='User 1' />
                    <h2 className = 'heading-text'>Hello {homeState.owner}!</h2>
                    <p className = 'paragraph-text'>Welcome to Home!</p>
                </div>
                <div className='home-page__header__add'>
                    <RoomInput 
                        addRoom = {addRoom} 
                        isRoomAdd ={isRoomAdd}
                        setIsRoomAdd={setIsRoomAdd}
                        roomName = {roomName}
                        setRoomName ={setRoomName}
                    />
                </div>
            </div>
            <div className ='rooms-container'>
                {roomsContainer}
            </div>
        </div>
    );
}

export default HomePage;