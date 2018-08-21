import React, { Component } from 'react';
import ExploreContainer from '../ExploreContainer';
import PromoContainer from '../PromoContainer';
import './homeStyle.css';



export default class Home extends Component {
    state = { }
    render(){
        return (
            <div className="home-outer-div">
                <ExploreContainer />
                <PromoContainer
                        mainTitle={"Introducing AirBnB Plus"}
                        imgText={"A new selection of homes verified for quality & comfort."}
                        imgBtnText={"Explore Airbnb Plus homes"}
                        icon={"A plus"}/>
            </div>
        )
    }
}
