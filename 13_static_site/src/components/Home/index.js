import React, { Component } from 'react';
import ExploreContainer from '../ExploreContainer';
import './homeStyle.css';


export default class Home extends Component {
    state = { }
    render(){
        return (
            <div className="home-outer-div">
                <ExploreContainer />
                HOME PAGE
            </div>
        )
    }
}
