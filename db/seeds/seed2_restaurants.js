exports.seed = function(knex, Promise) {
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert({name: 'My Jap Resto', description: 'Good food.', phone_number: '+17788749852'})
      ]);
    });
};
