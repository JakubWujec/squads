import { type Player } from "@prisma/client";

type TeamProps = {
  players: Player[];
  teamId: number;
}

export function Team({ players, teamId }: TeamProps) {

  return (
    <div>
      <h2>Team {teamId}</h2>
      {players.map((player) => {
        return (
          <div key={player.name}>
            {player.name}
          </div>
        )
      })}
    </div >
  );
}
