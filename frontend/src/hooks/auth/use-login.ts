import { LoginFormSchema, loginFormSchema } from "@/constants/form-schema/auth";
import { signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useLogin = () => {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormSchema) => {
    await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "http://localhost:3000",
      fetchOptions: {
        onSuccess() {
          toast.success("Success Login");
          form.reset();
        },
        onError(error) {
          console.log(error);
          toast.error("Failed Login" + error);
        },
      },
    });
  };
  return {
    onSubmit, form
  }
};
