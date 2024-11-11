/**
* Template Name: EstateAgency - v4.8.0
* Template URL: https://bootstrapmade.com/real-estate-agency-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .navbar-reduce
   */
  let selectHNavbar = select('.navbar-default')
  if (selectHNavbar) {
    onscroll(document, () => {
      if (window.scrollY > 100) {
        selectHNavbar.classList.add('navbar-reduce')
        selectHNavbar.classList.remove('navbar-trans')
      } else {
        selectHNavbar.classList.remove('navbar-reduce')
        selectHNavbar.classList.add('navbar-trans')
      }
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Search window open/close
   */
  let body = select('body');
  on('click', '.navbar-toggle-box', function(e) {
    e.preventDefault()
    body.classList.add('box-collapse-open')
    body.classList.remove('box-collapse-closed')
  })

  on('click', '.close-box-collapse', function(e) {
    e.preventDefault()
    body.classList.remove('box-collapse-open')
    body.classList.add('box-collapse-closed')
  })

  /**
   * Intro Carousel
   */
  new Swiper('.intro-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property carousel
   */
  new Swiper('#property-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.propery-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * News carousel
   */
  new Swiper('#news-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.news-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonial carousel
   */
  new Swiper('#testimonial-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.testimonial-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property Single carousel
   */
  new Swiper('#property-single-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.property-single-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()

function interes(tasaMensual, mes, pagoMensual, montoSolicitado){

  var vInteres = 0;
  var amortiza = montoSolicitado;

  for(var i = 1; i <= mes; i++){
    vInteres = (amortiza * (tasaMensual / 100));
    amortiza = amortiza - (pagoMensual - vInteres);
  }
  return vInteres;
}

function calcularSalarioMinimo(pagoMensual) {
  return (pagoMensual / 0.40).toFixed(2);
}

function verificarSalario(salarioNeto, salarioMinimo) {
  const mensajeSalario = document.getElementById("mensajeSalario");
  if (salarioNeto >= salarioMinimo) {
      mensajeSalario.textContent = "Monto de salario suficiente para el crédito";
      mensajeSalario.classList.add("text-success");
      mensajeSalario.classList.remove("text-danger");
  } else {
      mensajeSalario.textContent = "Monto de salario insuficiente";
      mensajeSalario.classList.add("text-danger");
      mensajeSalario.classList.remove("text-success");
  }
}

function verificarEdad(fechaNacimiento) {
  const edad = new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();
  const mensajeEdad = document.getElementById("mensajeEdad");
  if (edad > 22 && edad < 55) {
      mensajeEdad.textContent = "Cliente con edad suficiente para crédito";
      mensajeEdad.classList.add("text-success");
      mensajeEdad.classList.remove("text-danger");
  } else {
      mensajeEdad.textContent = "Cliente no califica para crédito por edad";
      mensajeEdad.classList.add("text-danger");
      mensajeEdad.classList.remove("text-success");
  }
}

function calcularPorcentajeFinanciar(montoSolicitado, valorVivienda) {
  return ((montoSolicitado / valorVivienda) * 100).toFixed(2) + "%";
}

function guardarDatosLocalStorage(datos) {
  localStorage.setItem("datosCredito", JSON.stringify(datos));
}

function cargarDatosLocalStorage() {
  const datos = JSON.parse(localStorage.getItem("datosCredito"));
  if (datos) {
      document.getElementById("montoSolicitado").value = datos.montoSolicitado;
      document.getElementById("tasaInteresM").value = datos.tasaInteresM;
      document.getElementById("plazoMeses").value = datos.plazoMeses;
      document.getElementById("salarioNeto").value = datos.salarioNeto;
      document.getElementById("fechaNacimiento").value = datos.fechaNacimiento;
      document.getElementById("valorVivienda").value = datos.valorVivienda;
  }
}



function iniciarCalculos() {
  const correo = document.getElementById("email").value;
  const nombre = document.getElementById("nombre").value;
  const montoSolicitado = parseFloat(document.getElementById("montoSolicitar").value);
  const tasaInteresM = parseFloat(document.getElementById("tasaInteres").value);
  const plazoAnnos = parseInt(document.getElementById("plazo").value);
  const plazoMeses = plazoAnnos * 12;
  const salarioNeto = parseFloat(document.getElementById("salario").value);
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const valorVivienda = parseFloat(document.getElementById("valorVivienda").value);

  const pagoMensual = calcular(montoSolicitado, tasaInteresM, plazoMeses).toFixed(2);
  const salarioMinimo = calcularSalarioMinimo(pagoMensual);

  verificarSalario(salarioNeto, salarioMinimo);
  verificarEdad(fechaNacimiento);

  const porcentajeFinanciar = calcularPorcentajeFinanciar(montoSolicitado, valorVivienda);

  const datos = {
      montoSolicitado,
      tasaInteresM,
      plazoMeses,
      salarioNeto,
      fechaNacimiento,
      valorVivienda
  };
  guardarDatosLocalStorage(datos);
  llenarTablaCredito(correo, nombre, fechaNacimiento, salarioNeto, valorVivienda, montoSolicitado, plazoAnnos,
    tasaInteresM, pagoMensual, salarioMinimo, porcentajeFinanciar
  )
}

function calcular(MontoSolicitado, TasaInteresM, PlazoMeses) {
  const tasaMensual = TasaInteresM / 100;

  const numerador = MontoSolicitado * tasaMensual * Math.pow(1 + tasaMensual, PlazoMeses);
  const denominador = Math.pow(1 + tasaMensual, PlazoMeses) - 1;

  return numerador / denominador;
}

function CrearElemento(titulo, dato){
  let NuevoElemento = document.createElement("div");
  NuevoElemento.className = "m-3 col-12 col-sm-4 col-md-3 col-lg-4 col-xl-2";
  NuevoElemento.innerHTML = `
  <div class="d-flex flex-column justify-content-center px-3"
   style="background-color: #240d8c; min-height: 230px; boder: solid;">
  <h6 class="text-light text-center">${titulo}</h5>
  <h5 id="valor_salida" class="text-light fw-bold fs-2 text-center"></h6>
  <i class="fas fa-arrow-right text-light mt-4"></i>
  <a class="stretched-link" href="#!"></a>
  </div> 
  `;
  /* altgr + }  ` */
}

function llenarTablaCredito(correo, nombre, fechaNacimiento, salarioNeto, valorVivienda, montoSolicitado, plazoAnos, 
  tasaInteres, cuota, ingresoNetoRequerido, porcentajeFinanciar) {
  document.getElementById("celdaCorreo").textContent = correo;
  document.getElementById("celdaNombre").textContent = nombre;
  document.getElementById("celdaFechaNacimiento").textContent = fechaNacimiento;
  document.getElementById("celdaSalarioNeto").textContent = salarioNeto;
  document.getElementById("celdaValorVivienda").textContent = valorVivienda;
  document.getElementById("celdaMontoSolicitado").textContent = montoSolicitado;
  document.getElementById("celdaPlazoAnos").textContent = plazoAnos;
  document.getElementById("celdaTasaInteres").textContent = tasaInteres;
  document.getElementById("celdaCuota").textContent = cuota;
  document.getElementById("celdaIngresoNetoRequerido").textContent = ingresoNetoRequerido;
  document.getElementById("celdaPorcentajeFinanciar").textContent = porcentajeFinanciar;
  
}

function calcularPagoMensual(monto, tasaMensual, plazoMeses) {
  const tasaDecimal = tasaMensual / 100;
  return (monto * tasaDecimal) / (1 - Math.pow(1 + tasaDecimal, -plazoMeses));
}

function mostrarProyeccion() {
  const montoSolicitado = parseFloat(document.getElementById("celdaMontoSolicitado").value);
  const tasaInteresAnual = parseFloat(document.getElementById("celdaTasaInteres").value);
  const plazoEnAnnos = parseInt(document.getElementById("celdaPlazoAnos").value);

  const plazoEnMeses = plazoEnAnnos * 12;
  const tasaInteresMensual = tasaInteresAnual / 12;
  
  const pagoMensual = calcular(montoSolicitado, tasaInteresMensual, plazoEnMeses);

  let tablaHTML = `<table class="table table-bordered">
                     <caption>Crédito Happy Eart Proyección de crédito</caption>
                     <thead>
                       <tr>
                         <th>Mes</th>
                         <th>Pago Mensual</th>
                         <th>Interés</th>
                         <th>Amortización</th>
                         <th>Saldo</th>
                       </tr>
                     </thead>
                     <tbody>`;

  let saldo = montoSolicitado;

  for (let mes = 1; mes <= plazoEnMeses; mes++) {
    const interesMensual = interes(tasaInteresMensual, mes, pagoMensual, saldo);
    const amortizacion = pagoMensual - interesMensual;
    saldo -= amortizacion;

    tablaHTML += `<tr>
                    <td>${mes}</td>
                    <td>${pagoMensual.toFixed(2)}</td>
                    <td>${interesMensual.toFixed(2)}</td>
                    <td>${amortizacion.toFixed(2)}</td>
                    <td>${saldo.toFixed(2)}</td>
                  </tr>`;
  }

  tablaHTML += `</tbody></table>`;
  document.getElementById("proyeccion").innerHTML = tablaHTML;
}