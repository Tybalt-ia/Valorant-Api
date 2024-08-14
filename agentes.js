import { consultaUrl,initSwiper,formatoTarjetaAgentes,pintarEnContenedorXId, pintarCheckbox  } from "/funciones/funciones.js";

const swiper = initSwiper(".mySwiper");
let data = await consultaUrl("https://valorant-api.com/v1/agents");
let agentes = data.data;


let tarjetasAgentes = formatoTarjetaAgentes(agentes);
pintarEnContenedorXId("contenedor-agentes",tarjetasAgentes.join(''));
swiper.initialSlide = Math.round(agentes.length / 2)
swiper.update();


