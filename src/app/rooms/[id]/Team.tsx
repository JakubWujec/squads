import { type Player } from "@prisma/client";

type TeamProps = {
  players: Player[];
  teamId: number;
}

export function Team({ players, teamId }: TeamProps) {

  return (
    <div className="flex flex-col">
      <h2>Team {teamId}</h2>

      {players.map((player) => {
        return (
          <div key={player.name} className={`border-white border-2 mb-2 p-4`}>
            {player.name}
          </div>
        )
      })}

    </div >
  );
}
