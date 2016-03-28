
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('weights', function (table) {
      table.increments('id');
      table.string('value');
      table.string('date');
      table.string('unit');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  
  return Promise.all([
    knex.schema.dropTable('weights')
  ])
};
