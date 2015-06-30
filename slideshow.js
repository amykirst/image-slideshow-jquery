// When I load the page, all photos show. How can I speed this up?

// Get array with photos
var photos = ($(".image")); // Returns object of photos
var numPhotos = photos.length;
var shownPhotoIndex;

// Hide all photos except first by giving class of "hide" (if JS is not enabled, all photos will show)
function hidePhotos() {
    $(photos).not(":first").addClass("hide");
} // end hidePhotos

// Calculate position of buttons
function positionButtons() {
    // get the height and width of the shown image
    var imageHeight = $(".slideshow img").first().height();
    var imageWidth = $(".slideshow img").first().width();
    var paddingTop = (imageHeight / imageWidth) * 100;
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
        // Add the "hide" class to the list of existing classes
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
  
// Hide all photos but the first
hidePhotos();

// Run JS after images have downloaded  
window.onload = function() {
  addControls();
  progressSlides();
};

