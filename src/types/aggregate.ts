import { Command } from './commands';
import { AggregateEvent } from './events';

export interface Aggregate {
  name: string;
  handler: (command: Command) => AggregateEvent | null
}

export interface Aggregates {
  [key: string]: Aggregate;
}

export interface Account {
  id: string;
  name: string;
}
