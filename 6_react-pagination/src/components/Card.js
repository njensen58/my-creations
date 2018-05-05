import React from 'react';
import Paper from 'material-ui/Paper';
import styled, { css } from 'styled-components';


const Card = ({name, location, email, id, picture}) => {

    const CardContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 2fr;
    `

    const ImgFrame = styled.div`
        height: 100%;

        @media only screen and (max-width: 600px){
            display: flex;
            align-items: center;
            padding-left: 5px;
        }
    `

    const ImgStyle = styled.img`
        width: 200px;


        @media only screen and (max-width: 600px){
            width: 100px;
        }
    `

    const CardFrame = styled.div`
        display: flex;
        flex-direction: column;
        padding-left: 20px;

        @media only screen and (max-width: 600px){
            margin: 15% 0;
            padding-right: 5px;
        }
    `

    const NameStyle = styled.h1`
        margin: 5px 0;
        font-weight: lighter;

        @media only screen and (max-width: 600px){
            font-size: 14px;
        }
    `

    const EmailStyle = styled.h4`
        margin: 2px 0;
        font-weight: lighter;

        @media only screen and (max-width: 600px){
            font-size: 10px;
        }
    `
    const AddressStyle = styled.p`
        @media only screen and (max-width: 600px){
            font-size: 9px;
        }
    `

    const first = name.first;
    const last = name.last;
    const title = name.title;
    const city = location.city;
    const state = location.state;

    return (
        <Paper zDepth={2} style={{margin: '15px 0'}}>
            <CardContainer>
                <ImgFrame>
                    <ImgStyle src={picture.large} alt={name.first} width="250"/>
                </ImgFrame>
                <CardFrame>
                    <NameStyle>
                        {title.charAt(0).toUpperCase() + title.slice(1) + ' '}
                        {first.charAt(0).toUpperCase() + first.slice(1) + ' '}
                        {last.charAt(0).toUpperCase() + last.slice(1)}
                    </NameStyle>
                    <EmailStyle>Email: {email}</EmailStyle>
                    <AddressStyle>{location.street}</AddressStyle>
                    <AddressStyle>
                        {city.charAt(0).toUpperCase() + city.slice(1)}
                        {state.charAt(0).toUpperCase() + state.slice(1)},
                        {' ' + location.postcode}
                    </AddressStyle>
                </CardFrame>
            </CardContainer>
        </Paper>
    )
}

export default Card;
