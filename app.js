// BTN
const btnBalance = document.getElementById('btn-balance');
const btnCategorias = document.getElementById('btn-categorias');
const btnReportes = document.getElementById('btn-reportes');
const btnNuevaOperacion = document.getElementById('btn-operacion');
const btnAgregarOperacion = document.getElementById('btn-agregar-operacion');
const btnCancelar = document.getElementById('btn-cancelar-operacion');
const btnAgregarOperacionEditada = document.getElementById('btn-editar-operacion');
const btnCancelarEdicion = document.getElementById('btn-editar-cancelar-operacion');

const btnOcultarFiltros = document.getElementById('btn-ocultar-filtros');

//  SECCIONES
const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');
const reportes = document.getElementById('reportes');

//BALANCE
// const montoGanancias = document.getElementById('monto-ganancias');
// const montoGastos = document.getElementById('monto-gastos');
// const montoTotal = document.getElementById('monto-total');

//  OPERACIONES
// let operaciones = [] //deje este array comun para usar mientras no me funciona el local storage
let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
const obtenerOperaciones = () => {
  return JSON.parse(localStorage.getItem('operaciones')) || [];
}
// console.log(operaciones)
const nuevaOperacion = document.getElementById('nueva-operacion');
const descripcionOperacion = document.getElementById('descripcion-operacion');
const montoOperacion = document.getElementById('monto-operacion');
const tipoOperacion = document.getElementById('tipo-operacion');
const categoriaNuevaOperacion = document.getElementById(
  'categoria-nueva-operacion'
);
const fechaOperacion = document.getElementById('fecha-operacion');
//  EDITAR OPERACIONES
const editarOperacionSection = document.getElementById('editar-operacion');
const editarDescripcion = document.getElementById('editar-descripcion-operacion');
const editarMonto = document.getElementById('editar-monto-operacion');
const editarTipo = document.getElementById('editar-tipo-operacion');
const editarCategoriaOp = document.getElementById('editar-categoria-nueva-operacion');
const editarFechaOp = document.getElementById('editar-fecha-operacion');

////////////////////////// HEADER ////////////////////////////////

// -------------------------------- BTN Balance --------------------------------
btnBalance.addEventListener('click', () => {
  balance.classList.remove('oculto');
  categorias.classList.add('oculto');
  reportes.classList.add('oculto');
  nuevaOperacion.classList.add('oculto');
});

// -------------------------------- BTN Categorías --------------------------------
btnCategorias.addEventListener('click', () => {
  categorias.classList.remove('oculto');
  balance.classList.add('oculto');
  reportes.classList.add('oculto');
  nuevaOperacion.classList.add('oculto');
});

// -------------------------------- BTN Reportes --------------------------------
btnReportes.addEventListener('click', () => {
  reportes.classList.remove('oculto');
  balance.classList.add('oculto');
  categorias.classList.add('oculto');
  nuevaOperacion.classList.add('oculto');
});

//////////////////////////////// SECTION BALANCE ////////////////////////////////

//////////////
// BALANCE - 
//////////////

// -------------------------------- Ganancias --------------------------------
// -------------------------------- Gastos --------------------------------
// -------------------------------- Total --------------------------------


const totalGanancias = (arr) => {
  let ganancias = arr.filter(operacion => operacion.tipo === 'ganancia').reduce((prev, current) =>
    prev + Number(current.monto), 0)
  return ganancias
}

const totalGastos = (arr) => {
  let gastos = arr.filter(operacion => operacion.tipo === 'gasto').reduce((prev, current) =>
    prev + Number(current.monto), 0)
  return gastos
};
//LISTO

// -------
// -------

