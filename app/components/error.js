import React from 'react';

export default Error = ({text}) => {
    return (
        <div className="errorContainer">
            <p>{text}</p>
        </div>
    );
}