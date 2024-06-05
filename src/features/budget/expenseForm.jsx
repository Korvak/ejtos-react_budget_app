import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { createExpense, calculateExpenses } from "./budgetSlice";

export const ExpenseForm = () => {
    const budget = useSelector((state) => state.budget.value);
    const expenditure = useSelector( (state) => state.budget.expenditure);
    const allowCostGtBudget = useSelector( (state) => state.budget.allowCostGtBudget);
    const allocatable = allowCostGtBudget ? Infinity : budget - expenditure;
    const dispatch = useDispatch();

    function createExpenseEvent(event) {
        let nameInput = document.getElementById("form-expenseName");
        let allocatedInput = document.getElementById("form-expenseAllocated");
        console.log(nameInput.value,allocatedInput.value);
        if (nameInput.checkValidity() && allocatedInput.checkValidity() ) {
            dispatch( createExpense([nameInput.value, parseFloat( allocatedInput.value )]));
            dispatch( calculateExpenses() );
            //then we reset the inputs
            nameInput.value = "";
            allocatedInput.value = "";
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
                <input className="w3-half w3-input" name="expenseName" id="form-expenseName" type="text" required={true}></input>
            </div>
            <div className="w3-row">
                <label className="w3-half">Allocation</label>
                <input className="w3-half w3-input budget-input" name="expenseAllocated" id="form-expenseAllocated" type="number" required={true} min="0" max={allocatable}></input>
            </div>
            <div className="w3-section">
                <button className="w3-button w3-input w3-blue" onClick={createExpenseEvent}>Create</button>
            </div>
        </div>
    )
}