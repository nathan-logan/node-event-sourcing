import AggregateLoader from './aggregateLoader';
import accountAggregate from './aggregates/account';
import CommandHandler from './commandHandler';
import config from './config';
import db from './db';
import logger from './logger';
import createServer from './server';
import routeHandler from './server/api/routes';
import EventStore from './store';

const main = async (): Promise<void> => {
  const pgClient = db;

  const eventStore = new EventStore(pgClient);

  await eventStore.init();

  const aggregateLoader = new AggregateLoader();
  aggregateLoader.register(accountAggregate);

  const commandHandler = new CommandHandler(aggregateLoader, eventStore);

  const server = createServer();
  routeHandler(server, commandHandler.handleCommand);
  await server.start();
  logger.info('Server started listening on port %s', config.port);
};

main();
