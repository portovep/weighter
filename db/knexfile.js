
module.exports = {
  client: 'postgresql',
  connection: {
    database: 'weighter_app',
    user:     '',
    password: ''
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
