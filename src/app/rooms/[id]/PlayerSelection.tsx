"use client"

import { PlayerList } from "@/app/_components/list-player";
import { SearchBar } from "@/app/_components/search-player";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Team } from "./Team";

type PlayerSelectionProps = {
  roomId: number;
}

export function PlayerSelection({ roomId }: PlayerSelectionProps) {
  const [filterText, setFilterText] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  const getPlayers = api.room.getPlayers.useQuery({
    roomId: roomId
  })

  const assignPlayerToATeam = api.room.assignPlayerToATeam.useMutation({
    onSuccess: () => {
      setSelectedPlayerId(null);
    },
  });

  const lockHandler = (playerId: number, teamId: number) => {
    console.log(playerId, teamId)
    assignPlayerToATeam.mutate({
      playerId,
      roomId,
      teamId
    })
  }

  const firstTeamPlayers = getPlayers.data?.filter(player => player.team === 1) ?? []
  const secondTeamPlayers = getPlayers.data?.filter(player => player.team === 2) ?? []

  const filteredPlayers = getPlayers.data?.filter(player => player.name.toLowerCase().includes(filterText.toLowerCase())) ?? [];

  return (
    <div className="w-full flex flex-row justify-between">
      <Team teamId={1} players={firstTeamPlayers}></Team>
      <div>
        <SearchBar filterText={filterText} onFilterTextChange={(text) => { setFilterText(text); console.log('text', text) }}></SearchBar>
        <PlayerList players={filteredPlayers} selectedPlayerId={selectedPlayerId} setSelectedPlayerId={setSelectedPlayerId}></PlayerList>
        {selectedPlayerId != null && <button disabled={selectedPlayerId == null} onClick={() => lockHandler(selectedPlayerId, 1)}>LOCK</button>}
      </div>
      <Team teamId={2} players={secondTeamPlayers}></Team>
    </div>
  );
}
