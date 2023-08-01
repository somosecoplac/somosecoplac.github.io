const burger = document.querySelector('.header-container .nav-bar .nav-list .burger');
const mobileMenu = document.getElementById('menu');
const header = document.querySelector('.header-container')

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

let lastScrollTop = 0;
navbar = document.getElementById('header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.style.top = "-80px";
        navbar.style.transition = ".3s ease";
    }
    else {
        navbar.style.top = "0";
        header.style.backgroundColor = "#023047";
        navbar.style.transition = ".3s ease";
        navbar.style.opacity = "85%";
    }
    if (scrollTop == 0) {
        header.style.backgroundColor = "transparent";
    }
    lastScrollTop = scrollTop;
})

let precioXEnvio = 0;

// SECCION COMPRA PRODUCTOS //

const calcularPrecioXEnvio = () => {
    let codigoPostal = document.getElementById("inputCodP").value;

    if (codigoPostal == "") {
        precioXEnvio = 0;
    }
    else if (codigoPostal >= 1700 && codigoPostal < 1800) {
        precioXEnvio = 1000;
    }
    else if (codigoPostal >= 1800 && codigoPostal < 1900) {
        precioXEnvio = 1100;
    }
    else if (codigoPostal >= 1900 && codigoPostal < 2000) {
        precioXEnvio = 1200;
    }

    console.log("precio envio: " + precioXEnvio);

    document.getElementById("costoEnvio").innerHTML = "Costo envío: " + "<strong>" + precioXEnvio + "</strong>";
    return precioXEnvio;
}

const calcularPrecioFinal = () => {

    // variables input
    let espesor = document.getElementById("espesorSelector").value;
    let unidades = document.getElementById('cantUnidades').value;



    // variables precios
    let precioXEspesor = 0;
    let precioXUnidad = 0;
    let precioFinal = 0;

    // precio por espesor
    switch (espesor) {
        case "10mm":
            precioXEspesor = 2682.0;
            break;
        case "12mm":
            precioXEspesor = 3090;
            break;
        case "15mm":
            precioXEspesor = 3691.8;
            break;
        case "18mm":
            precioXEspesor = 4316.5;
            break;
        case "22mm":
            precioXEspesor = 5758.5;
            break;
    }

    precioFinal = (precioXEspesor * unidades).toFixed(2);

    document.getElementById("precioFinal").value = "$" + precioFinal;

    return precioXEspesor;
}




let carrito = [];

const añadirCompra = (ev) => {
    let espesor = document.getElementById("espesorSelector").value;
    let unidades = document.getElementById('cantUnidades').value;
    let precioEspesor = calcularPrecioFinal();
    precioXEnvio = calcularPrecioXEnvio();

    ev.preventDefault;
    let compra = {
        espesor: espesor,
        unidades: unidades,
        monto: (precioEspesor * unidades)
    }

    carrito.push(compra);
    document.forms[0].reset();

    console.warn('compra añadida', { carrito });
    console.log({ carrito });

    let precioCompraTotal = 0;
    let numeroDeRecibo = Math.floor(Math.random() * 10000);

    console.log("nroRecibo: " + numeroDeRecibo + '\n');


    let html = "<table class='table'>";

    html += "<thead>";
    html += "<tr>";
    html += "<th>" + 'Espesor' + "</th>";
    html += "<th>" + 'Unidades' + "</th>";
    html += "<th>" + 'Monto' + "</th>";
    html += "</tr>";
    html += "</thead>";


    for (let i = 0; i < carrito.length; i++) {
        precioCompraTotal = (precioCompraTotal + carrito[i].monto);

        html += "<tr>";
        html += "<td>" + carrito[i].espesor + "</td>";
        html += "<td>" + carrito[i].unidades + "</td>";
        html += "<td>" + carrito[i].monto.toFixed(2) + "</td>";
        html += "</tr>";
    }
    precioCompraTotal = (precioCompraTotal + precioXEnvio).toFixed(2);

    html += "</table>";
    document.getElementById("montoFinal").innerHTML = "Monto total: " + "<strong>" + precioCompraTotal + "</strong>";
    
    document.getElementById("tabla").innerHTML = html;

    return precioCompraTotal;
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-compra').addEventListener('click', añadirCompra);
});






const confirmacionDeCompra = () => 
{
    alert("Compra confirmada! " + "Gracias por elegirnos");
}



