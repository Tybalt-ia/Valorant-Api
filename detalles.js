import { consultaUrl,} from "/funciones/funciones.js";

let data = await consultaUrl("https://valorant-api.com/v1/agents");


let uuid = new URLSearchParams (window.location.search).get ("id")
  let detalles = data.data.find(e => e.uuid == uuid)
  

  document.getElementById ("Detalles").innerHTML = ` 

<div class="card text-bg-dark box">
    <img src="${detalles.fullPortrait}" class="card-img cover" >
  <div class="card-img-overlay">
    <h5 class="d-flex justify-content-center">${detalles.displayName}</h5>
    <p class="d-flex justify-content-center card-text">${detalles.description}</p>
  </div>
</div>  
 `




  