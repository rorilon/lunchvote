import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {DataContext} from "../context/data";

export const Button = styled.button`
    width: 130px;
    background-color: darkslateblue;
    color: aliceblue;
    font-weight: bold;
    border: none;
    outline: none;
    cursor:pointer;
    border-radius: 15px;
    padding: 10px 15px;
    margin: 15px;
`;
export const SearchInput = styled.input`
    width: 130px;
    cursor:pointer;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    border: 1px solid gray;
    
`;
export const Container = styled.div`
    float: left;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
    
`;
export const SearchDiv = styled.div`
    display: table-row;

    
`;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //response: [],
            geocode: ''
        };
    }

    handleClick = (setVenues) => {
        const geocode = this.state.geocode;
        const qs = `
?client_id=3DPN2ENQ0OTEPWMLBM3EFWSIWDPHPIWFPDDR0MV4QEKMDNPP
&client_secret=CZAA1JCYSWHINAKXX45FOGA4U5PNENPRNIHJY14ULBSQEYX0
&query=lunch
&locale=en
&near=${geocode}
&v=20190724

&limit=3`;
        axios.get(`https://api.foursquare.com/v2/venues/search` + qs)
            .then(res => {
                const response = res.data;
                const venuesData = response.response.venues;
                setVenues(venuesData);
            })
            .catch(error => {
                // handle error
                setVenues([]);
            })
    };
    updateInputValue = (event) => {
        this.setState({
            geocode: event.target.value
        });
    };

    render() {
        return (
            <DataContext.Consumer>
                {value =>
                    <SearchDiv>
                        <Container>
                            <SearchInput type='text' placeholder="10999 Berlin" value={this.state.geocode}
                                         onChange={this.updateInputValue}></SearchInput>
                        </Container>
                        <Container>
                            <Button onClick={() => this.handleClick(value.setVenues)}>
                                Search
                            </Button>
                        </Container>
                    </SearchDiv>
                }
            </DataContext.Consumer>
        );
    }
}

export default Search;