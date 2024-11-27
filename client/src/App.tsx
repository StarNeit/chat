import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from '@/routes';
import { AppRoute } from '@/types';
import { store } from '@/stores';

import './setupAxios';

function renderRoute(_props: AppRoute) {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { menu, routes, ...props } = _props;
  const children = routes?.map((route) => renderRoute(route)) ?? <></>;

  return <Route {...props}>{children}</Route>;
}

function App() {
  return (
    <Provider store={store}>
      <Routes>
        {routes.map((route) => {
          return renderRoute(route);
        })}
      </Routes>
    </Provider>
  );
}

export default App;
