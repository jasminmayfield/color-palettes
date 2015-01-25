function View() {
  this.newGroupButtonSelector = "#new-group-button";
  this.colorListSelector = "#color-list";
  this.groupListSelector = "#group-list";
  this.connectedSortablesSelector = ".connectedSortable";
}

View.prototype = {

  addColorSwatch: function(div) {
    $(this.colorListSelector).append(div).addClass('connectedSortable');
  },

  showNewColorGroup: function() {
    console.log("A color group has been added");

    var group = $('<div class="group"></div>');
    group.append('<div contenteditable="true" class="hex-code">#c3325f</div>');
    group.append('<div contenteditable="true" class="shade-percent">0</div>');
    group.css('background-color', '#c3325f');

    group.append('<div class="color-match-list connectedSortable"></div>');

    $(this.groupListSelector).append(group);
    return group;
  }

};
