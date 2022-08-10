import { z } from "zod";
import { createRouter } from "./context";

export const todoRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return ctx.task.findMany({
        orderBy: { createdAt: "asc" },
        where: { userId: ctx.session?.user?.id },
      });
    },
  })
  .mutation("add", {
    input: z.object({
      content: z.string().min(2),
    }),
    async resolve({ ctx, input }) {
      const todo = await ctx.task.create({
        data: { ...input, userId: ctx.session?.user?.id },
      });
      return todo;
    },
  })
  .mutation("edit", {
    input: z.object({
      id: z.string().cuid(),
      data: z.object({
        isDone: z.boolean().optional(),
        content: z.string().min(1).optional(),
        updatedAt: z.date().default(new Date()),
      }),
    }),
    async resolve({ ctx, input }) {
      const { id, data } = input;
      const todo = await ctx.task.update({
        where: { id },
        data,
      });
      return todo;
    },
  })
  .mutation("delete", {
    input: z.string().cuid(),
    async resolve({ input: id, ctx }) {
      await ctx.task.delete({ where: { id } });
      return id;
    },
  })
  .mutation("clearCompleted", {
    async resolve({ ctx }) {
      await ctx.task.deleteMany({ where: { isDone: true } });
      return ctx.task.findMany();
    },
  });
