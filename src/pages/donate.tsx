import { useState } from "react";
import { ACTION_BUTTON } from "styles";

const Donate = () => {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = () => {
    if (linkCopied) return;
    navigator.clipboard.writeText(window.location.origin);
    setLinkCopied(!linkCopied);
  };

  return (
    <div className="max-w-[48ch] mx-auto flex flex-col justify-center min-h-screen p-4 text-center">
      <h1 className="text-[4rem] font-extrabold my-6">Don&apos;t Pay.</h1>
      <p className="text-2xl">
        Share with your friends instead! I want to try delivering apps to a huge
        audience. Your help is highly appreciated!
      </p>
      <button className={`${ACTION_BUTTON} my-8`} onClick={handleCopy}>
        {linkCopied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
};

export default Donate;
