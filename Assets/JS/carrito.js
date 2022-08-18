class Carrito {
  constructor(nombre = "Usuario", total = 0) {
    this.nombre = nombre;
    this.total = total;
    this.productos = [];
  }

  agregarItem(libros) {
    if (libros.hayStock()) {
      if (this.productos[libros.id] == undefined) {
        this.productos[libros.id] = libros;
      }
      this.productos[libros.id].cant++;
      Toastify({
        text: "Agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #46dbdd , #42d99a)", 
        },
      }).showToast();
    } else {
      Toastify({
        text: "No hay mas en stock! :(",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #0093E9 , #80D0C7)", 
        },
      }).showToast();
    }
    actualizar();
  }

  precioProducto() {
    let totalP = 0;
    for (let producto of this.productos) {
      if (producto != undefined) {
        totalP += producto.precio * producto.cant;
      }
    }
    this.total = totalP;
    return totalP;
  }

  vaciarCarrito(libros) {
    this.productos = [];
    this.total = 0;
    libros.reset();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Carrito vaciado',
      showConfirmButton: false,
      timer: 1500
    })
    actualizar();
  }
}
