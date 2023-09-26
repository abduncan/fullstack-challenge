import { prisma } from "@/services/prisma.service";
import { Expense } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as Expense;
  await prisma.expense.create({
    data: body,
  });
  return NextResponse.json(body);
};
