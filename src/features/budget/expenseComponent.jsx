import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faMinus } from '@fortawesome/free-solid-svg-icons'

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeExpense, changeAllocated, calculateExpenses } from "./budgetSlice";


export const ExpenseComponent = (props) => {
    const [value, setValue] = useState(props.allocated);
    const [readonly, setReadonly] = useState(true);
    const budget = useSelector((state) => state.budget.value);
    const expenditure = useSelector( (state) => state.budget.expenditure);
    const allowCostGtBudget = useSelector( (state) => state.budget.allowCostGtBudget);
    const allocatableBudget = allowCostGtBudget ? Infinity : budget - expenditure;
    const dispatch = useDispatch();


    function handleDelete(event) {
        let id = event.target.dataset.id;
        if (confirm(`are you sure you want to delete the expenditure ${event.target.dataset.name}?`) ) {
            dispatch( removeExpense(id) );
            dispatch( calculateExpenses() );
        }
    }

    function toggleEditable() {setReadonly(!readonly);}

    function handleChangeAllocated(event) {
        let element = event.target;
        if (!element.checkValidity() ) {
            return element.reportValidity();
        }
        let val = parseFloat( element.value );
        let id = parseFloat( element.dataset.id );
        dispatch( changeAllocated([id,val]) );
        dispatch( calculateExpenses() );
        setValue(val);
    }

    return (
        <tr id={props.id}>
            <td>{props.name}</td>
            <td>
                <input id={props.id} className="w3-border-0 w3-transparent" readOnly={readonly} 
                type="number" value={value} data-id={props.id} max={allocatableBudget}
                onChange={handleChangeAllocated} onBlur={() => {setReadonly(false);}}>
                </input>
            </td>
            <td>
                <button className="w3-green w3-round-xlarge" onClick={toggleEditable}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </td>
            <td>
                <button className="w3-red w3-round-xlarge" data-id={props.id} data-name={props.name} onClick={handleDelete} >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
            </td>
        </tr>
    )
};
