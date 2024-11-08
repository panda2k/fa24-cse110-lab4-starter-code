import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils";

const randomId = () => {
    return `${Math.random() * 10000}`
}

const AddExpenseForm = () => {
    // Exercise: Consume the AppContext here
    const { setExpenses, expenses } = useContext(AppContext)
    // Exercise: Create name and cost to state variables
    const [name, setName] = useState<string>("");
    const [cost, setCost] = useState<number>(0);


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Exercise: Add add new expense to expenses context array
        const id = randomId();
        createExpense({ description: name, cost, id });
        setExpenses([...expenses, { description: name, cost, id }])
    };

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <div className="row">
                <div className="col-sm">
                    <label htmlFor="name">Name</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        data-testid="name-input"
                    ></input>
                </div>
                <div className="col-sm">
                    <label htmlFor="cost">Cost</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="cost"
                        onChange={(e) => setCost(Number(e.target.value))}
                        data-testid="cost-input"
                    ></input>
                </div>
                <div className="col-sm">
                    <button type="submit" className="btn btn-primary mt-3" data-testid="save-button">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddExpenseForm;