const pintarBalance = (arr) => {
  const totalBalance = totalGanancias(arr) - totalGastos(arr);
  let str = `
    <div class="items">
      <p><strong>Ganancias</strong></p>
      <div class="text-success"><strong>+$${totalGanancias(arr)}</strong></div>
    </div>  
    <div class="items">
      <p><strong>Gastos</strong></p>
      <div class="text-danger"><strong>-$${totalGastos(arr)}</strong></div>
    </div>
    <div class="items">
      <p><strong>Total</strong></p>
      <div><strong>$${Math.abs(totalBalance)}</strong></div>
    </div>`

  document.getElementById('contenedor-balance-total').innerHTML = str;
}

pintarBalance(operaciones)



//////////////
// OPERACIONES
//////////////

// -------------------------------- BTN Nueva Operación --------------------------------
////BOTON NUEVA OPERACION - seccion balance///
btnNuevaOperacion.addEventListener('click', () => {
  balance.classList.add('oculto');
  nuevaOperacion.classList.remove('oculto');
});

//AGREGAR NUEVA OPERACION//

const verOperaciones = (arr) => {
  // console.log(!arr.length);
  if (!arr.length) {
    document.getElementById('sin-operaciones').classList.remove('oculto');
    document.getElementById('con-operaciones').classList.add('oculto');
  } else {
    document.getElementById('sin-operaciones').classList.add('oculto');
    document.getElementById('con-operaciones').classList.remove('oculto');
  }
}; //funcion que nos sirve para que cuando generemos operaciones nos muestre los datos y sino la imagen incial

// -------------------------------- BTN Agregar Operación --------------------------------
//boton agregar | toma los valores de cada input y manda el objeto nuevo al array operacion cada vez que damos click
btnAgregarOperacion.addEventListener('click', (e) => {
  //VALIDAR!! trim no contempla los espacios vacios como un dato que se completa!! y no lo da como válido
  e.preventDefault();
  if (
    descripcionOperacion.value.trim().length == 0 ||
    montoOperacion.value == 0
  ) {
    alertify.error('Todos los campos deben ser completados, y el monto mayor a 0');
    return;
  }

  const crearOperaciones = { //nuevaoperacion/operacion creada
    //nuevo objeto creado por usuario
    id: uuidv4(),
    descripcion: descripcionOperacion.value,
    monto: montoOperacion.value,
    tipo: tipoOperacion.value,
    categoria: categoriaNuevaOperacion.value,
    fecha: fechaOperacion.value,
  };
  operaciones.push(crearOperaciones); // con cada click en agregar se hace un push al array de operaciones y se muestra en la vista 'con operaciones'
  balance.classList.remove('oculto');
  nuevaOperacion.classList.add('oculto');
  //una vez que volvemos a la pantalla balance limpiamos los valores de los inputs para poder agregar otra operacion
  descripcionOperacion.value = '';
  montoOperacion.value = 0;
  tipoOperacion.value = 'gasto';
  categoriaNuevaOperacion.value = 'seleccionar';
  fechaOperacion.valueAsDate = new Date();
  verOperaciones(operaciones); //al tener operaciones hechas nos quita la imagen principal y nos muestra los datos que ingresamos.
  localStorage.setItem('operaciones', JSON.stringify(operaciones));


  imprimirOperaciones(operaciones); //va transcribir los datos en la pantalla dentro de las respectivas columnas. mandamos el arreglo de operaciones.
  // console.log(crearOperaciones.fecha)
  alertify.message('Operación agregada con éxito');
});

let opEditar = []

