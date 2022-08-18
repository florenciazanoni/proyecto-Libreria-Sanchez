//SIMULADOR DE COMPRAS

//ELEMENTOS DOM
let total = document.querySelector(".total");
let botones = document.getElementsByClassName("comprar");
let temp = document.querySelector("template");
let caja = temp.content.querySelector("div");
let claseCajas = document.querySelector("section#caja");
const sesion = document.querySelector('#sesion');
let vaciarCarrito = document.querySelector(".vaciar")

//VARIABLES DECLARADAS
let carrito;
let envio = 1000;
let valorIVA = 0.21;
let totalCarrito;
let carritoSS;


//Añado los productos
/* const libros = JSON.stringify(localStorage.getItem("libros")); */

const libros = [];

const pedirDatos = async () => {
  const respuesta = await fetch("./Assets/JSON/data.json")
  const datos = await respuesta.json();
  datos["libros"].forEach((libro) =>{
    const libroAux = new Libro(libro.nombre, libro.autor, libro.precio, libro.id, libro.stock);
    libros.push(libroAux);
  })


}



const renderizar = async () => {
  
  await pedirDatos();
  //Clono elementos del template para crear los contenedores de los productos
  for (let libro of libros) {
    let clonado = caja.cloneNode(caja, true);
  
    clonado.children[0].innerText = libro.nombre;
    clonado.children[1].innerText = libro.autor;
    clonado.children[2].innerText = "$" + libro.precio;
  
  
    claseCajas.appendChild(clonado);
  }

//INICIO DEL CODIGO
sessionStorage.carrito == undefined ? 
    (carrito = new Carrito())
  : ((carritoSS = JSON.parse(sessionStorage.carrito)),
    (carrito = new Carrito(
      carritoSS.nombre,
      carritoSS.total,
      carritoSS.productos
    )),
    actualizar());

  //Agregar item al carrito
for (let i = 0; i < libros.length; i++) {
  botones[i].onclick =  () => {
    carrito.agregarItem(libros[i]);
  };
}
//Vaciar carrito
for (let i = 0; i < libros.length; i++) {
  vaciarCarrito.addEventListener('click', () => {
  carrito.vaciarCarrito(libros[i]);

}) 
}

}

renderizar()

//Suscripcion
sesion.addEventListener('click', async(event) => {
  event.preventDefault();
  const templateId = 'template_rb2jo3q';
  
  //Sweet alert para suscribirse 
  const { value: formValues } = await Swal.fire({
    title: 'Suscribite a nuestra lista de correos',
    html:
    '<input id="user_name" placeholder="Nombre" class="swal2-input">' +
    '<input id="user_email" placeholder="Email" class="swal2-input">',
  })

  if (formValues) {
    emailjs.send('service_ydyyn12', templateId, {
      to_name:document.getElementById('user_name').value,
      to_email:document.getElementById('user_email').value,
      from_name: 'Buena Tinta'}) 
      .then(function(response){
        console.log('Email enviado correctamente', response.status, response.text);
      }, function(error){
        console.log('Hubo un error: ' + error);
      }) 
    }})



//FUNCIONES
function precioFinal(precioProducto) {
  return (totalCarrito = precioProducto + precioProducto * valorIVA + envio);
}

function actualizar() {
  total.textContent = `Total con envio: $${precioFinal(carrito.precioProducto())}`;
  sessionStorage.carrito = JSON.stringify(carrito);
}
  //Inicializar SDK con key publica
  (function() {
    emailjs.init('aDJONqzd90Yz1wxUk');
  })();