
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('restaurants', function(table){
      table.increments('id');
      table.string('name');
      table.string('description', 1023);
      table.string('phone_number');
    })
  ])      
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('restaurants')
  ])    
};
