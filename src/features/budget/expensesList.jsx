import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAllocated, calculateExpenses } from "./budgetSlice";
import { ExpenseComponent } from "./expenseComponent";



export const ExpensesTable = () => {
    const expenses = useSelector( (state) => state.budget.list);
    console.log(expenses);

    return(
        <table className="w3-table w3-bordered">
            <thead>
                <tr>
                    <td>Department</td>
                    <td>Allocated budget</td>
                    <td>Increase by 10</td>
                    <td>Decrease by 10</td>
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map( (expense) => {
                        return <ExpenseComponent key={expense.id} name={expense.name} allocated={expense.allocated} id={expense.id}></ExpenseComponent>
                    })
                }
                
            </tbody>
        </table>
    );
}