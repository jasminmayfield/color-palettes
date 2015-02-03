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
    $(this.view.groupListSelector).on("focusout", '.hex-code, .shade-percent, .saturate-percent', this.changeGroupColor.bind(this));
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
    this.updateGroupColor(group);
  },

  updateGroupColor: function(group) {
    var hexCode = $('.hex-code',group).text();
    var shadePercent = $('.shade-percent',group).text();
    var saturatePercent = $('.saturate-percent', group).text();
    var newColor = this.saturateColor(this.shadeColor(hexCode, shadePercent), saturatePercent);
    console.log("New color: "+newColor);
    group.css('background-color', newColor);
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
      myGroups[i]['saturatePercent'] = $('.saturate-percent',this).text();
      myGroups[i]['sassGlobal'] = $('.sass-global',this).text();
      myGroups[i]['notes'] = $('.notes',this).text();
      myGroups[i].swatches = [];
      $('.swatch',this).each(function(j) {
        myGroups[i].swatches.push({
          hexCode: $(this).data('hex-code'),
          counter: $(this).data('counter')
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
          var $group = self.view.addGroup(group.hexCode, group.shadePercent, group.saturatePercent, group.sassGlobal, group.notes);
          self.updateGroupColor($group);
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

  shadeColor: function(color, amount) {
    var lightenDarken = '';
    // parses string input to integer like ruby .to_i
    amount = parseInt(amount);
    if (amount > 0) {
      lightenDarken = 'lighten';
    } else if (amount < 0) {
      lightenDarken = 'darken';
    } else {
      return color;
    }

    // Math.abs = absolute value makes negatives positives
    var scss = '.useless-compiler-placeholder { background-color: ' + lightenDarken + '(' + color + ', ' + Math.abs(amount)+'%); }';
    var css = Sass.compile(scss);
    console.log(css);
    console.log(css.indexOf(';'));
    var newColor = css.substring(52, css.indexOf(';'));
    console.log(newColor);
    return newColor;
  },

  saturateColor: function(color, amount) {
    var condition = '';
    var saturization = '';
    // parses string input to integer like ruby .to_i
    amount = parseInt(amount);
    var adjusted_amount = '';

    if (amount > 0) {
      condition = "< 100%";
      saturization = 'saturate';
      adjusted_amount = "min($amt, 100%-$sat)";
    } else if (amount < 0) {
      condition = "> 0%";
      saturization = 'desaturate';
      adjusted_amount = "min($amt, $sat)";
    } else {
      return color;
    }

     // Math.abs = absolute value makes negatives positives
    // var scss = '.useless-compiler-placeholder { background-color: ' + saturization + '(' + color + ', ' + Math.abs(amount)+'%); }';

    var scss = "@mixin wah($col, $amt) { $sat: saturation($col); @if $sat "+condition+" { background-color: "+saturization+"($col, "+adjusted_amount+"); } @else { background-color: $col; } } .useless-compiler-placeholder { @include wah("+color+", "+Math.abs(amount)+"%); }";

    console.log(scss);
    var css = Sass.compile(scss);
    console.log(css);
    var newColor = css.substring(52, css.indexOf(';'));
    console.log(newColor);
    return newColor;
  }
};
