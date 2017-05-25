exports.seed = function(knex, Promise) {
  return knex('orders_items').del()
    .then(function () {
      return Promise.all([
        knex('orders_items').insert({id: 1, order_id: 1, item_id: 2, quantity: 2}),
        knex('orders_items').insert({id: 2, order_id: 2, item_id: 1, quantity: 1}),
        knex('orders_items').insert({id: 3, order_id: 2, item_id: 2, quantity: 1}),
        knex('orders_items').insert({id: 4, order_id: 2, item_id: 3, quantity: 1})
      ]);
    });
};
