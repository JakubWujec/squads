import { type Player } from "@prisma/client";
import { PlayerItem } from "./PlayerItem";

type PlayerListProps = {
  players: Player[];
  selectedPlayerId: number | null;
  setSelectedPlayerId: (playerId: number) => void;
}

const alreadyPickedClass = 'bg-gray'
const selectedClass = 'border-4 border-green-400'
const canBePicked = ''

export function PlayerList({ players, setSelectedPlayerId, selectedPlayerId }: PlayerListProps) {

  const onClickHandler = (player: Player) => {
    if (player.team === 0) {
      setSelectedPlayerId(player.id);
    }

  }

  if (!players.length) {
    return <div>Brak graczy</div>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {players.map((player) => {
        return (
          <PlayerItem
            player={player}
            className={selectedPlayerId === player.id ? selectedClass : player.team == 0 ? alreadyPickedClass : canBePicked}
            key={player.name}
            onClickHandler={onClickHandler}></PlayerItem>
        )
      })}
    </div>

  );
}
