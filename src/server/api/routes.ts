import { IncomingMessage, ServerResponse } from 'http';
import logger from '../../logger';

const routeHandler = (req: IncomingMessage, res: ServerResponse): void => {
  logger.debug('Received message at %s', req.url);

  const data = { message: 'ok' };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(data));
  res.end();
};

export default routeHandler;
