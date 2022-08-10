import type { NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Page from "../components/Layout/Page";
import Task from "../components/Task";
import SignIn from "../components/SignIn";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const utils = trpc.useContext();
  const allTasks = trpc.useQuery(["todo.all"]);

  const addTask = trpc.useMutation("todo.add", {
    async onMutate({ content }) {
      await utils.cancelQuery(["todo.all"]);
      const tasks = allTasks.data ?? [];
      utils.setQueryData(["todo.all"], [...tasks, { content } as any]);
    },
  });

  if (!session) {
    return <SignIn message="Sign In to See the Tasks." />;
  }
  return (
    <Page title="Tasks">
      <div className="max-w-[90%] md:max-w-[50%] flex flex-col items-center justify-center gap-4 mx-auto min-h-screen p-4">
        <h1 className="font-extrabold text-5xl text-center">
          Hi, {session.user?.name}!
        </h1>

        <div className="border-4 border-gray-700 rounded-xl">
          <input
            className="rounded-t-xl indent-1 outline-none bg-gray-100 dark:bg-gray-800 px-4 py-2 w-full border-b-2 border-gray-700"
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
          <div className="h-[75vh] flex flex-col">
            {allTasks.data ? (
              <div className="px-6 overflow-scroll">
                {allTasks.data.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <p className="text-center h-[75vh] flex items-center justify-center text-2xl font-bold px-6">
                Loading everything I remember...
              </p>
            )}
          </div>
        </div>

        <Link href="#footer">
          <div className="flex items-center">
            <ChevronDownIcon
              className="p-2 mx-auto text-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:duration-300"
              width={48}
              height={48}
            />
          </div>
        </Link>
      </div>
    </Page>
  );
};

export default Home;
