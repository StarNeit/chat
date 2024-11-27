import { Outlet, OutletProps } from 'react-router-dom';

const LayoutLogin = (props: OutletProps) => {
  return (
    <div className="h-[100vh] overflow-auto flex items-center bg-gray">
      <div className="container mx-auto">
        <Outlet {...props} />
      </div>
    </div>
  );
};

export default LayoutLogin;
