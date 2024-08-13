let agentes = await fetch("https://valorant-api.com/v1/agents");
let datosAgentes = await agentes.json();
let buddies = await fetch("https://valorant-api.com/v1/buddies");
let datosBuddies = await buddies.json();
let maps = await fetch("https://valorant-api.com/v1/maps");
let datosMaps = await maps.json();
let weapons = await fetch("https://valorant-api.com/v1/weapons");
let datosWeapons = await weapons.json();
let arregloBuddies = datosBuddies.data.map(d => d.displayIcon)
arregloBuddies = arregloBuddies.filter(d => d!=null)
let arregloAgentes = datosAgentes.data.map(d => d.fullPortrait)
arregloAgentes = arregloAgentes.filter(d => d!=null)
let arregloMap = datosMaps.data.map(d => d.stylizedBackgroundImage)
arregloMap =  [... new Set (arregloMap.sort())]
let arregloMapas = arregloMap.filter(d => d!=null)
let arregloWeapon = datosWeapons.data.map(d => d.shopData)
let arregloWeapons =[]
for (let i = 0;i<arregloWeapon.length-1;i++){
  arregloWeapons[i] = arregloWeapon[i].newImage;
}

let it=0;

function imagen(){
  
  document.getElementById('card1').style.backgroundImage = `url(${arregloAgentes[it]})`
  document.getElementById('card2').style.backgroundImage = `url(${arregloBuddies[it]})`
  document.getElementById('card3').style.backgroundImage = `url(${arregloMapas[it]})`
  document.getElementById('card4').style.backgroundImage = `url(${arregloWeapons[it]})`
  it++;
  if(it >= arregloMapas.length){
    it = 0;
  }
  console.log(it)
   
}

setInterval(imagen, 3000);


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

 document.querySelectorAll('card3').onclick = function() {
  var url = document.getElementById('linkMapas').href;
  window.location.href = url;
  
}
