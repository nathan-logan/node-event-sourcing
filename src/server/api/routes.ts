import Hapi from '@hapi/hapi';
import commandHandler from '../../commandHandler';
import { Command } from '../../types/commands';

const handleCommandRequest = (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  const { params, payload } = request;
  const { command } = params;

  if (!command) {
    return 'Missing command';
  }

  commandHandler.handleCommand(payload as Command);

  return h.response(`Handled command ${command}`).code(200);
};

const buildRoutes = (server: Hapi.Server): void => {
  server.route({
    method: 'POST',
    path: '/cmd/{command}',
    handler: handleCommandRequest,
  });
};

export default buildRoutes;
