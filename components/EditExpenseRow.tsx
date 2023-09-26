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
  onDelete: (id: string) => void;
}) => {
  return (
    <>
      <tr>
        <td>
          <Field
            type="date"
            name="expenseDateString"
            className="input"
            required
          />
        </td>
        <td>
          <Field as="select" name="category" required className="w-full select">
            {Object.keys(ExpenseCategory).map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
            {/* {({ field, form, meta }: any) => (
              <select className="select" name="category" required {...field}>
                {Object.keys(ExpenseCategory).map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            )} */}
          </Field>
        </td>
        <td>
          <Field type="text" name="description" className="input" required />
        </td>
        <td>
          <div className="flex justify-between space-x-2">
            <Field name="amount">
              {({ field, form, meta }: any) => (
                <input
                  className="input"
                  type="number"
                  min={0.01}
                  required
                  {...field}
                  onClick={(e) => e.currentTarget.select()}
                  step={0.01}
                />
              )}
            </Field>
          </div>
        </td>
        <td>
          <div className="flex space-x-1 justify-end">
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
        </td>
      </tr>
    </>
  );
};

export default EditExpenseRow;
