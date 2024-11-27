import React from 'react';
import { Message } from '@/types';
import clsx from 'clsx';
import moment from 'moment';
import { useAppSelector } from '@/stores';

type Props = {
  message: Message;
};

export const MessageItem: React.FC<Props> = ({ message }) => {
  const { profile } = useAppSelector((state) => state.profile);

  const isOwn = profile?.id === message.userId?.id;

  return (
    <div className={clsx('flex', isOwn && 'justify-end')}>
      <div
        className={clsx('flex flex-col max-w-[240px]', isOwn && 'items-end')}>
        <p className="text-sm font-semibold mb-1">{message.userId?.name}</p>
        <div
          className={clsx(
            'p-2.5 rounded-lg border border-gray-200',
            isOwn && 'bg-gray-600 text-white'
          )}>
          {message.message}
        </div>
        <p className="text-sm text-gray-300 mt-1">
          {moment(message.createdAt).format('hh:mm')}
        </p>
      </div>
    </div>
  );
};
