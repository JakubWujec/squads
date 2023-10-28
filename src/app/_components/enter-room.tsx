"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

export function EnterRoom() {
  const router = useRouter();
  const [password, setPassword] = useState("")
  const [roomId, setRoomId] = useState(0)

  const enterRoom = api.room.enterRoom.useMutation({
    onSuccess: (data) => {
      if (data.token) {
        router.push(`/rooms/${roomId}/${data.token}`)
      }
      router.push(`/rooms/${roomId}`)
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        enterRoom.mutate({ roomId, password });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="number"
        placeholder="Room id"
        value={roomId}
        onChange={(e) => setRoomId(parseInt(e.target.value))}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="password"
        placeholder="Password if you have one"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={enterRoom.isLoading}
      >
        {enterRoom.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
