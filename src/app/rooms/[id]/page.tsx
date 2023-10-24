import { AddPlayer } from "@/app/_components/add-player";
import { PlayerList } from "@/app/_components/list-player";
import { api } from "@/trpc/server";


export default async function Page({ params }: { params: { id: string } }) {
  const numberId = parseInt(params.id);
  const room = await api.room.getOne.query({ id: numberId });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {room ? <p>Room: {room.name}</p> : <p>Loading..</p>}
        <AddPlayer roomId={room.id}></AddPlayer>
        <PlayerList roomId={room.id}></PlayerList>
      </div>
    </main>
  );
}