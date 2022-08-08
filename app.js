// BTN 
const btnBalance = document.getElementById('btn-balance');
const btnCategorias = document.getElementById('btn-categorias');
const btnReportes = document.getElementById('btn-reportes');
const btnNuevaOperacion = document.getElementById('btn-operacion');
const btnAgregarOperacion = document.getElementById('btn-agregar-operacion');
const btnCancelar = document.getElementById('btn-cancelar-operacion')



// CONST
const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');
const reportes = document.getElementById('reportes');
const nuevaOperacion = document.getElementById('nueva-operacion');
const descripcionOperacion = document.getElementById('descripcion-operacion');
const montoOperacion = document.getElementById('monto-operacion');
const tipoOperacion = document.getElementById('tipo-operacion')
const categoriaNuevaOperacion = document.getElementById('categoria-nueva-operacion');
const fechaOperacion = document.getElementById('fecha-operacion');



////////////////////////// HEADER ////////////////////////////////

// -------------------------------- BTN Balance --------------------------------
btnBalance.addEventListener('click', () => {
    balance.classList.remove('oculto');
    categorias.classList.add('oculto');
    reportes.classList.add('oculto');
    nuevaOperacion.classList.add('oculto');
})


// -------------------------------- BTN Categorías --------------------------------
btnCategorias.addEventListener('click', () => {
    categorias.classList.remove('oculto');
    balance.classList.add('oculto');
    reportes.classList.add('oculto');
    nuevaOperacion.classList.add('oculto');
})


// -------------------------------- BTN Reportes --------------------------------
btnReportes.addEventListener('click', () => {
    reportes.classList.remove('oculto');
    balance.classList.add('oculto');
    categorias.classList.add('oculto');
    nuevaOperacion.classList.add('oculto');
})



//////////////////////////////// SECTION BALANCE ////////////////////////////////

// -------------------------------- BTN Nueva Operación --------------------------------
////BOTON NUEVA OPERACION - seccion balance///
btnNuevaOperacion.addEventListener("click", () => {
    balance.classList.add('oculto');
    nuevaOperacion.classList.remove('oculto');
  });

//AGREGAR NUEVA OPERACION//

//arreglo de operaciones vacio donde se van a guardar los datos | se guardan en ls 

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




// -------------------------------- BTN Agregar Operación --------------------------------
//boton agregar | toma los valores de cada input y manda el objeto nuevo al array operacion cada vez que damos click
btnAgregarOperacion.addEventListener('click', (e) => {
    //VALIDAR!! trim no contempla los espacios vacios como un dato que se completa!! y no lo da como válido
    e.preventDefault()
    if(descripcionOperacion.value.trim().length == 0 || montoOperacion.value == 0 ){
        alertify.success('Todos los campos deben ser completados, y el monto mayor a 0');
        return
    }

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
    categoriaNuevaOperacion.value = 'todas'
    fechaOperacion.valueAsDate = new Date()
    verOperaciones(operaciones); //al tener operaciones hechas nos quita la imagen principal y nos muestra los datos que ingresamos.

    //guardar el arreglo en LS
    localStorage.setItem('operaciones', JSON.stringify(operaciones))

    imprimirOperaciones(operaciones)//va transcribir los datos en la pantalla dentro de las respectivas columnas. mandamos el arreglo de operaciones.
    // console.log(crearOperaciones.fecha)
    alertify.success('Operación agregada con éxito');
})

const imprimirOperaciones = arr => { //funcion que va escribiendo en el html las nuevas operaciones
    document.getElementById('operaciones').innerHTML = '' //para que elimine la ultima funcion - vista limpia
    let str = '';
    arr.forEach((operacion) => {
        // console.log(operacion)
        const {id, descripcion, categoria, fecha, monto, tipo} = operacion;
        str = str + `
        <div class="col-12">
            <div id=${id} class = "mi-flex row aling-items-start" >
                <span class = "col-3 font-size-item"> ${descripcion}</span>
                <span class = "col-3 font-size-item"> ${categoria}</span>
                <span class = "col-2 fecha"> ${fecha}</span>
                <span class = "col-2 font-size-item ${tipo == 'ganancia' ? 'green' : 'red'}"> $${monto}</span> 
                <span class = "col-2 font-size-item">
                    <a class="btn-editar" data-id= ${id} href="#">Editar</a>
                    <a class="btn-eliminar" data-id=  ${id} href="#">Eliminar</a>
                </span>
            </div>
        </div>
        `
        document.getElementById('operaciones').innerHTML = str;
    })
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach((btn) => {
        addEventListener('click', e => {
           const opEliminado = operaciones.filter(operacion => operacion.id !== e.target.dataset.id)
           localStorage.setItem('operaciones',JSON.stringify(opEliminado)) 
           operaciones = JSON.parse(localStorage.getItem('operaciones'));
           imprimirOperaciones(operaciones)
           verOperaciones(operaciones)
        //    alertify.success('Operación eliminada con éxito');
        })
    })
}




/////boton cancelar////

btnCancelar.addEventListener('click', () =>{
    balance.classList.remove('oculto');
    nuevaOperacion.classList.add('oculto')
})

///boton editar | eliminar operacion///
const btnEditar = document.querySelector('btn-editar');
const btnEliminar = document.querySelector('.btn-eliminar');






// -------------------------------- BTN Ocultar Filtros --------------------------------
//BOTON OCULTAR FILTROS
const btnOcultarFiltros = document.getElementById('btn-ocultar-filtros');
const cajaFiltros = document.getElementById('caja-filtros');

btnOcultarFiltros.addEventListener('click', () => {
    cajaFiltros.classList.toggle('oculto')
});


const selectFiltros = document.getElementById('tipo-filtros');

// -------------------------------- Input Fecha --------------------------------
////// FILTROS - FECHA ///// FUNCIONA!!! 

const inicializar = () => {
    const inputsFecha = document.querySelectorAll('input[type="date"]')
    inputsFecha.forEach( input => {
      input.valueAsDate = new Date()
    })

    verOperaciones(operaciones);
    imprimirOperaciones(operaciones);
    //agregar inicio de funcion nueva categoria para que se inicie al momento de abrir la pagina
}

window.onload = inicializar
