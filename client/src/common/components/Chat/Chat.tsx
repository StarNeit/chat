import React, { useState } from 'react';
import { MessageItem } from '@/components/Message';
import { useAppSelector } from '@/stores';
import { AnimatedIcon } from '@/components/AnimatedIcon';
import clsx from 'clsx';

export const Chat = () => {
  const [visibleModel, setVisibleModel] = useState<boolean>(false);

  const { socket, activeChannel, messages } = useAppSelector(
    (state) => state.chat
  );

  const { profile } = useAppSelector((state) => state.profile);

  const [message, setMessage] = useState<string>('');
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (socket) {
      setVisibleModel(true);
      setTimeout(() => {
        socket.emit('send-message', {
          channelId: activeChannel,
          message,
          userId: profile?.id
        });
        setMessage('');
        setVisibleModel(false);
      }, 2000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        {messages.map((item, index) => (
          <MessageItem key={index} message={item} />
        ))}
      </div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          className="flex-1 border border-gray-200 p-2 rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={!activeChannel}
          className="rounded-md text-white bg-gray-800 px-5 disabled:bg-gray-300 disabled:cursor-not-allowed">
          Send
        </button>
      </form>

      <div
        className={clsx(
          'fixed top-0 left-0 right-0 bottom-0 z-10 opacity-20 hidden',
          visibleModel && '!block'
        )}>
        <AnimatedIcon />
      </div>
    </div>
  );
};
