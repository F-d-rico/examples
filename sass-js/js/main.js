// Import the Bootstrap bundle
//
// This includes Popper and all of Bootstrap's JS plugins.

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


//
// Place any custom JS here
//

// Create an example popover
/* document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new bootstrap.Popover(popover)
  }) */

const video = document.querySelector('#videoMides')
const videoHandler = document.querySelector('#videoHandler')
const videoIcon = document.querySelector('#videoHandler>i')

videoHandler.addEventListener("click", playPause)
video.addEventListener("click", playPause)

function playPause() { 
  if (video.paused) {
    video.play();
    videoIcon.className = "bi bi-pause-circle";
  } else {
    video.pause(); 
    videoIcon.className = "bi bi-play-circle";
  }
} 
