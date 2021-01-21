import { Home, Room, Device } from './class-model';

import {immerable} from "immer";

function checkLocalStorage(elementName) {
    return !!localStorage.getItem(elementName);
}

function setLocalStorage(elementName, element) {
    const oldStorage = localStorage.getItem(elementName);
    const newStorage = JSON.stringify(element);
    if (oldStorage === newStorage) return false;
    localStorage.setItem(elementName, JSON.stringify(element));
    return true;
}

function getLocalStorage(elementName) {
    const storedProjects = JSON.parse(localStorage.getItem(elementName));
    Object.setPrototypeOf(storedProjects, Home.prototype);
    storedProjects[immerable] = true;

    for (let room of storedProjects.roomList) {
        room[immerable] = true;
        Object.setPrototypeOf(room , Room.prototype);
        for (let device of room.deviceList) {
            device[immerable] = true;
            Object.setPrototypeOf(device , Device.prototype);
        }
    }
    return storedProjects;
}

export { checkLocalStorage, setLocalStorage, getLocalStorage };