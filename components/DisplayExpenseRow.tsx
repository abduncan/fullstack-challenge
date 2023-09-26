import { Expense } from "@prisma/client";

const DisplayExpenseRow = ({ expense }: { expense: Expense }) => {
  return (
    <tr>
      <td>{expense.expenseDate.toLocaleDateString("en-US")}</td>
      <td>{expense.category}</td>
      <td>{expense.description}</td>
      <td>
        <span>${expense.amount.toFixed(2)}</span>
      </td>
    </tr>
  );
};

export default DisplayExpenseRow;
