import React from 'react';
import moment from 'moment';
import { removeUserApi } from '@/api/chat';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import DropDownMenu from '@/layout/DropDownMenu';
import { useAppDispatch, useAppSelector } from '@/stores';
import { getDetailedChannelInfo } from '@/stores/chatSlice';

const items = [
  {
    label: 'Remove user',
    value: 'delete'
  }
];

export const ChannelInfo = () => {
  const dispatch = useAppDispatch();
  const { detailedChannel, activeChannel, socket } = useAppSelector(
    (state) => state.chat
  );
  const { profile } = useAppSelector((state) => state.profile);

  const handleRemove = (userId: string) => async (status: string) => {
    if (status === 'delete') {
      try {
        if (activeChannel) {
          const payload = { userId, channelId: activeChannel };

          await removeUserApi(payload);
          dispatch(getDetailedChannelInfo(activeChannel));
          socket?.emit('channel-remove-user', payload);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="flex flex-col">
      {activeChannel && detailedChannel ? (
        <>
          <div className="mb-4">
            <p className="border-b border-b-gray-200 text-gray-400 text-xs font-semibold leading-8 mb-2">
              USERS
            </p>
            {detailedChannel.channel?.users?.map((item, index) => (
              <div
                key={index}
                className="group relative border border-gray-300 p-2 my-1 rounded-lg bg-gray-100 flex items-center justify-between">
                {item.name}
                {item.id !== profile?.id && (
                  <DropDownMenu
                    options={items}
                    icon={<EllipsisHorizontalIcon />}
                    position="right"
                    onClickMenu={handleRemove(item.id)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mb-4">
            <p className="border-b border-b-gray-200 text-gray-400 text-xs font-semibold leading-8 mb-2">
              ABOUT
            </p>
            <div className="py-2 flex justify-between items-center text-sm">
              <span>Total Messages</span>
              <span>{detailedChannel.total}</span>
            </div>
            <div className="py-2 flex justify-between items-center text-sm">
              <span>Created At</span>
              <span>
                {moment(detailedChannel.channel?.createdAt).format(
                  'DD, MMM, YYYY hh:mm'
                )}
              </span>
            </div>
          </div>
          <div className="overflow-auto flex-1">
            <p className="border-b border-b-gray-200 text-gray-400 text-xs font-semibold leading-8 mb-2">
              MESSAGES IN LAST 5 MINUTES
            </p>
            {detailedChannel.last?.map((item, index) => (
              <div key={index} className="border-b border-b-gray-200 py-2">
                <p className="text-sm text-gray-700">{item.message}</p>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>{item.userId.name}</span>
                  <span>{moment(item.createdAt).format('hh:mm:ss')}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No activated channel
        </div>
      )}
    </div>
  );
};
