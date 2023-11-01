"use client"

import { type Player } from "@prisma/client";

type PlayerItem = {
  player: Player
  className: string;
  onClickHandler: (player: Player) => void
}

export function PlayerItem({ player, onClickHandler, className }: PlayerItem) {
  return (
    <div
      className={`h-min bg-white text-black border-4 p-4 ${className}`}
      onClick={() => onClickHandler(player)}>
      {player.name}
    </div>
  );
}
