import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveSketch = mutation({
  args: { prompt: v.string(), image: v.string() },
  handler: async (ctx, { prompt, image }) => {
    const sketch = await ctx.db.insert("sketches", {
      prompt,
    });

    return sketch;
  },
});

export const getSketches = query({
  handler: async (ctx) => {
    const sketches = await ctx.db.query("sketches").collect();
    return sketches;
  },
});
