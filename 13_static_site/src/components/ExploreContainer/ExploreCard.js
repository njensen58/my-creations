import React from 'react';
import home from '../../resources/imgs/homes-min.jpeg';
import experience from '../../resources/imgs/experiences-min.jpeg';
import restaurant from '../../resources/imgs/restaurants-min.jpeg';
import PropTypes from 'prop-types';

const ExploreCard = ({ type, imgType }) => {
    let icon;
    switch(imgType){
        case "home":
            icon = home;
            break;
        case "experience":
            icon = experience;
            break;
        case "restaurant":
            icon = restaurant
            break;
    }
    return (
        <div className="explore-card">
            <img src={ icon } alt={ imgType } width="40px"/>
            <h3>{ type }</h3>
        </div>
    )
}

ExploreCard.propTypes = {
    type: PropTypes.string,
    imgType: PropTypes.string
}

export default ExploreCard;
