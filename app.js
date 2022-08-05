// BOTNES DE NAV

const btnBalance = document.getElementById('btn-balance');
const btnCategorias = document.getElementById('btn-categorias');
const btnReportes = document.getElementById('btn-reportes');
const btnNuevaOperacion = document.getElementById('btn-operacion');

const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');
const reportes = document.getElementById('reportes');
const nuevaOperacion = document.getElementById('nueva-operacion');

btnBalance.addEventListener('click', () => {
    balance.classList.remove('oculto');
    categorias.classList.add('oculto');
    reportes.classList.add('oculto');
    nuevaOperacion.classList.add('oculto');
})

btnCategorias.addEventListener('click', () => {
    categorias.classList.remove('oculto');
    balance.classList.add('oculto');
    reportes.classList.add('oculto');
    nuevaOperacion.classList.add('oculto');

})

btnReportes.addEventListener('click', () => {
    reportes.classList.remove('oculto');
    balance.classList.add('oculto');
    categorias.classList.add('oculto');
    nuevaOperacion.classList.add('oculto');
})
////BOTON NUEVA OPERACION - seccion balance///

btnNuevaOperacion.addEventListener("click", () => {
    balance.classList.add('oculto');
    nuevaOperacion.classList.remove('oculto');
  });

//AGREGAR NUEVA OPERACION//

//arreglo de operaciones vacio donde se van a guardar los datos
// const operaciones = [];

let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

const verOperaciones = (arr) => {console.log(!arr.length)
    if(!arr.length){  
      document.getElementById('sin-operaciones').classList.remove('oculto')
      document.getElementById('con-operaciones').classList.add('oculto')
    } else {
      document.getElementById('sin-operaciones').classList.add('oculto')
      document.getElementById('con-operaciones').classList.remove('oculto')
    }
  } //funcion que nos sirve para que cuando generemos operaciones nos muestre los datos y sino la imagen incial
verOperaciones(operaciones);


//inputs para agregar operacion
const descripcionOperacion = document.getElementById('descripcion-operacion');
const montoOperacion = document.getElementById('monto-operacion');
const tipoOperacion = document.getElementById('tipo-operacion')
const categoriaNuevaOperacion = document.getElementById('categoria-nueva-operacion');
const fechaOperacion = document.getElementById('fecha-operacion');

const btnAgregarOperacion = document.getElementById('btn-agregar-operacion');
const btnCancelar = document.getElementById('btn-cancelar-operacion')

//boton agregar | toma los valores de cada input y manda el objeto nuevo al array operacion cada vez que damos click | 
//validacion de campo descripcion
btnAgregarOperacion.addEventListener('click', () => {
    if(descripcionOperacion.value.trim().length === 0){
        return
    }

//agregamos operaciones
    const crearOperaciones = { //nuevo objeto creado por usuario
        id: uuidv4(),
        descripcion: descripcionOperacion.value,
        monto: montoOperacion.value,
        tipo: tipoOperacion.value,
        categoria: categoriaNuevaOperacion.value,
        fecha: fechaOperacion.value,   
    }
    operaciones.push(crearOperaciones)// con cada click en agregar se hace un push al array de operaciones y se muestra en la vista "con operaciones"
    balance.classList.remove('oculto');
    nuevaOperacion.classList.add('oculto');
    //una vez que volvemos a la pantalla balance limpiamos los valores de los inputs para poder agregar otra operacion
    descripcionOperacion.value = ''
    montoOperacion.value = 0
    tipoOperacion.value = 'gasto'
    categoriaNuevaOperacion.value = 'seleccionar'
    // fechaOperacion.value = new Date()
    verOperaciones(operaciones); //al tener operaciones hechas nos quita la imagen principal y nos muestra los datos que ingresamos.

    localStorage.setItem('operaciones', JSON.stringify(operaciones));

    imprimirOperaciones(operaciones);//va transcribir los datos en la pantalla dentro de las respectivas columnas. mandamos el arreglo de operaciones.
    // console.log(operaciones)
});


const imprimirOperaciones = arr => { //funcion que va escribiendo en el html las nuevas operaciones
    let str = '';
    arr.forEach((operacion) => {
        // console.log(operacion)
        const {id, descripcion, categoria, fecha, monto, tipo} = operacion;
        str = str + `
        <div class="col-12">
        <div id=${id} class = row aling-items-start" >
        <span class = "col"> ${descripcion}</span>
        <span class = "col"> ${categoria}</span>
        <span class = "col"> ${fecha}</span>
        <span class = "col ${tipo === 'ganancia'? 'green' : 'red'}"> ${monto}</span>
        <span class = "col">
            <a class="btn-editar" data-id= ${id} href="#">Editar</a>
            <a class="btn-eliminar" data-id=  ${id} href="#">Eliminar</a>
        </span>
        </div>
        </div>
        `    
    })
    document.getElementById('operaciones').innerHTML = str
}
imprimirOperaciones(operaciones); 

/////boton cancelar////

btnCancelar.addEventListener('click', () =>{
    balance.classList.remove('oculto');
    nuevaOperacion.classList.add('oculto')
})

const btnsEliminar = document.querySelectorAll('.btn-eliminar');
const btnsEditar = document.querySelectorAll('btn--editar');

btnsEliminar.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e);
    const operaciones = operaciones.filter(
      (operacion) => operacion.id !== e.target.dataset.id
      
    );












//BOTON OCULTAR FILTROS

const btnOcultarFiltros = document.getElementById('btn-ocultar-filtros');
const cajaFiltros = document.getElementById('caja-filtros');

btnOcultarFiltros.addEventListener('click', () => {
    cajaFiltros.classList.toggle('oculto')
});














const selectFiltros = document.getElementById('tipo-filtros')
