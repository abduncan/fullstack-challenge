import EditExpenseRow from "./EditExpenseRow";

const ExpensesTable = () => {
  return (
    <div className="flex w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Expense Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
          <EditExpenseRow />
        </tbody>
      </table>
    </div>
  );
};
export default ExpensesTable;
