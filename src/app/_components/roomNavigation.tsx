import React from 'react';
type RoomNavigationProps = {
  title: string;

}

export function RoomNavigation({ title }: RoomNavigationProps) {
  return (
    <nav className="w-full bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <div className="text-white font-bold text-xl">Squad Picker</div>
          {title && <div className="text-white font-bold text-xl">{`- ${title}`}</div>}
        </div>

        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:underline">Share</a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">Add Player</a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">Settings</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default RoomNavigation;