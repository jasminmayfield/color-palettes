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
      connectWith: ".connectedSortable",
      helper: 'clone',
      appendTo: 'body'
    }).disableSelection();

  }

  // Adjustment is lighten and darken by a percentage input only
  // i.e. excludes hue & saturation adjustments

  // adjustColor: function () {
  //
  //   var adjust = $('<div></div>');
  //   adjust.addClass('adjust');
  //
  //
  //   $('.hexcode, .adjust').on("focusout", function() {
  //     var color = $('.hexcode').text();
  //     var adjust = $('.adjust').text();
  //
  //     $('.hexcode').parent('.group').css('background-color', shadeColor(color,adjust));
  //   });
  //
  //   function shadeColor(color, amt) {
  //
  //     var usePound = false;
  //     if (color[0] == "#") {
  //       color = color.slice(1);
  //       usePound = true;
  //     }
  //
  //     var num = parseInt(col,16);
  //     var amt = parseInt(amt);
  //     var r = (num >> 16) + amt;
  //
  //     if (r > 255) r = 255;
  //     else if  (r < 0) r = 0;
  //
  //     var b = ((num >> 8) & 0x00FF) + amt;
  //
  //     if (b > 255) b = 255;
  //     else if  (b < 0) b = 0;
  //
  //     var g = (num & 0x0000FF) + amt;
  //
  //     if (g > 255) g = 255;
  //     else if (g < 0) g = 0;
  //
  //     return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  //   }
  // }
}
