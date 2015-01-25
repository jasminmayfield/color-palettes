function Controller() {
  this.view = null;
}

Controller.prototype = {

  start: function(){
    this.view = new View();
    this.bindEvents();
    this.showAllColors();

    this.view.addColorGroup();
  },

  bindEvents: function(){
    $(this.view.addColorGroupButtonSelector).on("click", this.addColorGroupButton.bind(this));
  },

  addColorGroupButton: function(e) {
    e.preventDefault();
    console.log("adding a color group");
    this.view.addColorGroup();
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

  }

};
