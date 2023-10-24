"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

type AddPlayerProps = {
  roomId: number;
}

export function AddPlayer({ roomId }: AddPlayerProps) {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPlayer = api.room.addPlayer.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPlayer.mutate({ name, roomId });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="PlayerName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPlayer.isLoading}
      >
        {createPlayer.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
