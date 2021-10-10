import { Command } from './commands';
import { AggregateEvent } from './event';

export interface Aggregate {
  name: string;
  handler: (command: Command) => AggregateEvent | null
}

export interface Aggregates {
  [key: string]: Aggregate;
}
