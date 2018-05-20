import React from 'react';
import MdClear from 'react-icons/lib/md/clear';
import './menuStyle.css';
import PropTypes from 'prop-types';

const SearchMenu = ({ value, handleChange, handleToggle }) => {
    return (
        <div className="search-menu-container">
            <div onClick={ handleToggle } className="close-search"> <MdClear /> <span>Where</span> <span>Clear</span></div>
            <div>
                <input
                    type="search"
                    name="userInput"
                    value={ value }
                    onChange={ handleChange }
                    className="searchInput"/>
            </div>
        </div>
    )
}

SearchMenu.propTypes ={
    value: PropTypes.string,
    handleChange: PropTypes.func,
    handleToggle: PropTypes.func
}

export default SearchMenu;
