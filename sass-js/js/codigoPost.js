import arrayNoticias from "./noticias.js";

const parametros = new URLSearchParams(window.location.search);
const idPost = parametros.get("idPost");
const post = arrayNoticias.find((noticia) => noticia.id === idPost);

linkPost();
function linkPost() {
  /*     const i = arrayNoticias.indexOf(noticia => noticia.id === idPost); */
  document.querySelector("#post").innerHTML = post.ampliarNoticia();
}

filtrarSimilar();
function filtrarSimilar() {
  const arrayFiltrado = arrayNoticias.filter(
    (noticia) => noticia.categoria === post.categoria && noticia.id !== idPost
  );
  console.log(arrayFiltrado)
  if (arrayFiltrado !== undefined) {
    const arraySimilar = arrayFiltrado.slice(0, 2);
    console.log(arraySimilar)
    listarNoticias(arraySimilar);
  } else {
    document.querySelector(
      "#gridSimilares"
    ).innerHTML = `<p>Lo sentimos aún no hay noticias similares...</p>`;
  }
}

function listarNoticias(array) {
  let listado = "";
  array.forEach((e) => {
    listado += e.imprimirCard();
  });
  document.querySelector("#gridSimilares").innerHTML = listado;
}
