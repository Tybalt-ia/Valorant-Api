// GENERALES
export async function consultaUrl(url) {
  return await fetch(url).then((res) => res.json());
}

let swiper = null;
export function initSwiper(clase) {
  swiper = new Swiper(clase, {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      depth: 500,
      modifer: 1,
      slidesShadows: true,
      rotate: 0,
      stretch: 0,
    }
  });
  return swiper;
}

export function pintarEnContenedorXId(contenedorId, data) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = data;
}

export function limpiarContenedorXId(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";
}

// AGENTES
export function formatoTarjetaAgentes(arreglo) {
  let favoritos = localStorage.getItem("favoritos") || "[]"
  favoritos = JSON.parse(favoritos)
  return arreglo.map((elemento) => {
    if (elemento.fullPortrait) {
      return `
        <div class="swiper-slide">
                <div class="content">
                    <div class="text">
                      <div> 
                       <i class="fa-${favoritos.includes(elemento.uuid) ? "solid" : "regular"} fa-heart" onclick="guardarFavorito('${elemento.uuid}')"></i>
                       <h3 >${elemento.displayName}</h3>
                      </div>                        
                        <p>${elemento.description}</p>
                    </div>
                    <div class="image">
                        <img src="${elemento.fullPortrait}" alt="${elemento.displayName}" loading="lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                </div>
                <a href="/detalles.html?id=${elemento.uuid}" class="myBtn">Detalles</a>
            </div>
       `;
    }
    return "";
  });
}

export function formatoDetallesAgentes(arreglo) {
  return arreglo.map((elemento) => {
    if (elemento.fullPortrait) {
      return `
        <div class="background">
        <img src="${elemento.fullPortrait}" alt="Gekko img">
        <div class="nombreAgente">
        
            <h2>${elemento.displayName}</h2>    
            <p>${elemento.description}</p>             
        </div>
        <img src="" alt="icono roll">
    </div>
       `;
    }
    return "";
  });
}

export function guardarFavorito(id) {
  let favoritos = localStorage.getItem("favoritos") || "[]"
  favoritos = JSON.parse(favoritos)
  favoritos.push(id)
  localStorage.setItem("favoritos", JSON.stringify(favoritos))
  let agentes = localStorage.getItem("agentes") || "[]";
  agentes = JSON.parse(agentes)
  if (agentes.length > 0) {
    let tarjetasAgentes = formatoTarjetaAgentes(agentes);
    pintarEnContenedorXId("contenedor-agentes", tarjetasAgentes.join(''));
    swiper.initialSlide = Math.round(agentes.length / 2)
    swiper.update();
  }
}

