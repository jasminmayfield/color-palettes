function View() {
  this.addColorGroupButtonSelector = "#add-color-group-button";
  this.colorListSelector = "#color-list";
  this.groupListSelector = "#group-list";
  this.connectedSortablesSelector = ".connectedSortable";
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
    group.append('<div contenteditable="true" class="shade-percent">0</div>');
    group.css('background-color', '#c3325f');

    group.append('<div class="color-match-list connectedSortable"></div>');

    $(this.groupListSelector).append(group);
    return group;
  }

};
