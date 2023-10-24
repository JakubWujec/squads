import { type Player } from "@prisma/client";

type PlayerListProps = {
  players: Player[];
}

export function PlayerList({ players }: PlayerListProps) {
  return (
    <div>
      <ul>
        {(!!players.length) && players.map((player) => {
          return <li key={player.name}>{player.name}</li>
        })}
      </ul>
    </div>
  );
}
