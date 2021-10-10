export interface Command {
  aggregateId: string; // the id of the aggregate that should handle the command
  aggregateName: string; // the name of the aggregate as defined in the aggregates directory
  type: string; // the type of command to send, should reflect the command handler's input type, i.e AccountCreateCommand
}

export interface AccountCreateCommand extends Command {
  payload: Record<string, unknown> // the paramaters that the command accepts
}
