import { createRouter } from "./context";

export const userRouter = createRouter().query("hi", {
  async resolve({ ctx }) {
    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.session?.user?.id },
    });
    return {
      greeting: `Hi, ${user?.name}!`,
    };
  },
});
