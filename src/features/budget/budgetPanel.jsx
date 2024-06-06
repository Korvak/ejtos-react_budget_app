import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBudget, setCurrency } from "./budgetSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const BudgetPanel = () => {
    const [budgetEditable, editBudget] = useState(true);
    const budget = useSelector( (state) => state.budget.value);
    const expenditure = useSelector( (state) => state.budget.expenditure);
    const currencies = useSelector( (state) => state.budget.currencies );
    const curr_symbol = useSelector( (state) => state.budget.currencySymbol);
    const curr_exchange = useSelector( (state) => state.budget.currencyExchange);
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

    function changeCurrency(event) {
        let currency = event.target.value;
        if (currency) {
            dispatch(setCurrency(currency));
        }
    }


    return (
       <div className="w3-row w3-section w3-container">
            <div className="w3-quarter w3-row w3-light-gray app-budgetPanel w3-container">
                <span className="w3-quarter w3-cell-middle w3-border-0 w3-transparent">Budget</span>
                <input className="w3-third w3-border-0 w3-transparent w3-cell-middle budget-input" type="number"
                 value={ (budget * curr_exchange).toFixed(2) } readOnly={budgetEditable} onChange={changeBudget} max="20000"></input>
                <input className="w3-col w3-cell-middle w3-transparent w3-border-0 budget-symbol budget-symbol-color" value={curr_symbol} disabled={budgetEditable} readOnly={budgetEditable}/>
                <button className="w3-third w3-border-0 w3-cell-middle" onClick={toggleEdit}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>
            <div className="w3-quarter w3-row app-budgetPanel w3-container w3-green">
                <span className="w3-third w3-cell-middle">Remaining</span>
                <input className="w3-third w3-cell-middle w3-border-0 w3-transparent" type="number" value={  ( (budget - expenditure) * curr_exchange).toFixed(2) } disabled={true}></input>
                <input className="w3-third w3-cell-middle w3-transparent w3-border-0 budget-symbol" value={curr_symbol} disabled={true}/>
            </div>
            <div className="w3-quarter w3-row app-budgetPanel w3-container w3-blue">
                <span className="w3-third w3-cell-middle">Spent</span>
                <input id="spent" className="w3-third w3-cell-middle w3-border-0 w3-transparent" type="number" value={ (expenditure * curr_exchange).toFixed(2) } disabled={true}></input>
                <input className="w3-third w3-cell-middle w3-transparent w3-border-0 budget-symbol" value={curr_symbol} disabled={true}/>
            </div>
            <div className="w3-quarter w3-row app-budgetPanel w3-container w3-green">
                <span className="w3-third w3-cell-middle">Currency</span>
                <select id="currencySelect" className="w3-green w3-border-0 w3-transparent" onChange={changeCurrency}>
                    {
                        currencies.map( (currency) => {
                            return <option className="w3-green" id={`curr_${currency.id}`} key={currency.id} value={currency.id}>{currency.name} {currency.symbol}</option>
                        })
                    }
                </select>
            </div>
       </div>
    );
};