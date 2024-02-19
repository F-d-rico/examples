class Noticia{
    constructor(destacada,categoria,fecha,titulo,bajada,imagen,altImagen,texto/* imagen2,altImagen2,texto2,imagen3,altImagen3,texto3,galeria */){
        this.destacada=destacada;
        this.categoria=categoria;
        this.fecha=new Date(fecha+'T00:00:00-0700');
        this.titulo=titulo;
        this.bajada=bajada;
        this.imagen=imagen;
        this.altImagen=altImagen;
        this.texto=texto;
      /*this.imagen2=imagen2;
        this.altImagen2=altImagen2;
        this.texto2=texto2;
        this.imagen3=imagen3;
        this.altImagen3=altImagen3;
        this.texto3=texto3;
        this.galeria=galeria; */
        this.fechaScript=this.handlerFechaScript();
        this.colorBadge=this.handlerColorBadge();
        this.slug=this.handlerSlug();
        this.id=this.handlerId();
      }


    //METODOS

handlerId(){
  const dia = this.fecha.getDate();
  const mes = (parseInt(this.fecha.getMonth())+1);
  const ano = this.fecha.getFullYear();
  const id = `${ano}-${mes}-${dia}_${this.slug}`;
  return id;
}

handlerSlug() {
let slug;
switch (this.categoria) {
  case "Fundación":
    slug = "fundacion"
    break;
  case "Trayectorias":
    slug = "trayectorias"
    break;
  case "Sin Límites":
    slug = "sinLimites"
    break;
  case "Compromiso Social":
    slug = "social"
    break;
  default:
    slug = "sinCategoria"
    break;
}
return slug
}

handlerColorBadge(){
  let colorBadge;
  switch (this.categoria) {
    case "Fundación":
      colorBadge = "bg-primary"
      break;
    case "Trayectorias":
      colorBadge = "bg-red"
      break;
    case "Sin Límites":
      colorBadge = "bg-yellow"
      break;
    case "Compromiso Social":
      colorBadge = "bg-info"
      break;
    default:
      colorBadge = "bg-success"
      break;
  }
  return colorBadge
}

handlerFechaScript(){
  let fechaScript;
  const dia = this.fecha.getDate();
  let mes;
  const ano = this.fecha.getFullYear();
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Dicembre"];
  mes = meses[this.fecha.getMonth()];
  fechaScript = `${dia} de ${mes}, ${ano}`;
  return fechaScript
}

imprimirCard(){
  /* cambiar  href con id */
    let cardNoticia= `
      <a href="post.html?idPost=${this.id}" class="card" aria-label="link card">
        <img src="./assetts/noticias/${this.imagen}" class="card-img-top" alt="${this.altImagen}">
        <div class="card-body">
          <span class="badge ${this.colorBadge}">${this.categoria}</span>
          <h5 class="card-title">${this.titulo}</h5>
          <p class="card-text">${this.bajada}</p>
        </div>
        <div class="card-footer">
          <p>${this.fechaScript}</p>
          <h6>Leer más...</h6>
        </div>
      </a>
    `;
    console.log(this.id);
    return cardNoticia;
}

ampliarNoticia(){
    let amplia=`
    <h2>${this.titulo}</h2>
    <div class="catFecha">
      <span class="badge ${this.colorBadge}">${this.categoria}</span>
      <p>${this.fechaScript}</p>
    </div>
    <p class="text-body-emphasis">${this.bajada}</p>
    <img src="./assetts/noticias/${this.imagen}" alt="${this.altImagen}">
    <div>${this.texto}</div>
    <a href="noticias.html">Regresar</a>
    `
    return amplia
}}

export default Noticia;