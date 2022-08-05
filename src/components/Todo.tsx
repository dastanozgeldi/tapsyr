import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

const Todo = ({ task }: Todo) => {
  const [content, setContent] = useState(task.content);
  const [done, setDone] = useState(task.isDone);

  console.log(done);

  useEffect(() => {
    setContent(task.content);
  }, [task.content]);
  useEffect(() => {
    setDone(task.isDone);
  }, [task.isDone]);

  const utils = trpc.useContext();
  const deleteTask = trpc.useMutation("todo.delete", {
    async onMutate() {
      await utils.cancelQuery(["todo.all"]);
      const allTasks = utils.getQueryData(["todo.all"]);
      if (!allTasks) return;

      utils.setQueryData(
        ["todo.all"],
        allTasks.filter((t) => t.id != task.id)
      );
    },
  });
  const editTask = trpc.useMutation("todo.edit", {
    async onMutate({ id, data }) {
      await utils.cancelQuery(["todo.all"]);
      const allTasks = utils.getQueryData(["todo.all"]);
      if (!allTasks) return;

      utils.setQueryData(
        ["todo.all"],
        allTasks.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
    },
  });

  return (
    <div
      className="my-4 flex items-center justify-between gap-4 p-4 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105"
      onClick={() => setDone(!done)}
    >
      <button className="p-1 m-0">
        <PencilAltIcon width={24} height={24} />
      </button>
      <h2 className={`text-lg text-gray-700 ${done && "line-through"}`}>
        {content}
      </h2>
      <button
        className="bg-red-500 p-1 m-0"
        onClick={() => {
          deleteTask.mutate(task.id);
        }}
      >
        <TrashIcon width={24} height={24} />
      </button>
    </div>
  );
};

export default Todo;
