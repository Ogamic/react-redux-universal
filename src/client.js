/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReduxAsyncConnect } from 'redux-connect';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import { getStoredState } from 'redux-persist';
import localForage from 'localforage';
import { socket } from 'app';
import { Provider } from 'react-redux';
import createStore from './redux/create';
import apiClient from './helpers/apiClient';
import routes from './routes';
import isOnline from './utils/isOnline';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';

const offlinePersistConfig = {
  storage: localForage,
  whitelist: ['auth', 'info', 'chat']
};

const client = apiClient();
const dest = document.getElementById('content');

function initSocket() {
  socket.on('news', data => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });

  socket.on('msg', data => {
    console.log(data);
  });

  return socket;
}

global.socket = initSocket();

(async () => {
  const storedData = await getStoredState(offlinePersistConfig);
  const online = await (window.__data ? true : isOnline());

  if (online) {
    socket.open();
  }

  const data = !online ? { ...storedData, ...window.__data, online } : { ...window.__data, online };
  const history = createBrowserHistory();
  const store = createStore(history, client, data, offlinePersistConfig);

  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <ReduxAsyncConnect routes={routes} helpers={{ client }} />
      </BrowserRouter>
    </Provider>
    , dest
  )

  if (module.hot) {
    module.hot.accept('./routes', () => {
      const nextRoutes = require('./routes')(store);
      render(nextRoutes);
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-reactroot']) {
      console.error('Server-side React render was discarded.' +
        'Make sure that your initial render does not contain any client-side code.');
    }
  }

  if (__DEVTOOLS__ && !window.devToolsExtension) {
    const devToolsDest = document.createElement('div');
    window.document.body.insertBefore(devToolsDest, null);
    const DevTools = require('./containers/DevTools/DevTools');

    ReactDOM.hydrate(
      <Provider store={store} key="provider">
        <DevTools />
      </Provider>,
      devToolsDest
    );
  }

  if (online && !__DEVELOPMENT__ && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('/dist/service-worker.js', { scope: '/' });
        console.log('Service worker registered!');
      } catch (error) {
        console.log('Error registering service worker: ', error);
      }

      await navigator.serviceWorker.ready;
      console.log('Service Worker Ready');
    });
  }
})();
