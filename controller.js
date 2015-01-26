function Controller() {
  this.view = null;
}

Controller.prototype = {

  start: function(){
    this.view = new View();
    this.storage = $.localStorage;

    this.loadSort();
    if ($('.swatch').length === 0) this.resetSort();

    this.updateSortables();
    this.bindEvents();
  },

  bindEvents: function(){
    $(this.view.resetButtonSelector).on("click", this.resetSort.bind(this));
    $(this.view.saveButtonSelector).on("click", this.saveSort.bind(this));
    $(this.view.newGroupButtonSelector).on("click", this.newGroup.bind(this));
    $(this.view.groupListSelector).on("focusout", '.hex-code, .shade-percent', this.changeGroupColor.bind(this));
    $(this.view.groupListSelector).on("click", '.close-button', this.removeGroup.bind(this));
  },

  newGroup: function(e) {
    e.preventDefault();
    console.log("adding a color group");
    this.view.addGroup();
    this.updateSortables();
  },

  removeGroup: function(e) {
    console.log("removing a color group");
    e.preventDefault();
    $(e.target).closest('.group').find('.swatch').appendTo(this.view.colorListSelector);
    $(e.target).closest('.group').remove();
  },

  showAllSwatches: function() {
    var self = this;
    groups.forEach(function (group, i) {
      group.items.forEach(function(item, j) {
        self.view.addSwatch(item.color, item.files.length);
      });
    });
  },

  changeGroupColor: function(e) {
    var group = $(e.target).parent('.group');
    var hexCode = $('.hex-code',group).text();
    var shadePercent = $('.shade-percent',group).text();
    this.updateGroupColor(group, hexCode, shadePercent);
  },

  // shadePercent update is for lighten/darkening a color with a percentage input only
  // i.e. excludes hue & saturation adjustments
  updateGroupColor: function(group, hexCode, shadePercent) {
    group.css('background-color', this.shadeColor(hexCode, shadePercent));
  },

  updateSortables: function() {
    $(".connectedSortable").sortable({
      connectWith: ".connectedSortable",
      helper: 'clone',
      appendTo: 'body'
    }).disableSelection();

    $(this.view.groupListSelector).sortable({
      handle: '.handle',
      helper: 'clone',
      appendTo: 'body'
    });
  },

  saveSort: function() {
    console.log("Saving my sort");
    var myGroups = [];
    $('.group').each(function(i) {
      myGroups[i] = {};
      myGroups[i]['hexCode'] = $('.hex-code',this).text();
      myGroups[i]['shadePercent'] = $('.shade-percent',this).text();
      myGroups[i]['sassGlobal'] = $('.sass-global',this).text();
      myGroups[i]['notes'] = $('.notes',this).text();
      myGroups[i].swatches = [];
      $('.swatch',this).each(function(j) {
        myGroups[i].swatches.push({
          hexCode: $(this).data('hex-code'),
          counter: $(this).data('counter'),
          sassGlobal: $(this).data('sass-global'),
          notes: $(this).data('notes')
        });
      });
    });

    var unsortedSwatches = [];
    $('.swatch', this.view.colorListSelector).each(function(i) {
      unsortedSwatches.push({
        hexCode: $(this).data('hex-code'),
        counter: $(this).data('counter')
      });
    });
    myGroups.push({
      hexCode: 'none',
      swatches: unsortedSwatches
    });

    console.log(myGroups);
    // When you save things to local storage you must give it a name
    this.storage.set('myGroups', myGroups);
  },

  loadSort: function() {
    console.log('loading the color list');
    var self= this;
    if (this.storage.isSet('myGroups')) {
      var myGroups = this.storage.get('myGroups');

      myGroups.forEach(function(group,i) {
        if (group.hexCode === 'none') {
          group.swatches.forEach(function(swatch,j) {
            self.view.addSwatch(swatch.hexCode, swatch.counter);
          });
        } else {
          var $group = self.view.addGroup(group.hexCode, group.shadePercent, group.sassGlobal, group.notes);
          group.swatches.forEach(function(swatch,j) {
            self.view.addSwatch(swatch.hexCode, swatch.counter, $group);
          });
        }
      });
    }
  },

  resetSort: function() {
    console.log('resetting, start over');
    $('.group').remove();
    $('.swatch').remove();
    this.storage.remove('myGroups');
    this.showAllSwatches();
    this.view.addGroup();
    this.updateSortables();
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
