import { Database } from "sqlite";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body as { id: string, cost: number, description: string };

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };

    res.status(201).send({ id, description, cost });


}

export async function deleteExpense(req: Request, res: Response, db: Database) {
    const id = req.params.id;
    const expense = await db.get("SELECT * FROM expenses WHERE id=?;", [id])
    if (!expense) {
        return res.status(404).send({ error: `Expense not found` });
    }
    await db.run("DELETE FROM expenses WHERE id=?", [id]);
    res.status(200).send({ data: true })
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    const results = await db.all("SELECT * FROM expenses;")
    res.status(200).send({ "data": results });
}
