import React from 'react';

const Display = ({ text, displayStyle }) => {
    return (
        <div>
            <h3 style={ displayStyle }>{ text }</h3>
        </div>
    )
}

export default Display;
