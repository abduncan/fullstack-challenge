"use client";
import { Form, Formik } from "formik";

const ExpenseForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <Formik
      initialValues={{
        expenseDate: "",
        category: "",
        description: "",
        amount: 0,
      }}
      onSubmit={async (values, actions) => {
        // setLoading(true);
        // await generateBlogPost(values);
        // push("/tools/blogs/generated-blogs");
      }}
    >
      <Form className="">{children}</Form>
    </Formik>
  );
};
export default ExpenseForm;
