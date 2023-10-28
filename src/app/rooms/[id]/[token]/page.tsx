import { AddPlayer } from "@/app/_components/add-player";
import { PlayerSelection } from "@/app/rooms/[id]/PlayerSelection";
import { api } from "@/trpc/server";


export default async function Page({ params }: { params: { id: string, token: string } }) {
  const roomId = parseInt(params.id);
  const room = await api.room.getOne.query({ id: roomId });
  const role = await api.room.getRole.query({ roomId: roomId, token: params.token });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>You are {role}</h1>
        {room ? <p>Room: {room.name}</p> : <p>Loading..</p>}
        <AddPlayer roomId={room.id}></AddPlayer>
        <PlayerSelection roomId={room.id} token={params.token}></PlayerSelection>
      </div>
    </main >
  );
}