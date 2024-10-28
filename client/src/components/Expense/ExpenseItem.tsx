import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const ExpenseItem = (currentExpense: Expense) => {
    const { expenses, setExpenses } = useContext(AppContext);

    const handleDeleteExpense = (currentExpense: Expense) => {
        // Exercise: Remove expense from expenses context array
        setExpenses(expenses.filter(e => e.id !== currentExpense.id));
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>{currentExpense.name}</div>
            <div>${currentExpense.cost}</div>
            <div>
                <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
            </div>
        </li>
    );
};

export default ExpenseItem;
