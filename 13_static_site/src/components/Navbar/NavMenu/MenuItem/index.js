import React from 'react';
import MdPerson from 'react-icons/lib/md/person';
import MdCardTravel from 'react-icons/lib/md/card-travel';
import MdChatBubbleOutline from 'react-icons/lib/md/chat-bubble-outline';
import MdFavoriteBorder from 'react-icons/lib/md/favorite-border';
import MdCardGiftcard from 'react-icons/lib/md/card-giftcard';
import MdHome from 'react-icons/lib/md/home';
import PropTypes from 'prop-types';


const MenuItem = (props) => {
    let icon;

    const pickIcon = () => {
        switch(props.icon){
            case "user":
                return <MdPerson/>;
            case "briefcase":
                return <MdCardTravel />;
            case "comment":
                return  <MdChatBubbleOutline />;
            case "heart":
                return <MdFavoriteBorder />;
            case "gift":
                return  <MdCardGiftcard />;
            case "home":
                return <MdHome />
        }
    }


    return (
        <div className="menu-item">
            <div>
                <span>{props.text}</span>
                <p>{props.subText}</p>
            </div>
            <div className="menu-item-icon">
                { pickIcon() }
            </div>
        </div>
    )
}

MenuItem.propTypes = {
    text: PropTypes.text,
    subText: PropTypes.text,
    icon: PropTypes.string
}

export default MenuItem;
