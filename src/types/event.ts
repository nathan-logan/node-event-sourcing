export enum AggregateEventType {
  ACCOUNT_CREATED = 'AccountCreated'
}

export interface AggregateEvent {
  name: AggregateEventType;
  createdAt: Date;
  createdBy: string;
  message: Record<string, unknown>;
}
