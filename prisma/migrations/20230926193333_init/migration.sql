-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('mileage', 'lodging', 'rentalCar', 'meals', 'internet', 'rideshare', 'airfare');

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "ExpenseCategory" NOT NULL,
    "expenseDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);
