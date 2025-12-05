let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">S/${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">S/${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

// ✅ FUNCIÓN CARRUSEL DE TARJETAS - TEXTO CENTRADO Y AJUSTE DE POSICIÓN
function cargarSobreNosotros() {
    contenedorProductos.innerHTML = `
        <div style="
            max-width: 600px;
            margin: 0 auto;
            margin-left: 80px;
            position: relative;
            padding: 1rem 0 3rem 0;
        ">
            <!-- Contenedor de tarjetas -->
            <div id="carrusel-container" style="
                overflow: hidden;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            ">
                <div id="carrusel-tarjetas" style="
                    display: flex;
                    transition: transform 0.5s ease-in-out;
                ">
                    <!-- Tarjeta 1 -->
                    <div style="
                        min-width: 100%;
                        background: linear-gradient(135deg, #441f46ff 0%, #764ba2 100%);
                        padding: 3rem 2rem;
                        color: white;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    ">
                        <h3 style="font-size: 2rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">
                            ¿Quiénes Somos?
                        </h3>
                        <p style="font-size: 1.1rem; line-height: 1.6; max-width: 500px;">
                            Ecospark es una empresa comprometida con la moda sostenible y el cuidado del medio ambiente.
                        </p>
                    </div>

                    <!-- Tarjeta 2 -->
                    <div style="
                        min-width: 100%;
                        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                        padding: 3rem 2rem;
                        color: white;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    ">
                        <h3 style="font-size: 2rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">
                            🎯 Nuestra Misión
                        </h3>
                        <p style="font-size: 1.1rem; line-height: 1.6; max-width: 500px;">
                            Ofrecer productos de calidad elaborados con materiales reciclados y procesos eco-amigables.
                        </p>
                    </div>

                    <!-- Tarjeta 3 -->
                    <div style="
                        min-width: 100%;
                        background: linear-gradient(135deg, #f857a6 0%, #ff5858 100%);
                        padding: 3rem 2rem;
                        color: white;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    ">
                        <h3 style="font-size: 2rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">
                            💎 Nuestros Valores
                        </h3>
                        <div style="font-size: 1.1rem; line-height: 2;">
                            <div>🌱 Sostenibilidad</div>
                            <div>♻️ Reciclaje</div>
                            <div>💚 Compromiso ambiental</div>
                            <div>✨ Calidad y diseño</div>
                        </div>
                    </div>

                    <!-- Tarjeta 4 -->
                    <div style="
                        min-width: 100%;
                        background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
                        padding: 3rem 2rem;
                        color: white;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    ">
                        <h3 style="font-size: 2rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">
                            📞 Contáctanos
                        </h3>
                        <div>
                            <p style="font-size: 1.1rem; margin: 1rem 0;">
                                📧 canaldeapoyo@ecospark.com
                            </p>
                            <p style="font-size: 1.1rem; margin: 1rem 0;">
                                📱 +51 941 234 462
                            </p>
                        </div>
                    </div>

                    <!-- Tarjeta 5 - EQUIPO -->
                    <div style="
                        min-width: 100%;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 2.5rem 2rem;
                        color: white;
                        text-align: center;
                    ">
                        <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">
                            👥 Grupo 09
                        </h3>
                        <p style="font-size: 0.9rem; margin-bottom: 1.5rem; opacity: 0.9;">
                            Introducción a las TIC
                        </p>
                        <div style="
                            background: rgba(255, 255, 255, 0.1);
                            padding: 1.5rem;
                            border-radius: 15px;
                            backdrop-filter: blur(10px);
                        ">
                            <div style="font-size: 1rem; line-height: 2; text-align: left;">
                                <div style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                                    👤 Fabrizio Daniel Vilca Pariona
                                </div>
                                <div style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                                    👤 José Rodrigo Allain Malquichagua
                                </div>
                                <div style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                                    👤 Christopher J. Vergara Prado
                                </div>
                                <div style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                                    👤 Axel Leandro Villanueva Lora
                                </div>
                                <div style="padding: 0.5rem 0;">
                                    👤 Cristian Carlos Baldeon Gora
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Botón Anterior -->
            <button id="btn-anterior" style="
                position: absolute;
                left: -60px;
                top: 45%;
                transform: translateY(-50%);
                background: rgba(102, 126, 234, 0.9);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                transition: all 0.3s;
            " onmouseover="this.style.background='rgba(102, 126, 234, 1)'; this.style.transform='translateY(-50%) scale(1.1)'" 
               onmouseout="this.style.background='rgba(102, 126, 234, 0.9)'; this.style.transform='translateY(-50%) scale(1)'">
                ‹
            </button>

            <!-- Botón Siguiente -->
            <button id="btn-siguiente" style="
                position: absolute;
                right: -60px;
                top: 45%;
                transform: translateY(-50%);
                background: rgba(102, 126, 234, 0.9);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                transition: all 0.3s;
            " onmouseover="this.style.background='rgba(102, 126, 234, 1)'; this.style.transform='translateY(-50%) scale(1.1)'" 
               onmouseout="this.style.background='rgba(102, 126, 234, 0.9)'; this.style.transform='translateY(-50%) scale(1)'">
                ›
            </button>

            <!-- Indicadores -->
            <div id="indicadores" style="
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin-top: 1.5rem;
            ">
                <span class="indicador" style="
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #667eea;
                    cursor: pointer;
                    transition: all 0.3s;
                "></span>
                <span class="indicador" style="
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(102, 126, 234, 0.3);
                    cursor: pointer;
                    transition: all 0.3s;
                "></span>
                <span class="indicador" style="
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(102, 126, 234, 0.3);
                    cursor: pointer;
                    transition: all 0.3s;
                "></span>
                <span class="indicador" style="
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(102, 126, 234, 0.3);
                    cursor: pointer;
                    transition: all 0.3s;
                "></span>
                <span class="indicador" style="
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(102, 126, 234, 0.3);
                    cursor: pointer;
                    transition: all 0.3s;
                "></span>
            </div>
        </div>
    `;

    // Lógica del carrusel con autoplay
    let indiceActual = 0;
    const totalTarjetas = 5;
    const carruselTarjetas = document.getElementById('carrusel-tarjetas');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const indicadores = document.querySelectorAll('.indicador');
    let intervalo;

    function actualizarCarrusel() {
        carruselTarjetas.style.transform = `translateX(-${indiceActual * 100}%)`;
        
        indicadores.forEach((indicador, index) => {
            if (index === indiceActual) {
                indicador.style.background = '#667eea';
                indicador.style.transform = 'scale(1.2)';
            } else {
                indicador.style.background = 'rgba(6, 14, 51, 0.3)';
                indicador.style.transform = 'scale(1)';
            }
        });
    }

    function siguienteSlide() {
        indiceActual = (indiceActual + 1) % totalTarjetas;
        actualizarCarrusel();
    }

    function anteriorSlide() {
        indiceActual = (indiceActual - 1 + totalTarjetas) % totalTarjetas;
        actualizarCarrusel();
    }

    function iniciarAutoplay() {
        intervalo = setInterval(siguienteSlide, 4000);
    }

    function detenerAutoplay() {
        clearInterval(intervalo);
    }

    iniciarAutoplay();

    const contenedor = document.getElementById('carrusel-container');
    contenedor.addEventListener('mouseenter', detenerAutoplay);
    contenedor.addEventListener('mouseleave', iniciarAutoplay);

    btnSiguiente.addEventListener('click', () => {
        detenerAutoplay();
        siguienteSlide();
        iniciarAutoplay();
    });

    btnAnterior.addEventListener('click', () => {
        detenerAutoplay();
        anteriorSlide();
        iniciarAutoplay();
    });

    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            detenerAutoplay();
            indiceActual = index;
            actualizarCarrusel();
            iniciarAutoplay();
        });
    });
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        // ✅ AGREGA ESTA CONDICIÓN
        if (e.currentTarget.id === "sobre-nosotros") {
            tituloPrincipal.innerText = "Nuestra Historia";
            cargarSobreNosotros();
        } else if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Stock Disponible";
            cargarProductos(productos);
        }

    })

});
