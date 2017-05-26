$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });
  function landingPage(restaurant) {
    var $row = $("<div>").addClass("row");
    var $columnSize = $("<div>").addClass("col-md-6 col-sm-12");
    var $restaurantName = $("<h1>").text(restaurant.name);
    var $restaurantDescription = $("<p>").text(restaurant.description);

    $row.append($columnSize);
    $columnSize.append($restaurantName, $restaurantDescription);

    return $row;
  }

  $.ajax({
    method: "GET",
    url: "/api/restaurants"
  }).done(function(restaurants) {
    console.log("restos",restaurants);
    restaurants.forEach(function(restaurant) {
      console.log("resto",restaurant);

      var $restaurantLogo = $("<img>").attr({
        id: "restaurantLogo",
        alt: "Restaurant Logo",
        src: restaurant.logo,
        width: "117",
        length: "71"
      });
    $(".navbar-fixed-top .container").prepend($restaurantLogo);
    $("#landingPage").append(landingPage(restaurant));
   });
  });

// Sidebar initially hidden, shown on toggle
  $(".sidebar").hide();
  $(".checkout").on("click", function(event) {
    event.preventDefault();
    console.log("clicked");
    $(".sidebar").toggle("slide");
  });



 function eachFood(food) {
    var $food = $("<div>").addClass("foodItem col-xs-18 col-sm-6 col-md-4").data('id', food.id); // added .data to get food id
    var $thumbnail = $("<div>").addClass("thumbnail");
    var $foodImage = $("<img>").addClass("foodImage").attr("src", food.photo);
    var $caption = $("<div>").addClass("caption");
    var $foodName = $("<h4>").text(food.name).addClass("nameOfItem");
    var $foodDescription = $("<p>").text(food.description);
    var $button = $("<button>").addClass("toCart btn btn-default btn-xs pull-right").text("Add to Cart");

    // `<a href="#" class="toCart btn btn-default btn-xs pull-right" role="button">
    //   <i class="glyphicon glyphicon-edit"></i>
    //   </a>`
      var $add = `
      <a href="#" class="btn btn-info btn-xs" role="button">Button</a>
      <a href="#" class="btn btn-default btn-xs" role="button">Button</a>`;

    $food.append($thumbnail);
    $thumbnail.append($foodImage, $caption);
    $caption.append($foodName, $foodDescription, $button);




    return $food;
  }

  // Matches food item clicked with id and then pushes to object
  $('#foodItems').on('click','.toCart', function(event) {
    event.preventDefault();
    var itemId = $(this).closest('.foodItem').data('id');
    var item = globalItems.find(function (item) {
      return itemId === item.id
    });
    globalOrder.lineItems.push({item: item, quantity: 1})
    renderCart(globalOrder);
  });

// Adds the order to the cart on sidebar
function renderCart(order) {
  let html = "";
  order.lineItems.forEach(function (lineItem) {
    html+=`<p>${lineItem.item.name}</p>`
  })
  $('.yourOrder').html(html); // Added this class in sidebar for the cart
}


let globalOrder = {lineItems:[]};

let globalItems = [];

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

// // Iterate each food entry
//   function renderFoods(foods) {
//     var $foodsContainer = $("#foodItems");
//     // var foods = [1,2,3,4,5,6];
//     // for (var item in foods) {
//       var food = items[food];
//       // var food = foods.length;
//       $foodsContainer.append(eachFood(food));
//     }
//   }
// renderFoods(foods);

    });
});
});
