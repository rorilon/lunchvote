import React from "react";
import styled from "styled-components";
import {DataContext} from "../context/data";
import {numberOfVenues} from "../configuration/constants";

export const ParticipantsDiv = styled.div`
  color: darkgray;
  border: 1px solid darkgrey;
  cursor: pointer;
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
  cursor: pointer;
  padding: 10px 15px;
  width: 15%;
  height: 60px;
  float: left;
  border-left: none;
  display: table-cell;
  background: ${props => (props.highlighted ? "#F0FFF0" : "white")};
`;
export const MainDiv = styled.div`
  overflow: auto;
  display: table-row;
`;
const HeaderText = styled.p`
  text-align: center;
  margin: 0px;
`;
const Rating = styled.span`
  text-align: center;
  margin: 0px;
  font-weight: bold;
  color: #282c34;
  font-size: 13px;
`;
const VenueLink = styled.a`
  text-align: center;
  margin: 0px;
  font-size: 15px;
`;
const VenueCategory = styled.span`
  text-align: center;
  margin: 0px;
  color: darkgray;
  font-size: 12px;
`;

const helperArray = [...Array(numberOfVenues)];

function TableHeader() {
    return (
        <DataContext.Consumer>
            {value => (
                <MainDiv>
                    <ParticipantsDiv>
                        <ParticipantsDivText>Participants</ParticipantsDivText>
                    </ParticipantsDiv>
                    {helperArray.map((_, i) => (
                        <RestaurantDiv highlighted={i === value.getFavourableVenue()}>
                            <VenueInformation venue={value.setVenueInfo(i)}/>
                        </RestaurantDiv>
                    ))}
                </MainDiv>
            )}
        </DataContext.Consumer>
    );
}

const VenueInformation = ({venue}) => (
    <>
        {typeof venue === "object" ? (
            <HeaderText>
                <VenueLink href={venue.shortUrl}>{venue.name}</VenueLink>
                <br/>
                <VenueCategory>{venue.categories[0].name}</VenueCategory>
                <br/>
                <Rating>{venue.rating}</Rating>
            </HeaderText>
        ) : (
            venue
        )}
    </>
);

export default TableHeader;
