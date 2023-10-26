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

  (() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

const video = document.querySelector('.video');
const videoHandler = document.querySelector('.videoHandler');
const iconVideoPlay = document.querySelector('.iconVideoPlay');
video.addEventListener("click", playPause);
videoHandler.addEventListener("click", playPause);

function playPause () { 
  if (video.paused) {
    video.play();
    iconVideoPlay.className = "bi bi-pause-circle";
    videoHandler.title = "Pausar video";
    videoHandler.setAttribute("data-state", "pause");
  } else {
    video.pause(); 
    iconVideoPlay.className = "bi bi-play-circle";
    videoHandler.title = "Reproducir video";
    videoHandler.setAttribute("data-state", "play");
  }
}
/* const videoTestimonio = document.querySelector('#videoMides');
const videoHandler = document.querySelector('#testimonioHandler');
const videoIcon = document.querySelector('#testimonioHandler>i');
videoTestimonio.addEventListener("click", () => playPause(videoTestimonio));
videoHandler.addEventListener("click", () => playPause(videoTestimonio));

function playPause(video) { 
  if (video.paused) {
    video.play();
    videoIcon.className = "bi bi-pause-circle";
    videoHandler.title = "Pausar video";
    videoHandler.setAttribute("data-state", "pause");
  } else {
    video.pause(); 
    videoIcon.className = "bi bi-play-circle";
    videoHandler.title = "Reproducir video";
    videoHandler.setAttribute("data-state", "play");
  }
}
 */