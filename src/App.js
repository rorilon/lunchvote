import React from 'react';
import './App.css';
import Search from './components/Search.js';
import TableHeader from './components/TableHeader.js';
import AddParticipantButton from './components/AddParticipantButton.js';
import VotingTable from "./components/VotingTable";
import {DataContext} from "./context/data";
import axios from 'axios';
import styled from "styled-components";

export const AppDiv = styled.div`
    display: table;
    width: 100%;
`;
export const HeaderLabel = styled.label`
  float: left;
  margin: 15px;
  font-size: 1.5em;
  font-weight: bold;
`;

export const HeaderText = styled.p`
    text-align: center;
    margin: 0px;
`;
export const Rating = styled.span`
    text-align: center;
    margin: 0px;
    font-weight: bold;
    color: #282c34;
    font-size: 13px;
`;
export const VenueLink = styled.a`
    text-align: center;
    margin: 0px;
    font-size: 15px;
`;
export const VenueCategory = styled.span`
    text-align: center;
    margin: 0px;
    color: darkgray;
    font-size: 12px;
    
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            venues: [],
            chosenVenue: null,
        };
    }

    render() {
        return (
            <AppDiv className="App">
                <DataContext.Provider
                    value={{
                        ...this.state,
                        addParticipant: this.addParticipant,
                        changeParticipantName: this.changeParticipantName,
                        setVenues: this.setVenues,
                        setVenueChoiceForParticipant: this.setVenueChoiceForParticipant,
                        setVenueInfo: this.setVenueInfo,
                        getVenueChoiceForParticipant: this.getVenueChoiceForParticipant,
                        getFavourableVenue: this.getFavourableVenue,
                    }}
                >
                    <HeaderLabel>Lunchplace</HeaderLabel>
                    <Search/>
                    <TableHeader/>
                    <VotingTable/>
                    <AddParticipantButton/>
                </DataContext.Provider>
            </AppDiv>
        );
    }

    addParticipant = () => {
        const newTableData = [...this.state.tableData];
        newTableData.push({});
        this.setState({tableData: newTableData});
    };
    changeParticipantName = (index, name) => {
        const newTableData = [...this.state.tableData];
        newTableData[index].name = name;
        this.setState({tableData: newTableData});
    };
    setVenues = (venues) => {
        this.setState({venues: venues, tableData: [], chosenVenue: null});
        const detailedVenues = [...venues];
        if (venues.length === 3) {
            for (let i = 0; i < venues.length; i++) {
                const venueid = venues[i].id;
                const qs = `
?client_id=3DPN2ENQ0OTEPWMLBM3EFWSIWDPHPIWFPDDR0MV4QEKMDNPP
&client_secret=CZAA1JCYSWHINAKXX45FOGA4U5PNENPRNIHJY14ULBSQEYX0
&v=20190724&locale=en`;
                axios.get(`https://api.foursquare.com/v2/venues/` + venueid + qs)
                    .then(res => {
                        const response = res.data.response;
                        detailedVenues[i] = {...detailedVenues[i], ...response.venue};

                    })
                    .catch(error => {
                        // this.setState({venues: detailedVenues});
                    })
                    .finally(() => {
                        this.setState({venues: detailedVenues});
                    });
            }
        }
    };
    setVenueInfo = (index) => {
        let venueString = 'Venue ' + index;

        if (this.state.venues.length === 3) {
            const venue = this.state.venues[index];
            return (
                <HeaderText><VenueLink href={venue.shortUrl}>{venue.name}</VenueLink><br/>
                    <VenueCategory>{venue.categories[0].name}</VenueCategory><br/>
                    <Rating>{venue.rating}</Rating></HeaderText>
            )
        } else
            return venueString;


    };
    setVenueChoiceForParticipant = (index, venue) => {
        const newTableData = [...this.state.tableData];
        newTableData[index].venue = venue;
        this.setState({tableData: newTableData});
        this.calculateFavourableVenue();
    };
    getVenueChoiceForParticipant = (index) => {
        return this.state.tableData[index].venue;
    };
    calculateFavourableVenue = () => {
        let chosenVenue = null;
        if (this.state.tableData.length > 0) {
            let counts = {};
            for (var i = 0; i < this.state.tableData.length; i++) {
                let num = this.state.tableData[i].venue;
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }
            if (counts) {
                let arr = [counts[0], counts[1], counts[2]].sort((a, b) => {
                    return b - a
                });
                if (arr[0] === arr[1]) {
                    chosenVenue = null;
                } else {
                    let max = arr[0];
                    console.log(arr);
                    if (max === counts[0])
                        chosenVenue = 0;
                    if (max === counts[1])
                        chosenVenue = 1;
                    if (max === counts[2])
                        chosenVenue = 2;
                }

            }
        }
        if (this.state.chosenVenue != chosenVenue)
            this.setState({chosenVenue});
    };
    getFavourableVenue = () => {
        return this.state.chosenVenue;
    }
}

export default App;
