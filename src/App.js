import React from 'react';
import './App.css';
import Search from './components/Search.js';
import TableHeader from './components/TableHeader.js';
import AddParticipantButton from './components/AddParticipantButton.js';
import VotingTable from "./components/VotingTable";
import {DataContext} from "./context/data";
import styled from "styled-components";
import {numberOfVenues} from "./configuration/constants";

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
        const chosenVenue = this.getChosenVenue();
        this.setState({chosenVenue});
    };
    getChosenVenue = () => {
        if (numberOfVenues === 1) {
            return 0
        }
        const counts = this.state.tableData.reduce((acc, v) => {
            const venueIndex = v.venue;
            acc[venueIndex]++;
            return acc
        }, zeroCounts());
        const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const firstPlaceVotes = sortedCounts[0][1];
        const secondPlaceVotes = sortedCounts[1][1];
        if (firstPlaceVotes === secondPlaceVotes) {
            return null;
        }
        const firstPlaceIndex = sortedCounts[0][0];
        return Number.parseInt(firstPlaceIndex)
    };
    getFavourableVenue = () => {
        return this.state.chosenVenue;
    };
}

const zeroCounts = () => {
    const result = {};
    for (let i = 0; i < numberOfVenues; i++) {
        result[i] = 0;
    }
    return result
};

export default App;
