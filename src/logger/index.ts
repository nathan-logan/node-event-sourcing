import bunyan from 'bunyan';

export default bunyan.createLogger({
  name: 'eventsourcing',
  level: 'debug',
});
