import React from "react";
import { useDispatch } from "react-redux";

import { createExpense, calculateExpenses } from "./budgetSlice";

export const ExpenseForm = () => {
    const dispatch = useDispatch();

    function createExpenseEvent(event) {
        let nameInput = document.getElementById("form-expenseName");
        let allocatedInput = document.getElementById("form-expenseAllocated");
        console.log(nameInput.value,allocatedInput.value);
        if (nameInput.checkValidity() && allocatedInput.checkValidity() ) {
            dispatch( createExpense([nameInput.value, parseFloat( allocatedInput.value )]));
            dispatch( calculateExpenses() );
        }
        else {
            nameInput.reportValidity();
            allocatedInput.reportValidity();
        }
    }

    return (
        <div className="app-expenseForm w3-container">
            <h4>Create new Expense</h4>
            <div className="w3-row">
                <label className="w3-half">Name</label>
                <input className="w3-half w3-input" name="expenseName" id="form-expenseName" type="text" required="true"></input>
            </div>
            <div className="w3-row">
                <label className="w3-half">Allocation</label>
                <input className="w3-half w3-input" name="expenseAllocated" id="form-expenseAllocated" type="number" required="true"></input>
            </div>
            <div className="w3-section">
                <button className="w3-button w3-input w3-blue" onClick={createExpenseEvent}>Create</button>
            </div>
        </div>
    )
}