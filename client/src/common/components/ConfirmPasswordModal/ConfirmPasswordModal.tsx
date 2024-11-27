import React, { useEffect, useState } from 'react';
import { confirmChannelPasswordApi } from '@/api/chat';
import Modal from '@/layout/Modal';

type Props = {
  channelId?: string;
  isOpen: boolean;
  onClose: (success: boolean) => void;
};

export const ConfirmPasswordModal: React.FC<Props> = ({
  channelId,
  onClose,
  isOpen
}) => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setError('');
      setPassword('');
    }
  }, [isOpen]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (channelId) {
      try {
        setError('');
        await confirmChannelPasswordApi({ id: channelId, password });
        onClose(true);
      } catch (e) {
        console.log(e);
        setError('Password is not correct');
      }
    }
  };

  return (
    <Modal
      onClose={() => onClose(false)}
      isOpen={isOpen}
      title="Join to private channel">
      <form onSubmit={handleSubmit}>
        <p className="text-sm mb-2">Password</p>
        <input
          className="border border-gray-200 p-2 w-full mb-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-sm text-red-800 mb-6">{error}</div>}
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg"
            onClick={() => onClose(false)}>
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg">
            Join
          </button>
        </div>
      </form>
    </Modal>
  );
};
