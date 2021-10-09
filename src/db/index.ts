import { Client, QueryConfig, QueryArrayResult } from 'pg';
import config from '../config';

const client = new Client(config.postgresConfig);

const query = (text: string | QueryConfig<unknown[]>, params?: unknown[]): Promise<QueryArrayResult<unknown[]>> => client.query(text, params);

export default {
  query,
};
