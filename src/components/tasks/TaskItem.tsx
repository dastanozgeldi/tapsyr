import { CheckIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { type Task } from "@prisma/client";
import clsx from "clsx";
import { useRef, useState } from "react";
import { ACTION_BUTTON, DELETE_BUTTON } from "styles";
import { trpc } from "utils/trpc";
import { EditTask } from "./EditTask";

export const TaskItem = ({ task }: { task: Task }) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);

  const utils = trpc.useContext();

  const editTask = trpc.useMutation("task.edit", {
    async onSuccess() {
      await utils.invalidateQueries(["task.all"]);
      setIsOpen(false);
    },
  });
  const deleteTask = trpc.useMutation("task.delete", {
    async onSuccess() {
      await utils.invalidateQueries(["task.all"]);
    },
  });

  return (
    <div
      className="my-4 flex items-center justify-between overflow-x-scroll gap-4 p-4 border-2 border-gray-500 rounded-xl"
      ref={wrapperRef}
    >
      <button
        className={`${ACTION_BUTTON} p-1 m-0 rounded-full`}
        onClick={() => {
          editTask.mutate({
            id: task.id,
            data: {
              isDone: !task.isDone,
            },
          });
        }}
      >
        <CheckIcon width={20} height={20} />
      </button>
      <p
        className={clsx(
          "p-2 outline-none w-[80%] rounded-xl text-lg",
          "bg-transparent text-gray-700 dark:text-gray-200 focus:bg-gray-100 focus:dark:bg-gray-800",
          task.isDone && "line-through"
        )}
      >
        {task.content}
      </p>
      <button
        className={`${ACTION_BUTTON} rounded-full p-1 m-0`}
        onClick={() => setIsOpen(true)}
      >
        <PencilAltIcon width={20} height={20} />
      </button>
      <button
        className={`${DELETE_BUTTON} rounded-full bg-red-400 hover:bg-red-500 p-1 m-0`}
        onClick={() => deleteTask.mutate(task.id)}
      >
        <TrashIcon width={20} height={20} />
      </button>
      <EditTask
        task={task}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editTask={editTask}
      />
    </div>
  );
};
