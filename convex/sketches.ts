import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveSketch = mutation({
  args: { prompt: v.string(), image: v.string() },
  handler: async (ctx, { prompt }) => {
    const sketch = await ctx.db.insert("sketches", {
      prompt,
    });

    return sketch;
  },
});