const imprimirOperaciones = (arr) => {
  //funcion que va escribiendo en el html las nuevas operaciones
  document.getElementById('operaciones').innerHTML = ''; //para que elimine la ultima funcion - vista limpia
  let str = '';
  arr.forEach((operacion) => {
    // console.log(operacion)
    const {
      id,
      descripcion,
      categoria,
      fecha,
      monto,
      tipo
    } = operacion;
    str =
      str +
      `
        <div class='col-12'>
            <div id=${id} class = 'mi-flex row aling-items-start' >
                <span class = 'col-3 font-size-item'> ${descripcion}</span>
                <span class = 'col-3 font-size-item'> ${categoria}</span>
                <span class = 'col-2 fecha'> ${fecha}</span>
                <span class = 'col-2 font-size-item ${
                  tipo == 'ganancia' ? 'green' : 'red'
                }'> $${monto}</span>
                <span class = 'col-2 font-size-item'>
                    <a class='btn-editar' data-id= ${id} href='#'>Editar</a>
                    <a class='btn-eliminar' data-id=  ${id} href='#'>Eliminar</a>
                </span>
            </div>
        </div>
        `;
    document.getElementById('operaciones').innerHTML = str;
  });
  // -------------------------------- BTN Eliminar Operación --------------------------------

  const botonesEliminar = document.querySelectorAll('.btn-eliminar');
  botonesEliminar.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const opEliminado = operaciones.filter(
        (operacion) => operacion.id !== e.target.dataset.id
      );
      localStorage.setItem('operaciones', JSON.stringify(opEliminado));
      operaciones = JSON.parse(localStorage.getItem('operaciones'));
      imprimirOperaciones(operaciones);
      verOperaciones(operaciones);
      alertify.error('Operación eliminada con éxito');
    });
  });
  const botonesEditar = document.querySelectorAll('.btn-editar');
  // -------------------------------- BTN Editar Operación --------------------------------
  botonesEditar.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      opEditar = operaciones.filter(
        (operacion) => operacion.id === e.target.dataset.id
      );
      editarOperacion(opEditar) // rellena el form y se encarga de mostrar esa ventana
      // const operacionEditada = editarOperacion(opEditar);
      //|||||||||||||al editar la primera funcion la duplica modificando la funcion que se ingreso mas reciente dejando ambas y sobreescribiendo una
    });
  });
};

btnAgregarOperacionEditada.addEventListener('click', (e) => {
  console.log(opEditar)

  const operacionEditada = {
    ...opEditar[0]
  };
  operacionEditada.descripcion = editarDescripcion.value;
  operacionEditada.monto = editarMonto.value;
  operacionEditada.tipo = editarTipo.value;
  operacionEditada.categoria = editarCategoriaOp.value;
  operacionEditada.fecha = editarFechaOp.value;

  balance.classList.remove('oculto');
  categorias.classList.add('oculto');
  reportes.classList.add('oculto');
  editarOperacionSection.classList.add('oculto');
  const operacionActualizada = operaciones.map((operacion) =>
    operacion.id === operacionEditada.id ? operacionEditada : operacion);

  localStorage.setItem('operaciones', JSON.stringify(operacionActualizada));
  operaciones = JSON.parse(localStorage.getItem('operaciones'));
  imprimirOperaciones(operaciones)
  alertify.message('Operación editada con éxito');
});

const editarOperacion = (arr) => {
  const {
    descripcion,
    categoria,
    fecha,
    monto,
    tipo
  } = {
    ...arr[0]
  };
  balance.classList.add('oculto');
  categorias.classList.add('oculto');
  reportes.classList.add('oculto');
  editarOperacionSection.classList.remove('oculto');
  editarDescripcion.value = descripcion;
  editarMonto.value = monto;
  editarTipo.value = tipo;
  editarCategoriaOp.value = categoria;
  editarFechaOp.valueAsDate = new Date(fecha);
};



// -------------------------------- BTN Cancelar Edicion --------------------------------
btnCancelarEdicion.addEventListener('click', () => {
  balance.classList.remove('oculto');
  categorias.classList.add('oculto');
  reportes.classList.add('oculto');
  editarOperacionSection.classList.add('oculto');
});
// -------------------------------- BTN Cancelar Operación --------------------------------

btnCancelar.addEventListener('click', () => {
  balance.classList.remove('oculto');
  nuevaOperacion.classList.add('oculto');
});

// -------------------------------- BTN Ocultar Filtros --------------------------------


