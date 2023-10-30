import { AddPlayer } from "@/app/_components/add-player";
import RoomNavigation from "@/app/_components/roomNavigation";
import { PlayerSelection } from "@/app/_components/PlayerSelection";
import { api } from "@/trpc/server";
import ShareModal from "@/app/_components/ShareModal";
import CustomModal from "@/app/_components/CustomModal";

export default async function Page({ params }: { params: { id: string, token: string } }) {
  const roomId = parseInt(params.id);
  const room = await api.room.getOne.query({ id: roomId });
  const role = await api.room.getRole.query({ roomId: roomId, token: params.token });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-row gap-2">
        <ShareModal link={`/rooms/${roomId}/${params.token}`}></ShareModal>
        <CustomModal buttonText="Add player"><AddPlayer roomId={room.id}></AddPlayer></CustomModal>
      </div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {room ? <p>Room: {room.name}</p> : <p>Loading..</p>}
        <PlayerSelection roomId={room.id} token={params.token}></PlayerSelection>
      </div>
    </main >
  );
}