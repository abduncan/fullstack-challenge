"use client";
import { Expense } from "@prisma/client";
import EditIcon from "./Icons/EditIcon";

const DisplayExpenseRow = ({ expense }: { expense: Expense }) => {
  return (
    <tr>
      <td>{expense.expenseDate.toLocaleDateString("en-US")}</td>
      <td>{expense.category}</td>
      <td>{expense.description}</td>
      <td>
        <span>${expense.amount.toFixed(2)}</span>
      </td>
      <td>
        <div className="flex justify-end">
          <button
            type="button"
            className="btn btn-ghost p-2 hover:dark:bg-gray-800 rounded"
          >
            <EditIcon />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DisplayExpenseRow;
