import db from '../db';
import logger from '../logger';
import { Event } from '../types/event';

const saveEvent = (event: Event): void => {
  logger.debug('Received save event request: %o', event);

  const query = 'SELECT NOW() as now';

  db.query(query);
};

export default {
  saveEvent,
};
