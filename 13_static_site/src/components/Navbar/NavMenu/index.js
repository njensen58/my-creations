import React from 'react';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';
import './navMenuStyle.css';

const NavMenu = ({ data, visible }) => {
    const { part1, part2, part3, part4 } = data.mobileMenu;


    return (
        <div style={{height: visible ? '100vh' : '0', transition: '.5'}} className="navmenu-container" >
            <div>
                { part1.map((item, i) => <MenuItem key={item+i} text={ item.text } subText={ item.subText } icon={ item.icon }/>) }
            </div>
            <div>
                { part2.map((item, i) => <MenuItem key={item+i} text={ item.text } subText={ item.subText } icon={ item.icon }/>) }
            </div>
            <div>
                { part3.map((item, i) => <MenuItem key={item+i} text={ item.text } subText={ item.subText } icon={ item.icon }/>) }
            </div>
            <div>
                { part4.map((item, i) => <MenuItem key={item+i} text={ item.text } subText={ item.subText } icon={ item.icon }/>) }
            </div>
        </div>
    )
}

NavMenu.propTypes = {
    data: PropTypes.object
}


export default NavMenu;
