import {
  RegisterFormSchema,
  registerFormSchema,
} from "@/constants/form-schema/auth";
import { signUp } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useRegister = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormSchema) => {
    await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
      fetchOptions: {
        onSuccess() {
          toast.success("Success Register");
          form.reset();
        },
        onError(error) {
          console.log(error);
          toast.error("Failed Reagister" + error);
        },
      },
    });
  };
  return {
    form,
    onSubmit,
  };
};
