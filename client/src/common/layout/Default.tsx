import { Outlet, OutletProps } from 'react-router-dom';
import { Header } from '@/containers';
import { useAppSelector } from '@/stores';

const DefaultLayout = (props: OutletProps) => {
  const { profile } = useAppSelector((state) => state.profile);

  if (!profile) {
    window.location.href = '/';
    return null;
  }

  return (
    <>
      <Header />

      <div className="container mx-auto">
        <Outlet {...props}></Outlet>
      </div>
    </>
  );
};

export default DefaultLayout;
