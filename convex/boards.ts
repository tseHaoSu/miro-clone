import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const boards = await ctx.db
      .query("boards")
      .withIndex("byOrg", (q) => q.eq("orgId", args.orgId))
      .collect();
    return boards;
  },
});
