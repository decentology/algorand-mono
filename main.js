import path from 'path';
import fs from 'fs';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

import routes from './source/server/routes';

(async () => {
  const moduleURL = new URL(import.meta.url);

  const server = fastify({
    logger: false,
    trustProxy: true
  });

  server.register(fastifyStatic, {
    root: path.join(path.dirname(moduleURL.pathname), 'assets'),
    prefix: '/assets/'
  });

  server.register(routes.api);
  server.register(routes.client);

  try {
    await server.listen(3450, '0.0.0.0');
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
})();