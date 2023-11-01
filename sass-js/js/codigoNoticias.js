import arrayNoticias from "./noticias.js";

let btnFtrNoticias = document.querySelector("#btnFtrNoticias");
const selFecha = document.querySelector("#selFecha");


let fechaValor = selFecha.addEventListener("change", (e) => {
  fechaValor = e.target.value;
  console.log(fechaValor)
});

btnFtrNoticias.addEventListener("click", filtrarArray)

listarNoticias(arrayNoticias);

function listarNoticias(array) {
  let listado = "";
  console.log(array)
  if ((Array.isArray(array) && array.length)) {
    array.forEach((e) => {
      listado += e.imprimirCard();
    });
    document.querySelector("#gridNoticias").innerHTML = listado;
  } else {
    document.querySelector("#gridNoticias").innerHTML = `<h4 class="mx-auto">No hay noticias con esos parametros</h4>`;
  }
}

function filtrarArray() {
  let selDestacadas = document.querySelector("#selDestacadas").value;
  let selCategorias = document.querySelector("#selCategorias").value;
  let fechaSelect = new Date(fechaValor).getTime();
  console.log(fechaValor)
  console.log(fechaSelect)

  let arrayFiltrado
  selDestacadas === "destacada" ? arrayFiltrado = arrayNoticias.filter((noticia) =>  noticia.destacada === true): arrayFiltrado = arrayNoticias;
  arrayFiltrado = arrayFiltrado.filter((noticia) =>  noticia.slug === selCategorias || selCategorias == "todas");
  arrayFiltrado = arrayFiltrado.filter((noticia) => noticia.fecha.getTime() >= fechaSelect || fechaValor === undefined);

  listarNoticias(arrayFiltrado);
}
