import AggregateLoader from './aggregateLoader';
import logger from './logger';
import EventStore from './store';
import { Command } from './types/commands';

class CommandHandler {
  private aggregateLoader: AggregateLoader;

  private eventStore: EventStore;

  constructor(aggregateLoader: AggregateLoader, eventStore: EventStore) {
    this.aggregateLoader = aggregateLoader;
    this.eventStore = eventStore;
  }

  public handleCommand = async (command: Command): Promise<void> => {
    logger.info('Handling command: %o', command);

    const aggregate = await this.aggregateLoader.getAggregate(command.aggregateName)
      .catch((err) => {
        logger.error('Failed to get aggregate %s: %s', command.aggregateName, err);
      });

    if (!aggregate) {
      logger.error('Failed to handle command, aggregate %s not found for command', command.aggregateName, command.type);
      return;
    }

    const aggregateEvent = aggregate.handler(command);

    if (!aggregateEvent) {
      logger.warn('No aggregate event returned from %s aggregate command %s', command.aggregateName, command.type);
      return;
    }

    logger.debug('Attempting to save event');

    await this.eventStore.saveEvent(aggregateEvent)
      .catch((err) => {
        logger.error('Failed to save event: %s', err.message);
        throw err;
      });
  }
}

export default CommandHandler;
