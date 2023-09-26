const EditExpenseRow = () => {
  return (
    <tr>
      <td>
        <input type="date" className="input" />
      </td>
      <td>
        <select className="select">
          <option>Food</option>
        </select>
      </td>
      <td>
        <input type="text" className="input" />
      </td>
      <td>
        <input type="number" className="input" />
      </td>
    </tr>
  );
};

export default EditExpenseRow;
