import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import path from 'path';
import VError from 'verror';
import PrettyError from 'pretty-error';
import http from 'http';
import httpProxy from 'http-proxy';
import apiClient from 'helpers/apiClient';

import { StaticRouter } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import config from 'config';
import createStore from 'redux/create';
import Html from 'helpers/Html';
import routes from 'routes';
import { parse as parseUrl } from 'url';

process.on('unhandledRejection', error => {
  console.error(error);
});

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const pretty = new PrettyError();
const app = Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({ target: targetUrl, ws: true });

app.use(cookieParser());
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.get('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'manifest.json')));

app.use('/dist/service-worker.js', (req, res, next) => {
  res.setHeader('Service-Worker-Allowed', '/');
  return next();
});

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use((req, res, next) => {
  res.setHeader('X-Forwarded-For', req.ip);
  return next();
});

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/ws` });
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }

  if (!res.headersSent) {
    if (typeof res.writeHead === 'function') {
      res.writeHead(500, { 'content-type': 'application/json' });
    }
  }

  res.end(JSON.stringify({
    error: 'proxy_error',
    reason: error.message
  }));
});

app.use(async (req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const url = req.originalUrl || req.url;
  const location = parseUrl(url);
  const client = apiClient(req);
  const history = createMemoryHistory({ initialEntries: [url] });
  const store = createStore(history, client);

  const hydrate = () => {
    res.write('<!doctype html>');
    ReactDOM.renderToNodeStream(<Html assets={webpackIsomorphicTools.assets()} store={store} />).pipe(res);
  };

  if (__DISABLE_SSR__) {
    return hydrate();
  }

  try {
    await loadOnServer({
      store, location, routes, helpers: { client }
    });

    const context = {};

    const component = (
      <Provider store={store} key="provider">
        <StaticRouter location={req.url} context={context}>
          <ReduxAsyncConnect routes={routes} helpers={{ client }} />
        </StaticRouter>
      </Provider>
    );

    const content = ReactDOM.renderToString(component);

    console.log(content);

    if (context.url) {
      return res.redirect(302, context.url);
    }

    const html = <Html assets={webpackIsomorphicTools.assets()} content={content} store={store} />;

    res.status(200).send(`<!doctype html>${ReactDOM.renderToString(html)}`);
  } catch (error) {
    if (error.name === 'RedirectError') {
      return res.redirect(VError.info(error).to);
    }
    console.error('MOUNT ERROR:', pretty.render(error));
    res.status(500);
    hydrate();
  }
});

if (config.port) {
  server.listen(config.port, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
