import React from "react";
import VotingTableRow from "./VotingTableRow.js";
import {DataContext} from "../context/data";

function VotingTable() {
    return (
        <DataContext.Consumer>
            {value =>
                value.tableData.map((row, index) => (
                    <VotingTableRow
                        row={row}
                        index={index}
                        selectedVenue={row.venue}
                    ></VotingTableRow>
                ))
            }
        </DataContext.Consumer>
    );
}

export default VotingTable;
