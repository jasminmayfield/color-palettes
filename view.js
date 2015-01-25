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
    group.append('<h2>'+"New Group"+'</h2>');
    group.append('<div class="well"></div>');
    $('.well',group).addClass('connectedSortable');


    $(this.groupListSelector).append(group);

    $('.connectedSortable').sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
  }


};
