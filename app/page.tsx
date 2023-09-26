import ExpenseForm from "@/components/ExpenseForm";
import ExpensesTable from "@/components/ExpensesTable";
import {
  TravelPolicy,
  defaultTravelPolicy,
  unlimitedAirfareTravelPolicy,
} from "@/services/travel-policies";
import { Expense } from "@prisma/client";

export default async function Home() {
  const travelPolicies = [defaultTravelPolicy, unlimitedAirfareTravelPolicy];
  const expenses: Expense[] = [
    {
      id: 1,
      expenseDate: new Date(),
      category: "airfare",
      description: "Lunch",
      amount: 10.0,
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm space-y-10">
        <h1 className="text-xl">
          Enter the expenses from your Snowboarding Trip below:
        </h1>
        <div className="grid grid-cols-2 w-fit gap-4 items-center">
          <span className="text-lg font-medium">Choose your currency:</span>
          <select className="select"></select>
          <span className="text-lg font-medium">
            Choose your travel policy:
          </span>
          <select className="select">
            {travelPolicies.map((policy) => (
              <option key={policy.id}>{policy.name}</option>
            ))}
          </select>
        </div>
        <ExpenseForm>
          <ExpensesTable expenses={expenses} />
        </ExpenseForm>
      </div>
    </main>
  );
}
