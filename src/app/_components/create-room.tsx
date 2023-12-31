"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

export function CreateRoom() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createRoom = api.room.create.useMutation({
    onSuccess: (data) => {
      router.push(`/rooms/${data.room.id}/${data.roomAuth.token}`)
      setName("");
    },
  });

  return (
    <>
      <h1 className="mb-2 text-center">Start here</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createRoom.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createRoom.isLoading}
        >
          {createRoom.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
