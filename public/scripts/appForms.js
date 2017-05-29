$(() => {

  $.ajax({
    method: "GET",
    url: "/api/items"
  })
  .done(function(orders) {
    for (order of orders) {
      var $orderId = $("<h2>").text(order.id);
      var $orderStatus = $("<h2>").text(`STATUS: ${order.status}`);
      var $orderTotal = $("<h2>").text(`AMOUNT: $ ${order.total_amount}`).addClass("orderTotal");
      var $divider = $("<p>").addClass(`divider ${order.user_id}`).text("===================================");

      $(".orders").append(`<a href="/orders/${order.id}">ORDER #: ${order.id}</a>`, $orderStatus, $orderTotal, $divider);
    }
  });

$.ajax({
    method: "GET",
    url: "/api/orders_items"
  })
  .done(function(orders) {
    for (order of orders) {
      var $orderId = $("<h2>").text(order.id);
      var $orderStatus = $("<h2>").text(`STATUS: ${order.status}`);
      var $orderTotal = $("<h2>").text(`AMOUNT: $ ${order.total_amount}`).addClass("orderTotal");
      var $divider = $("<p>").addClass(`divider ${order.user_id}`).text("===================================");

      $(".orders").append(`<a href="/orders/${order.id}">ORDER #: ${order.id}</a>`, $orderStatus, $orderTotal, $divider);
    }
  });


}); //end
