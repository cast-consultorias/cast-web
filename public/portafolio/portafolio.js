(function(){
  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hablan / Trabajan
  var bHabla = document.getElementById("ver-habla"), bTrabaja = document.getElementById("ver-trabaja");
  var lHabla = document.getElementById("lista-habla"), lTrabaja = document.getElementById("lista-trabaja");
  function verLista(trabaja){
    bHabla.setAttribute("aria-pressed", String(!trabaja));
    bTrabaja.setAttribute("aria-pressed", String(trabaja));
    lHabla.hidden = trabaja; lTrabaja.hidden = !trabaja;
  }
  bHabla.addEventListener("click", function(){ verLista(false); });
  bTrabaja.addEventListener("click", function(){ verLista(true); });

  // Planes: moneda y forma de pago
  var precios = {
    starter:      {COP:{mes:990000, anio:9900000},  USD:{mes:300,  anio:3000},  empleados:1},
    professional: {COP:{mes:2640000,anio:26400000}, USD:{mes:800,  anio:8000},  empleados:3},
    enterprise:   {COP:{mes:5940000,anio:59400000}, USD:{mes:1800, anio:18000}, empleados:7}
  };
  var moneda = "COP", pago = "mes";
  function fmt(v, m){
    return m === "COP" ? "$" + Math.round(v).toLocaleString("es-CO") : "US$" + Math.round(v).toLocaleString("es-CO");
  }
  function pintarPlanes(){
    document.querySelectorAll(".plan").forEach(function(el){
      var p = precios[el.getAttribute("data-plan")]; var v = p[moneda][pago];
      el.querySelector(".valor").textContent = fmt(v, moneda);
      el.querySelector(".por").textContent = (moneda === "COP" ? "COP" : "USD") + (pago === "mes" ? " al mes" : " al año");
      var porEmpleado = p[moneda].mes / p.empleados;
      el.querySelector(".detalle").textContent = pago === "anio"
        ? "Equivale a " + fmt(v / 12, moneda) + " al mes"
        : "Por empleado: " + fmt(porEmpleado, moneda);
    });
    document.getElementById("letra-menuda").textContent = moneda === "COP"
      ? "Precios vigentes a octubre de 2026. En Colombia la suscripción de software no causa IVA; la implementación y la consultoría se cotizan aparte, más IVA. Cada empleado virtual se configura con su Project Manager según el diagnóstico de su Blueprint Session™."
      : "Prices valid as of October 2026, for clients outside Colombia. Setup and consulting are quoted separately. Precios vigentes a octubre de 2026 para clientes fuera de Colombia; la implementación y la consultoría se cotizan aparte.";
  }
  document.querySelectorAll("[data-moneda]").forEach(function(b){
    b.addEventListener("click", function(){
      moneda = b.getAttribute("data-moneda");
      document.querySelectorAll("[data-moneda]").forEach(function(x){ x.setAttribute("aria-pressed", String(x === b)); });
      pintarPlanes();
    });
  });
  document.querySelectorAll("[data-pago]").forEach(function(b){
    b.addEventListener("click", function(){
      pago = b.getAttribute("data-pago");
      document.querySelectorAll("[data-pago]").forEach(function(x){ x.setAttribute("aria-pressed", String(x === b)); });
      pintarPlanes();
    });
  });

  // Copiar datos de contacto
  document.querySelectorAll(".copiar").forEach(function(b){
    b.addEventListener("click", function(){
      var el = document.getElementById(b.getAttribute("data-copiar")); var texto = el.textContent;
      function listo(){ b.textContent = "Copiado"; setTimeout(function(){ b.textContent = "Copiar"; }, 1600); }
      function seleccionar(){ var r = document.createRange(); r.selectNodeContents(el); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Seleccionado"; setTimeout(function(){ b.textContent = "Copiar"; }, 1600); }
      try { navigator.clipboard.writeText(texto).then(listo, seleccionar); } catch (e) { seleccionar(); }
    });
  });

  // La conversación se reproduce sola (la página arranca con todo visible).
  if (!reducir) {
    var chat = document.getElementById("chat");
    var msgs = Array.prototype.slice.call(chat.querySelectorAll(".msg"));
    var escribiendo = chat.querySelector(".escribiendo");
    var pausas = [700, 1500, 1300, 1500, 1500];
    function reproducir(){
      chat.classList.add("reproduciendo");
      msgs.forEach(function(m){ m.classList.remove("visto"); });
      var t = 400;
      msgs.forEach(function(m, i){
        var deElla = m.classList.contains("ella");
        if (deElla) {
          setTimeout(function(){ chat.appendChild(escribiendo); escribiendo.classList.add("activo"); }, t);
          t += 900;
        }
        setTimeout(function(){ escribiendo.classList.remove("activo"); m.classList.add("visto"); }, t);
        t += pausas[i] || 1200;
      });
      setTimeout(reproducir, t + 5000);
    }
    setTimeout(reproducir, 2500);
  }
})();
