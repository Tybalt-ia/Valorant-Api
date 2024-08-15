import { consultaUrl,initSwiper,formatoTarjetaAgentes,pintarEnContenedorXId,guardarFavorito  } from "/funciones/funciones.js";

const swiper = initSwiper(".mySwiper");
let agentes = localStorage.getItem("agentes") || [];
if(agentes.length == 0){
    let data = await consultaUrl("https://valorant-api.com/v1/agents");
    agentes = data.data;
    agentes = agentes.map(agente => {
        agente.favorito = false;
        return agente
    })
}

let tarjetasAgentes = formatoTarjetaAgentes(agentes);
pintarEnContenedorXId("contenedor-agentes",tarjetasAgentes.join(''));
swiper.initialSlide = Math.round(agentes.length / 2)
swiper.update();

