"use client"

import { PlayerList } from "@/app/_components/list-player";
import { SearchBar } from "@/app/_components/search-player";
import { useState } from "react";
import { api } from "@/trpc/react";

type PlayerSelectionProps = {
  roomId: number;
}

export function PlayerSelection({ roomId }: PlayerSelectionProps) {
  const [filterText, setFilterText] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  const getPlayers = api.room.getPlayers.useQuery({
    roomId: roomId
  })

  const filteredPlayers = getPlayers.data?.filter(player => player.name.toLowerCase().includes(filterText.toLowerCase())) ?? [];

  return (
    <>
      <SearchBar filterText={filterText} onFilterTextChange={(text) => { setFilterText(text); console.log('text', text) }}></SearchBar>
      <PlayerList players={filteredPlayers} selectedPlayerId={selectedPlayerId} setSelectedPlayerId={setSelectedPlayerId}></PlayerList>
    </>
  );
}
