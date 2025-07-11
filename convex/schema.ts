import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("byOrg", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),

  userFavorites: defineTable({
    orgId: v.string(),
    boardId: v.id("boards"),
    userId: v.string(),
  })
    .index("by_board", ["boardId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_board", ["userId", "boardId"])
    .index("by_user_board_org", ["userId", "boardId", "orgId"]),
});
