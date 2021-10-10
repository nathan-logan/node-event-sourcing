import Hapi from '@hapi/hapi';
import config from '../config';

const createServer = (): Hapi.Server => {
  const server = Hapi.server({
    port: config.port,
  });

  return server;
};

export default createServer;
