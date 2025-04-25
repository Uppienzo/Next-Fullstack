"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LoginForm = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-secondary">      
      <div className="bg-card p-8 rounded-lg shadow-md w-96">        
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setFieldError }) => {
            if (values.username === "user" && values.password === "password") {
              router.push("/insurance-select");
            } else {
              setFieldError("password", "Invalid username or password");
            }
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Field
                  as={Input}
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
