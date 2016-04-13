
if (!process.env.DATABASE_URL) {
  console.error('ERROR: The environment variable DATABASE_URL is not set');
}
else {
  module.exports = {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  };
}
