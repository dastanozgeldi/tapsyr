import { useState } from "react";
import { INPUT_TEXT } from "../../styles";
import { Modal } from "../common/Modal";

export const EditTask = ({ task, isOpen, setIsOpen, editTask }: any) => {
  const [content, setContent] = useState(task.content);

  return (
    <Modal title="Edit Task" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form
        className="w-[90%]"
        hidden={!isOpen}
        onSubmit={(e) => {
          e.preventDefault();
          if (content === task.content) {
            return setIsOpen(false);
          }
          editTask.mutate({
            id: task.id,
            data: {
              content,
            },
          });
        }}
      >
        <div className="my-4">
          <label htmlFor="content">Content:</label>
          <input
            id="content"
            className={INPUT_TEXT}
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
            disabled={editTask.isLoading}
          />
        </div>
        <button
          className="bg-teal-400 hover:bg-teal-500 text-center px-4 py-2 rounded-md text-white hover:duration-500 text-lg"
          disabled={editTask.isLoading}
        >
          Save
        </button>
        {editTask.error && (
          <p className="text-red-500">{editTask.error.message}</p>
        )}
      </form>
    </Modal>
  );
};
