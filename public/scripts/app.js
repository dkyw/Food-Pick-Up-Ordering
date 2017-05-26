// $(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });

// Restaurant Logo
  var $restaurantLogo = $("<img>").attr({
    id: "restaurantLogo",
    alt: "Restaurant Logo",
    src: "https://nodejs.org/static/images/logos/nodejs-new-pantone-white.png",
    width: "117",
    length: "71"
  });

  $(".navbar-fixed-top .container").prepend($restaurantLogo);

// Creating the Landing Page
  function landingPage() {
    // var $landingPage = $("#landingPage");
    var $row = $("<div>").addClass("row");
    var $columnSize = $("<div>").addClass("col-md-6 col-sm-12");
    var $restaurantName = $("<h1>").text("restoName");
    var $restaurantDescription = $("<p>").text("Describe");

    $row.append($columnSize);
    $columnSize.append($restaurantName, $restaurantDescription);

    return $row;
  }

  $("#landingPage").append(landingPage());

// Sidebar initially hidden, shown on toggle
  $(".sidebar").hide();
  $(".checkout").on("click", function(event) {
    event.preventDefault();
    console.log("clicked");
    $(".sidebar").toggle("slide");
  });

// Food Items Section of the Page (Individual)
  function eachFood(food) {
    var $food = $("<div>").addClass("col-xs-18 col-sm-6 col-md-4");
    var $thumbnail = $("<div>").addClass("thumbnail");
    var $foodImage = $("<img>").addClass("foodImage").attr("src", "http://placehold.it/500x250/EEE");
    var $caption = $("<div>").addClass("caption");
    var $foodName = $("<h4>").text("Label");
    var $foodDescription = $("<p>").text("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, soluta, eligendi doloribus sunt minus amet sit debitis repellat. Consectetur, culpa itaque odio similique suscipit");
    var $button = `<a href="#" class="btn btn-default btn-xs pull-right" role="button">
      <i class="glyphicon glyphicon-edit"></i>
      </a>
      <a href="#" class="btn btn-info btn-xs" role="button">Button</a>
      <a href="#" class="btn btn-default btn-xs" role="button">Button</a>`;

    $food.append($thumbnail);
    $thumbnail.append($foodImage, $caption);
    $caption.append($foodName, $foodDescription, $button);

    return $food;
  }

// Iterate each food entry
  function renderFoods() {
    var $foodsContainer = $("#foodItems");
    var foods = [1,2,3,4,5,6];
    for (var item in foods) {
      // var food = foods[item];
      var food = foods.length;
      $foodsContainer.append(eachFood(food));
    }
  }

  renderFoods();

};
