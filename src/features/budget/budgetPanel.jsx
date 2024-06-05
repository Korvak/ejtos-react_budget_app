import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "./budgetSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const BudgetPanel = () => {
    const [budgetEditable, editBudget] = useState(true);
    const budget = useSelector( (state) => state.budget.value);
    const expenditure = useSelector( (state) => state.budget.expenditure);
    const dispatch = useDispatch();


    function toggleEdit() {
        editBudget(!budgetEditable);
    }

    function changeBudget(event) {
        let value = event.target.value;
        if (event.target.checkValidity() ) {
            dispatch(setBudget(value));
        }
        else { event.target.reportValidity();}
    }

    return (
       <div className="w3-row w3-section w3-container">
            <div className="w3-quarter w3-row w3-light-gray app-budgetPanel w3-container">
                <span className="w3-third w3-cell-middle w3-border-0 w3-transparent">Budget</span>
                <input className="w3-third w3-border-0 w3-transparent w3-cell-middle budget-input" type="number"
                 value={budget} readOnly={budgetEditable} onChange={changeBudget} max="20000"></input>
                <button className="w3-third w3-border-0 w3-cell-middle" onClick={toggleEdit}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>
            <div className="w3-quarter w3-row app-budgetPanel w3-container w3-green">
                <span className="w3-half w3-cell-middle">Remaining</span>
                <input className="w3-half w3-cell-middle w3-border-0 w3-transparent" value={budget - expenditure} disabled={true}></input>
            </div>
            <div className="w3-quarter w3-row app-budgetPanel w3-container w3-blue">
                <span className="w3-half w3-cell-middle">Spent</span>
                <input className="w3-half w3-cell-middle w3-border-0 w3-transparent" value={expenditure} disabled={true}></input>
            </div>
            <div className="w3-quarter w3-row app-budgetPanel w3-container w3-blue">
                <span className="w3-half w3-cell-middle">Spent</span>
                <input className="w3-half w3-cell-middle w3-border-0 w3-transparent" value={expenditure} disabled={true}></input>
            </div>
       </div>
    );
};