import { useSelector } from "react-redux";

export function getAllocatable() {
    const budget = useSelector((state) => state.budget.value);
    const expenditure = useSelector( (state) => state.budget.expenditure);
    const allowCostGtBudget = useSelector( (state) => state.budget.allowCostGtBudget);
    allowCostGtBudget ? Infinity : budget - expenditure;
}