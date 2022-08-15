import { CheckIcon, TrashIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { RefObject, useEffect, useRef, useState } from "react";
import { trpc } from "../utils/trpc";
import Button from "./Button";

function useClickOutside({
  ref,
  callback,
}: {
  ref: RefObject<any>;
  callback: () => void;
}) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackRef.current();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Task = ({ task }: Todo) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useContext();
  const [content, setContent] = useState(task.content);

  useEffect(() => {
    setContent(task.content);
  }, [task.content]);

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

  useClickOutside({
    ref: wrapperRef,
    callback() {
      editTask.mutate({
        id: task.id,
        data: { content },
      });
    },
  });

  return (
    <div
      className="my-4 flex items-center justify-between gap-4 p-4 border-2 border-gray-500 rounded-xl"
      ref={wrapperRef}
    >
      <Button
        className="p-1 m-0 rounded-full"
        onClick={() =>
          editTask.mutate({ id: task.id, data: { isDone: !task.isDone } })
        }
      >
        <CheckIcon width={24} height={24} />
      </Button>
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
            editTask.mutate({
              id: task.id,
              data: { content },
            });
            document.getElementById(task.id)?.blur();
          }
        }}
      />
      <Button
        className="rounded-full bg-red-400 hover:bg-red-500 p-1 m-0"
        onClick={() => deleteTask.mutate(task.id)}
      >
        <TrashIcon width={24} height={24} />
      </Button>
    </div>
  );
};

export default Task;
