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
    loop: true,
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

// AGENTES
export function formatoTarjetaAgentes(arreglo) {
  return arreglo.map((elemento) => {
    if (elemento.fullPortrait) {
      return `
        <div class="swiper-slide">
                <div class="content">
                    <div class="text">
                      <div> 
                       <i class="fa-regular fa-heart"></i>
                       <h3 >${elemento.displayName}</h3>
                      </div>                        
                        <p>${elemento.description}</p>
                    </div>
                    <div class="image">
                        <img src="${elemento.fullPortrait}" alt="${elemento.displayName}" loading="lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                </div>
                <a href="/agentes/detalles.html?id=${elemento.uuid}" class="myBtn">Detalles</a>
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





export function pintarCheckbox(events) {let checkbox = []

  for (let i = 0; i < events.length; i++) {
    if (!checkbox.includes(events[i].category)) {
      checkbox.push(events[i].category)
    }
  }

  for (let i = 0; i < checkbox.length; i++) {
    let contenedor = document.getElementById("checkbox")
    let check = document.createElement('div')
    check.className = "form-check m-1 d-flex align-items-center"
    check.innerHTML = `
      <input class="form-check-input" type="checkbox" value="${checkbox[i]}" id="flexCheck1">
      <label class="form-check-label" for="flexCheck1">
         ${checkbox[i]}
      </label>
    `
    contenedor.appendChild(check)
  }
}
