const productos = 'http://localhost:3000/productos/';
const productos2 = 'http://localhost:3001/productos2/';

const itemsPopu = document.getElementById('itemsPopulares');
const itemsOfer = document.getElementById('itemsOferta');
const modalCar = document.getElementById('cont-carrito');
const modalProd = document.getElementById('productosM');
const btncarr = document.getElementById('carritolog')


//Peticion de productos

const getInfo = async () => {
    const resp = await fetch(productos);
    const data = await resp.json();


    //destructuración de array 

    data.forEach(items => {
        const { id, nombre, preciopleno, preciodescuento, img, descuento } = items;
        itemsOfer.innerHTML += `
        
        <div id="cards">
            <div id="dcto"><p>${descuento}</p> </div>
            <img src="${img}" id="foto" alt="tiendita" title="${nombre}">
            <h5><span id="precio">$ ${preciodescuento} x und </span><span id="orig">$ ${preciopleno} x und</span></h5>
            <p id="nameP">${nombre}</p>
            <a id ="btnX" href="#popup2"><button  id="${id}" class="btnA" type="button">Agregar</button></a>
        </div>
        `
    });
    getInfo2();
}
   
document.addEventListener('DOMContentLoaded', getInfo)

const getInfo2 = async () => {
    const resp = await fetch(productos2);
    const data = await resp.json();

    data.forEach(items => {
        const { id, nombre, precio, img} = items;
        itemsPopu.innerHTML += `
        <div id="cards2">     
        <img src="${img}" id="foto" alt="tiendita" title="${nombre}">
        <h5 id="precio">$ ${precio}</h5>
        <p id="nameP">${nombre}</p>
        <a id ="btnX" href="#popup2"><button id="${id}"  class="btnA" type="button">Agregar</button></a>
    </div>
        `

    });
}


itemsOfer.addEventListener('click', async (e) =>{

    // encontrar elemento que tenga clase btnA
    if(e.target.classList.contains('btnA')){

        // Atrapando el id del elemento
        const idx = e.target.id;
        
        // agregando id a link productos para traer info
        let res = await fetch (productos + idx)
        let inf = await res.json();
        console.log(inf)
        
        // Destructuración de objeto
        let {nombre, img, preciodescuento, id} = inf
        
        console.log(inf)
         modalProd.innerHTML = `
    <div id="modalImg"><img src=${img} alt=""></div>
    <div id="modalInfo">
        <h2>${nombre}</h2>
        <h3>${preciodescuento}</h3>
        <p id="iva">Precios con IVA incluido</p>
        <p id="peso">Peso aproximado por pieza, puede variar de acuerdo al peso real</p>
        
            <h5 id="madurez">Selecciona la madurez que deseas</h5>
            <div id="cont-select">
            <select name="elegir" id="select">
                <option value="">Maduro (para hoy)</option>
                <option value="">Normal (3-5 días)</option>
                <option value="">Verde (7 días)</option>
            </select>
            </div>
            <p>La cantidad esta representada por unidad (und) </p>
        <div id="cant">
            <button id="disminuir" class="btn cant" ">-</button>
            <input id="cantidad" type="number" value="1" readonly>
            <button id="aumentar" class="btn cant" ">+</button>
        </div>
        <a id="${id} " class="btn irCarrito" href="">Agregar</a>
    </div>
            `   
           
            document.querySelector(".irCarrito").addEventListener("click",() => {
                const favoritesString = localStorage.getItem("favorites") || "[]"
                const favorites = JSON.parse(favoritesString)
                toggleArrayItem(favorites,inf)
                
                localStorage.setItem("favorites", JSON.stringify(favorites))
              })
    
    }
      // ====== Formula para sumar y restar cantidades
      const btnMas = document.getElementById('aumentar');
      const btnMenos = document.getElementById('disminuir');
      const inputCant = document.getElementById('cantidad');
      
      btnMas.addEventListener('click', () =>{
          inputCant.value = parseInt(inputCant.value) + 1;
      })
      btnMenos.addEventListener('click', () =>{
        inputCant.value = parseInt(inputCant.value) - 1;
        if(inputCant.value <= 0){
            inputCant.value = 0;
        }
    
    })
    
    });

    // ===========Generando evento click
