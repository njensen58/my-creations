import React, { Component } from 'react';
import ExploreCard from './ExploreCard';
import data from '../../resources/data/data.json';
import './exploreStyle.css';

export default class ExploreContainer extends Component {
    state = {
        data: []
    }

    componentDidMount(){
        this.setState({ data: data.homeSections.explore })
    }

    render(){
        return (
            <div className="explore-container">
                <h1>Explore Airbnb</h1>
                <div className="explore-panels-container">
                    { this.state.data.map((explore, i) =>
                        <ExploreCard
                            key={explore.type + i} 
                            type={ explore.type } 
                            imgType={ explore.imgType }/>
                    )}
                </div>
            </div>
        )
    }
}
