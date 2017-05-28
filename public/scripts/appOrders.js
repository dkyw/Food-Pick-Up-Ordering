$(() => {

  $.ajax({
    method: "GET",
    url: "/api/orders"
  })
  .done(function(orders) {
    for (order of orders) {
      var $orderId = $("<h1>").text(order.id);
      var $orderStatus = $("<h1>").text(`STATUS: ${order.status}`);
      var $orderTotal = $("<h1>").text(`AMOUNT: $ ${order.total_amount}`);
      $('.orders').append(`<a href="/orders/${order.id}">ORDER #: ${order.id}</a>`, $orderStatus, $orderTotal);
    }
  });
});