import type { NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Page from "../components/Layout/Page";
import Todo from "../components/Todo";
import SignIn from "../components/SignIn";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const utils = trpc.useContext();
  const allTasks = trpc.useQuery(["todo.all"]);
  const { data: hi } = trpc.useQuery(["user.hi"]);

  const addTask = trpc.useMutation("todo.add", {
    async onMutate({ content }) {
      await utils.cancelQuery(["todo.all"]);
      const tasks = allTasks.data ?? [];
      utils.setQueryData(
        ["todo.all"],
        [
          {
            content,
            userId: session?.user?.id || null,
          } as any,
          ...tasks,
        ]
      );
    },
  });

  if (!session) {
    return <SignIn message="Sign In to See the Tasks." />;
  }
  return (
    <Page title="Tasks">
      <main className="mx-auto min-h-screen p-4 max-w-[90%] sm:max-w-[50%]">
        <h1 className="h-[10vh] font-extrabold text-5xl md:text-[4rem] text-center">
          {hi ? <p>{hi.greeting}</p> : <p>Loading..</p>}
        </h1>

        <div className="border-4 border-gray-700 rounded-md ">
          <input
            className="h-[5vh] indent-1 outline-none bg-gray-100 px-4 py-2 w-full border-b-2 border-gray-700"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={(e) => {
              const content = e.currentTarget.value.trim();
              if (e.key === "Enter" && content) {
                addTask.mutate({ content });
                e.currentTarget.value = "";
              }
            }}
          />
          <div className="h-[75vh] flex flex-col items-center justify-center">
            {allTasks.data ? (
              <div className="w-[90%] overflow-scroll px-6">
                {allTasks.data.map((task) => (
                  <div key={task.id} className="mx-auto">
                    <Todo task={task} />
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading tasks...</p>
            )}
          </div>
        </div>

        <Link href="#footer">
          <div className="h-[10vh] flex items-center">
            <ChevronDownIcon
              className="p-2 mx-auto text-gray-700 rounded-full hover:bg-gray-100"
              width={48}
              height={48}
            />
          </div>
        </Link>
      </main>
    </Page>
  );
};

export default Home;
