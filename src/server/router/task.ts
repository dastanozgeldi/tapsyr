import { z } from "zod";
import { createRouter } from "./context";

export const taskRouter = createRouter()
  .query("all", {
    resolve({ ctx }) {
      return ctx.prisma.task.findMany({
        where: {
          userId: ctx.session?.user?.id,
        },
      });
    },
  })
  .mutation("add", {
    input: z.object({
      content: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      const task = await ctx.prisma.task.create({
        data: {
          ...input,
          userId: ctx.session?.user?.id,
        },
      });
      return task;
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
      const task = await ctx.prisma.task.update({
        where: { id },
        data,
      });
      return task;
    },
  })
  .mutation("delete", {
    input: z.string().cuid(),
    async resolve({ ctx, input: id }) {
      await ctx.prisma.task.delete({
        where: { id },
      });
      return id;
    },
  })
  .mutation("clearCompleted", {
    async resolve({ ctx }) {
      await ctx.prisma.task.deleteMany({
        where: {
          isDone: true,
        },
      });
      return ctx.prisma.task.findMany();
    },
  });
