
(function() {
// Get array with photos
var photos = ($(".image")); 
var numPhotos = photos.length;
var shownPhotoIndex;

// Hide all photos except first 
function hidePhotos() {
  $(photos).not(":first").addClass("hide");
} // end hidePhotos

// Calculate position of buttons
function positionButtons() {
  // get the height and width of the shown image
  var imageHeight = $(".slideshow img").first().height();
  console.log(imageHeight);
  var imageWidth = $(".slideshow img").first().width();
  console.log(imageWidth);
  var paddingTop = (imageHeight / imageWidth) * 100;
  console.log(paddingTop);
  paddingTop = +paddingTop.toFixed(2);
  var percent = paddingTop + "%";
  $(".previous").css("paddingBottom", percent);
  $(".next").css("paddingBottom", percent);
}
  
// Add controls (if JS is not enabled; controls will not be present)
function addControls() {
  // Create buttons
  $(".slideshow").append('<span class="next"><p>>></p></span>');
  $(".slideshow").append('<span class="previous"><p><<</p></span>');
  // Calculate position of buttons
  positionButtons();
} // end addControls
  
// Find curently shown photo
function findShownPhoto() {
  for (var i = 0; i < numPhotos; i++) {
    // if the image does not contain a class of "hide"
    if (!$(photos[i]).hasClass("hide")) {
      shownPhotoIndex = i;
    } // end if statement  
  } // end for statement
} // end findShownPhoto

function progressSlides() {
  var next = $(".next");
  // When the next button is clicked, show next photo
  next.click(function() {
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
  var previous = $(".previous");
  previous.click(function() {
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

hidePhotos();

// Run JS after images have downloaded  
window.onload = function() {
  // Hide all but first photo
  addControls();
  progressSlides();
};
})();
