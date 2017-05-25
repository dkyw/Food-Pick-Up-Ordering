$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});


// $(document).ready(function() {
//     $('button').on('submit', function(event) {
//         // Prevent submit event from bubbling and automatically submitting the
//         // form
//         event.preventDefault();

//         // Call our ajax endpoint on the server to initialize the phone call
//         $.ajax({
//             url: '/call',
//             method: 'POST',
//             dataType: 'json',
//             data: {
//                 phoneNumber: $('#phoneNumber').val(),
//                 salesNumber: $('#restaurantNumber').val()
//             }
//         }).done(function(data) {
//             // The JSON sent back from the server will contain a success message
//             alert(data.message);
//         }).fail(function(error) {
//             alert(JSON.stringify(error));
//         });
//     });
// });
