import { type Player } from "@prisma/client";

type PlayerListProps = {
  players: Player[];
  selectedPlayerId: number | null;
  setSelectedPlayerId: (playerId: number) => void;
}

export function PlayerList({ players, setSelectedPlayerId, selectedPlayerId }: PlayerListProps) {

  const onClickHandler = (playerId: number) => {
    setSelectedPlayerId(playerId);
  }

  if (!players.length) {
    return <div>Brak graczy</div>
  }

  return (
    <div>
      <ul className="flex flex-wrap gap-2">
        {players.map((player) => {
          return (
            <li
              className={`${selectedPlayerId === player.id ? 'border-green-400' : 'white'} border-2 p-4`}
              key={player.name}
              onClick={() => onClickHandler(player.id)}>
              {player.name}
            </li>
          )
        })}
      </ul>
    </div>
  );
}
