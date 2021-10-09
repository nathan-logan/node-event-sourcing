import http from 'http';
import config from '../config';
import logger from '../logger';

const createServer = (listener: http.RequestListener): http.Server => {
  const server = http.createServer(listener);
  server.listen(config.port, () => {
    logger.info('Server listening on port %s', config.port);
  });

  return server;
};

export default createServer;
