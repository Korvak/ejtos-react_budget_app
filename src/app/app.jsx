import React from 'react';
import { BudgetPanel } from '../features/budget/budgetPanel';
import { ExpensesTable } from '../features/budget/expensesList';
import { ExpenseForm } from '../features/budget/expenseForm';


const App = () => {
    return(
        <div className='App'>
            <h2>Company's Budget Allocation</h2>
            <BudgetPanel/>
            <ExpensesTable></ExpensesTable>
            <ExpenseForm></ExpenseForm>
        </div>
    );
};

export default App;