"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { authApi } from "@/lib/auth/auth";
import { PAGE_ROUTES } from "@/lib/constants/routes";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, actions) => {
              try {
                const { user } = await authApi.login(values);

                // Small delay to ensure cookies are set
                setTimeout(() => {
                  if (user.roles.includes("admin")) {
                    router.push("/admin");
                  } else if (user.roles.includes("officer")) {
                    router.push(PAGE_ROUTES.OFFICER.SURVEYS.LIST);
                  } else {
                    throw new Error("Unauthorized role");
                  }
                }, 100);
              } catch (err) {
                const errorMessage =
                  err instanceof Error ? err.message : "Login failed";
                actions.setStatus(errorMessage);
                actions.setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-4">
                {status && (
                  <div className="text-sm text-red-600 text-center">
                    {status}
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Field name="email">
                    {({
                      field,
                    }: {
                      field: {
                        name: string;
                        value: string;
                        onChange: (e: React.ChangeEvent) => void;
                        onBlur: (e: React.FocusEvent) => void;
                      };
                    }) => <Input {...field} placeholder="you@example.com" />}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-red-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Password</label>
                  <Field name="password">
                    {({
                      field,
                    }: {
                      field: {
                        name: string;
                        value: string;
                        onChange: (e: React.ChangeEvent) => void;
                        onBlur: (e: React.FocusEvent) => void;
                      };
                    }) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-600"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
