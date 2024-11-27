import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '@/api/user';
import { useAppDispatch } from '@/stores';
import { setProfile } from '@/stores/profileSlice';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const { data } = await userLogin({ email });
      dispatch(setProfile(data.data));
      navigate('/chat');
    } catch (e) {
      console.log('e');
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form className="w-[400px]" onSubmit={handleLogin}>
        <input
          className="w-full border border-gray-200 p-2 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="w-full bg-gray-800 text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
};
