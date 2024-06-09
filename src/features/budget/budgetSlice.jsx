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
        maxValue : 20000,
        expenditure : 0,
        currencyName : "dollar",
        currencySymbol : "$",
        currencyExchange : 1.0,
        currencyId : "dollar",
        currencies : [
            {
                id : "dollar",
                name : "dollar",
                exchange : 1.0,
                symbol : "$" 
            },
            {
                id : "pound",
                name : "pound",
                exchange : 0.78,
                symbol : "£" 
            },
            {
                id : "euro",
                name : "euro",
                exchange : 0.92,
                symbol : "€" 
            },
            {
                id : "rupee",
                name : "rupee",
                exchange : 83.46,
                symbol : "₹" 
            }
        ],
        allowCostGtBudget : false,
        list : []
    },
    reducers : {
        setBudget : (state,action) => {
            state.value = ( action.payload / state.currencyExchange).toFixed(2);
        },
        setExpenditure : (state,action) => {
            state.expenditure = action.payload;
        },
        createExpense : (state,action) => {
            let expense = new Expense(action.payload[0], (action.payload[1] / state.currencyExchange).toFixed(2) ).asObj();
            state.list.push(expense);
        },
        removeExpense : (state,action) => {
            state.list.splice(
                state.list.findIndex(
                    x => x.id === action.payload
                ),1);
        },
        changeAllocated : (state,action) => {
            let index = state.list.findIndex(
                x => x.id === action.payload[0]
                );
            if (index > -1 ) {
                //we remove the curr_exchange in the expense form
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
        },
        setCurrency : (state, action) => {
            let currency = action.payload;
            currency = currency.toLowerCase();
            let filtered = state.currencies.filter( (curr) => curr.id === currency);
            if (filtered.length > 0 ) {
                //first we set the currency
                filtered = filtered[0];
                state.currencyId = filtered.id;
                state.currencyExchange = filtered.exchange;
                state.currencyName = filtered.name;
                state.currencySymbol = filtered.symbol;
            }
        }
    }
});

export const { setBudget, setExpenditure, setCurrency, createExpense, removeExpense, changeAllocated, calculateExpenses } = budgetSlice.actions;
export const budgetReducer = budgetSlice.reducer;