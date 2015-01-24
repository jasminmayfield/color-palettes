function Controller() {
  this.view = null;
}

Controller.prototype = {

  start: function(){
    this.view = new View();
    this.bindEvents();
  },

  bindEvents: function(){
    $(this.view.addColorGroupButtonSelector).on("click", this.addColorGroupButton.bind(this));
  },

  addColorGroupButton: function(e) {
    e.preventDefault();
    console.log("adding a color group");
    this.view.addColorGroup();
  }

};
