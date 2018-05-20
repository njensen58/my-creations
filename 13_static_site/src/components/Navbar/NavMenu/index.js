import React from 'react';
import MenuItem from './MenuItem';
import './navMenuStyle.css';

const NavMenu = ({ data, visible }) => {
    const { part1, part2, part3, part4 } = data.mobileMenu;


    return (
        <div className="navmenu-container" >
            <div>
                { part1.map((item, i) =>
                        <MenuItem
                            key={item+i}
                            text={item.text}
                            subText={item.subText}
                            icon={item.icon}/>)
                }
            </div>
            <div>
                { part2.map((item, i) =>
                        <MenuItem
                            key={item+i}
                            text={item.text}
                            subText={item.subText}
                            icon={item.icon}/>)
                }
            </div>
            <div>
                { part3.map((item, i) =>
                        <MenuItem
                            key={item+i}
                            text={item.text}
                            subText={item.subText}
                            icon={item.icon}/>)
                }
            </div>
            <div>
                { part4.map((item, i) =>
                        <MenuItem
                            key={item+i}
                            text={item.text}
                            subText={item.subText}
                            icon={item.icon}/>)
                }
            </div>
        </div>
    )
}

export default NavMenu;
