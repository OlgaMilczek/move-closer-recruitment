//Font awsome import for icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AddButton( {onClick} ) {
    return <button className='header__button' onClick = {onClick}>
        <FontAwesomeIcon icon={faPlus} />
    </button>;
}

export default AddButton;