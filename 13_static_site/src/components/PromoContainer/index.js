import React, { Component } from 'react';
import img from '../../resources/imgs/airPlus.jpeg'
import './promoStyle.css';

const PromoContainer = ({ mainTitle,
                          img, imgText,
                          imgBtnText, icon }) => {

    return(
        <div className="promo-container">
            <h1>{ mainTitle }</h1>
            <div className="promo-background">
                <div className="promo-text-container">
                    <p>{ imgText }</p>
                    <button>{ imgBtnText }</button>
                    <span>{ icon }</span>
                </div>
            </div>
        </div>
    )
}

export default PromoContainer;
