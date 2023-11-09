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