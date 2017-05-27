exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({id: 1, name: 'Sashimi', description: 'Thinly sliced and fresh, not frozen', amount: 10.99, photo: 'https://media.timeout.com/images/102315343/1372/772/image.jpg', restaurant_id: 1}),
        knex('items').insert({id: 2, name: 'Ramen', description: 'Shoyu (soy-based broth) with vegetables', amount: 8.99, photo: 'https://media.timeout.com/images/100611353/1372/772/image.jpg', restaurant_id: 1}),
        knex('items').insert({id: 3, name: 'Yakitori', description: 'Marinated in soy sauce, sake and ginger', amount: 4.99, photo: 'https://media.timeout.com/images/100546753/1372/772/image.jpg', restaurant_id: 1}),
        knex('items').insert({id: 4, name: 'Katsu', description: 'Crunchy on the outside and tender on the inside', amount: 9.99, photo: 'https://media.timeout.com/images/100546755/1372/772/image.jpg', restaurant_id: 1}),
        knex('items').insert({id: 5, name: 'Sake', description: 'Imported from Japan', amount: 5.99, photo: 'https://media.timeout.com/images/100546759/1372/772/image.jpg', restaurant_id: 1}),
        knex('items').insert({id: 6, name: 'Eggplant', description: 'Grilled eggplant with sesame and green onion', amount: 7.99, photo: 'https://media.timeout.com/images/100546779/1372/772/image.jpg', restaurant_id: 1}),
        knex('items').insert({id: 7, name: 'Burrito', description: 'Best burrito in town!', amount: 6.99, photo: 'https://media.timeout.com/images/100678819/1372/772/image.jpg', restaurant_id: 1})
      ]);
    });
};




