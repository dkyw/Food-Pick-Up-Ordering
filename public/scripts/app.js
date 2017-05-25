$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });
$(".sidebar").hide();

  $(".checkout").on("click", function(event) {
    event.preventDefault();
    console.log("clicked");
    $(".sidebar").toggle("slide");
  });
});
