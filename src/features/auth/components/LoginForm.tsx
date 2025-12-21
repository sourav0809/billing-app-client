import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginSchema, type LoginFormData } from "../schemas/auth.schemas";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <Card className="w-full max-w-[440px] bg-white shadow-lg border-0">
      <CardHeader className="space-y-2 pb-6 pt-8 px-8">
        <CardTitle className="text-2xl font-bold text-left">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-sm text-left">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-8 px-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-12 pl-10 pr-4 text-base border-border/60 focus-visible:border-blue-500/60 focus-visible:ring-blue-500/20 focus-visible:ring-2 hover:border-border/80 transition-[border-color]"
                {...form.register("email")}
              />
            </div>

            {form.formState.errors.email && (
              <p className="text-sm text-destructive text-red-500 mt-1.5">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 pl-10 pr-4 text-base border-border/60 focus-visible:border-blue-500/60 focus-visible:ring-blue-500/20 focus-visible:ring-2 hover:border-border/80 transition-[border-color]"
                {...form.register("password")}
              />
            </div>

            {form.formState.errors.password && (
              <p className="text-sm text-destructive text-red-500 mt-1.5">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-medium cursor-pointer bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500/50"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
