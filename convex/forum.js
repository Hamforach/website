import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const tagCategory = v.union(
  v.literal("period"),
  v.literal("language"),
  v.literal("tradition"),
  v.literal("topic"),
  v.literal("source-type"),
);

const tagValue = v.object({
  name: v.string(),
  category: tagCategory,
});

function relativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

export const listThreads = query({
  args: {},
  handler: async (ctx) => {
    const threads = await ctx.db.query("threads").collect();
    const sorted = threads.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.updatedAt - a.updatedAt;
    });

    return await Promise.all(
      sorted.map(async (thread) => {
        const replies = await ctx.db
          .query("replies")
          .withIndex("by_thread", (q) => q.eq("threadId", thread._id))
          .collect();

        return {
          id: thread._id,
          board: thread.board,
          title: thread.title,
          author: thread.author,
          tag: thread.tag || thread.tags?.[0]?.name || "discussion",
          tags: thread.tags || (thread.tag ? [{ name: thread.tag, category: "topic" }] : []),
          body: thread.body,
          replies: replies
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((reply) => ({
              author: reply.author,
              body: reply.body,
              time: relativeTime(reply.createdAt),
            })),
          views: thread.views,
          updated: relativeTime(thread.updatedAt),
          pinned: thread.pinned,
        };
      }),
    );
  },
});

export const createThread = mutation({
  args: {
    board: v.string(),
    title: v.string(),
    author: v.string(),
    tag: v.optional(v.string()),
    tags: v.optional(v.array(tagValue)),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("threads", {
      ...args,
      tag: args.tag || args.tags?.[0]?.name || "discussion",
      tags: args.tags || [],
      views: 1,
      pinned: false,
      updatedAt: Date.now(),
    });
  },
});

export const addReply = mutation({
  args: {
    threadId: v.id("threads"),
    author: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("replies", {
      threadId: args.threadId,
      author: args.author,
      body: args.body,
      createdAt: Date.now(),
    });
    await ctx.db.patch(args.threadId, { updatedAt: Date.now() });
  },
});

export const incrementThreadViews = mutation({
  args: {
    threadId: v.id("threads"),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get(args.threadId);
    if (!thread) return;
    await ctx.db.patch(args.threadId, { views: thread.views + 1 });
  },
});

export const listReadingNotes = query({
  args: {},
  handler: async (ctx) => {
    const notes = await ctx.db.query("readingNotes").collect();
    return notes
      .sort((a, b) => a.createdAt - b.createdAt)
      .map((note) => ({
        reading: note.reading,
        passage: note.passage,
        title: note.title,
        body: note.body,
        time: relativeTime(note.createdAt),
      }));
  },
});

export const saveReadingNote = mutation({
  args: {
    reading: v.string(),
    passage: v.number(),
    title: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("readingNotes", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
