import React from 'react';
import styled from 'styled-components';
import {DataContext} from "../context/data";
import {numberOfVenues} from "../configuration/constants";

export const ParticipantsDiv = styled.div`
    color: darkgray;
    border: 1px solid darkgrey;
    cursor:pointer;
    padding: 10px 15px;
    margin-left: 5px;
    width: 15%;
    height: 60px;
  float: left;
  display: table-cell;
  border-collapse: collapse;
  position: relative;
`;
export const ParticipantsDivText = styled.span`
    position: absolute;
    left: 0;
    bottom: 0;
    margin-left: 5px;
    margin-bottom: 5px;
`;
export const RestaurantDiv = styled.div`
    color: darkgray;
    border: 1px solid darkgrey;
    cursor:pointer;
    padding: 10px 15px;
    width: 15%;
    height: 60px;
  float: left;
  border-left: none;  
  display: table-cell;   
  background: ${props => props.highlighted ? '#F0FFF0' : "white"};
    
`;
export const MainDiv = styled.div`
   overflow: auto;
   display: table-row;
`;


const helperArray = [...Array(numberOfVenues)];

function TableHeader() {
    return (
        <DataContext.Consumer>
            {value =>
                <MainDiv>
                    <ParticipantsDiv><ParticipantsDivText>Participants</ParticipantsDivText></ParticipantsDiv>
                    {helperArray.map((_, i) => <RestaurantDiv
                        highlighted={i === value.getFavourableVenue()}>{value.setVenueInfo(i)}</RestaurantDiv>)}
                </MainDiv>
            }
        </DataContext.Consumer>
    );
}

export default TableHeader;