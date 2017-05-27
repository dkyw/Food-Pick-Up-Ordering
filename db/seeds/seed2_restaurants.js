exports.seed = function(knex, Promise) {
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert({id: 1, name: 'Node_JapaneSe.Restaurant', description: 'Traditional Japanese flavours and techniques are combined with local, west coast elements to create a truly unique dining experience enjoyed by locals and visitors alike. Our chef takes advantage of fresh, regional ingredients as well as Ocean Wise seafood options to showcase the best of what Vancouver has to offer. All our food is made in house creating the perfect culinary experience.', phone_number: '+17781231234', logo: 'http://logos-download.com/wp-content/uploads/2016/09/Node_logo_NodeJS-700x428.png', background_image: 'https://s-media-cache-ak0.pinimg.com/originals/d7/80/bd/d780bd58a0f4fdd09105621efefe8964.jpg'})
      ]);
    });
};