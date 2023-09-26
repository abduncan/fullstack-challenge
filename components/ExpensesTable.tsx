"use client";
import { Expense, ExpenseCategory } from "@prisma/client";
import DisplayExpenseRow from "./DisplayExpenseRow";
import EditExpenseRow from "./EditExpenseRow";
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import { v4 } from "uuid";

interface ExpenseFormValues extends Expense {
  expenseDateString: string;
}

const getDateString = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};
const initialValues: ExpenseFormValues = {
  id: "0",
  expenseDate: new Date(),
  expenseDateString: getDateString(new Date()),
  category: "airfare",
  description: "",
  amount: 0,
};

const sumExpenses = (expenses: Expense[]) => {
  return expenses.reduce((acc, expense) => acc + expense.amount, 0);
};

const ExpensesTable = () => {
  const [editId, setEditId] = useState("");
  const [exp, setExp] = useState<ExpenseFormValues[]>([initialValues]);

  const formatExpenses = (
    expenses: Expense[],
    resetForm: any,
    setValues: any
  ) => {
    return expenses?.map((expense) =>
      expense.id === "0" || expense.id === editId ? (
        <EditExpenseRow
          key={expense.id}
          expense={expense}
          onDelete={async (id: string) => {
            setEditId("");
            const result = [...exp.filter((e) => e.id !== id)];
            resetForm();
            if (result.length === 0) result.push(initialValues);
            setExp([...result]);
          }}
        />
      ) : (
        <DisplayExpenseRow
          key={expense.id}
          expense={expense}
          onEdit={(id) => {
            setValues(expense);
            setEditId(id);
          }}
        />
      )
    );
  };
  return (
    <div className="flex flex-col w-full overflow-x-auto space-y-4">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const existingExpenses = exp.filter((e) => e.id !== values.id);
          const newExpense: ExpenseFormValues = {
            id: v4(),
            expenseDate: new Date(values.expenseDate),
            expenseDateString: values.expenseDateString,
            category: values.category as ExpenseCategory,
            description: values.description,
            amount: values.amount,
          };
          actions.resetForm();
          setExp([...existingExpenses, newExpense]);
        }}
      >
        {({ resetForm, setValues }) => (
          <Form className="">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-[200px]">Expense Date</th>
                  <th className="w-[200px]">Category</th>
                  <th>Description</th>
                  <th className="w-[150px]">Amount</th>
                  <th className="w-[104px]"></th>
                </tr>
              </thead>
              <tbody>{formatExpenses(exp, resetForm, setValues)}</tbody>
            </table>
          </Form>
        )}
      </Formik>
      <div className="flex justify-end">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setEditId("");
            // Prevent duplicate empty expenses
            if (exp.some((e) => e.id === "0")) return;
            setExp([...exp, initialValues]);
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
