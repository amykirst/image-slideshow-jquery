
(function() {

// Hide all photos except first for each slideshow on page
function hidePhotos() {
  $(".image").not(":first-child").addClass("hide");
} // end hidePhotos

// Calculate position of buttons for each slideshow on page
function positionButtons() {
  $(".slideshow").each(function() {
    var imageHeight = $(this).find("img").first().height();
    var imageWidth = $(this).find("img").first().width();
    var paddingTop = (imageHeight / imageWidth) * 100;
    paddingTop = +paddingTop.toFixed(2);
    var percent = paddingTop + "%";
    $(this).find(".previous").css("paddingBottom", percent);
    $(this).find(".next").css("paddingBottom", percent);
  });
} // end positionButtons
  
// Add controls (if JS is not enabled; controls will not be present)
function addControls() {
  // Create buttons
  $(".slideshow").append('<span class="next"><p>>></p></span>');
  $(".slideshow").append('<span class="previous"><p><<</p></span>');
  // Calculate position of buttons
  positionButtons();
} // end addControls
  
function progressSlides() {
  var photos;
  var numPhotos;
  var shownPhotoIndex;
    
  function findShownPhoto() {
     for (var i = 0; i < numPhotos; i++) {
      // if the image does not contain a class of "hide"
      if (!$(photos[i]).hasClass("hide")) {
        shownPhotoIndex = i;
      } // end if statement  
    } // end for statement
  } // end findShownPhoto
  
  $(".next, .previous").click(function() {
    var currentSlideshow = $(this).closest(".slideshow");
    numPhotos = $(currentSlideshow).find(".image").length;
    photos = $(currentSlideshow).find(".image");
  }); // end next previous click function
  
  var next = $(".next");
  // When the next button is clicked, show next photo
  $(".next").click(function() {
    var nextPhoto;
    findShownPhoto();
  
    // If current photo is last photo, go to first photo
    if (shownPhotoIndex === (numPhotos - 1)) {
      nextPhoto = photos[0];
    } else {
      nextPhoto = photos[shownPhotoIndex + 1];
    }
    // Hide current photo
    $(photos[shownPhotoIndex]).addClass("hide");
    // Show next photo by removing "hide" class
    $(nextPhoto).removeClass("hide");
        
  }); // end next click
  
  $(".previous").click(function() {
    var prevPhoto;
    findShownPhoto();
    
    // If current photo is first photo, go to last photo
    if (shownPhotoIndex === 0) {
      prevPhoto = photos[numPhotos - 1];
    } else {
      prevPhoto = photos[shownPhotoIndex - 1];
    }
    // Hide current photo
    $(photos[shownPhotoIndex]).addClass("hide");
    // Show previous photo
    $(prevPhoto).removeClass("hide"); 
    }); // end previous click
  } // end progressSlides


// Run JS after images have downloaded  
window.onload = function() {
  // Hide all but first photo
  hidePhotos();
  addControls();
  progressSlides();
};
})();
