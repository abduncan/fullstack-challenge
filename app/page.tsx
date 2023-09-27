"use client";
import ExpensesTable from "@/components/ExpensesTable";
import {
  defaultTravelPolicy,
  unlimitedAirfareTravelPolicy,
} from "@/services/travel-policies";
import { Expense } from "@prisma/client";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import validateCurrencyCode from "validate-currency-code";

export default function Home() {
  const [total, setTotal] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const travelPolicies = [defaultTravelPolicy, unlimitedAirfareTravelPolicy];
  const [addExpenses, setAddExpenses] = useState(false);
  const [invalidCurrency, setInvalidCurrency] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reimbursable, setReimbursable] = useState(0);

  const onAdd = (expenses: Expense[], total: number) => {
    setTotal(total);
    setExpenses(expenses);
  };

  useEffect(() => {
    if (expenses.length > 0) setAddExpenses(false);
  }, [expenses]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm space-y-10">
        <h1 className="text-xl">
          Enter the expenses from your Snowboarding Trip below:
        </h1>
        <Formik
          initialValues={{ currency: "", travelPolicy: travelPolicies[0].id }}
          validate={(values) => {
            if (!validateCurrencyCode(values.currency.toUpperCase())) {
              setInvalidCurrency(true);
              return { currency: "Invalid currency" };
            } else if (expenses.length === 0) {
              setAddExpenses(true);
              return { currency: "Please add an expense" };
            } else {
              setInvalidCurrency(false);
              setLoading(true);
            }
          }}
          onSubmit={async (values, actions) => {
            console.log("values", values);
          }}
        >
          {({ setErrors, submitForm }) => (
            <Form className="w-full">
              <div className="flex">
                <div className="grid grid-cols-2 w-fit gap-4 items-center w-3/4">
                  <span className="text-lg font-medium">
                    Enter our 3-letter currency code:
                  </span>
                  <Field type="text" name="currency" required>
                    {({ field }: any) => (
                      <input
                        name="currency"
                        className={`input uppercase ${
                          invalidCurrency && "input-error"
                        }`}
                        required
                        maxLength={3}
                        minLength={3}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          const value = e.target.value.toUpperCase();
                          const valid = validateCurrencyCode(value);
                          if (valid) {
                            setErrors({ currency: "Invalid currency" });
                            setInvalidCurrency(false);
                          } else {
                            setErrors({ currency: "" });
                            setInvalidCurrency(true);
                          }
                        }}
                        type="text"
                        placeholder="USD"
                      />
                    )}
                  </Field>

                  <span className="text-lg font-medium">
                    Choose your travel policy:
                  </span>
                  <Field as="select" name="travelPolicy" className="select">
                    {travelPolicies.map((policy) => (
                      <option value={policy.id} key={policy.id}>
                        {policy.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="w-1/4 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <div className="flex flex-col space-y-1">
                      <button
                        type="button"
                        className={`btn btn-primary ${
                          loading && "btn-loading"
                        }`}
                        onClick={(e) => {
                          submitForm();
                        }}
                      >
                        Submit Expenses
                      </button>

                      <label
                        className={`text-error text-xs text-center ${
                          addExpenses ? "" : "invisible"
                        }`}
                      >
                        Please add an expense
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    Total Expenses: ${total.toFixed(2)}
                  </div>
                  <div className="flex justify-end text-lg font-medium text-green-500">
                    Reimbursable Amount: ${reimbursable.toFixed(2)}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <ExpensesTable onAdd={onAdd} />
      </div>
    </main>
  );
}
