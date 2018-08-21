import React, { Component } from 'react';
import Icon from '../Icon';
import SearchMenu from './SearchMenu';
import NavMenu from './NavMenu';
import logo from '../../resources/icons/logo.png';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import MdSearch from 'react-icons/lib/md/search';
import menuData from '../../resources/data/data.json';
import './navStyle.css';


export default class Navbar extends Component {
    state = {
        menuDropDown: false,
        inputPopOver: false,
        windowWidth: 0,
        menuData,
        userInput: ''
    };

    componentDidMount() {
        window.addEventListener( 'resize', this.updateWidth );
        this.setState({ menuData })
    }

    componentWillUnmount() {
        window.removeEventListener( 'resize', this.updateWidth )
    }

    updateWidth = () => { this.setState({ windowWidth: window.innerWidth }) }

    handleDropDown = () => {
        this.setState(prevState => ({ menuDropDown: !prevState.menuDropDown }))
    }

    handleChange = (e) => { this.setState({ userInput: e.target.value }) }

    handlePopOver = () => { this.setState(prevState => ({ inputPopOver: !prevState.inputPopOver }))}

    render() {
        return (
            <div className="nav-container">

                {/* Top Left Icon */}
                <div>
                     <Icon
                        icon={logo}
                        menuIconDown={FaAngleDown}
                        visible={this.state.menuDropDown}
                        handleDropDown={this.handleDropDown}/>
                </div>
               {/* Toggle the search menu*/}
               { this.state.inputPopOver
                    ? <SearchMenu
                            value={ this.state.userInput }
                            handleChange={ this.handleChange }
                            handleToggle={ this.handlePopOver }/>
                    : <div className="search">
                        <MdSearch className="search-icon"/>
                        <input
                            type="search"
                            className="searchInput"
                            placeholder='Try "Costa de Valencia"'
                            value=""
                            onClick={ this.handlePopOver }
                            />
                      </div>
                }
                {/* Toggle the Nav menu */}
                { this.state.menuDropDown
                    ? <NavMenu
                        data={ this.state.menuData }
                        visible={ this.state.menuDropDown }/>
                    : null
                }
            </div>
        )
    }
}
