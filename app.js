    const Championes = [
        {id: 1, producto:"Nike AirMax", precio: 5490, imagen: 'Nike-logo.jpg'},
        {id: 2, producto:"Adidas Coreracer", precio: 4290, imagen: 'historia-origen-marcas-adidas.jpg'},
        {id: 3, producto:"Puma Xray Deportivo", precio: 4990, imagen: 'PUMA-logo.jpg'},
        {id: 4, producto:"Reebok Triplehall", precio: 2880, imagen: 'Reebok.jpg'},
        {id: 5, producto:"New Balance Lifestyle", precio: 3990, imagen: 'New-Balance-logo.jpg'},
        {id: 5, producto:"York Umbro", precio: 4150, imagen: 'New-Balance-logo.jpeg'},
    ]

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const botonComprar = document.querySelector('#boton-comprar');
    const formulario = document.querySelector('container') 
    botonComprar.onclick = function() {
        alert("Tu Compra Ha Sido Realizada Exitosamente")
    };
    
    
   
    function renderizarProductos() {
        Championes.forEach((info) => {
            const Clase = document.createElement('div');
            Clase.classList.add('card', 'col-sm-4');
            const CardBody = document.createElement('div');
            CardBody.classList.add('card-body');
            const Titulo = document.createElement('h5');
            Titulo.classList.add('card-title');
            Titulo.textContent = info.nombre;
            const Imagen = document.createElement('img');
            Imagen.classList.add('img-fluid');
            Imagen.setAttribute('src', info.imagen);
            const Precio = document.createElement('p');
            Precio.classList.add('card-text');
            Precio.textContent = `${info.precio}${divisa}`;
            const Boton = document.createElement('button');
            Boton.classList.add('btn', 'btn-primary');
            Boton.textContent = 'Agregar Al Carrito';
            Boton.setAttribute('marcador', info.id);
            Boton.addEventListener('click', anyadirProductoAlCarrito);
            CardBody.appendChild(Imagen);
            CardBody.appendChild(Titulo);
            CardBody.appendChild(Precio);
            CardBody.appendChild(Boton);
            Clase.appendChild(CardBody);
            DOMitems.appendChild(Clase);
        });
    }
    

    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
    
    }

    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = Championes.filter((itemChampiones) => {
                return itemChampiones.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const Clase = document.createElement('li');
            Clase.classList.add('list-group-item', 'text-right', 'mx-2');
            Clase.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', comprarItemCarrito);
           
            Clase.appendChild(miBoton);
            DOMcarrito.appendChild(Clase);
        });
        DOMtotal.textContent = calcularTotal();
    }
    
    function comprarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
    }
    
    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = Championes.filter((itemChampiones) => {
                return itemChampiones.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }
    
    function comprarCarrito() {
        carrito = [];
        renderizarCarrito();
    }
    
    botonComprar.addEventListener('click', comprarCarrito);
    
    renderizarProductos();
    renderizarCarrito();

console.log ( new Date() )
