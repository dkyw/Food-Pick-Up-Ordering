exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        knex('orders').insert({id: 1, status: 'ordered', total_amount: 15.98, user_id: 1}),
        knex('orders').insert({id: 2, status: 'ready for pick-up', total_amount: 19.97, user_id: 1})
      ]);
    });
};
