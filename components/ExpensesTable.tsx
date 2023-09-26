"use client";
import { Expense, ExpenseCategory } from "@prisma/client";
import DisplayExpenseRow from "./DisplayExpenseRow";
import EditExpenseRow from "./EditExpenseRow";
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import { v4 } from "uuid";

const sumExpenses = (expenses: Expense[]) => {
  return expenses.reduce((acc, expense) => acc + expense.amount, 0);
};

const ExpensesTable = ({ expenses }: { expenses: Expense[] }) => {
  const [exp, setExp] = useState<Expense[]>(expenses);
  const formatExpenses = (expenses: Expense[], resetForm: any) => {
    return expenses?.map((expense) =>
      expense.id === "0" ? (
        <EditExpenseRow
          key={expense.id}
          expense={expense}
          onDelete={async (id: string) => {
            const result = [...exp.filter((e) => e.id !== id)];
            resetForm();
            if (result.length === 0)
              result.push({
                id: "0",
                expenseDate: new Date(),
                category: "airfare",
                description: "",
                amount: 0,
              });
            setExp([...result]);
          }}
        />
      ) : (
        <DisplayExpenseRow key={expense.id} expense={expense} />
      )
    );
  };
  return (
    <div className="flex flex-col w-full overflow-x-auto space-y-4">
      <Formik
        initialValues={{
          id: "0",
          expenseDate: "",
          category: "",
          description: "",
          amount: 0,
        }}
        onSubmit={async (values, actions) => {
          const existingExpenses = exp.filter((e) => e.id !== "0");
          const newExpense: Expense = {
            id: v4(),
            expenseDate: new Date(values.expenseDate),
            category: values.category as ExpenseCategory,
            description: values.description,
            amount: values.amount,
          };
          actions.resetForm();
          setExp([...existingExpenses, newExpense]);
        }}
      >
        {({ resetForm }) => (
          <Form className="">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-[200px]">Expense Date</th>
                  <th className="w-[200px]">Category</th>
                  <th>Description</th>
                  <th className="w-[150px]">Amount</th>
                  <th className="w-[50px]"></th>
                </tr>
              </thead>
              <tbody>{formatExpenses(exp, resetForm)}</tbody>
            </table>
          </Form>
        )}
      </Formik>
      <div className="flex justify-end">
        <button
          type="button"
          className="btn"
          onClick={() => {
            // Prevent duplicate empty expenses
            if (exp.some((e) => e.id === "0")) return;
            setExp([
              ...exp,
              {
                id: "",
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
      <div className="divider"></div>
      <div className="flex justify-end text-lg font-medium">
        Total Expenses: ${sumExpenses(exp)}
      </div>
      <div className="flex justify-end">
        <button type="button" className="btn btn-primary">
          Submit Expenses
        </button>
      </div>
    </div>
  );
};
export default ExpensesTable;