itemsPopu.addEventListener('click', async (e) =>{

    // encontrar elemento que tenga clase btnA
     if(e.target.classList.contains('btnA')){

         // Atrapando el id del elemento
         const idx = e.target.id;
      
         // ==== agregando id al link de localhost para obtener info de un producto en especifico
     let res = await fetch (`${productos2}${idx}`)
     let data = await res.json();
     
     // ====Destructuración directa de objeto
     let {nombre,precio, img, id} = data
     
     modalProd.innerHTML = `
     <div id="modalImg"><img src=${img} alt=""></div>
     <div id="modalInfo">
         <h2>${nombre}</h2>
         <h3>${precio}</h3>
         <p id="iva">Precios con IVA incluido</p>
         <p>Actualmente el precio es por unidad </p>
         <p>La cantidad esta representada en numero de unidades </p>
         <div id="cant">
         <button id="disminuir" class="btn cant" ">-</button>
         <input id="cantidad" type="number" value="1" readonly>
         <button id="aumentar" class="btn cant" ">+</button>
     </div>
         <a id="${id}" class="btn irCarrito" href="">Agregar</a>
     </div>

     
             ` 

             //evento carrito 

document.querySelector(".irCarrito").addEventListener("click",() => {
    const favoritesString = localStorage.getItem("favorites") || "[]"
    const favorites = JSON.parse(favoritesString)
    toggleArrayItem(favorites,data)
    
    localStorage.setItem("favorites", JSON.stringify(favorites))
  })
 }

 // ====== Formula para sumar y restar cantidades
 const btnMas = document.getElementById('aumentar');
const btnMenos = document.getElementById('disminuir');
const inputCant = document.getElementById('cantidad');

btnMas.addEventListener('click', () =>{
 inputCant.value = parseInt(inputCant.value) + 1;
})
btnMenos.addEventListener('click', () =>{
 inputCant.value = parseInt(inputCant.value) - 1;
 if(inputCant.value <= 0){
     inputCant.value = 0;
 }

})
})

function toggleArrayItem(array, value) {
    const indice = array.findIndex(element => element.id === value.id);
    if (indice === -1)
        array.push(value);
    else
        array.splice(indice,1);
    }

    btncarr.addEventListener('click', () => {
        getCarrito();
    })
 
    // ------carrito
const carro = localStorage.getItem("favorites")
const carroFav = JSON.parse(carro)



const getCarrito = (carritofav) => {
    // let muestraCarrito = document.querySelector(".muestra_carrito");
    modalCar.innerHTML = "";
    carritofav.forEach( favorite => {
      const { id, img, precio, tipo} = favorite;
      let url;
      if (tipo === "descuento") {
         url = productos
      }else{
         url = productos2
      }

      modalCar.innerHTML += `
      <div class="col elementos">
      <a href="javascript:Detalle_carrito ('${url}/${id}');" class="enlace-detalle-elemento">
              <div class="card bg-dark text-white gradiente">
                  <img src="${img}" class="card-img" alt="...">
                  <div class="card-img-overlay">
                          <h5 class="card-title body2Bold">${tipo}</h5>
                          <p>Precio ${precio}</p>
                  </div>
              </div>
          </a>
      </div>

      `;
    });
  };
  
  
  const Detalle_carrito = async (url) => {
    let muestra_mascota_fav = document.querySelector(".carro");
    muestra_mascota_fav.innerHTML = "";
    const resp = await fetch(url);
    const data = await resp.json();
    const {
      id,
      imagen,
      nombre,
      precio,
      imagen1,
      imagen2,
    } = data;
    muestra_mascota_fav.innerHTML += `
    <div class="col mascotas-info">
    <a href="#" class="enlace-detalle-elemento"></a>

        <div class="card gradiente">     

        <div class="card-info" >
        <div id="Info1">
            <div id="Info2>
                <h1 class="card-text body2Bold">${nombre}</h1>
                <p class="card-text body2Regular">${precio}</p>
                <button id="carrito"><img id="imgCarrito" src="https://res.cloudinary.com/dvh5dsa7s/image/upload/v1638032117/APP_Principe_Fresco/CarIcon_pkayar.png" alt="" width="30" height="30"> 
                </div>
          </div>
          <div>                 
           <img src="${imagen}" class="card-img-info" alt="...">
           <img src="${imagen1}" class="card-img-info" alt="...">
           <img src="${imagen2}" class="card-img-info" alt="...">



          </div>
            



            </div>

        </div>
    </a>
</div>
    `;
}


getCarrito(carroFav)
