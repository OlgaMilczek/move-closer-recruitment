import './TrashButton.css';

//Font awsome import for icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TrashButton( { onClick } ) {

    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
    };

    return <button className = 'delBtn' onClick = {handleClick}>
        <FontAwesomeIcon icon={faTrash}/>
    </button>;
}

export default TrashButton;