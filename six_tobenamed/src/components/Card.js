import React from 'react';
import Paper from 'material-ui/Paper';
import styled, { css } from 'styled-components';


const Card = ({name, location, email, id, picture}) => {

    const CardContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 2fr;
    `

    const ImgFrame = styled.div`
        display: inline-block;
    `

    const CardFrame = styled.div`
        display: flex;
        flex-direction: column;
        padding-left: 20px;
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
                    <img src={picture.large} alt={name.first} width="250"/>
                </ImgFrame>
                <CardFrame>
                    <h1>
                        {title.charAt(0).toUpperCase() + title.slice(1) + ' '}
                        {first.charAt(0).toUpperCase() + first.slice(1) + ' '}
                        {last.charAt(0).toUpperCase() + last.slice(1)}
                    </h1>
                    <h4>Email: {email}</h4>
                    <p>{location.street}</p>
                    <p>
                        {city.charAt(0).toUpperCase() + city.slice(1)}
                        {state.charAt(0).toUpperCase() + state.slice(1)},
                        {' ' + location.postcode}
                    </p>
                </CardFrame>
            </CardContainer>
        </Paper>
    )
}

export default Card;
