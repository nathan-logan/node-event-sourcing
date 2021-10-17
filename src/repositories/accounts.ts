import logger from '../logger';
import { Account } from '../types/aggregate';
import { Repository, RepositoryFieldMap } from '../types/repositories';

const getAccoutById = (id: string): Account => {
  logger.debug('Getting account %s', id);

  return {
    id: '123',
    name: 'test',
  };
};

const fields: RepositoryFieldMap = {
  id: 'uuid',
  name: 'varchar',
  age: 'integer',
};

const AccountRepo: Repository = {
  name: 'accounts',
  fields,
  getAccoutById,
};

export default AccountRepo;
