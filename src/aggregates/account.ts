// should export a set of commands for this aggregate
// each command should be a function that accepts the command payload and returns an event object to be saved

import logger from '../logger';
import { Command, HandleAccountCreateCommand } from '../types/commands';
import { Event } from '../types/event';

const handleAccountCreateCommand = (command: HandleAccountCreateCommand): Event => {
  logger.debug('Received create account command %o', command);

  const accountCreatedEvent: Event = {
    createdAt: new Date(),
    createdBy: 'uuid here',
  };

  return accountCreatedEvent;
};

const handleAccountCommand = (command: Command): Event | null => {
  switch (command.type) {
    case 'AccountCreate':
      return handleAccountCreateCommand((command as HandleAccountCreateCommand));
    default:
      break;
  }

  return null;
};

export default handleAccountCommand;
