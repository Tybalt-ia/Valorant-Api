// GENERALES
export async function consultaUrl(url) {
  return await fetch(url).then((res) => res.json());
}


export function initSwiper(clase) {
  return new Swiper(clase, {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: "auto",
    coverflowEffect: {
      depth: 500,
      modifer: 1,
      slidesShadows: true,
      rotate: 0,
      stretch: 0,
    }
  });
}

export function pintarEnContenedorXId(contenedorId, data) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = data;
}

export function limpiarContenedorXId(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";
}

export function consultarLocal(localStorageId) {
  return JSON.parse(localStorage.getItem(localStorageId) || "[]");
}

export function guardarLocal(localStorageId, data) {
  localStorage.setItem(localStorageId, JSON.stringify(data));
}

// AGENTES
let agentes = null;
let swiper = null;
let isViewingFavorites = false;
export async function initAgentes() {
  swiper = initSwiper(".mySwiper");
  agentes = consultarLocal("agentes");
  let favoritos = consultarLocal("favoritos") 
  if (agentes.length == 0) {
    let data = await consultaUrl("https://valorant-api.com/v1/agents");
    agentes = data.data;
  }
  agentes = agentes.map(agente => {
    agente.favorito = favoritos.includes(agente.uuid);
    return agente
  })
  guardarLocal("agentes", agentes)

  let tarjetasAgentes = formatoTarjetaAgentes(agentes);
  pintarEnContenedorXId("contenedor-agentes", tarjetasAgentes.join(''));
  swiper.initialSlide = Math.round(agentes.length / 2)
  swiper.update();
  favoritosAgentesEvent();
  filtrarFavoritos();

}

export function formatoTarjetaAgentes(arreglo) {
  return arreglo.map((elemento) => {
    if (elemento.fullPortrait) {
      return `
        <div class="swiper-slide">
                <div class="content">
                    <div class="text">
                      <div >
                       <h3>${elemento.displayName}</h3> 
                       <button class= "btn-agente fav" data-id="${elemento.uuid}" ><i class="fa-${elemento.favorito ? "solid" : "regular"} fa-heart" ></i></button>                       
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

export function favoritosAgentesEvent(){
  document.querySelectorAll('.fav').forEach(fav => {
    fav.addEventListener('click', (e) => {
        const agentId = e.currentTarget.getAttribute('data-id'); 
        let favoritos = consultarLocal("favoritos") 
        const isFavorite = favoritos.includes(agentId); 

        if (isFavorite) {
            const index = favoritos.indexOf(agentId);
            if (index > -1) {
                favoritos.splice(index, 1);
            }
        } else {
            favoritos.push(agentId);
        }
        guardarLocal('favoritos',favoritos);

        agentes = agentes.map(agente => {
          agente.favorito = favoritos.includes(agente.uuid);
          return agente
        })
        
        let tarjetasAgentes = formatoTarjetaAgentes(agentes);
        pintarEnContenedorXId("contenedor-agentes", tarjetasAgentes.join(''));
        swiper.initialSlide = Math.round(agentes.length / 2)
        swiper.update();
        favoritosAgentesEvent();
    });
});
}

export function filtrarFavoritos(){
  const viewFavoritesButton = document.getElementById('view-favorites');
  viewFavoritesButton.addEventListener('click', () => {
    console.log(1)
    isViewingFavorites = !isViewingFavorites; 
    let agentesFilter = agentes;
    if (isViewingFavorites) {
        viewFavoritesButton.innerText = 'Ver Todos';
        agentesFilter = agentes.filter(agente => agente.favorito)
    } else {
        viewFavoritesButton.innerText = 'Ver Favoritos';
    }
    
  
    let tarjetasAgentes = formatoTarjetaAgentes(agentesFilter);
    pintarEnContenedorXId("contenedor-agentes", tarjetasAgentes.join(''));
    swiper.update();
    favoritosAgentesEvent();
});
}


