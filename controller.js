function Controller() {
  this.view = null;
}

Controller.prototype = {

  start: function(){
    this.view = new View();

    this.showAllColors();
    this.view.addColorGroup();

    this.updateSortables();
    this.bindEvents();
  },

  bindEvents: function(){
    $(this.view.addColorGroupButtonSelector).on("click", this.addColorGroupButton.bind(this));
    $('.hex-code, .shade-percent').on("focusout", this.changeGroupColor.bind(this));
  },

  addColorGroupButton: function(e) {
    e.preventDefault();
    console.log("adding a color group");

    var newGroup = this.view.addColorGroup();
    $('.hex-code, .shade-percent', newGroup).on("focusout", this.changeGroupColor.bind(this));
    this.updateSortables();

  },

  showAllColors: function() {
    var self = this;
    groups.forEach(function (group, i) {

      group.items.forEach(function(item, j) {
        var div = document.createElement("div");
        div.className = "swatch";
        div.style.backgroundColor = item.color;
        div.innerText = item.color + ' ('+item.files.length+')';

        self.view.addColorSwatch(div);
      });

    });

  },

  changeGroupColor: function(e) {
    var group = $(e.target).parent('.group');
    var hexCode = $('.hex-code',group).text();
    var shadePercent = $('.shade-percent',group).text();
    this.updateGroupColor(group, hexCode, shadePercent);
  },

  updateGroupColor: function(group, hexCode, shadePercent) {
    group.css('background-color', this.shadeColor(hexCode, shadePercent));
  },

  updateSortables: function() {
    $(".connectedSortable").sortable({
      connectWith: ".connectedSortable",
      helper: 'clone',
      appendTo: 'body'
    }).disableSelection();
  },

  shadeColor: function(color, amt) {
    var useHash = false;
    if (color[0] == "#") {
      color = color.slice(1);
      useHash = true;
    }

    var num = parseInt(color,16);
    var amt = parseInt(amt);
    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (useHash?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  }

};
