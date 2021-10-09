import logger from './logger';
import { Command } from './types/commands';

const handleCommand = (command: Command): void => {
  logger.info('Handling command: %s', command);
};

export default {
  handleCommand,
};
