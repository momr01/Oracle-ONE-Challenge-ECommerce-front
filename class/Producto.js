export class Producto {
  url;
  categoria;
  nombre;
  precio;
  descripcion;
  id;

  constructor(id) {
    this.url = "";
    this.categoria = "";
    this.nombre = "";
    this.precio = "";
    this.descripcion = "";

    if (id) {
      this.id = id;
    } else {
      this.id = "";
    }
  }
}
