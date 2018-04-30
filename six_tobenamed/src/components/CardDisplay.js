import React, {Component} from 'react';
import Card from './Card';
import PageNumbers from './PageNumbers';
import styled, { css } from 'styled-components';


class CardDisplay extends Component {
    state = {
        data: [],
        info: {},
        page: 1
    }

    componentDidMount(){
        fetch ('https://randomuser.me/api/?results=25&page=1&seed=practiceseed&inc=name,location,email,id,picture')
            .then(res => res.json())
            .then(res => this.setState({
                data: res.results,
                info: res.info
            }))
    }


    handlePageTurn = (num) => {
        fetch (`https://randomuser.me/api/?results=25&page=${num}&seed=practiceseed&inc=name,location,email,id,picture`)
            .then(res => res.json())
            .then(res => this.setState({
                data: res.results,
                info: res.info,
                page: num
            }))
    }

    render(){
        const mappedData = this.state.data.map(person => {
            return (
                <Card
                    {...person}
                    key={person.email}
                />
            )
        })

        const DataContainer = styled.div`
            margin: 0 10%;
            padding: 20px;
        `

        const MainTitle = styled.h1`
            margin: 20px 0;
            font-size: 30px;
            font-weight: lighter;
            font-family: sans-serif;
            color: #333;
            text-align: center;
        `

        return (
            <div>
                <MainTitle>Simple Pagination</MainTitle>
                <PageNumbers handlePageTurn={this.handlePageTurn}/>
                <DataContainer>
                    {mappedData}
                </DataContainer>
                <PageNumbers handlePageTurn={this.handlePageTurn} page={this.state.page}/>
            </div>
        )
    }
}

export default CardDisplay;
