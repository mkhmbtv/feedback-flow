"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Icons } from "./icons";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWitGithub = async () => {
    setIsLoading(true);

    try {
      await signIn("github");
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid ">
      <Button variant={"outline"} onClick={loginWitGithub} disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.github className="mr-2 h-4 w-4" />
        )}
        Github
      </Button>
    </div>
  );
}
