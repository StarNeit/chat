import React from 'react';
import { useAppSelector } from '@/stores';

export const Header = () => {
  const { profile } = useAppSelector((state) => state.profile);

  return (
    <header className="container py-4 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Chat</h1>
        <div className="flex-1 flex justify-end font-bold">
          <span>{profile?.name},&nbsp;</span>
          <span>{profile?.email}</span>
        </div>
      </div>
    </header>
  );
};
