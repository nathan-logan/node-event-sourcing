import AggregateLoader from './aggregates';
import accountAggregate from './aggregates/accounts';
import CommandHandler from './commands';
import config from './config';
import pgClient from './db';
import logger from './logger';
import RepositoryLoader from './repositories';
import AccountRepo from './repositories/accounts';
import createServer from './server';
import routeHandler from './server/api/routes';
import EventStore from './store';

const main = async (): Promise<void> => {
  const eventStore = new EventStore(pgClient);

  await eventStore.init();

  const repoLoader = new RepositoryLoader(pgClient);
  await repoLoader.init(AccountRepo);

  const aggregateLoader = new AggregateLoader();
  aggregateLoader.register(accountAggregate);

  const commandHandler = new CommandHandler(aggregateLoader, eventStore);

  const server = createServer();
  routeHandler(server, commandHandler.handleCommand);
  await server.start();
  logger.info('Server started listening on port %s', config.port);
};

main();
