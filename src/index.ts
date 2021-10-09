import config from './config';
import logger from './logger';
import createServer from './server';
import routeHandler from './server/api/routes';

const main = async (): Promise<void> => {
  const server = await createServer();

  routeHandler(server);

  await server.start();
  logger.info('Server started listening on port %s', config.port);
};

main();
