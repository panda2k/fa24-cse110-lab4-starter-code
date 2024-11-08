import { API_BASE_URL } from "../constants";

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);
    if (!response.ok) {
        throw new Error('Failed to fetch expenses');
    }

    // Parsing the response to get the data
    const budget = response.json().then((jsonResponse) => {
        return jsonResponse.data;
    });

    console.log("response in fetchBudget", budget);
    return budget;
}

export const updateBudget = async (amount: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
        throw new Error("Failed to update budget");
    }
    await response.json();
};


