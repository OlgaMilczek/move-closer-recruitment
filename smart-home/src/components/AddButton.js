//Font awsome import for icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './AddButton.css';

function AddButton( {onClick} ) {
    return <button className='add__button' onClick = {onClick}>
        <FontAwesomeIcon icon={faPlus} />
    </button>;
}

export default AddButton;