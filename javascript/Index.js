let id = 0;
let contador = 0;
let sumaAnchoProductos = 0;
let sumaAnchoCompra = 0;
let esPrimerCompra = true;
//Agregar producto
import {
    agregarProducto,
    buscarProducto,
    eliminarProducto, getProducto,
    mostrarProductos,
    precioFinal,
    Producto
} from "./Productos.js";

let seMuestra = false;
const precioCompra = document.getElementById('precioFinal');
const botonMostrar = document.getElementById('mostrar');
const botonBuscar = document.getElementById('buscar');
const productosTextArea = document.getElementById('listaProductos');
const compraTextArea = document.getElementById('productosComprados');
const formularioCliente = document.getElementById('formularioCliente');
const formularioProducto = document.getElementById('formularioProducto');
const botonEliminar = document.getElementById('eliminar');

// Función para generar IDs únicos
function generarID() {
    return id++;
}

//Agrega los productos.
formularioProducto.addEventListener('submit', (e) => {
    e.preventDefault();
    // Obtiene los valores del formulario
    const datos = Object.fromEntries(new FormData(formularioProducto));
    const producto = new Producto(generarID(), datos.nombreProducto, datos.categoria, parseFloat(datos.precio), parseInt(datos.unidades), datos.descripcion);
    agregarProducto(producto);
    alert('Se agrego de manera correcta el producto');
    agregarATextArea(producto, productosTextArea, sumaAnchoProductos);
});

//Elimina un producto
botonEliminar.addEventListener('click', () => {
    const nombreProducto = prompt('Nombre del Producto a Eliminar:');
    eliminarProducto(nombreProducto);
    actualizarTextAreaProductos();
});

// Buscar Compra
botonBuscar.addEventListener('click', (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(formularioProducto));
    buscarProducto(datos.nombreProducto);
    actualizarTextAreaProductos();
})
// Mostrar Productos
botonMostrar.addEventListener('click', (e) => {
    e.preventDefault();
    productosTextArea.style.display = 'block';
    productosTextArea.value = mostrarProductos();
    seMuestra = true;
});
// Precio Final
formularioCliente.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(formularioCliente));
    const producto = getProducto(datos.nombreCompra);
    if (producto) {
        producto.calcularPrecioTotal(parseInt(datos.unidadesC));
        const precioTotal = precioFinal();
        if(esPrimerCompra) {
            alert('Producto comprado correctamente');
            precioCompra.style.height = '48px';
            precioCompra.value += precioTotal;
        }
        agregarATextArea(producto, compraTextArea, sumaAnchoCompra);
        actualizarTextAreaProductos();
    }
})

// Actualiza el la lista en caso de que haya algun cambio
function actualizarTextAreaProductos() {
    productosTextArea.value = mostrarProductos();
}

function agregarATextArea(producto, textArea, sumaAncho) {
    textArea.value += producto.toString();
    textArea.style.height = 'auto'; // Resetea primero
    textArea.style.height = (textArea.scrollHeight) + 'px';
}
