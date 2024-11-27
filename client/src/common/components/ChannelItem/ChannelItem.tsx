import React from 'react';
import { Channel } from '@/types';
import clsx from 'clsx';
import { removeChannelApi } from '@/api/chat';
import DropDownMenu from '@/layout/DropDownMenu';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { useAppDispatch, useAppSelector } from '@/stores';
import { getChannels, setActiveChannel } from '@/stores/chatSlice';

const items = [
  {
    label: 'Remove channel',
    value: 'delete'
  }
];

type Props = {
  channel: Channel;
  onClickChannel: (channel: Channel) => void;
};

export const ChannelItem: React.FC<Props> = ({ channel, onClickChannel }) => {
  const dispatch = useAppDispatch();
  const { activeChannel, socket } = useAppSelector((state) => state.chat);
  const { profile } = useAppSelector((state) => state.profile);

  const handleRemove = async (value: string) => {
    if (value === 'delete') {
      try {
        await removeChannelApi(channel.id);
        socket?.emit('channel-remove', channel.id);
        dispatch(getChannels());
        if (channel.id === activeChannel) {
          dispatch(setActiveChannel(null));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div
      className={clsx(
        'group relative p-2 border border-gray-200 mb-2 rounded-lg cursor-pointer flex items-center',
        activeChannel === channel.id && 'bg-gray-800 text-white'
      )}
      onClick={() => onClickChannel(channel)}>
      <p className="flex-1">{channel.name}</p>
      {channel.private && (
        <span className="text-xs p-1 mx-2 rounded-md border border-gray-300 bg-gray-100 text-black">
          Private
        </span>
      )}

      <DropDownMenu
        options={items}
        icon={<EllipsisHorizontalIcon />}
        onClickMenu={handleRemove}
      />
    </div>
  );
};
