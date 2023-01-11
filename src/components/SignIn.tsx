import { signIn } from "next-auth/react";
import { ACTION_BUTTON } from "../styles";

const SignIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold text-center">
        {children || "This page requires signing in first."}
      </h1>
      <button className={`${ACTION_BUTTON} my-8`} onClick={() => signIn()}>
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
