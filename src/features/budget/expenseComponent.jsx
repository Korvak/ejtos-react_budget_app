import React from "react";

export const ExpenseComponent = (props) => {

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.allocated}</td>
            <td>
                <button className="w3-green w3-round-xlarge">
                    <i className="fa fa-house"></i>
                </button>
            </td>
            <td>
                <button className="w3-red w3-round-xlarge">  -  </button>
            </td>
        </tr>
    )
};
