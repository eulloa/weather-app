import React from 'react';
import Loading from '../assets/loading.svg';

const Spinner = (props) => {
    return (
        <div className="spinner">
            <img src={Loading} />
        </div>
    )
}

export default Spinner;