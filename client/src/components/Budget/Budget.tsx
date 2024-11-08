import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
    //const { budget } = useContext(AppContext);
    const [budget, setBudget] = useState<number>(-1);
    useEffect(() => {
        loadBudget();
    }, []);

    // Function to load expenses and handle errors
    const loadBudget = async () => {
        try {
            const budget = await fetchBudget();
            setBudget(budget);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const saveBudget = async (data: string) => {
        try {
            setBudget(Number(data));
            await updateBudget(Number(data));
        } catch (err: any) {
            console.log(err.message);
        }
    }

    return (
        <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
            <div>Budget: $<input type="number" value={budget} onChange={e => saveBudget(e.target.value)}></input></div>
        </div>
    );
};

export default Budget;
