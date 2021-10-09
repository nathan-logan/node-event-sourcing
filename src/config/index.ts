import dotenv from 'dotenv';
import { ClientConfig } from 'pg';

dotenv.config();

interface Config {
  port: number | string | undefined;
  postgresConfig: ClientConfig;
}

const config: Config = {
  port: process.env.port || 8080,
  postgresConfig: {
    host: 'localhost',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres',
  },
};

export default config;
