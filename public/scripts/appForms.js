$(() => {

  var orderUrlId = document.URL.toString().slice(29);

  $.ajax({
    method: "GET",
    url: "/api/orders_items"
  })
  .done(function(orders_items) {
    for (order of orders_items) {
      var orderId = $('<h2>').text(`Order #: ${orderUrlId}`);
      if (order.order_id == orderUrlId) {
        var itemId = order.item_id
        var quantity= order.quantity;
        var itemOrder = $('<h2>').text(`Item: ${itemId}`).addClass(`${itemId}`);
        var itemQuantity = $('<h2>').text(`Quantity: ${quantity}`);
      }
      $('.orders').append(itemOrder,itemQuantity);
    }
    $('.orders').before(orderId);
  });



  $.ajax({
    method: "GET",
    url: "/api/items"
  })
  .done(function(items) {
    for (item of items) {
      $(`.${item.id}`).text(`Item: ${item.name}`);
    }
  });

}); //end
