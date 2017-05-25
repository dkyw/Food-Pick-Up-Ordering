
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('items', function(table){
      table.increments('id');
      table.string('name');
      table.string('description', 1023);
      table.decimal('amount', 10, 2);
      table.string('photo');
      table.integer('restaurant_id').unsigned();
      table.foreign('restaurant_id').references('restaurants.id').onDelete('CASCADE');
    })
  ])    
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('items')
  ])  
};
