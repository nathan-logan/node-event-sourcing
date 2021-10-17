import logger from '../logger';
import { Aggregate } from '../types/aggregate';
import { Command, AccountCreateCommand } from '../types/commands';
import { AggregateEvent, AggregateEventType } from '../types/events';

const handleAccountCreateCommand = (command: AccountCreateCommand): AggregateEvent => {
  logger.debug('Received create account command %o', command);

  // create the account here

  const accountCreatedEvent: AggregateEvent = {
    name: AggregateEventType.ACCOUNT_CREATED,
    createdAt: new Date(),
    createdBy: 'uuid here',
    message: command.payload,
  };

  return accountCreatedEvent;
};

const handleAccountCommand = (command: Command): AggregateEvent | null => {
  switch (command.type) {
    case 'accountCreateCommand':
      return handleAccountCreateCommand((command as AccountCreateCommand));
    default:
      break;
  }

  // handle this case where a command isn't handled
  return null;
};

const accountAggregate: Aggregate = {
  name: 'accounts',
  handler: handleAccountCommand,
};

export default accountAggregate;
