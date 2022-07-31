// BOTNES DE NAV

const btnBalance = document.getElementById('btn-balance');
const btnCategorias = document.getElementById('btn-categorias');
const btnReportes = document.getElementById('btn-reportes');

const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');
const reportes = document.getElementById('reportes');

btnBalance.addEventListener('click', () => {
    balance.classList.remove('oculto');
    categorias.classList.add('oculto');
    reportes.classList.add('oculto');
})

btnCategorias.addEventListener('click', () => {
    categorias.classList.remove('oculto');
    balance.classList.add('oculto');
    reportes.classList.add('oculto');
})

btnReportes.addEventListener('click', () => {
    reportes.classList.remove('oculto');
    balance.classList.add('oculto');
    categorias.classList.add('oculto');
})

//BOTON OCULTAR FILTROS

const btnOcultarFiltros = document.getElementById('btn-ocultar-filtros');
const cajaFiltros = document.getElementById('caja-filtros');

btnOcultarFiltros.addEventListener('click', () => {
    cajaFiltros.classList.toggle('oculto')
});

////BOTON NUEVA OPERACION///

const btnNuevaOperacion = document.getElementById('btn-operacion');
const nuevaOperacion = document.getElementById('nueva-operacion');

btnNuevaOperacion.addEventListener("click", () => {
    balance.classList.add('oculto');
    nuevaOperacion.classList.remove('oculto');
    categorias.classList.add('oculto');
   
   
    reportes.classList.add('oculto');
  });













const selectFiltros = document.getElementById('tipo-filtros');
