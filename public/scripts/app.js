$(() => {
  function landingPage(restaurant) {
    var $row = $("<div>").addClass("row");
    var $columnSize = $("<div>").addClass("col-md-6 col-sm-12 landing-page-text");
    var $restaurantName = $("<h1>").text(restaurant.name).addClass("restaurant-name");
    var $restaurantDescription = $("<p>").text(restaurant.description).addClass("restaurant-description");
    $row.append($columnSize);
    $columnSize.append($restaurantName, $restaurantDescription);
    return $row;
  }
  $.ajax({
    method: "GET",
    url: "/api/restaurants"
  }).done(function(restaurants) {
      restaurant = restaurants[0];
      var $restaurantLogo = $("<img>").attr({
        id: "restaurantLogo",
        alt: "Restaurant Logo",
        src: restaurant.logo,
        width: "117",
        length: "71"
      });
    $(".navbar-fixed-top .container").prepend($restaurantLogo).addClass("logo");
    $("#landingPage").append(landingPage(restaurant));
  });
// Sidebar initially hidden, shown on toggle
  $(".sidebar").hide();
  $(".order").on("click", function(event) {
    event.preventDefault();
    $(".sidebar").toggle("slide");
    $('body').scrollTop(1100);
  });
// Function for each food item
 function eachFood(food) {
    var $food = $("<div>").addClass("foodItem col-xs-18 col-sm-6 col-md-4 foodId").data('id', food.id);
    var $thumbnail = $("<div>").addClass("thumbnail");//.data('id', food.id);
    var $foodImage = $("<img>").addClass("foodImage").attr("src", food.photo);
    var $caption = $("<div>").addClass("caption");
    var $foodName = $("<h4>").text(food.name).addClass("nameOfItem");
    var $foodPrice = $("<h4>").text(`$ ${food.amount}`).addClass("food-price");
    var $foodDescription = $("<p>").text(food.description);
    var $add = $("<button>").addClass("plus btn btn-info btn-xs").text("Add");
    var $dec = $("<button>").addClass("minus btn btn-info btn-xs").text("Minus");
    var $quantity = $("<span>").addClass("quantity").data('qty', 0).text(0);
    var $button = $("<button>").addClass("toCart btn btn-xs pull-right").text("Add to Cart");
    $food.append($thumbnail);
    $thumbnail.append($foodImage, $caption);
    $caption.append($foodName, $foodPrice, $foodDescription, $add, $dec, $quantity, $button);
    return $food;
  }
// Add to quantity
  $('#foodItems').on('click', '.plus', function(event) {
    var $plus = $(this);
    var $parent = $plus.parents('.thumbnail');
    var $foodId = $parent.data('id');
    var $quantity = $parent.find('.quantity');
    var quantity = $quantity.data('qty');
    quantity++;
    $quantity.text(quantity);
    $quantity.data('qty', quantity);
  });
// Subtract to quantity
  $('#foodItems').on('click', '.minus', function(event) {
    var $minus = $(this);
    var $parent = $minus.parents('.thumbnail');
    var $foodId = $parent.data('id');
    var $quantity = $parent.find('.quantity');
    var quantity = $quantity.data('qty');
    quantity--;
    if (quantity < 0) {
      event.unbind();
    }
    $quantity.text(quantity);
    $quantity.data('qty', quantity);
  });
  var globalOrder = {lineItems:[]};
  var globalItems = [];

   // Adds the order to the cart on sidebar
  function renderCart(order) {
    var obj = {}
    var html = "";
    var total = 0;
    order.lineItems.forEach(function (lineItem) {
      var quantityAmount = lineItem.quantity * lineItem.item.amount;
      html+=`<p>${lineItem.quantity} - ${lineItem.item.name}: ${quantityAmount}</p>`;
      total += quantityAmount;
      obj = {
        item: lineItem.item.name,
        quantity: lineItem.quantity
      };
      return obj;
    })
    $('.yourOrder').html(html); // Added this class in sidebar for the cart
    // TOTAL AMOUNT NEED
    total = Math.round(total * 100) / 100;
    $("#totalAmount .total").text(`$ ${total}`);
    // Total amount used to req amount
    var $hiddenAmount = $("<input>").attr({
      type: "hidden",
      value: total,
      name: "totalAmount",
      class: "hiddenTotalAmount"
    });
    $(".checkDivForm").append($hiddenAmount);
    $($hiddenAmount).last().attr({name: "lastTotalAmount"});
    $($hiddenAmount).last().prev().attr({name: "TotalAmount"});
    // console.log(obj);
    // Use for req item and quantity
    var $hiddenItem = $("<input>").attr({
      type: "hidden",
      value: obj.item,
      name: "item",
      class: "hiddenItem"
    });
    var $hiddenQuantity = $("<input>").attr({
      type: "hidden",
      value: obj.quantity,
      name: "quantity",
      class: "hiddenQuantity"
    });
    $(".order_itemDivForm").append($hiddenItem, $hiddenQuantity);
  }
  // Matches food item clicked with id and then pushes to object
  $('#foodItems').on('click','.toCart', function(event) {
    event.preventDefault();
    var itemId = $(this).closest('.foodItem').data('id');
    var item = globalItems.find(function (item) {
      return itemId === item.id
    });
    var itemQty = $(this).siblings('.quantity').data('qty');
    if (itemQty <= 0) {
      event.off();
    }
    globalOrder.lineItems.push({item: item, quantity: itemQty});
    renderCart(globalOrder);
    $(".quantity").data('qty', 0).text(0);
  });

  // Food Items Section of the Page (Individual)
  $.ajax({
      method: "GET",
      url: "/api/items"
    }).done(function(items) {
      globalItems = items; // added for global variable
      items.forEach(function(food) {
        var $foodsContainer = $("#foodItems");
        $foodsContainer.append(eachFood(food));
      });
    });

  $(function() {
    $(".checkout").click(function(){
      if (confirm("Do you want to submit your order?")){
         $('.checkout').submit();
      }
    });
  });

});
