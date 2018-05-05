import React from 'react';
import styled, { css } from 'styled-components';

const Navbar = (props) => {

    const NavStyle = styled.div`
        display: flex;
        justify-content: space-evenly;
        height: 40px;
        background-color: #333;
        align-items: center;
        font-size: 20px;
    `

    const LinkStyle = styled.a`
        text-decoration: none;
        color: #eee;
        font-family: sans-serif;
        font-weight: lighter;
    `

    return (
        <NavStyle>
            <LinkStyle href="#">Home</LinkStyle>
            <LinkStyle href="https://github.com/njensen58/my-creations/tree/master/6_react-pagination">About</LinkStyle>
        </NavStyle>
    )
}

export default Navbar;
