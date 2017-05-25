exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({phone_number: '+16047040730'})
      ]);
    });
};
