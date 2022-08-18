class Libro {
  constructor(nombre, autor, precio, id, stock, cant = 0) {
    this.nombre = nombre;
    this.autor = autor;
    this.precio = precio;
    this.id = id;
    this.stock = stock;
    this.cant = cant;
  }
  hayStock() {
    if (this.stock > 0) {
      this.stock--;
      return true;
    }
  }
  reset(){
    this.stock = this.cant;
    this.cant = 0; 
  }
}
