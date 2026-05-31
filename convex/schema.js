import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  threads: defineTable({
    board: v.string(),
    title: v.string(),
    author: v.string(),
    tag: v.string(),
    body: v.string(),
    views: v.number(),
    pinned: v.boolean(),
    updatedAt: v.number(),
  }).index("by_updatedAt", ["updatedAt"]),

  replies: defineTable({
    threadId: v.id("threads"),
    author: v.string(),
    body: v.string(),
    createdAt: v.number(),
  }).index("by_thread", ["threadId"]),

  readingNotes: defineTable({
    reading: v.string(),
    passage: v.number(),
    title: v.string(),
    body: v.string(),
    createdAt: v.number(),
  }).index("by_reading_passage", ["reading", "passage"]),
});
