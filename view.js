function View() {
  this.addColorGroupButtonSelector = "#add-color-group-button";
  this.colorListSelector = "#color-list";
  this.groupListSelector = "#group-list";
}

View.prototype = {

  addColorSwatch: function(div) {
    $(this.colorListSelector).append(div).addClass('connectedSortable');
  },

  addColorGroup: function() {
    console.log("viewing a color group");

    var group = $('<div></div>');
    group.addClass('group');
    group.append('<div contenteditable="true" class="hex-code">#c3325f</div>');
    group.css('background-color', '#c3325f');

    group.append('<div class="color-match-list connectedSortable"></div>');

    $(this.groupListSelector).append(group);

    $('.hex-code',group).on("focusout", function(e) {
      console.log("entering hex");
      $(e.target).parent('.group').css('background-color', $(e.target).text());
    });

    $('.connectedSortable').sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
  }


};
