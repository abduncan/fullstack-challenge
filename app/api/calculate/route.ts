import { TravelPolicy } from "@/services/travel-policies";
import { Expense } from "@prisma/client";
import { NextRequest } from "next/server";

interface CalculateRequest {
  expenses: Expense[];
  currency: string;
  travelPolicy: TravelPolicy;
}

export const POST = async (req: NextRequest) => {
  const { expenses, currency, travelPolicy } =
    (await req.json()) as CalculateRequest;
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const response = await fetch(
    `https://data.fixer.io/api/convert?access_key=${process.env.FIXER_API_KEY}&from=${currency}&to=USD&amount=${total}`
  );

  const { result } = await response.json();
};
