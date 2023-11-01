import arrayNoticias from "./noticias.js";

const [a, b, c] = arrayNoticias;
const arrayIndex = [a, b, c];
listarNoticias(arrayIndex);

function listarNoticias(array) {
    let listado = "";
    array.forEach((e) => {
      listado += e.imprimirCard();
    });
    document.querySelector("#gridCards").innerHTML = listado;
  }



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