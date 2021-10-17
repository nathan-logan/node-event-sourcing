import { Pool } from 'pg';
import logger from '../logger';
import { AggregateEvent } from '../types/events';

class EventStore {
  private client: Pool;

  constructor(pgClient: Pool) {
    if (!pgClient) {
      throw new Error('Missing Postgres client');
    }

    this.client = pgClient;
  }

  public init = async (): Promise<void> => {
    const tableExists = await this.eventsTableExists();

    if (!tableExists) {
      logger.debug('Missing event store table, creating now..');
      await this.createEventsTable();
    }

    logger.info('Event store initialized');
  }

  private createEventsTable = async () => {
    const query = `
      CREATE TABLE events (
        id serial CONSTRAINT firstkey PRIMARY KEY NOT NULL,
        event_name varchar NOT NULL,
        created_at timestamp without time zone NOT NULL,
        created_by varchar NOT NULL,
        message jsonb
      );
    `;

    await this.client.query(query);
  }

  private eventsTableExists = async (): Promise<boolean> => {
    const result = await this.client.query('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = \'events\')');
    return result.rows[0].exists;
  }

  public saveEvent = async (event: AggregateEvent): Promise<void> => {
    logger.debug('Received save event request: %o', event);

    const query = 'INSERT INTO events (event_name, created_at, created_by, message) VALUES ($1, $2, $3, $4)';
    await this.client.query(query, [event.name, event.createdAt, event.createdBy, event.message]);
  }
}

export default EventStore;
