"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto h-screen justify-center items-center px-4">
      <h1 className="text-3xl">チェックメイト</h1>
      <form
        className="flex flex-col gap-4 w-full p-8 shadow-xl"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          void signIn("password", formData)
            .catch((error) => {
              setError(error.message);
              setLoading(false);
            })
            .then(() => {
              router.push("/");
            });
        }}
      >
        <Input type="email" name="email" placeholder="Email" required />
        <div className="flex flex-col gap-1">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            minLength={8}
            required
          />
          {flow === "signUp" && (
            <p className="text-xs text-destructive  px-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : flow === "signIn" ? "Sign in" : "Sign up"}
        </Button>
        <div className="flex flex-row gap-2 text-sm justify-center">
          <span>
            {flow === "signIn"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <button
            type="button"
            className="text-primary underline underline-offset-4 cursor-pointer"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up" : "Sign in"}
          </button>
        </div>
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 dark:border-rose-500/50 rounded-lg p-4">
            <p className="text-rose-700 dark:text-rose-300 font-medium text-sm wrap-break-word">
              Error: {error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
