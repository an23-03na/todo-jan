"use client"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { FormProvider } from "react-hook-form";
import { useRegister } from "@/hooks/auth/use-register";
import { FormInput } from "./form-input";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, onSubmit } = useRegister();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FormInput
                    name="name"
                    label="Full Name"
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </Field>
                <Field>
                  <FormInput
                    name="email"
                    label="Email"
                    id="email"
                    type="text"
                    placeholder="@gmail.com"
                    required
                  />
                </Field>
                <Field>
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <FormInput
                        name="password"
                        label="Password"
                        id="password"
                        type="password"
                        required
                      />
                    </Field>
                    <Field>
                      <FormInput
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        required
                      />
                    </Field>
                  </Field>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <Button disabled={form.formState.isSubmitting} type="submit">
                    Create Account
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account? <a href="/login">Sign in</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
