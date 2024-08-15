let agentes = await fetch("https://valorant-api.com/v1/agents");
let datosAgentes = await agentes.json();
let buddies = await fetch("https://valorant-api.com/v1/buddies");
let datosBuddies = await buddies.json();
let maps = await fetch("https://valorant-api.com/v1/maps");
let datosMaps = await maps.json();
let weapons = await fetch("https://valorant-api.com/v1/weapons");
let datosWeapons = await weapons.json();
export let dataAgentes = datosAgentes.data
export let dataBuddies = datosBuddies.data
export let dataMaps = datosMaps.data
export let dataWeapons = datosWeapons.data
export let arregloBuddies1 = datosBuddies.data.map(d => d.displayIcon)
export let arregloBuddies = arregloBuddies1.filter(d => d!=null)
export let arregloAgentes1 = datosAgentes.data.map(d => d.fullPortrait)
export let arregloAgentes = arregloAgentes1.filter(d => d!=null)
export let arregloMap1 = datosMaps.data.map(d => d.stylizedBackgroundImage)
export let arregloMap =  [... new Set (arregloMap1.sort())]
export let arregloMapas = arregloMap.filter(d => d!=null)
export let arregloWeapon = datosWeapons.data.map(d => d.shopData)
export let arregloWeapons1 =[]

for (let i = 0;i<arregloWeapon.length-1;i++){
  arregloWeapons1[i] = arregloWeapon[i].newImage;
}
export let arregloWeapons = arregloWeapons1
let it=0;


export function imagen(){
  document.getElementById('card1').style.backgroundImage = `url(${arregloAgentes[it]})`
  document.getElementById('card2').style.backgroundImage = `url(${arregloBuddies[it]})`
  document.getElementById('card3').style.backgroundImage = `url(${arregloMapas[it]})`
  document.getElementById('card4').style.backgroundImage = `url(${arregloWeapons[it]})`
  document.getElementById('card5').style.backgroundImage = `url(${arregloAgentes[23-it]})`
  it++;
  if(it >= arregloMapas.length){
    it = 0;
  }   
}

