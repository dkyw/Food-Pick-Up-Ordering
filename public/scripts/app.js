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
    $(".navbar-fixed-top .container").prepend($restaurantLogo);
    $("#landingPage").append(landingPage(restaurant));
  //  });
  });

// Sidebar initially hidden, shown on toggle
  $(".sidebar").hide();
  $(".checkout").on("click", function(event) {
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
    var $foodDescription = $("<p>").text(food.description);
    var $add = $("<button>").addClass("plus btn btn-info btn-xs").text("Add");
    var $dec = $("<button>").addClass("minus btn btn-info btn-xs").text("Minus");
    var $quantity = $("<span>").addClass("quantity").data('qty', 0);
    var $button = $("<button>").addClass("toCart btn btn-default btn-xs pull-right").text("Add to Cart");

    $food.append($thumbnail);
    $thumbnail.append($foodImage, $caption);
    $caption.append($foodName, $foodDescription, $add, $dec, $quantity, $button);

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
    var $plus = $(this);
    var $parent = $plus.parents('.thumbnail');
    var $foodId = $parent.data('id');
    var $quantity = $parent.find('.quantity');
    var quantity = $quantity.data('qty');
    quantity--;
    $quantity.text(quantity);
    $quantity.data('qty', quantity);
  });

  var globalOrder = {lineItems:[]};
  var globalItems = [];

  // Matches food item clicked with id and then pushes to object
  $('#foodItems').on('click','.toCart', function(event) {
    event.preventDefault();
    var itemId = $(this).closest('.foodItem').data('id');
    var item = globalItems.find(function (item) {
      return itemId === item.id
    });
    var itemQty = $(this).siblings('.quantity').data('qty');
    globalOrder.lineItems.push({item: item, quantity: itemQty});
    renderCart(globalOrder);
  });

    // Adds the order to the cart on sidebar
  function renderCart(order) {
    var html = "";
    order.lineItems.forEach(function (lineItem) {
      html+=`<p>${lineItem.quantity} - ${lineItem.item.name}: ${lineItem.item.amount}</p>`
    })
    $('.yourOrder').html(html); // Added this class in sidebar for the cart
  }

  // Food Items Section of the Page (Individual)
  $.ajax({
      method: "GET",
      url: "/api/items"
    }).done(function(items) {
      globalItems = items; // added for global variable
      console.log(items)
      items.forEach(function(food) {
        console.log("food",food);
        var $foodsContainer = $("#foodItems");
        $foodsContainer.append(eachFood(food));
      });
    });
});
