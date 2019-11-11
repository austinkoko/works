jQuery(function($){

  // Lightbox Triggers
  $(".open-video-link").videoBox();
});
/* ========================================================================= */
/* FUNCTION TO CREATE LIGHTBOX */
/* ========================================================================= */

jQuery.fn.extend({
  videoBox : function() {
      var self, link, target, video, videoSrc, toggle;
      this.each(function() {
          $(this).on("click", function(event) {
              self = this;
              target = $(self).attr("href");
              video = $(target).find(".popup-video iframe");
              videoSrc = $(video).attr("src");
              event.preventDefault ? event.preventDefault() : event.returnValue = false;
              $(target).wrap( "<div class='lightbox'></div>" );
              $(".lightbox").fadeIn(300, function() {
                  $(target).fadeIn(0);
                  $("body").addClass("modal-open");
                  $(video).attr("src",videoSrc+'?autoplay=1');
                  resizeIfame(video);
              });

              $("body").on("click", function(event) {
                  if(($(event.target).hasClass("lightbox") || $(event.target).hasClass("close")) && $(target).parent().hasClass("lightbox") ) {
                      $(".lightbox").fadeOut(300, function() {
                          $(target).hide(0);
                          $(target).unwrap();
                      });
                      $("body").removeClass("modal-open");
                      $(video).attr("src",videoSrc);
                  }
              });
          });
      });
  }
});


/* ========================================================================= */
/* RESIZE IFRAME VIDEO FUNCTION */
/* ========================================================================= */
function resizeIfame(frame) {

  var oldWidth = $(frame).width();
  var oldHeight = $(frame).height();
  var propotion = oldHeight / oldWidth;
  var newHeight;

  $(frame).width('100%');
  newHeight = $(frame).width() * propotion;
  $(frame).height(newHeight);

  $(window).resize(function() {
      $(frame).width('100%');
      newHeight = $(frame).width() * propotion;
      $(frame).height(newHeight);
  });
}
