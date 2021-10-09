// should export a set of commands for this aggregate
// each command should be a function that accepts the command payload and returns an event object to be saved

import logger from '../logger';
import { HandleAccountCreateCommand } from '../types/commands';
import { Event } from '../types/event';

export default {
  handleAccountCreateCommand: (command: HandleAccountCreateCommand): Event => {
    logger.debug('Received create account command %o', command);

    const accountCreatedEvent: Event = {
      createdAt: new Date(),
      createdBy: 'uuid here',
    };

    return accountCreatedEvent;
  },
};
