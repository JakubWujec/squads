import { EnterRoom } from "@/app/_components/enter-room";


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        Enter room
        <EnterRoom></EnterRoom>
      </div>
    </main>
  );
}