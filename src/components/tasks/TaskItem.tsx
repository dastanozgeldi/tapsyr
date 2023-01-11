import { CheckIcon, TrashIcon } from "@heroicons/react/solid";
import { type Task } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { ACTION_BUTTON, DELETE_BUTTON } from "../../styles";
import { trpc } from "../../utils/trpc";
import { useClickOutside } from "../../utils/useClickOutside";

export const TaskItem = ({ task }: { task: Task }) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useContext();
  const [content, setContent] = useState(task.content);

  useEffect(() => {
    setContent(task.content);
  }, [task.content]);

  const editTask = trpc.useMutation("todo.edit", {
    async onSuccess() {
      await utils.invalidateQueries(["todo.all"]);
    },
  });
  const deleteTask = trpc.useMutation("todo.delete", {
    async onSuccess() {
      await utils.invalidateQueries(["todo.all"]);
    },
  });

  useClickOutside({
    ref: wrapperRef,
    callback() {
      if (content === task.content) return;
      editTask.mutate({
        id: task.id,
        data: { content },
      });
    },
  });

  return (
    <div
      className="my-4 flex items-center justify-between overflow-x-scroll gap-4 p-4 border-2 border-gray-500 rounded-xl"
      ref={wrapperRef}
    >
      <button
        className={`${ACTION_BUTTON} p-1 m-0 rounded-full`}
        onClick={() =>
          editTask.mutate({ id: task.id, data: { isDone: !task.isDone } })
        }
      >
        <CheckIcon width={24} height={24} />
      </button>
      <input
        id={task.id}
        className={clsx(
          "p-2 outline-none w-[80%] text-center rounded-xl text-lg",
          "bg-transparent text-gray-700 dark:text-gray-200 focus:bg-gray-100 focus:dark:bg-gray-800",
          task.isDone && "line-through"
        )}
        type="text"
        value={content}
        ref={inputRef}
        onChange={(e) => setContent(e.currentTarget.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (content === task.content) return;
            else {
              editTask.mutate({
                id: task.id,
                data: { content },
              });
            }
            document.getElementById(task.id)?.blur();
          }
        }}
      />
      <button
        className={`${DELETE_BUTTON} rounded-full bg-red-400 hover:bg-red-500 p-1 m-0`}
        onClick={() => deleteTask.mutate(task.id)}
      >
        <TrashIcon width={24} height={24} />
      </button>
    </div>
  );
};
