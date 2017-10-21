import React from 'react';
import AttentionIcon from '../assets/attention.svg';

export default Error = ({text}) => {
    return (
        <div className="errorContainer">
            <img src={AttentionIcon} />
            <p>{text}</p>
        </div>
    );
}