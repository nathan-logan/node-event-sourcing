import logger from './logger';
import { Aggregate, Aggregates } from './types/aggregate';

class AggregateLoader {
  private aggregates: Aggregates;

  constructor() {
    this.aggregates = {};
  }

  public register = (aggregate: Aggregate): void => {
    if (this.aggregates[aggregate.name]) {
      throw new Error(`Aggregate already exists with name "${aggregate.name}"`);
    }

    this.aggregates[aggregate.name] = aggregate;
    logger.debug('Registered aggregate "%s"', aggregate.name);
  }

  public getAggregate = async (aggregateName: string): Promise<Aggregate> => {
    const aggregate = this.aggregates[aggregateName];

    if (!aggregate) {
      throw new Error(`Cannot find aggregate "${aggregateName}"`);
    }

    return aggregate;
  }
}

export default AggregateLoader;
