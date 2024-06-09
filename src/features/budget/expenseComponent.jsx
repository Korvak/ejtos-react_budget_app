import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faMinus } from '@fortawesome/free-solid-svg-icons'

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeExpense, changeAllocated, calculateExpenses } from "./budgetSlice";


export const ExpenseComponent = (props) => {
    const budget = useSelector((state) => state.budget.value);
    const expenditure = useSelector( (state) => state.budget.expenditure);
    const allowCostGtBudget = useSelector( (state) => state.budget.allowCostGtBudget);
    const allocatableBudget = allowCostGtBudget ? Infinity : (budget - expenditure) + parseFloat( props.allocated );
    const curr_exchange = useSelector( (state) => state.budget.currencyExchange);
    const curr_symbol = useSelector( (state) => state.budget.currencySymbol);
    const dispatch = useDispatch();

    const real_allocated = ( parseFloat(props.allocated) * curr_exchange).toFixed(2);

    const [expense, setExpense] = useState( real_allocated );
    const [valid_expense, setValidExpense] = useState( real_allocated );
    const [editable, setEditable] = useState(false);

    setTimeout( () => {
        setExpense((props.allocated * curr_exchange).toFixed(2));
        setValidExpense((props.allocated * curr_exchange).toFixed(2));
    }
    , 5);

    function handleDelete(event) {
        let id = event.target.dataset.id;
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`are you sure you want to delete the expenditure ${event.target.dataset.name}?`) ) {
            dispatch( removeExpense(id) );
            dispatch( calculateExpenses() );
        }
    }

    function toggleEditable() {setEditable(!editable);}

    function handleChangeAllocated(event) {
        let element = event.target;
        let val = parseFloat( element.value );
        let id = parseFloat( element.dataset.id );
        setExpense( val );
        if (element.checkValidity() ) {
            setValidExpense(val);
            val = (val / curr_exchange).toFixed(2);
            dispatch( changeAllocated([id,val]) );
            dispatch( calculateExpenses() );
        }
        else {
            return element.reportValidity();
        }
    }

    function onFinishEditAllocated(event) {
        if (!event.target.checkValidity() ) {
            setExpense(valid_expense);
        }
        setEditable(false);
    }


    return (
        <tr id={props.id}>
            <td>{props.name}</td>
            <td>
                <input value={curr_symbol} readOnly={!editable} disabled={!editable} className="budget-symbol budget-symbol-color w3-border-0 w3-transparent"></input>
                <input id={props.id} className="w3-border-0 w3-transparent budget-input" readOnly={!editable} disabled={!editable}
                type="number" value={ expense } data-id={props.id} max={( allocatableBudget * curr_exchange).toFixed(2) }
                onChange={handleChangeAllocated} onBlur={onFinishEditAllocated}>
                </input>
            </td>
            <td>
                <button className="w3-green w3-round-large" onClick={toggleEditable}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </td>
            <td>
                <button className="w3-red w3-round-large" data-id={props.id} data-name={props.name} onClick={handleDelete} >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
            </td>
        </tr>
    )
};
