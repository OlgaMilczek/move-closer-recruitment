import { useReducer, useEffect } from 'react'; 
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

//Import public path.
import {publicPath} from './config';

//Import state managements components. 
import reducer from './state-manager/reducer';
import { Home } from './state-manager/class-model';
import * as actions from './actions';
import {  checkLocalStorage, setLocalStorage, getLocalStorage } from './state-manager/localStorageManager';

//Import React components. 
import HomePage from './components/HomePage';
import RoomPage from './components/RoomPage';
import LoaderSpinner from './components/Loader';


const NAME = 'my-smart-home-app';
const USER_NAME = 'Olga';

function App() {
    const [homeState, dispatch] = useReducer(reducer, null);

    const addNewRoom = (roomName) => {
        dispatch(actions.addRoomAction(roomName));
    };

    const delRoom = (roomId) => {
        dispatch(actions.deleteRoomAction(roomId));
    };

    const toggleRoom = (roomId) => {
        dispatch(actions.toggleRoomAction(roomId));
    };

    useEffect(() => {
        if (homeState === null ) { 
            if ( checkLocalStorage(NAME)) {
                const newStorage = getLocalStorage(NAME);
                dispatch(actions.setNewStorage(newStorage));
            } else {
                const newStorage = new Home(USER_NAME);
                dispatch(actions.setNewStorage(newStorage));
            }
        } else {
            setLocalStorage(NAME, homeState);
        }

    }, [homeState]);

    if (homeState === null) {
        return (
            <div className = 'loader'>
                <LoaderSpinner />
            </div>
        );
    }

    return (
        <div className="App">
            <BrowserRouter basename={publicPath}>
                <Switch>
                    <Route exact path="/">
                        <HomePage 
                            homeState = {homeState}
                            addNewRoom = {addNewRoom}
                            delRoom = {delRoom}
                            toggleRoom = {toggleRoom}
                        />
                    </Route >
                    <Route path='/room/:id' component={(m) => RoomPage(m, homeState, dispatch)} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
