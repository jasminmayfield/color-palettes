$(document).ready(function() {

  controller = new Controller();
  controller.start();

  $('.scrollable').height($(window).height() - 50);

});

$(window).resize(function() {
  $('.scrollable').height($(window).height() - 50);
});