const cajaFiltros = document.getElementById('caja-filtros');

btnOcultarFiltros.addEventListener('click', () => {
  cajaFiltros.classList.toggle('oculto');
});

//-------------------------------- Filtros ---------------------------
const filtroTipo = document.getElementById('tipo-filtros');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroFecha = document.getElementById('filtro-fecha');
const filtroOrden = document.getElementById('filtro-ordenar');
// selectFiltros.addEventListener('change', (e) => {
//   if(e.target.value !== 'todos'){
//     const xTipo = operaciones.filter(operacion => operacion.tipo === e.target.value)//nos retorna un nuevo arreglo que cumpla una condicion ya sea ganancia o gasto
//     localStorage.setItem('operaciones', xTipo)//guarda el arreglo con lo filtrado
//     imprimirOperaciones(xTipo)
//     // console.log(xTipo)
//   }else {
//     imprimirOperaciones(operaciones)
//   }
// })//NO FILTRA GASTO SOLO GANANCIA Y TODOS

//-------------------------------- Filtros categoria ---------------------------
const filtros = (e) => {
  const porCategoria = filtroCategoria.value;
  const porTipo = filtroTipo.value;
  const porOrden = filtroOrden.value

  let operaciones = obtenerOperaciones();

  if (porCategoria !== 'TODAS') {
    operaciones = operaciones.filter(operacion => operacion.categoria === porCategoria)
  }

  if (porTipo !== 'TODOS') {
    operaciones = operaciones.filter(operacion => operacion.tipo === porTipo)
  }

  if (porOrden === 'MENOR') {
    operaciones = operaciones.sort(
      (a, b) => Number(a.monto) - Number(b.monto)
    );
  }
  if (porOrden === 'MONTO') {
    operaciones = operaciones.sort(
      (a, b) => Number(b.monto) - Number(a.monto)
    );
  }
  if (porOrden === 'A/Z') {
    operaciones = operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
        return -1
      }
    })
  }
  if (porOrden === 'Z/A') {
    operaciones = operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
        return -1
      }
    })
  }
  if (porOrden === 'MAS_RECIENTES') {
    operaciones = operaciones.sort((a, b) =>
      new Date(a.fecha) - new Date(b.fecha))
  }
  imprimirOperaciones(operaciones)
  verOperaciones(operaciones)
}; //REVISAR**************
//***************************************************** */


filtroCategoria.addEventListener('change', filtros)
filtroTipo.addEventListener('change', filtros)
filtroOrden.addEventListener('change', filtros)






////////////////////////// SECTION CATEGORIAS ////////////////////////////////

// --------------------------------------------------------------------------------------
// VER SI HACEMOS LOS SELECT DE CATEGORIA EN HTML O JS - FALTA TERMINAR (imagen whatsapp 21/08)
// const categoriaInput = document.getElementById('categoria-input');

// const categoria = [
//     'Comida',
//     'Servicios',
//     'Salidas',
//     'Educación',
//     'Transporte',
//     'Trabajo',
// ];



// const generarCategoria = () => {
//   const selects = document.getElementsByClassName('select-categoria');
//     for(let i = 0; i < selects.length; i++){
//       const select = selects[i];
//       if(select.classList.contains('filtro-categoria'))
//     }
// }

// generarCategoria()
// --------------------------------------------------------------------------------------



















////////////////////////////////////////////////////////////////////////////////////////////////
// -------------------------------- INICIALIZACION DE FUNCIONES --------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////

const inicializar = () => {
  const inputsFecha = document.querySelectorAll('input[type="date"]');
  inputsFecha.forEach((input) => {
    input.valueAsDate = new Date();
  });

  verOperaciones(operaciones);
  imprimirOperaciones(operaciones);
  obtenerOperaciones(operaciones);
  //agregar inicio de funcion nueva categoria para que se inicie al momento de abrir la pagina
};

window.onload = inicializar;