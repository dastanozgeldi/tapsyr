import { signIn } from "next-auth/react";
import React from "react";
import Button from "./Button";

const SignIn = ({ message = "" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold text-center">
        {message || "This page requires signing in first."}
      </h1>
      <Button className="my-8" onClick={() => signIn()}>
        Sign In
      </Button>
    </div>
  );
};

export default SignIn;
