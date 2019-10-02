import React from "react";
import styled from "styled-components";
import {DataContext} from "../context/data";

export const Button = styled.button`
  width: 130px;
  background-color: darkslateblue;
  color: aliceblue;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 15px;
  padding: 10px 15px;
  margin: 5px;
  float: left;
`;

class AddParticipantButton extends React.Component {
    render() {
        return (
            <DataContext.Consumer>
                {value => (
                    <div>
                        <Button onClick={value.addParticipant}>Add Participant</Button>
                    </div>
                )}
            </DataContext.Consumer>
        );
    }
}

export default AddParticipantButton;
