import React, { Component } from 'react';
import Form from './Form';
import Navbar from './Navbar'
import Display from './Display';
import Themes from './Themes';
import TextTransforms from './TextTransforms';

class App extends Component {
    /* constructor and super not necessary */
    state = {
        userInput: '',
        displayText: 'Hello World!',
        displayStyle : {
            color: 'black',
            backgroundColor: 'white',
            textDecoration: 'none',
            fontStyle: 'none',
            fontWeight: 'none',
            transform: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            displayText: this.state.userInput,
            userInput: ''
        })
    }

    handleChange = (e) => {
        /* destructure event target */
        const { name, value } = e.target;
        this.setState({
            userInput: value
        })
    }

    handleTextEdit = (type, str, rm) => {
        // If the user clicks on a text style already active, toggle to off setting (rm) //
        if(this.state.displayStyle[type] === str){
            this.setState(prev => ({
                displayStyle: {
                    color: prev.displayStyle.color,
                    backgroundColor: prev.displayStyle.backgroundColor,
                    textDecoration: prev.displayStyle.textDecoration,
                    fontStyle: prev.displayStyle.fontStyle,
                    fontWeight: prev.displayStyle.fontWeight,
                    transform: prev.displayStyle.transform,
                    [type]: rm
                }
            }))
        } else {
        this.setState(prev => ({
            displayStyle: {
                color: prev.displayStyle.color,
                backgroundColor: prev.displayStyle.backgroundColor,
                textDecoration: prev.displayStyle.textDecoration,
                fontStyle: prev.displayStyle.fontStyle,
                fontWeight: prev.displayStyle.fontWeight,
                transform: prev.displayStyle.transform,
                [type]: str
            }
        }))
        }
    }

    handleThemeChange = (e, type) => {
        let theme = e.target.value;
        this.setState(prev => ({
            displayStyle: {
                textDecoration: prev.displayStyle.textDecoration,
                fontStyle: prev.displayStyle.fontStyle,
                fontWeight: prev.displayStyle.fontWeight,
                transform: prev.displayStyle.transform,
                color: prev.displayStyle.color,
                backgroundColor: prev.displayStyle.backgroundColor,
                [type]: theme
            }
        }))
    }

    render(){
        const colorOptions = ["black", "blue", "red", "orange", "green", "purple", "darkslategrey"]
        const bgOptions = ["white", "cornflowerblue", "yellow", "red", "purple", "pink", "green"]

        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="displayContainer">
                        <Display
                            text={this.state.displayText}
                            displayStyle={this.state.displayStyle}/>
                    </div>
                    <div className="toolsContainer">
                        <TextTransforms
                            handleTextEdit={this.handleTextEdit}/>
                        <Form
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            value={this.state.userInput}/>
                        <div className="themesContainer">
                            <span>Color: </span>
                            <Themes
                                handleThemeChange={this.handleThemeChange}
                                options={colorOptions}
                                type="color"/>
                            <span>Background Color:</span>
                            <Themes
                                handleThemeChange={this.handleThemeChange}
                                options={bgOptions}
                                type="backgroundColor"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
