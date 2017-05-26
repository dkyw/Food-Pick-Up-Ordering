$(() => {
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
    // console.log("restos",restaurants);
    // restaurants.forEach(function(restaurant) {
    //   console.log("resto",restaurant);
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
    console.log("clicked");
    $(".sidebar").toggle("slide");
  });

 function eachFood(food) {
    var $food = $("<div>").addClass("col-xs-18 col-sm-6 col-md-4 foodId").data('id', food.id);
    var $thumbnail = $("<div>").addClass("thumbnail").data('id', food.id);
    var $foodImage = $("<img>").addClass("foodImage").attr("src", food.photo);
    var $caption = $("<div>").addClass("caption");
    var $foodName = $("<h4>").text(food.name);
    var $foodDescription = $("<p>").text(food.description);
    var $button = `<a href="#" class="btn btn-default btn-xs pull-right" role="button">
      <i class="glyphicon glyphicon-edit"></i>
      </a>`; 
    var $add = $("<button>").addClass("plus btn btn-info btn-xs").text("Add")
    var $dec = $("<button>").addClass("minus btn btn-info btn-xs").text("Minus")

    var $quantity = $("<span>").addClass("quantity").data('qty', 0);


    $food.append($thumbnail);
    $thumbnail.append($foodImage, $caption);
    $caption.append($foodName, $foodDescription, $add, $dec, $quantity, $button);

    return $food;
  }

  $('#foodItems').on('click', '.plus', function(event) {
    var $plus = $(this);
    var $parent = $plus.parents('.thumbnail');
    var $foodId = $parent.data('id');
    var $quantity = $parent.find('.quantity');
    var quantity = $quantity.data('qty');
    quantity++;
    $quantity.text(quantity);
    $quantity.data('qty', quantity);
  })

    $('#foodItems').on('click', '.minus', function(event) {
    var $plus = $(this);
    var $parent = $plus.parents('.thumbnail');
    var $foodId = $parent.data('id');
    var $quantity = $parent.find('.quantity');
    var quantity = $quantity.data('qty');
    quantity--;
    $quantity.text(quantity);
    $quantity.data('qty', quantity);
    // console.log($quantity.data('qty') );
  })


// Food Items Section of the Page (Individual)
  $.ajax({
      method: "GET",
      url: "/api/items"
    }).done(function(items) {
      console.log(items)
      items.forEach(function(food) {
        console.log("food",food);
        var $foodsContainer = $("#foodItems");
        $foodsContainer.append(eachFood(food));
    });
  });
});
