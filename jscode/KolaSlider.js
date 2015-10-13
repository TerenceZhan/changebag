(function($) {
    $.fn.KolaSlider = function(options) {
        var defaults = {
            PrevBtnId: null,
            NextBtnId: null,
            CtlPanelId: null,
            Speed: 1000,
            TimeInterval: 2000,
            NumberUnSelectCss: null,
            NumberSelectedCss: null,
            ControlBtnSide: "Right"
        };
        var options = $.extend(defaults, options);
        var thisobj = $(this);
        var slideridx = 0;
        var sliderintervalid = 0;
        var sliderwidth = $("li", thisobj).width();
        var slidercnt = $("li", thisobj).length;
        function f_init() {
            if (options.CtlPanelId != null && document.getElementByIdx(options.CtlPanelId) != null) $("#" + options.CtlPanelId).attr("innerHTML", "");
            if (options.ControlBtnSide.toLowerCase() != "right") {
                $("li", thisobj).each(function(i) {
                    $(this).mouseover(function() {
                        $("#sliderctl_div" + i).removeClass();
                        if (options.NumberSelectedCss != null) $("#sliderctl_div" + i).addClass(options.NumberSelectedCss);
                        f_stopslidertimer();
                    })
           .mouseout(function() {
               $("#sliderctl_div" + i).removeClass();
               if (options.NumberUnSelectCss != null) $("#sliderctl_div" + i).addClass(options.NumberUnSelectCss);
               f_showslidertimer();
           });
                    if (options.CtlPanelId != null && document.getElementByIdx(options.CtlPanelId) != null) {
                        if (i == 0) {
                            $(document.createElement_x("a")).attr('href', 'javascript:void(0);')
         .html(i + 1).appendTo(
                            $(document.createElement_x("div")).attr("id", "sliderctl_div" + i).appendTo("#" + options.CtlPanelId)
                            .data("div_id",i).css("float", "left")
          .mouseover(function() {
              $(this).removeClass();
              if (options.NumberSelectedCss != null) $(this).addClass(options.NumberSelectedCss);
              f_stopslidertimer();
              f_showslider($(this).data("div_id"));
          })
          .mouseout(function() {
              $(this).removeClass();
              if (options.NumberUnSelectCss != null) $(this).addClass(options.NumberUnSelectCss);
              f_showslidertimer();
          })
      );
                            if (options.NumberSelectedCss != null) $("#sliderctl_div" + i).addClass(options.NumberSelectedCss);
                        } else {
                            $(document.createElement_x("a")).attr('href', 'javascript:void(0);')
          .html(i + 1)
          .appendTo(
              $(document.createElement_x("div")).attr("id", "sliderctl_div" + i).appendTo("#" + options.CtlPanelId)
              .data("div_id", i).css("float", "left")
              .mouseover(function() {
                  $(this).removeClass();
                  if (options.NumberSelectedCss != null) $(this).addClass(options.NumberSelectedCss);
                  f_stopslidertimer();
                  f_showslider($(this).data("div_id"));
              })
              .mouseout(function() {
                  $(this).removeClass();
                  if (options.NumberUnSelectCss != null) $(this).addClass(options.NumberUnSelectCss);
                  f_showslidertimer();
              })
          );
                            if (options.NumberUnSelectCss != null) $("#sliderctl_div" + i).addClass(options.NumberUnSelectCss);
                        }
                    }
                });
            } else {
                for (var i = (slidercnt - 1); i >= 0; i--) {
                    var liobj = $("li", thisobj)[i];
                    $(liobj).mouseover(function() {
                        $("#sliderctl_div" + i).removeClass();
                        if (options.NumberSelectedCss != null) $("#sliderctl_div" + i).addClass(options.NumberSelectedCss);
                        f_stopslidertimer();
                    })
           .mouseout(function() {
               $("#sliderctl_div" + i).removeClass();
               if (options.NumberUnSelectCss != null) $("#sliderctl_div" + i).addClass(options.NumberUnSelectCss);
               f_showslidertimer();
           });
                    if (options.CtlPanelId != null && document.getElementByIdx(options.CtlPanelId) != null) {
                        if (i == 0) {
                            $(document.createElement_x("a")).attr('href', 'javascript:void(0);')
             .html(i + 1).appendTo(
                                $(document.createElement_x("div")).attr("id", "sliderctl_div" + i).appendTo("#" + options.CtlPanelId)
                                .data("div_id", i).css("float", "right")
              .mouseover(function() {
                  $(this).removeClass();
                  if (options.NumberSelectedCss != null) $(this).addClass(options.NumberSelectedCss);
                  f_stopslidertimer();
                  f_showslider($(this).data("div_id"));
              })
              .mouseout(function() {
                  $(this).removeClass();
                  if (options.NumberUnSelectCss != null) $(this).addClass(options.NumberUnSelectCss);
                  f_showslidertimer();
              })
          );
                            if (options.NumberSelectedCss != null) $("#sliderctl_div" + i).addClass(options.NumberSelectedCss);
                        } else {
                            $(document.createElement_x("a")).attr('href', 'javascript:void(0);')
              .html(i + 1)
              .appendTo(
                  $(document.createElement_x("div")).attr("id", "sliderctl_div" + i).appendTo("#" + options.CtlPanelId)
                  .data("div_id", i).css("float", "right")
                  .mouseover(function() {
                      $(this).removeClass();
                      if (options.NumberSelectedCss != null) $(this).addClass(options.NumberSelectedCss);
                      f_stopslidertimer();
                      f_showslider($(this).data("div_id"));
                  })
                  .mouseout(function() {
                      $(this).removeClass();
                      if (options.NumberUnSelectCss != null) $(this).addClass(options.NumberUnSelectCss);
                      f_showslidertimer();
                  })
              );
                            if (options.NumberUnSelectCss != null) $("#sliderctl_div" + i).addClass(options.NumberUnSelectCss);
                        }
                    }
                }
            }
            if (options.CtlPanelId != null && document.getElementByIdx(options.CtlPanelId) != null) $(document.createElement_x("div")).css("clear", "both").appendTo("#" + options.CtlPanelId).hide();
        };
        function f_showslider(idx) {
            if (slidercnt == 0) return;
            if (idx < 0) {
                idx = slidercnt - 1;
            } else if (idx == slidercnt) {
                idx = 0;
            }
            slideridx = idx;
            $("ul", thisobj).width(sliderwidth * slidercnt);
            $("ul", thisobj).animate({ marginLeft: "-" + sliderwidth * slideridx + "px" }, options.Speed);
            if (options.CtlPanelId != null && document.getElementByIdx(options.CtlPanelId) != null) {
                $("div", $("#" + options.CtlPanelId)).removeClass();
                if (options.NumberUnSelectCss != null) $("div", $("#" + options.CtlPanelId)).addClass(options.NumberUnSelectCss);
                $("#sliderctl_div" + idx).removeClass();
                if (options.NumberSelectedCss != null) $("#sliderctl_div" + idx).addClass(options.NumberSelectedCss);
            }
        };
        function f_showslidertimer() {
            sliderintervalid = window.setInterval(function() { f_showslider(slideridx + 1); }, options.TimeInterval);
        };
        function f_stopslidertimer() {
            window.clearInterval(sliderintervalid);
        };
        if (options.PrevBtnId != null && document.getElementByIdx(options.PrevBtnId) != null) {
            $("#" + options.PrevBtnId).mouseout(function() {
                f_showslidertimer();
            })
                .mouseover(function() {
                    f_stopslidertimer();
                });
            $("#" + options.PrevBtnId).click(function() {
                f_showslider(slideridx - 1);
            });
        }
        if (options.NextBtnId != null && document.getElementByIdx(options.NextBtnId) != null) {
            $("#" + options.NextBtnId).mouseout(function() {
                f_showslidertimer();
            })
                .mouseover(function() {
                    f_stopslidertimer();
                });
            $("#" + options.NextBtnId).click(function() {
                f_showslider(slideridx + 1);
            });
        }
        f_init();
        f_showslider(0);
        f_showslidertimer();
    }
})(jQuery);