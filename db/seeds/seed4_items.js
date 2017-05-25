exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({name: 'Sushi', description: 'Best Sushi in town.', amount: 4.99, photo: 'link', restaurant_id: 1}),
        knex('items').insert({name: 'Sashimi', description: 'Fresh, not Frozen.', amount: 7.99, photo: 'link', restaurant_id: 1}),
        knex('items').insert({name: 'Burrito', description: 'BURRITO?! Surprised, huh?!.', amount: 6.99, photo: 'link', restaurant_id: 1})
      ]);
    });
};