export function swip(){
        let swiper = new Swiper(".swiper", {
        grabCursor: true,
        initialSlide: 1,
        centeredSlides: true,
        slidesPerView: "auto",
        spaceBetween: 20,
        speed: 2000,
        freeMode: false,
        loop: true,
        mousewheel: {
          thresholdDelta: 40,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        on: {
          click(event) {
            swiper.slideTo(this.clickedIndex);
            
          },
        },
      });

}
 
 
export let btnAgents = document.getElementById("card1")
export let btnBuddies = document.getElementById("card2")
export let btnMapas = document.getElementById('card3')
export let btnWeapons = document.getElementById("card4")
export let btnStats = document.getElementById("card5")


export function swipeHome(){
    btnAgents.addEventListener('swiped-down', function(e) {
        window.location.href ='./agents.html';
      });
      btnBuddies.addEventListener('swiped-down', function(e) {
        window.location.href ='./buddies.html';
      });
      btnMapas.addEventListener('swiped-down', function(e) {
        window.location.href ='./maps.html';
      });
      btnWeapons.addEventListener('swiped-down', function(e) {
        window.location.href ='./weapons.html';
      });
      btnStats.addEventListener('swiped-down', function(e) {
        window.location.href ='./stats.html';
      });
}
 


export let agentes1 = dataAgentes.map(d => 
    {if(d.role==null){
        let prueba={
            name: d.displayName,
            role: null            
        }
        return prueba
    } 
    else  {
        let prueba={
            name: d.displayName,
            role: d.role.displayName     
        }
        return prueba
        }
});
export let roles1 = agentes1.map(d => d.role)
export let roles = roles1.filter(d => d!=null)
export let agentesRole =  [... new Set (roles.sort())]
export function contar(datos, categorias){
    let stats=[]
    for (let j=0; j<categorias.length;j++){
        let categoria = categorias[j];
        let contador=0
        for (let i=0; i<datos.length;i++){
            if( datos[i]==categoria){
                contador++;

            }
        }
        stats[j]={
            name: categoria,
            conteo: contador
        }
    }
    return stats
}
export let statsAgentes= contar(roles, agentesRole)

export function tablaAgentes(cont,datos, titulo){
    let contenedor= document.getElementById(cont)
    contenedor.innerHTML=""
    let tabla =  document.createElement("table")
    tabla.className = "table table-bordered rounded-3 overflow-hidden"
    let thead = document.createElement("thead")
    thead.innerHTML = `
               <tr>
                <th colspan="4" class=" border-1">${titulo}</th> 
              </tr>
        `
    tabla.appendChild(thead)
    let tbody = document.createElement("tbody")
    tbody.innerHTML = `
                <tr>
                <td>${datos[0].name}</td>
                <td>${datos[1].name}</td>
                <td>${datos[2].name}</td>
                <td>${datos[3].name}</td>
              </tr>
              `

    let tstats = document.createElement("tr")
    tstats.className = "text-center"
    tstats.innerHTML = `
                    <td>${datos[0].conteo}</td>
                    <td>${datos[1].conteo}</td>
                    <td>${datos[2].conteo}</td>
                    <td>${datos[3].conteo}</td>
                </tr>      
              `
    tbody.appendChild(tstats)
    
    tabla.appendChild(tbody)
contenedor.appendChild(tabla)
}


export let maps1 = dataMaps.map(d => 
    { let prueba={
        name: d.displayName,
        callouts: d.callouts       
        }
     return prueba
} );
export let mapsStats1 =[]
for(let j=0; j<maps1.length;j++){
    let superRegionName = []
    if (maps1[j].callouts==null){
        superRegionName=null

    } else {
    for (let i=0; i<maps1[j].callouts.length; i++){
            superRegionName[i] = maps1[j].callouts[i].superRegionName
        }}
        mapsStats1[j] ={
            name: maps1[j].name,
            superRegionName: superRegionName
        }
}
export let mapsStats =mapsStats1
export let mapasStatFiltrado = mapsStats.filter(d => d.superRegionName!=null)
export let superRegiones = mapasStatFiltrado.map(d => d.superRegionName) 
export let SRJunto = [];
    for(let i = 0;i<superRegiones.length;i++) {
        SRJunto.push(...superRegiones[i]);
    }
export let regiones =  [... new Set (SRJunto.sort())]
export let statsMapas1= []
for(let j=0; j<mapasStatFiltrado.length;j++){
        statsMapas1[j] ={
            name: mapasStatFiltrado[j].name,
            superRegionName: contar(mapasStatFiltrado[j].superRegionName,regiones)
        }
}
export let statsMapas=statsMapas1

export function statsRegions(cont,datos, titulo){
    let contenedor= document.getElementById(cont)
    contenedor.innerHTML=""
    let tabla =  document.createElement("table")
    tabla.className = "table table-bordered rounded-3 overflow-hidden"
    let thead = document.createElement("thead")
    thead.innerHTML = `
               <tr>
                <th colspan="8" class=" border-1">${titulo}</th> 
              </tr>
        `
    tabla.appendChild(thead)
    let tbody = document.createElement("tbody")
    tbody.innerHTML = `
            <tr>
            <td rowspan="2" class="fw-bolder align-middle">Map</td>
            <td colspan="6" class="fw-bolder">Super Region</td>
          </tr>
          `
          let tstats2 = document.createElement("tr")
          tstats2.className = "text-center"
          tstats2.innerHTML = `
                      <tr>
                      <td>${regiones[0]} </td> 
                      <td>${regiones[1]} </td> 
                      <td>${regiones[2]} </td> 
                      <td>${regiones[3]} </td> 
                      <td>${regiones[4]} </td> 
                      <td>${regiones[5]} </td> 
                      </tr>           
                          
          `
          tbody.appendChild(tstats2)
    

    for(let i=0; i<datos.length;i++) {
        let tstats = document.createElement("tr")
        tstats.className = "text-center"
        tstats.innerHTML = `
                <td class="empty">${datos[i].name} </td>
                <td>${datos[i].superRegionName[0].conteo}  </td>
                <td>${datos[i].superRegionName[1].conteo}  </td>
                <td>${datos[i].superRegionName[2].conteo}  </td>
                <td>${datos[i].superRegionName[3].conteo}  </td>
                <td>${datos[i].superRegionName[4].conteo}  </td>
                <td>${datos[i].superRegionName[5].conteo}  </td>
              </tr>      
        `
        tbody.appendChild(tstats)

    }
    tabla.appendChild(tbody)
    contenedor.appendChild(tabla)


}




export let weapons1 = dataWeapons.map(d => 
    {if(d.shopData==null){
        let prueba={
            name: d.displayName,
            category:null,
            cost: null,
            fireRate: null,
            firstBulletAccuracy: null,
            reloadTimeSeconds: null     
        }
        return prueba
    } 
    else  {
        let prueba={
            name: d.displayName,
            category: d.shopData.category,
            cost: d.shopData.cost,
            fireRate: d.weaponStats.fireRate,
            firstBulletAccuracy: d.weaponStats.firstBulletAccuracy,
            reloadTimeSeconds: d.weaponStats.reloadTimeSeconds            
        }
        return prueba
        }
});

export let weaponsFiltrado = weapons1.filter(d => d.category!=null)
export function calculos(datos, categ){
    let result=[]
    for (let i=0; i<categ.length; i++){
        let sum = datos.filter(d=>d.category == categ[i])
        result[i]= {
            category: categ[i],
            cost: (sum.reduce((prev, sum) => prev + sum.cost, 0)/ sum.length).toFixed(2),
            fireRate: (sum.reduce((prev, sum) => prev + sum.fireRate, 0)/ sum.length).toFixed(2),
            firstBulletAccuracy: (sum.reduce((prev, sum) => prev + sum.firstBulletAccuracy, 0)/ sum.length).toFixed(2),
            reloadTimeSeconds: (sum.reduce((prev, sum) => prev + sum.reloadTimeSeconds, 0)/ sum.length).toFixed(2),
        }
    }
    return result
}


export function stats(cont,datos, titulo){
    let maxfireRate = datos.reduce((max, obj) => obj.fireRate > max ? obj.fireRate : max, -Infinity)
    let mayorfireRate = datos.filter(d => d.fireRate == maxfireRate )
    let minfireRate = datos.reduce((min, obj) => obj.fireRate < min ? obj.fireRate : min, Infinity)
    let menorfireRate = datos.filter(d => d.fireRate == minfireRate )
    let maxReload = datos.reduce((max, obj) => obj.reloadTimeSeconds > max ? obj.reloadTimeSeconds : max, -Infinity)
    let mayorReload = datos.filter(d => d.reloadTimeSeconds == maxReload )
    let minReload = datos.reduce((min, obj) => obj.reloadTimeSeconds < min ? obj.reloadTimeSeconds : min, Infinity)
    let menorReload = datos.filter(d => d.reloadTimeSeconds == minReload )
    let maxCapacity = datos.reduce((max, obj) => obj.firstBulletAccuracy > max ? obj.firstBulletAccuracy : max, -Infinity)
    let mayorC = datos.filter(d => d.firstBulletAccuracy == maxCapacity )
    let contenedor= document.getElementById(cont)
    contenedor.innerHTML=""
    let tabla =  document.createElement("table")
    tabla.className = "table table-bordered rounded-3 overflow-hidden"
    let thead = document.createElement("thead")
    thead.innerHTML = `
               <tr>
                <th colspan="5" class=" border-1">${titulo}</th> 
              </tr>
        `
    tabla.appendChild(thead)
    let tbody = document.createElement("tbody")
    tbody.innerHTML = `
                <tr>
                <td>Weapon with highest fire rate</td>
                <td>Weapon with lowest fire rate</td>
                <td>Weapon with highest first Bullet Accuracy</td>
                <td>Weapon with highest reload time seconds</td>
                <td>Weapon with lowest reload time seconds</td>
              </tr>
              `

    let tstats = document.createElement("tr")
    tstats.className = "text-center"
    tstats.innerHTML = `
                      <td > ${mayorfireRate[0].name} with ${mayorfireRate[0].fireRate}%</td>
                      <td>${menorfireRate[0].name} with ${menorfireRate[0].fireRate}% </td>
                      <td> ${mayorC[0].name} with ${mayorC[0].firstBulletAccuracy}</td>
                      <td > ${mayorReload[0].name} with ${mayorReload[0].reloadTimeSeconds}s</td>
                      <td>${menorReload[0].name} and ${menorReload[1].name} with ${menorReload[0].reloadTimeSeconds}s </td>
                    </tr>      
              `
    tbody.appendChild(tstats)
    
    tabla.appendChild(tbody)
contenedor.appendChild(tabla)
}


export function statsCategory(cont,datos, titulo){
    let categoriaDatos = datos.map(d=> ({
        category: d.category,
        cost: d.cost,
    }))
    let categorias = datos.map(d=> d.category)
    let categ = [... new Set (categorias.sort())]
    let result=calculos(datos,categ)
    let contenedor= document.getElementById(cont)
    contenedor.innerHTML=""
    let tabla =  document.createElement("table")
    tabla.className = "table table-bordered rounded-3 overflow-hidden"
    let thead = document.createElement("thead")
    thead.innerHTML = `
               <tr>
                <th colspan="5" class=" border-1">${titulo}</th> 
              </tr>
        `
    tabla.appendChild(thead)
    let tbody = document.createElement("tbody")
    tbody.innerHTML = `
            <tr>
            <td rowspan="2" class="fw-bolder align-middle">Categories</td>
            <td colspan="4" class="fw-bolder">Average</td>
          </tr>
          `
    let tstats2 = document.createElement("tr")
    tstats2.className = "text-center"
    tstats2.innerHTML = `
                
                <td>Cost </td>
                <td>Fire Rate  </td>
                <td>First Bullet Accuracy  </td>
                <td>Reload Time Seconds  </td>
           
                    
    `
    tbody.appendChild(tstats2)

    for(let i=0; i<result.length;i++) {
        let tstats = document.createElement("tr")
        tstats.className = "text-center"
        tstats.innerHTML = `
                <td class="empty">${result[i].category} </td>
                <td>$${result[i].cost.toLocaleString('es-MX')}  </td>
                <td>${result[i].fireRate}  </td>
                <td>${result[i].firstBulletAccuracy}  </td>
                <td>${result[i].reloadTimeSeconds}  </td>
              </tr>      
        `
        tbody.appendChild(tstats)

    }
    tabla.appendChild(tbody)
    contenedor.appendChild(tabla)


}