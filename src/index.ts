import createServer from './server';
import routeHandler from './server/api/routes';

const main = (): void => {
  createServer(routeHandler);
};

main();
