import { useState } from "react";

const Donate = () => {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = () => {
    if (linkCopied) return;
    navigator.clipboard.writeText(window.location.origin);
    setLinkCopied(!linkCopied);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl md:text-[5rem] font-extrabold my-6">
        Don&apos;t Pay.
      </h1>
      <p className="text-2xl">share with your friends instead!</p>
      <p className="text-2xl">
        I want to try serving features to a huge audience.
      </p>
      <p className="text-2xl">Your help is highly appreciated.</p>
      <button className="text-center" onClick={handleCopy}>
        {linkCopied ? "Copied!" : "Copy Link"}
      </button>
    </main>
  );
};

export default Donate;
