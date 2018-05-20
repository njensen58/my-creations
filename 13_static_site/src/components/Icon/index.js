import React from 'react';
import PropTypes from 'prop-types';
import './iconStyle.css';

const Icon = ({ icon, menuIconDown, visible, handleDropDown }) => {

    const iconToggle = {
        down: {
            transform: "rotateZ(0deg)",
            transition: '.4s'
        },
        up: {
            transform: "rotateZ(180deg)",
            transition: '.4s'
        }
    }

    return (
        <div className="iconContainer">
            <img src={ icon } alt="Logo"/>
            <div onClick={ handleDropDown }>
                { menuIconDown
                    ? <div style={
                        !visible
                            ? iconToggle.down
                            : iconToggle.up
                        }> { menuIconDown() } </div>
                    : null }
            </div>
        </div>
    )
}

Icon.propTypes = {
    icon: PropTypes.string,
    menuIconDown: PropTypes.func,
    visible: PropTypes.bool,
    handleDropDown: PropTypes.func
}

export default Icon;
