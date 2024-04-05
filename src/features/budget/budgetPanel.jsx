import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "./budgetSlice";


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
       <div className="w3-row w3-section">
            <div className="w3-third w3-row w3-light-gray app-budgetPanel w3-container">
                <span className="w3-third w3-cell-middle w3-border-0 w3-transparent">Budget</span>
                <input className="w3-third w3-border-0 w3-transparent w3-cell-middle" type="number"
                 value={budget} readOnly={budgetEditable} onChange={changeBudget}></input>
                <button className="w3-third w3-border-0 w3-cell-middle" onClick={toggleEdit}>edit</button>
            </div>
            <div className="w3-third w3-row app-budgetPanel w3-container w3-green">
                <span className="w3-half w3-cell-middle">Remaining</span>
                <input className="w3-half w3-cell-middle w3-border-0 w3-transparent" value={budget - expenditure}></input>
            </div>
            <div className="w3-third w3-row app-budgetPanel w3-container w3-blue">
                <span className="w3-half w3-cell-middle" readOnly="true">Spent so far</span>
                <input className="w3-half w3-cell-middle w3-border-0 w3-transparent" readOnly="true" value={expenditure}></input>
            </div>
       </div>
    );
};