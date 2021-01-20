import { useState } from 'react'; 

import './HomePage.css';

//Component import
import RoomInput from './RoomInput';
import RoomCard from './RoomCard';

function HomePage(props) {
    const [isRoomAdd, setIsRoomAdd] = useState(false);
    const [roomName, setRoomName] = useState('');

    const addRoom = () => {
        if (roomName === '') {
            alert('Enter room name');
        } else {
            setIsRoomAdd(false);
            props.addNewRoom(roomName);
            setRoomName('');
        }
    };

    const roomsContainer = props.homeState.roomList.map((room, id) => {
        return <RoomCard key={id} id = {id} room ={room} delRoom = {props.delRoom} toggleRoom = {props.toggleRoom}/>;
    });

    return (
        <div className='home-page'>
            <div className='header'>
                <div className = 'header__user-info'>
                    <img className = 'header__user-photo' src='user.png' alt='User 1' />
                    <h2 className = 'heading-text'>Hello {props.homeState.owner}!</h2>
                    <p className = 'paragraph-text'>Welcome to Home!</p>
                </div>
                <div className='header__add'>
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