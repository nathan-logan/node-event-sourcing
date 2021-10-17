export interface RepositoryFieldMap {
  'id': 'uuid',
  [key: string]: string;
}

export interface Repository {
  // disable this as we don't know the exact shape of the repository's read methods
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Function | unknown;
  name: string;
  fields: RepositoryFieldMap;
}
