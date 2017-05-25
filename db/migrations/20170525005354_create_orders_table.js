
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table){
      table.increments('id');
      table.string('status');
      table.decimal('total_amount', 10, 2);
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
  ])  
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('orders')
  ])
};
