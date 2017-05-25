
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders_items', function(table){
      table.increments('id');
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('orders.id').onDelete('CASCADE');
      table.integer('item_id').unsigned();
      table.foreign('item_id').references('items.id').onDelete('CASCADE');
      table.integer('quantity');
    })
  ])   
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('orders_items')
  ])  
};
