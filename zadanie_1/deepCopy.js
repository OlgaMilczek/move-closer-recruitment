/*This function can be use for copy object and classes
(when pass a primitive value it will return primitive value)
It should better then JSON base solutions.
It doesn't re-bind the functions, but it is impossible to guess how they should be bind. */

function deepCopy(objectToCopy) {
    let copied;
    //First we need to check that given argument is an object or array.
    if (typeof objectToCopy !== 'object' || objectToCopy === null) {
        return objectToCopy; //if is non of them we return argument.
    }
    if (Array.isArray(objectToCopy)) {
        //Check that element is and array.
        copied = []; 
    }
    else {
        //Element is an object
        copied = {};
        //Copy prototype of an element.
        Object.setPrototypeOf(copied, Object.getPrototypeOf(objectToCopy));
    }
    //Then for each element in given object/array we should create copy using recurrence
    for (let key in objectToCopy) {
        copied[key] = deepCopy(objectToCopy[key]);
    }
    return copied;
}