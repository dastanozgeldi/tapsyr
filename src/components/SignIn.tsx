import { signIn } from "next-auth/react";
import React from "react";

const SignIn = ({ message = "" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold text-center">
        {message || "This page requires signing in first."}
      </h1>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
};

export default SignIn;
