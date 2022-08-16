import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

// Example router with queries that can only be hit if the user requesting is signed in
export const coinRouter = createProtectedRouter()
  .mutation("save", {
    input: z.object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
      rank: z.number(),
      symbol: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        const savedCoin = await ctx.prisma.coin.create({
          data: {
            id: input.id,
            image: input.image,
            name: input.name,
            rank: input.rank,
            symbol: input.symbol,
            User: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
        return savedCoin;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not save the coin",
        });
      }
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      try {
        const coins = await ctx.prisma.coin.findMany({
          where: {
            userId: ctx.session.user.id,
          },
          orderBy: {
            rank: "asc",
          },
        });
        return coins;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was an error getting the coins",
        });
      }
    },
  })
  .mutation("remove", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session.user.id) {
        try {
          await ctx.prisma.coin.delete({
            where: {
              id_userId: {
                id: input.id,
                userId: ctx.session.user.id,
              },
            },
          });
          return "success";
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "There was an error removing the coins",
          });
        }
      }
    },
  });
