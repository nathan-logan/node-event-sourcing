import { Pool } from 'pg';
import logger from './logger';
import { Repository } from './types/repositories';

class RepositoryLoader {
  private client: Pool;

  constructor(client: Pool) {
    this.client = client;
  }

  private repoExists = async (tableName: string): Promise<boolean> => {
    const result = await this.client.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '${tableName}')`);
    return result.rows[0].exists;
  }

  private detectRepoSchemaChanges = async (repo: Repository): Promise<string[]> => {
    const currentColumnsQuery = `SELECT column_name FROM information_schema.columns WHERE table_name = '${repo.name}'`;
    const currentColumnsResponse = await this.client.query(currentColumnsQuery);
    const columns = currentColumnsResponse.rows.map((row) => row.column_name);

    const newColumns: string[] = [];

    if (columns.length === 0) {
      return newColumns;
    }

    Object.keys(repo.fields)
      .forEach((field) => {
        if (!columns.includes(field)) {
          newColumns.push(field);
        }
      });

    return newColumns;
  }

  private updateRepoTable = async (repo: Repository, newFields: string[]): Promise<void> => {
    const { fields } = repo;

    const newColumns = newFields.map((newFieldName) => `ADD COLUMN ${newFieldName} ${fields[newFieldName]}`);

    const query = `ALTER TABLE ${repo.name} ${newColumns}`;

    await this.client.query(query);
  }

  private createRepo = async (repo: Repository): Promise<void> => {
    const { fields } = repo;

    const tableFields: string[] = Object.keys(fields).map((key) => (`${key} ${fields[key]}`));
    const query = `CREATE TABLE ${repo.name} (${tableFields.join(',')})`;

    await this.client.query(query);
  }

  public init = async (repo: Repository): Promise<void> => {
    const repoExists = await this.repoExists(repo.name);
    if (repoExists) {
      logger.debug('Repo "%s" exists, finding schema changes', repo.name);
      const newFields = await this.detectRepoSchemaChanges(repo);

      if (newFields.length === 0) {
        return;
      }

      logger.debug('Found %s new fields %o', newFields.length, newFields);

      await this.updateRepoTable(repo, newFields);

      return;
    }

    await this.createRepo(repo);

    logger.debug('Repo "%s" initialized', repo.name);
  }
}

export default RepositoryLoader;
