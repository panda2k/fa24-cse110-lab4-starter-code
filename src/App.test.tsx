import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('create expense works', () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Food" } })
    fireEvent.change(screen.getByTestId("cost-input"), { target: { value: "300" } })
    fireEvent.click(screen.getByTestId("save-button"))

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("$300")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $1700")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $300")).toBeInTheDocument();
});

test('delete expense works', () => {
    const { queryByText } = render(<App />);
    fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Food" } })
    fireEvent.change(screen.getByTestId("cost-input"), { target: { value: "300" } })
    fireEvent.click(screen.getByTestId("save-button"))

    fireEvent.click(screen.getByText("x"))
    expect(queryByText("Food")).not.toBeNull();
    expect(queryByText("$300")).toBeNull();
    expect(screen.getByText("Remaining: $2000")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
});

test('total spent and remaining are correct', () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Food" } })
    fireEvent.change(screen.getByTestId("cost-input"), { target: { value: "300" } })
    fireEvent.click(screen.getByTestId("save-button"))
    expect(screen.getByText("Remaining: $1700")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $300")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Gas" } })
    fireEvent.change(screen.getByTestId("cost-input"), { target: { value: "100" } })
    fireEvent.click(screen.getByTestId("save-button"))
    expect(screen.getByText("Remaining: $1600")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $400")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("x")[0])
    expect(screen.getByText("Remaining: $1900")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $100")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("name-input"), { target: { value: "School" } })
    fireEvent.change(screen.getByTestId("cost-input"), { target: { value: "200" } })
    fireEvent.click(screen.getByTestId("save-button"))
    expect(screen.getByText("Remaining: $1700")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $300")).toBeInTheDocument();
});

