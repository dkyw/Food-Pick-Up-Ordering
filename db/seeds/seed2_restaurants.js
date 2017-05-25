exports.seed = function(knex, Promise) {
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert({id: 1, name: 'Node_JapaneSe.Restaurant', description: 'const = japaneseFood; forEach(food) => return great', phone_number: '+17788749852', logo: 'http://logos-download.com/wp-content/uploads/2016/09/Node_logo_NodeJS-700x428.png', background_image: 'https://s-media-cache-ak0.pinimg.com/originals/d7/80/bd/d780bd58a0f4fdd09105621efefe8964.jpg'})
      ]);
    });
};