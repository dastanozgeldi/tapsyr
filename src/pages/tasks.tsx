import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Page from "../layouts/Page";
import SignIn from "../components/SignIn";
import { trpc } from "../utils/trpc";
import { TaskItem } from "../components/tasks/TaskItem";

export default function Tasks() {
  const { data: session } = useSession();

  const utils = trpc.useContext();
  const allTasks = trpc.useQuery(["todo.all"]);
  const addTask = trpc.useMutation("todo.add", {
    async onSuccess() {
      await utils.invalidateQueries(["todo.all"]);
    },
  });
  const clearCompleted = trpc.useMutation(["todo.clearCompleted"], {
    async onMutate() {
      await utils.cancelQuery(["todo.all"]);
      const tasks = allTasks.data ?? [];
      utils.setQueryData(
        ["todo.all"],
        tasks.filter((t) => !t.isDone)
      );
    },
  });

  if (!session) return <SignIn>Sign In to See the Tasks.</SignIn>;
  return (
    <Page title="Tasks">
      {/* header */}
      <h1 className="my-4 font-extrabold text-4xl text-center">
        Hi, {session.user?.name}!
      </h1>
      <div className="max-w-[60ch] flex flex-col items-center justify-center gap-4 mx-auto min-h-screen p-4">
        {/* table of tasks */}
        <div className="w-full border-4 border-gray-700 rounded-xl">
          <input
            className="rounded-t-xl indent-1 outline-none bg-gray-100 dark:bg-gray-800 px-4 py-2 w-full border-b-2 border-gray-700"
            placeholder="go to math class at 1pm..."
            autoFocus
            onKeyDown={(e) => {
              const content = e.currentTarget.value.trim();
              if (e.key === "Enter" && content) {
                addTask.mutate({ content });
                e.currentTarget.value = "";
              }
            }}
          />
          <div className="h-[70vh] flex flex-col">
            {allTasks.data ? (
              <div className="px-6 overflow-scroll">
                {allTasks.data.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <p className="text-center h-[75vh] flex items-center justify-center text-2xl font-bold px-6">
                Loading everything I remember...
              </p>
            )}
          </div>

          <button
            className="text-gray-200 bg-gray-700 text-xl font-bold p-4 rounded-t-md flex mx-auto"
            onClick={() => clearCompleted.mutate()}
          >
            Clear Completed
          </button>
        </div>
        {/* scroll down button */}
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
}
