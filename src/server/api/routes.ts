import Hapi from '@hapi/hapi';
import { Command } from '../../types/commands';

const handleCommandRequest = async (request: Hapi.Request, h: Hapi.ResponseToolkit, handleCommand: (command: Command) => Promise<void>) => {
  const { params, payload } = request;
  const { command } = params;

  if (!command) {
    return h.response({ message: 'Missing command' }).code(400);
  }

  if (!payload) {
    return h.response({ message: 'Missing payload' }).code(400);
  }

  let handleCommandErrorResponse;

  await handleCommand(payload as Command)
    .catch((err: Error) => {
      handleCommandErrorResponse = h.response({ name: err.name, message: err.message, stack: err.stack }).code(500);
    });

  if (handleCommandErrorResponse) return handleCommandErrorResponse;

  return h.response({ message: `Handled command ${command}` }).code(200);
};

const buildRoutes = (server: Hapi.Server, handleCommand: (command: Command) => Promise<void>): void => {
  server.route({
    method: 'POST',
    path: '/cmd/{command}',
    handler: (req, h) => handleCommandRequest(req, h, handleCommand),
  });
};

export default buildRoutes;
