import React from 'react';
import styled, { css } from 'styled-components';

const PageNumbers = ({handlePageTurn, page}) => {

    const NumberDiv = styled.div`
        display: flex;
        justify-content: space-around;
        margin: 10px 20%;
    `

    const NumberSpan = styled.span`
        font-size: 16px;
        font-weight: lighter;
        font-family: sans-serif;
        background-color: #333;
        border-radius: 50%;
        padding: 20px;
        color: coral;
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    `

    const mappedNumbers = [1,2,3,4,5,6,7,8,9,10].map(num => {
        return (
            <div>
                <NumberSpan
                    onClick={()=>handlePageTurn(num)}
                    num={num}
                    key={num}>{num}
                </NumberSpan>
            </div>
        )
    })

    return (
        <NumberDiv>
            {mappedNumbers}
        </NumberDiv>
    )
}

export default PageNumbers;
