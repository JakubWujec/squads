"use client"

import { SearchBar } from "@/app/_components/search-player";
import { api } from "@/trpc/react";
import { type Player } from "@prisma/client";
import { useState } from "react";
import { PlayerItem } from "./PlayerItem";
import { Team } from "./Team";

type PlayerSelectionProps = {
  roomId: number;
  token: string;
}

export function PlayerSelection({ roomId, token }: PlayerSelectionProps) {
  const utils = api.useUtils();
  const [filterText, setFilterText] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  const getPlayers = api.room.getPlayers.useQuery({
    roomId: roomId
  })

  const players: Player[] = getPlayers.data ?? [];
  const noTeamPlayers = players.filter(player => player.team === 0)
  const firstTeamPlayers = players.filter(player => player.team === 1)
  const secondTeamPlayers = players.filter(player => player.team === 2)
  const filteredPlayers = noTeamPlayers.filter(player => player.name.toLowerCase().includes(filterText.toLowerCase()));
  const selectedPlayer = players.find(player => player.id === selectedPlayerId);

  const handlePlayerSelected = (player: Player | undefined) => {
    if (player && player.team === 0) {
      setSelectedPlayerId(player.id)
    }
  }

  const assignPlayerToATeam = api.room.assignPlayerToATeam.useMutation({
    onSuccess: async () => {
      setSelectedPlayerId(null);
      await utils.room.getPlayers.invalidate();
    },
  });

  const handleLockPlayer = (player: Player) => {
    assignPlayerToATeam.mutate({
      playerId: player.id,
      roomId,
      token
    })
  }


  return (
    <div className="w-full flex flex-row justify-between">
      <Team teamId={1} players={firstTeamPlayers}></Team>
      <div>
        <SearchBar filterText={filterText} onFilterTextChange={(text) => { setFilterText(text); console.log('text', text) }}></SearchBar>
        <div className="flex flex-wrap gap-2">
          {filteredPlayers.map((player) => {
            return (
              <PlayerItem
                player={player}
                className={selectedPlayerId === player.id ? 'border-4 border-green-400' : player.team != 0 ? 'bg-gray-500' : ''}
                key={player.name}
                onClickHandler={handlePlayerSelected}></PlayerItem>
            )
          })}
        </div>
        {selectedPlayerId != null && <button disabled={selectedPlayerId == null}
          onClick={() => handleLockPlayer(selectedPlayer!)}>LOCK</button>}
      </div>
      <Team teamId={2} players={secondTeamPlayers}></Team>
    </div>
  );
}
