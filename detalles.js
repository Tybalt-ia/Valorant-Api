import { consultaUrl,} from "/funciones/funciones.js";

let data = await consultaUrl("https://valorant-api.com/v1/agents");


let uuid = new URLSearchParams (window.location.search).get ("id")
  let detalles = data.data.find(e => e.uuid == uuid)
  

  document.getElementById ("Detalles").innerHTML = ` 

 <div class="card Personaje d-flex flex-column flex-lg-row justify-content-between align-content-center">
     
     <div class=" textoDetalles mx-5 py-2 d-flex flex-column justify-content-center">
      <h2 class="text-center text-light">${detalles.displayName}</h2>
      <p class="text-center text-light">${detalles.description}</p>
    </div>
    <div class="my-2 ms-5">
          <img src="${detalles.fullPortrait}" class="card-img" >
     </div>
 </div>  
 `




  