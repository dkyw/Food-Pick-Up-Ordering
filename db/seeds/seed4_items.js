exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({id: 1, name: 'Sushi', description: 'Best Sushi in town.', amount: 4.99, photo: 'http://www.just-eat.ca/delivery/images/branding/cuisines/en_ca/thumb_sushi.png', restaurant_id: 1}),
        knex('items').insert({id: 2, name: 'Sashimi', description: 'Fresh, not Frozen.', amount: 7.99, photo: 'https://s-media-cache-ak0.pinimg.com/736x/0b/33/c7/0b33c7f46a8f3ed943965f782cc8355c.jpg', restaurant_id: 1}),
        knex('items').insert({id: 3, name: 'Burrito', description: 'BURRITO?! Surprised, huh?!.', amount: 6.99, photo: 'https://media-cdn.tripadvisor.com/media/photo-s/05/86/31/e0/truknyaki.jpg', restaurant_id: 1})
      ]);
    });
};




