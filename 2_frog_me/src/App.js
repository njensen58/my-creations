import React from 'react';
import Frog from './Frog';
import Enemy from './Enemy';
import Log from './Log';
import grass from './resources/grass.jpeg';
import water from './resources/water.jpg';
import frog from './resources/frog.png';


class App extends React.Component {
    constructor(){
        super();
        this.state = {
            frogX: 125,
            frogY: 448,
            stageOver: false,
            score: 0,
            lives: 5,
            died: false,
            gameOver: false
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleMoveUp = this.handleMoveUp.bind(this);
        this.handleMoveRight = this.handleMoveRight.bind(this);
        this.handleMoveLeft = this.handleMoveLeft.bind(this);
        this.startOver = this.startOver.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }


    /*Checks to see if the player died which sets stageOver to true,*/
        /*and this moves the frog back to beginning position*/
    componentWillUpdate(){
        if(this.state.stageOver){
            this.setState({
                frogX: 125,
                frogY: 448,
                stageOver: false
            })
        }
        if(this.state.died){
            this.setState(prevState => ({
                lives: prevState.lives - .5,
                died: false
            }))
        }
        if(this.state.lives === 0 && !this.state.gameOver){
            this.gameOver();
        }
    }

    componentDidMount(){
        window.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount(){
        window.removeEventListener("keydown", this.handleKeyPress);
    }

    handleKeyPress(e){
        if(e.key === "ArrowUp"){
            this.handleMoveUp();
        }
        if(e.key === "ArrowRight"){
            this.handleMoveRight();
        }
        if(e.key === "ArrowLeft"){
            this.handleMoveLeft();
        }
    }

    /* FROG CONTROLS */
    handleMoveUp(){
        if(!this.state.stageOver){
            if(this.state.frogY >= 25){
                this.setState(prevState => ({
                    frogY: prevState.frogY - 50
                }))
            }
            if(this.state.frogY <= 0){
                this.setState(prevState => ({
                    stageOver: true,
                    score: prevState.score + 1
                }))
            }
        }
    }

    /* FROG CONTROLS */
    handleMoveRight(){
        if(this.state.frogX > -25 && this.state.frogX < 250){
            this.setState(prevState => ({
                frogX: prevState.frogX + 25
            }))
        }
    }

    /* FROG CONTROLS */
    handleMoveLeft(){
        if(this.state.frogX < 325 && this.state.frogX > 10){
            this.setState(prevState => ({
                frogX: prevState.frogX - 25
            }))
        }
    }



    /* Moves frog to starting position*/
    startOver(){
        this.setState({
            frogX: 125,
            frogY: 448,
            died: true
        })
    }

    gameOver(){
        this.setState({
            gameOver: true
        })
    }



    render(){
    /* y axis positions for 4 enemies and 4 logs*/
        const enemyPositionsY = {
            one: 48,
            two: 148,
            three: 248,
            four: 348
        }
    /*Enemy starting x axis positions so they start at different places*/
        const enemyPositionsX = {
            one: 50,
            two: 200,
            three: 150,
            four: 0
        }
        const logY = {
            one: 100,
            two: 200,
            three: 300,
            four: 400
        }
        const scoreStyle = {
            position: 'absolute',
            height: '50px',
            width: '50px',
            borderRight: '1px solid black',
            backgroundSize: 'cover'
        }

        return (
            <div className="gameContainer">
                {!this.state.gameOver ?
                <div>
                    <h1 style={{fontWeight: 'lighter', letterSpacing: '1px', textAlign: 'center'}}>
                        {this.state.score < 6 ? 'FROG.me' : 'Holy shit, 6 frogs!'}
                    </h1>
                <div className="gameBoard">


                    {/** The next 6 divs are just to add a frog image to the top of the page if you score*/}
                    <div style={{
                            ...scoreStyle,
                            marginLeft: '1px',
                            backgroundImage: this.state.score >= 1 ? 'url(' + frog + ')' : null}}>
                    </div>
                    <div style={{
                            ...scoreStyle,
                            marginLeft: '51px',
                            backgroundImage: this.state.score >= 2 ? 'url(' + frog + ')' : null}}>
                    </div>
                    <div style={{
                            ...scoreStyle,
                            marginLeft: '102px',
                            backgroundImage: this.state.score >= 3 ? 'url(' + frog + ')' : null}}>
                    </div>
                    <div style={{
                            ...scoreStyle,
                            marginLeft: '153px',
                            backgroundImage: this.state.score >= 4 ? 'url(' + frog + ')' : null}}>
                    </div>
                    <div style={{
                            ...scoreStyle,
                            marginLeft: '204px',
                            backgroundImage: this.state.score >= 5 ? 'url(' + frog + ')' : null}}>
                    </div>
                    <div style={{
                            ...scoreStyle,
                            marginLeft: '255px',
                            backgroundImage: this.state.score >= 6 ? 'url(' + frog + ')' : null}}>
                    </div>


                    {/*Grass divs corresponding to grid set by .gameBoard in css file*/}
                    <div style={{background: `url(` + grass + ')', gridRow: '2', gridColumn: '1 / -1'}}></div>
                    <div style={{background: `url(` + grass + ')', gridRow: '4', gridColumn: '1 / -1'}}></div>
                    <div style={{background: `url(` + grass + ')', gridRow: '6', gridColumn: '1 / -1'}}></div>
                    <div style={{background: `url(` + grass + ')', gridRow: '8', gridColumn: '1 / -1'}}></div>
                    <div style={{background: `url(` + grass + ')', gridRow: '10', gridColumn: '1 / -1'}}></div>


                    {/*Water Divs and log Components.  Log and enemy components are given frogX and frogY so collisions can be determined*/}
                    <div style={{
                            background: 'url(' + water + ')',
                            gridRow: '3',
                            gridColumn: '1 / -1',
                            position: 'relative',
                            backgroundSize: 'cover'}}>
                    </div>
                        <Log
                            frogX={this.state.frogX}
                            frogY={this.state.frogY}
                            logY={logY.one}
                            startOver={this.startOver}
                        />
                    <div style={{
                            background: 'url(' + water + ')',
                            gridRow: '5',
                            gridColumn: '1 / -1',
                            position: 'relative',
                            backgroundSize: 'cover'}}>
                    </div>
                        <Log
                            frogX={this.state.frogX}
                            frogY={this.state.frogY}
                            logY={logY.two}
                            startOver={this.startOver}
                        />
                    <div style={{
                            background: 'url(' + water + ')',
                            gridRow: '7',
                            gridColumn: '1 / -1',
                            position: 'relative',
                            backgroundSize: 'cover'}}>
                    </div>
                        <Log
                            frogX={this.state.frogX}
                            frogY={this.state.frogY}
                            logY={logY.three}
                            startOver={this.startOver}
                        />
                    <div style={{
                            background: 'url(' + water + ')',
                            gridRow: '9',
                            gridColumn: '1 / -1',
                            position: 'relative',
                            backgroundSize: 'cover'}}>
                    </div>
                        <Log
                            frogX={this.state.frogX}
                            frogY={this.state.frogY}
                            logY={logY.four}
                            startOver={this.startOver}
                        />

                    {/*Game Container Div that holds frog and enemies*/}
                    <div style={{
                             position: 'relative',
                             height: '500px',
                             width: '305px',
                             border: '2px solid #444',
                             borderRadius: '3px',
                             gridColumn: '1 / -1'
                         }}>

                        <Frog
                            frogY={this.state.frogY}
                            frogX={this.state.frogX}
                        />

                        <Enemy
                            startPosY={enemyPositionsY.one}
                            startPosX={enemyPositionsX.one}
                            frogY={this.state.frogY}
                            frogX={this.state.frogX}
                            startOver={this.startOver}
                        />
                        <Enemy
                            startPosY={enemyPositionsY.two}
                            startPosX={enemyPositionsX.two}
                            frogY={this.state.frogY}
                            frogX={this.state.frogX}
                            startOver={this.startOver}
                        />
                        <Enemy
                            startPosY={enemyPositionsY.three}
                            startPosX={enemyPositionsX.three}
                            frogY={this.state.frogY}
                            frogX={this.state.frogX}
                            startOver={this.startOver}
                        />
                        <Enemy
                            startPosY={enemyPositionsY.four}
                            startPosX={enemyPositionsX.four}
                            frogY={this.state.frogY}
                            frogX={this.state.frogX}
                            startOver={this.startOver}
                        />
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button
                        style={{bottom: '0', left: '0', padding: '17px', opacity: '.5', borderRadius: '4px'}}
                        onClick={this.handleMoveLeft}
                    > L </button>
                    <button
                        style={{bottom: '0', left: '30%', padding: '17px', opacity: '.5', borderRadius: '4px'}}
                        onClick={this.handleMoveUp}
                    > U </button>
                    <button
                        style={{bottom: '0', right: '0', padding: '17px', opacity: '.5', borderRadius: '4px'}}
                        onClick={this.handleMoveRight}
                    > R </button>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <p>Score: {this.state.score}</p>
                    <p>Lives: {this.state.lives}</p>
                </div>
                </div>
                :
                <div>Game Over</div>
                }
            </div>
        )
    }
}

export default App;
