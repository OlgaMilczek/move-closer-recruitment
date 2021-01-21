import './DeleteMessage.css';

function DeleteMessage( {deleteAction, CancelAction, elementName} ) {
    return (
        <div>
            <p className='delete__message' >Are you sure you want to delete this {elementName}? </p>
            <div  className='delete__btn-container'>
                <button className = 'delete__btn' onClick = {deleteAction}>Yes</button>
                <button className = 'delete__btn' onClick = {CancelAction}>No</button>
            </div>
        </div>
    );
}

export default DeleteMessage;