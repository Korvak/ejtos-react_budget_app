import {createSlice } from '@reduxjs/toolkit'

class Expense {

    static __COUNTER = 0;

    static generateID() {
        return Expense.__COUNTER++;
    }

    constructor(name, allocated, id = undefined) {
        this.id = id === undefined ? Expense.generateID() : id;
        this.name = name;
        this.allocated = allocated;
    }

    asObj() {
        return {
            id : this.id,
            name : this.name,
            allocated : this.allocated
        }
    }

    asSerialized() {

    }

    static deserialize(serialized) {

    }
}


export const budgetSlice = createSlice({
    name : "budget",
    initialState : {
        value : 550,
        expenditure : 0,
        allowCostGtBudget : false,
        list : []
    },
    reducers : {
        setBudget : (state,action) => {
            state.value = action.payload;
        },
        setExpenditure : (state,action) => {
            state.expenditure = action.payload;
        },
        createExpense : (state,action) => {
            let expense = new Expense(action.payload[0], action.payload[1]).asObj();
            state.list.push(expense);
        },
        removeExpense : (state,action) => {
            let expense = state.list.splice(
                state.list.findIndex(
                    x => x.id === action.payload
                    ),1);
        },
        changeAllocated : (state,action) => {
            let index = state.list.findIndex(
                x => x.id === action.payload[0]
                );
            if (index > -1 ) {
                state.list[index].allocated = action.payload[1];
            }
        },
        calculateExpenses : (state) => {
            let total = 0;
            for (let expense of state.list) {
                total+=expense.allocated;
            }
            if (total <= state.value || state.allowCostGtBudget) {
                state.expenditure = total;
            }       
        }
    }
});

export const { setBudget, setExpenditure, createExpense, removeExpense, changeAllocated, calculateExpenses } = budgetSlice.actions;
export const budgetReducer = budgetSlice.reducer;