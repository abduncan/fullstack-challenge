"use client";
import { Field } from "formik";
import CheckIcon from "./Icons/CheckIcon";
import TrashIcon from "./Icons/TrashIcon";
import { Expense, ExpenseCategory } from "@prisma/client";

const EditExpenseRow = ({
  expense,
  onDelete,
}: {
  expense: Expense;
  onDelete: (id: number) => void;
}) => {
  return (
    <>
      <tr>
        <td>
          <Field type="date" name="expenseDate" className="input" />
          {/* <input type="date" className="input" /> */}
        </td>
        <td>
          <Field type="text" name="aim" className="w-full">
            {({ field, form, meta }: any) => (
              <select className="select" required {...field}>
                {Object.keys(ExpenseCategory).map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            )}
          </Field>
        </td>
        <td>
          <Field type="text" name="description" className="input" />
        </td>
        <td>
          <div className="flex justify-between space-x-10">
            <Field type="number" name="amount" className="input" min={0.01} />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="btn btn-ghost p-2 hover:dark:bg-gray-800 rounded"
              >
                <CheckIcon />
              </button>

              <button
                type="button"
                className="btn btn-ghost p-2 hover:dark:bg-gray-800 rounded"
                onClick={() => onDelete(expense.id)}
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default EditExpenseRow;
