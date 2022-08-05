import { createRouter } from "./context";

export const userRouter = createRouter().query("hi", {
  async resolve({ ctx }) {
    return {
      greeting: `Hi, ${ctx.session?.user?.name}!`,
    };
  },
});
