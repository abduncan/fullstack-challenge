"use client";
import { Expense, ExpenseCategory } from "@prisma/client";
import DisplayExpenseRow from "./DisplayExpenseRow";
import EditExpenseRow from "./EditExpenseRow";
import { useState } from "react";

const ExpensesTable = ({ expenses }: { expenses: Expense[] }) => {
  const [exp, setExp] = useState<Expense[]>(expenses);
  const formatExpenses = (expenses: Expense[]) => {
    return expenses?.map((expense) =>
      expense.id === 0 ? (
        <EditExpenseRow
          key={expense.id}
          expense={expense}
          onDelete={async (id: number) => {
            if (id !== 0) {
              await fetch(`/api/expense/${id}`, {
                method: "DELETE",
              });
            }
            setExp(exp.filter((e) => e.id !== id));
          }}
        />
      ) : (
        <DisplayExpenseRow key={expense.id} expense={expense} />
      )
    );
  };
  return (
    <div className="flex flex-col w-full overflow-x-auto space-y-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-fit">Expense Date</th>
            <th className="w-fit">Category</th>
            <th>Description</th>
            <th className="w-fit">Amount</th>
          </tr>
        </thead>
        <tbody>{formatExpenses(exp)}</tbody>
      </table>
      <div className="flex justify-end">
        <button
          type="button"
          className="btn"
          onClick={() => {
            // Prevent duplicate empty expenses
            if (exp.some((e) => e.id === 0)) return;
            setExp([
              ...exp,
              {
                id: 0,
                expenseDate: new Date(),
                category: "airfare",
                description: "",
                amount: 0,
              },
            ]);
          }}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};
export default ExpensesTable;
