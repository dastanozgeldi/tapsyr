import Link from "next/link";

const Features = () => {
  return (
    <div
      id="features"
      className="py-10 grid gap-8 xl:grid-cols-3 items-center justify-items-center min-h-screen bg-[url(/done-checking.svg)] bg-no-repeat bg-bottom bg-contain text-gray-100"
    >
      <div className="m-2 max-w-[40ch] bg-[#202020]/70 rounded-md p-4">
        <h1 className="text-4xl my-3">🚀 Simplicity.</h1>
        <p>
          Tapsyr only requires you to Sign In with Google (the most popular
          option). Go to{" "}
          <Link href="/tasks">
            <a className="highlight">/tasks</a>
          </Link>{" "}
          and start destroying your to do list!
        </p>
      </div>

      <div className="m-2 max-w-[40ch] bg-[#202020]/70 rounded-md p-4">
        <h1 className="text-4xl my-3">✨ Minimalism.</h1>
        <p>
          Tapsyr meets modern standards of UX/UI design. It uses a library
          called{" "}
          <a className="highlight" href="https://auto-animate.formkit.com/">
            Auto Animate by Formkit
          </a>{" "}
          to provide smooth animations and transitions.
        </p>
      </div>

      <div className="m-2 max-w-[40ch] bg-[#202020]/70 rounded-md p-4">
        <h1 className="text-4xl my-3">🥶 Free to Use.</h1>
        <p>
          Tapsyr is a non-profit app which means we don&apos;t get money for our
          service. However, you could support the author&apos;s work via{" "}
          <Link href="/donate">
            <a className="highlight">/donate</a>
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Features;
