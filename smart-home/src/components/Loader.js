import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function LoaderSpinner() {
    return(
        <Loader
            type="Oval"
            color="#fff"
            height={100}
            width={100}
            timeout={3000} //3 secs
   
        />
    );
}

export default LoaderSpinner;