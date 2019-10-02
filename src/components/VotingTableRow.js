import React from 'react';
import styled from 'styled-components';
import {DataContext} from "../context/data";

export const ParticipantsDiv = styled.div`
    color: darkgray;
    border: 1px solid darkgrey;
    cursor:pointer;
    padding: 10px 15px;
    margin-left: 5px;
    display: table-cell;
    border-top: none;
    width: 15%;
    height: 30px;
  float: left;
  border-collapse: collapse;
`;
export const RestaurantDiv = styled.div`
    color: darkgray;
    border: 1px solid darkgrey;
    cursor:pointer;
    padding: 10px 15px;
    display: table-cell;
    width: 15%;
    height: 30px;
    border-top: none;
  float: left;
  border-left: none;   
  background: ${props => props.highlighted ? "#c0ebca" : "white"};
  :hover{
    background: #c0ebca; 
  }

`;

export const ParticipantInput = styled.input`
    width: 98%;
    cursor:pointer;
    border-radius: 5px;
    padding: 5px;
    border: 1px solid gray;
    
`;
export const MainDiv = styled.div`
   overflow: auto;
   display: table-row;
    
`;

const setChosenVenueClass = (isChosen) => {
    if (isChosen) {
        return ".chosen"
    }
    return "";
};

function VotingTableRow(props) {
    return (
        <DataContext.Consumer>
            {value =>
                <MainDiv>
                    <ParticipantsDiv>
                        <ParticipantInput type='text' placeholder="name" value={props.row.name}
                                          onChange={(event) => value.changeParticipantName(props.index, event.target.value)}></ParticipantInput>
                    </ParticipantsDiv>
                    {[0, 1, 2].map(i => <RestaurantDiv
                        onClick={(event) => value.setVenueChoiceForParticipant(props.index, i)}
                        highlighted={i == value.getVenueChoiceForParticipant(props.index)}/>)}
                </MainDiv>
            }
        </DataContext.Consumer>
    );
}

export default VotingTableRow;