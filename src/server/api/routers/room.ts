import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const roomRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {

      const room = await ctx.db.room.create({
        data: {
          name: input.name
        },
      });

      await ctx.db.roomAuth.create({
        data: {
          role: "HOST",
          token: "hash1",
          password: "pass1",
          roomId: room.id,
        }
      })

      await ctx.db.roomAuth.create({
        data: {
          role: "PICKER",
          token: "hash2",
          password: "pass2",
          roomId: room.id,
        }
      })

      return room;

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

  getRole: publicProcedure
    .input(z.object({ roomId: z.number().min(1), token: z.string() }))
    .query(async ({ ctx, input }) => {
      const roomAuth = await ctx.db.roomAuth.findFirstOrThrow({
        where: {
          roomId: input.roomId,
          token: input.token
        }
      });

      return roomAuth.role;
    }),

  getOne: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(async ({ ctx, input }) => {

      return ctx.db.room.findUniqueOrThrow({
        where: {
          id: input.id
        }
      });
    }),

  assignPlayerToATeam: publicProcedure
    .input(z.object({ playerId: z.number(), roomId: z.number(), token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const roomAuth = await ctx.db.roomAuth.findFirst({
        where: {
          roomId: input.roomId,
          token: input.token
        }
      });
      if (!roomAuth) throw new Error("Not authorized");

      const team = roomAuth.role === 'HOST' ? 1 : 2

      await ctx.db.player.update({
        data: {
          team: team
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
      const roomAuth = await ctx.db.roomAuth.findFirstOrThrow({
        where: {
          roomId: input.roomId,
          password: input.password
        }
      });

      return roomAuth;
    }),

});
