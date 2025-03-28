const productos = [];

export class Producto {
    precioTotal = 0;
    constructor(id, nombre, categoria, precio, unidadesDisponibles, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.unidadesDisponibles = unidadesDisponibles;
        this.descripcion = descripcion;
    }

    calcularPrecioTotal(unidades) {
        if(unidades <= this.unidadesDisponibles) {
            this.precioTotal = this.precio * unidades
            this.unidadesDisponibles = this.unidadesDisponibles - unidades;
        } else {
            alert('Error, las unidades que vas a comprar superan las que hay en el inventario, intenta con menos unidades.');
        }
    }

    getPrecioTotal() {
        return this.precioTotal
    }
    toString() {
        return `    Nombre:                     ${this.nombre}
    Descripcion:                ${this.descripcion}
    Categoría:                  ${this.categoria}
    Unidades Disponibles:       ${this.unidadesDisponibles}
    Precio Unitario:            ${this.precio}
            
`
    }
}

export function eliminarProducto(nombre) {
    let indiceProducto = productos.findIndex((producto) => producto.nombre === nombre);
    if (indiceProducto !== -1) {
        productos.splice(indiceProducto, 1);
        alert('Producto Eliminado de Manera Correcta.');
    } else {
        alert('Error no se encontró un producto con ese nombre. Verifique el nombre del producto o intente con otro.');
    }
}

export function agregarProducto(producto) {
    productos.push(producto);
}

export function mostrarProductos() {
    let impresion = ``;
    if(productos.length === 0) {
        return console.log('No hay productos en la lista')
    }
    productos.forEach((producto) => {
        impresion += producto.toString()
    });
    return impresion
}

export function buscarProducto(nombre) {
    let indiceProducto = productos.findIndex((producto) => producto.nombre === nombre);
    if (indiceProducto !== -1) {
        alert('Producto Encontrado.');
        return productos[indiceProducto].toString();
    } else {
        alert('Error no se encontró un producto con ese nombre. Verifique el nombre del producto o intente con otro.');
    }
}
export function precioFinal() {
    let precioFinal = 0;
    productos.forEach((producto) => {
        precioFinal += producto.getPrecioTotal();
    });
    return precioFinal;
}
export function getProducto(nombre) {
    let indiceProducto = productos.findIndex((producto) => producto.nombre === nombre);
    if (indiceProducto !== -1) {
        return productos[indiceProducto];
    } else {
        alert('Error no se encontró un producto con ese nombre. Verifique el nombre del producto o intente con otro.');
    }
}
