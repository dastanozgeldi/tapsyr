type Todo = {
  task: {
    id: string;
    content: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date | null;
  };
};
