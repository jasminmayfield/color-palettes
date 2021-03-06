function View() {
  this.newGroupButtonSelector = "#new-group-button";
  this.saveButtonSelector = "#save-button";
  this.resetButtonSelector = "#reset-button";

  this.colorListSelector = "#color-list";
  this.groupListSelector = "#group-list";
  this.connectedSortablesSelector = ".connectedSortable";
}

View.prototype = {

  addSwatch: function(hexCode, counter, group) {
    group = (typeof group === "undefined") ? $(this.colorListSelector) : $('.color-match-list', group);

    var swatch = $('<div class="swatch"></div>');
    swatch.data('hexCode', hexCode);
    swatch.data('counter', counter);
    swatch.css('background-color', hexCode);
    swatch.text(hexCode);
    swatch.append('<span class="badge">'+counter+'</span>');

    group.append(swatch).addClass('connectedSortable');
  },

  addGroup: function(hexCode, shadePercent, saturatePercent, sassGlobal, notes) {
    console.log("A color group has been added");
    hexCode = (typeof hexCode === "undefined") ? "#c3325f" : hexCode;
    shadePercent = (typeof shadePercent === "undefined") ? 0 : shadePercent;
    saturatePercent = (typeof saturatePercent === "undefined") ? 0 : saturatePercent;
    sassGlobal = (typeof sassGlobal === "undefined") ? "$rename-me" : sassGlobal;
    notes = (typeof notes === "undefined") ? "Notes" : notes;
    console.log("stuff");

    var group = $('<div class="group"></div>');
    group.append('<div class="handle"><span class="fa fa-square"></span></div>');
    group.append('<div contenteditable="true" class="sass-global">'+sassGlobal+'</div>');
    group.append('<div style="clear:both;"></div>');
    group.append('<div contenteditable="true" class="hex-code">'+hexCode+'</div>');
    group.append('<div contenteditable="true" class="shade-percent">'+shadePercent+'</div>');
    group.append('<div contenteditable="true" class="saturate-percent">'+saturatePercent+'</div>');
    group.append('<div contenteditable="true" class="notes">'+notes+'</div>');
    group.append('<div style="clear:both;"></div>');
    group.append('<div class="color-match-list connectedSortable"></div>');
    group.append('<div style="clear:both;"></div>');
    group.append('<div class="close-button"><span class="fa fa-times-circle"></span></div');
    group.css('background-color', hexCode);

    $(this.groupListSelector).append(group);
    return group;
  }

};
