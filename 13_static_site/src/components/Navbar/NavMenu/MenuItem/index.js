import React from 'react';
import MdPerson from 'react-icons/lib/md/person';
import MdCardTravel from 'react-icons/lib/md/card-travel';
import MdChatBubbleOutline from 'react-icons/lib/md/chat-bubble-outline';
import MdFavoriteBorder from 'react-icons/lib/md/favorite-border';
import MdCardGiftcard from 'react-icons/lib/md/card-giftcard';


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

export default MenuItem;
