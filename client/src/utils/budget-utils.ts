import { API_BASE_URL } from "../constants";

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);
    if (!response.ok) {
        throw new Error('Failed to fetch expenses');
    }

    // Parsing the response to get the data
    const budget = response.json().then((jsonResponse) => {
        console.log("data in fetchExpenses", jsonResponse);
        return jsonResponse.data;
    });

    console.log("response in fetchBudget", budget);
    return budget;
}
