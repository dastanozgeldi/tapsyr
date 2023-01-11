import { useSession } from "next-auth/react";
import { Page } from "../layouts/Page";
import { SignIn } from "../components/common/SignIn";
import { trpc } from "../utils/trpc";
import { TaskItem } from "../components/tasks/TaskItem";

export default function Tasks() {
  const { data: session } = useSession();

  const utils = trpc.useContext();
  const allTasks = trpc.useQuery(["task.all"]);
  const addTask = trpc.useMutation("task.add", {
    async onSuccess() {
      await utils.invalidateQueries(["task.all"]);
    },
  });
  const clearCompleted = trpc.useMutation(["task.clearCompleted"], {
    async onMutate() {
      await utils.cancelQuery(["task.all"]);
      const tasks = allTasks.data ?? [];
      utils.setQueryData(
        ["task.all"],
        tasks.filter((t) => !t.isDone)
      );
    },
  });

  if (!session) return <SignIn>Sign In to See the Tasks.</SignIn>;
  return (
    <Page title="Tasks">
      <div className="max-w-[60ch] flex flex-col  gap-4 mx-auto min-h-screen p-4">
        <h1 className="my-4 font-extrabold text-4xl text-center">
          Hi, {session.user?.name}!
        </h1>
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
          <div className="h-[65vh] flex flex-col">
            {allTasks.data ? (
              <div className="px-6 overflow-auto">
                {allTasks.data.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <p className="text-center h-[65vh] flex items-center justify-center text-2xl font-bold px-6">
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
      </div>
    </Page>
  );
}
