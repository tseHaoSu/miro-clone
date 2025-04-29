import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAll } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    // Handle favorites-only case
    if (args.favorites) {
      const favoriteBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", userId).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoriteBoards.map((b) => b.boardId);
      const boards = await getAll(ctx.db, ids);

      // Filter out null entries
      return boards
        .filter((board) => board !== null)
        .map((b) => ({
          ...b,
          isFavorite: true,
        }));
    }

    // Get all boards for the org, with optional search filter
    let boards = [];
    const title = args.search as string;

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("byOrg", (q) => q.eq("orgId", args.orgId))
        .collect();
    }

    // Get all favorites for this user in this org in a single query
    const userFavorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_org", (q) =>
        q.eq("userId", userId).eq("orgId", args.orgId)
      )
      .collect();

    // fast lookup
    const favoriteIds = new Set(
      userFavorites.map((fav) => fav.boardId.toString())
    );

    // Mark favorite status for each board in
    return boards.map((board) => ({
      ...board,
      isFavorite: favoriteIds.has(board._id.toString()),
    }));
  },
});
