import React, { useState, useEffect } from 'react';
import { createChannelApi } from '@/api/chat';
import Modal from '@/layout/Modal';
import { Switch } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '@/stores';
import { getChannels } from '@/stores/chatSlice';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const CreateChannelModal: React.FC<Props> = ({ onClose, isOpen }) => {
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector((state) => state.chat);
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setPassword('');
      setConfirm('');
      setIsPrivate(false);
    }
  }, [isOpen]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (isPrivate && (!password || confirm !== password)) {
      return;
    } else {
      const data = {
        name,
        private: isPrivate
      };
      if (isPrivate) Object.assign(data, { password });
      await createChannelApi(data);
      dispatch(getChannels());
      socket?.emit('channel-create');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create new channel">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <p className="text-sm mb-2">Channel Name</p>
          <input
            className="border border-gray-200 p-2 w-full mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex gap-2 text-sm mb-4">
            <Switch
              checked={isPrivate}
              onChange={setIsPrivate}
              className={`${isPrivate ? 'bg-gray-800' : 'bg-gray-300'}
              relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
              <span
                aria-hidden="true"
                className={`${isPrivate ? 'translate-x-5' : 'translate-x-0'}
                pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <span>Private channel</span>
          </div>
          {isPrivate && (
            <>
              <p className="text-sm mb-2">Password</p>
              <input
                className="border border-gray-200 p-2 w-full mb-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-sm mb-2">Confirm Password</p>
              <input
                className="border border-gray-200 p-2 w-full mb-4"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg"
            onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};
