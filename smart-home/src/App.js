import {useState, useEffect, useReducer } from 'react'; 
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import reducer from './state-manager/reducer';

function App() {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <div className="App">
        </div>
    );
}

export default App;
