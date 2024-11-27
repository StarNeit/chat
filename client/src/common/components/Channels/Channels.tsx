import React, { useEffect, useState } from 'react';
import { ChannelItem } from '@/components';
import { CreateChannelModal } from '@/components/CreateChannelModal';
import { ConfirmPasswordModal } from '@/components/ConfirmPasswordModal';
import { Channel } from '@/types';
import { useAppDispatch, useAppSelector } from '@/stores';
import { getChannels, getMessages, setActiveChannel } from '@/stores/chatSlice';

export const Channels = () => {
  const dispatch = useAppDispatch();
  const { socket, channels, activeChannel } = useAppSelector(
    (state) => state.chat
  );

  const { profile } = useAppSelector((state) => state.profile);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenConfirmPasswordModal, setIsConfirmPasswordModal] =
    useState<boolean>(false);
  const [tempChannel, setTempChannel] = useState<Channel | null>(null);

  useEffect(() => {
    dispatch(getChannels());
  }, []);

  const handleClickChannel = async (channel: Channel) => {
    if (channel.private) {
      setIsConfirmPasswordModal(true);
      setTempChannel(channel);
    } else {
      await handleSelectChannel(channel);
    }
  };

  const handleSelectChannel = async (channel: Channel) => {
    if (socket) {
      activeChannel &&
        socket.emit('channel-leave', {
          channelId: activeChannel,
          userId: profile?.id
        });
      socket.emit('channel-join', {
        channelId: channel.id,
        userId: profile?.id
      });
      dispatch(setActiveChannel(channel.id));
      dispatch(getMessages(channel.id));
    }
  };

  const handleClosePasswordModal = (status: boolean) => {
    if (status && tempChannel) {
      handleSelectChannel(tempChannel);
    }
    setIsConfirmPasswordModal(false);
    setTempChannel(null);
  };

  return (
    <div>
      <div className="flex justify-end py-2">
        <button
          className="py-1 px-2 rounded-md border border-gray-300 bg-gray-200 text-sm"
          onClick={() => setIsOpenCreateModal(true)}>
          Add
        </button>
      </div>
      {channels.map((channel, index) => (
        <ChannelItem
          key={index}
          channel={channel}
          onClickChannel={handleClickChannel}
        />
      ))}

      <CreateChannelModal
        isOpen={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
      />
      <ConfirmPasswordModal
        isOpen={isOpenConfirmPasswordModal}
        channelId={tempChannel?.id}
        onClose={handleClosePasswordModal}
      />
    </div>
  );
};
