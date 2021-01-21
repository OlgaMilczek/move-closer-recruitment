import { useReducer } from 'react'; 
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

//Import public path.
import {publicPath} from './config';

//Import state managements components. 
import reducer from './state-manager/reducer';
import { Home } from './state-manager/class-model';
import * as actions from './actions';

//Import React components. 
import HomePage from './components/HomePage';
import RoomPage from './components/RoomPage';

function App() {
    const [homeState, dispatch] = useReducer(reducer, new Home('Olga'));

    const addNewRoom = (roomName) => {
        dispatch(actions.addRoomAction(roomName));
    };

    const delRoom = (roomId) => {
        dispatch(actions.deleteRoomAction(roomId));
    };

    const toggleRoom = (roomId) => {
        dispatch(actions.toggleRoomAction(roomId));
    };

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
