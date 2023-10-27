import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const roomRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.room.create({
        data: {
          name: input.name,
        },
      });

    }),

  addPlayer: publicProcedure
    .input(z.object({ name: z.string().min(1), roomId: z.number() }))
    .mutation(async ({ ctx, input }) => {

      await ctx.db.player.create({
        data: {
          name: input.name,
          roomId: input.roomId
        }
      })

      return ctx.db.room.findUniqueOrThrow({
        where: {
          id: input.roomId
        }
      });
    }),

  getPlayers: publicProcedure
    .input(z.object({ roomId: z.number().min(1) }))
    .query(({ ctx, input }) => {

      return ctx.db.player.findMany({
        where: {
          roomId: input.roomId
        }
      });
    }),

  getOne: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(({ ctx, input }) => {

      return ctx.db.room.findUniqueOrThrow({
        where: {
          id: input.id
        }
      });
    }),

  assignPlayerToATeam: publicProcedure
    .input(z.object({ playerId: z.number(), roomId: z.number(), teamId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.player.update({
        data: {
          team: input.teamId,
        },
        where: {
          id: input.playerId,
          roomId: input.roomId
        }
      })

      return ctx.db.room.findUniqueOrThrow({
        where: {
          id: input.roomId
        }
      });
    }),

  enterRoom: publicProcedure
    .input(z.object({ roomId: z.number(), password: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {

      const findRoom = await ctx.db.room.findUnique({
        where: {
          id: input.roomId
        }
      })

      if (findRoom?.password === input.password) {
        return {
          message: "Git gut",
          token: 'zfkdsfklsew12',
          role: "host"
        }
      }

      return {
        message: "No bueno",
        role: "guest",
        token: null,
      }
    }),

});
