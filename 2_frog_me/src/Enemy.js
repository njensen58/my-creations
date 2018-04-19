import React from 'react';

class Enemy extends React.Component {
    constructor(){
        super();
        this.state = {
            startY: '',
            x: 0,
            forward: true
        }
        this.enemyMovement = this.enemyMovement.bind(this);
    }

    /*This checks on every update to see if a collision has occured with frog.  + and - 38 is
    because the enemy is 50px wide and this.state.x is the center of the enemy*/
    componentWillUpdate(){
        if(((this.state.x + 38 > this.props.frogX) && (this.state.x - 38 < this.props.frogX)) && ((this.props.startPosY + 38 > this.props.frogY) && (this.props.startPosY - 38 < this.props.frogY))){
            this.props.startOver();
        }
    }

    componentDidMount(){
        {/*creates random speed for enemy and sets is staring position passed from parent*/}
        let velocity = Math.floor(Math.random() * (200 - 100)) + 100;
        this.setState({
            startY: this.props.startPosY,
            x: this.props.startPosX
        })
        setInterval(this.enemyMovement, velocity);
    }


    enemyMovement(){
        if(this.state.x < 260 && this.state.forward){
            this.setState(prevState => ({
                x: prevState.x + 10
            }))
        } else if(this.state.x <= 260){
            this.setState(prevState => ({
                forward: false,
                x: prevState.x - 10
            }))
        }
        if(this.state.x === -10){
            this.setState({
                forward: true
            })
        }
    }

    render(){
        return (
            <div style={{
                     height: '50px',
                     width: '50px',
                     position: 'absolute',
                     top: this.state.startY,
                     left: this.state.x,
                     transition: '.5s',
                     borderRadius: '4px'
                 }}>
                 <div className="crab"></div>
            </div>
        )
    }
}

export default Enemy;
