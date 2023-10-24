"use client";

import { api } from "@/trpc/react";

type PlayerListProps = {
  roomId: number;
}

export function PlayerList({ roomId }: PlayerListProps) {
  const players = api.room.getPlayers.useQuery({
    roomId: roomId
  })

  return (
    <div>
      <ul>
        {(!!players?.data?.length) && players.data.map((player) => {
          return <li key={player.name}>{player.name}</li>
        })}
      </ul>

    </div>
  );
}
