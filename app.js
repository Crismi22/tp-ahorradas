// BTN
const btnBalance = document.getElementById('btn-balance');
const btnCategorias = document.getElementById('btn-categorias');
const btnReportes = document.getElementById('btn-reportes');
const btnNuevaOperacion = document.getElementById('btn-operacion');
const btnAgregarOperacion = document.getElementById('btn-agregar-operacion');
const btnCancelar = document.getElementById('btn-cancelar-operacion');
 
//  SECCIONES
const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');
const reportes = document.getElementById('reportes');
 
//BALANCE
// const montoGanancias = document.getElementById('monto-ganancias');
// const montoGastos = document.getElementById('monto-gastos');
// const montoTotal = document.getElementById('monto-total');
 
//  OPERACIONES
let operaciones = JSON.parse(localStorage.getItem('operaciones')) || []; //salta error
console.log(operaciones)
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
const editarDescripcion = document.getElementById(
  'editar-descripcion-operacion'
);
const editarMonto = document.getElementById('editar-monto-operacion');
const editarTipo = document.getElementById('editar-tipo-operacion');
const editarCategoriaOp = document.getElementById(
  'editar-categoria-nueva-operacion'
);
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
// BALANCE
//////////////
 
// -------------------------------- Ganancias --------------------------------
// -------------------------------- Gastos --------------------------------
// -------------------------------- Total --------------------------------
 
const totalGanancias = arr =>
arr.filter(operacion => operacion.tipo === 'ganancia').reduce((prev, current) =>
prev + current.monto, 0)
 
const totalGastos = arr =>
arr.filter(operacion => operacion.tipo === 'gasto').reduce((prev, current) =>
prev + current.monto, 0);
 
const totalBalance = totalGanancias(operaciones) - totalGastos(operaciones);
 
totalGanancias(operaciones);  
totalGastos(operaciones);    
console.log(totalBalance);  
 
// -------
// -------
 
// const pintarBalance = (arr) => {
 
//   const totalGanancias = arr =>
//   arr.filter(operacion => operacion.tipo === 'ganancia').reduce((prev, current) =>
//   prev + current.monto, 0)
     
//   const totalGastos = arr =>
//   arr.filter(operacion => operacion.tipo === 'gasto').reduce((prev, current) =>
//   prev + current.monto, 0);
 
//   const totalBalance = totalGanancias(operaciones) - totalGastos(operaciones);
 
//   let str = `
//     <div class='items'>
//       <p>Ganancias</p>
//       <div class='text-success'>+$${totalGanancias}</div>
//     </div>  
//     <div class='items'>
//       <p>Gastos</p>
//       <div class='text-danger'>-$${totalGastos}</div>
//     </div>
//     <div class='items'>
//       <p><strong>Total</strong></p>
//       <div><strong>$${Math.abs(totalBalance)}</strong></div>
//     </div>`
 
//   document.getElementById('contenedor-balance-total').innerHTML = srt;
// }
 
// pintarBalance(operaciones)
 
 
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
 
//arreglo de operaciones vacio donde se van a guardar los datos | se guardan en ls
 
// let operaciones = JSON.parse(localStorage.getItem('operaciones')) || []; // LA COMENTE PORQUE LA SUBI ARRIBA CON LAS CONST
 
const verOperaciones = (arr) => {
  console.log(!arr.length);
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
  ){
    alertify.error('Todos los campos deben ser completados, y el monto mayor a 0');
    return;
  }
 
  const crearOperaciones = {
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
 
 
 
  imprimirOperaciones(operaciones); //va transcribir los datos en la pantalla dentro de las respectivas columnas. mandamos el arreglo de operaciones.
  // console.log(crearOperaciones.fecha)
  alertify.message('Operación agregada con éxito');
});
 
const imprimirOperaciones = (arr) => {
  //funcion que va escribiendo en el html las nuevas operaciones
  document.getElementById('operaciones').innerHTML = ''; //para que elimine la ultima funcion - vista limpia
  let str = '';
  arr.forEach((operacion) => {
    // console.log(operacion)
    const { id, descripcion, categoria, fecha, monto, tipo } = operacion;
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
      //    alertify.message('Operación eliminada con éxito');
    });
  });
  // -------------------------------- BTN Editar Operación --------------------------------
  const botonesEditar = document.querySelectorAll('.btn-editar');
  console.log(botonesEditar);
  botonesEditar.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const opEditar = operaciones.filter(
        (operacion) => operacion.id === e.target.dataset.id
      );
      editarOperacion(opEditar);
      // botonesEditar.addEventListener('click', () => {
      console.log(opEditar);
      btnAgregarOperacionEditada.addEventListener('click', () => {
        const operacionEditada = { ...opEditar[0] };
        operacionEditada.descripcion = editarDescripcion.value;
        operacionEditada.monto = editarMonto.value;
        operacionEditada.tipo = editarTipo.value;
        operacionEditada.categoria = editarCategoriaOp.value;
        operacionEditada.fecha = editarFechaOp.valueAsDate;
        console.log(operacionEditada);
      });
    });
  });
};
const btnAgregarOperacionEditada = document.getElementById(
  'btn-editar-operacion'
);
const btnCancelarEdicion = document.getElementById(
  'btn-editar-cancelar-operacion'
);
 
const editarOperacion = (arr) => {
  const { descripcion, categoria, fecha, monto, tipo } = arr[0];
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
const creaOpEditada = operaciones.map((operacion) => operacion.id == id
? editarOperacionSection
: operacion
)
localStorage.setItem('operaciones',JSON.stringify(creaOpEditada))
operaciones = JSON.parse(localStorage.getItem('operaciones'))

// alertify.message('Operación editada con éxito');

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
//BOTON OCULTAR FILTROS
const btnOcultarFiltros = document.getElementById('btn-ocultar-filtros');
const cajaFiltros = document.getElementById('caja-filtros');
 
btnOcultarFiltros.addEventListener('click', () => {
  cajaFiltros.classList.toggle('oculto');
});
 
//-------------------------------- Filtros Tipo ---------------------------
const selectFiltros = document.getElementById('tipo-filtros');

selectFiltros.addEventListener('change', (e) => {
  if(e.target.value !== 'todos'){
    const xTipo = operaciones.filter(operacion => operacion.tipo === e.target.value)//nos retorna un nuevo arreglo que cumpla una condicion ya sea ganancia o gasto
    localStorage.setItem('operaciones', xTipo)//guarda el arreglo con lo filtrado
    imprimirOperaciones(xTipo)
    console.log(xTipo)
  }else {
    imprimirOperaciones(operaciones)
  }
})//NO FILTRA GASTO SOLO GANANCIA Y TODOS

//-------------------------------- Filtros categoria ---------------------------
// const filtroCategorias = [
//     {
 
//     }
// ]
 
// -------------------------------- Input | Filtro Fecha --------------------------------
////// FILTROS - FECHA ///// FUNCIONA!!!
// inputsFecha.addEventListener('change', e => {
//   if(e.target.valueAsDate !== new Date()){
//       const filtroFecha = operaciones.filter(operaciones =>  new Date(operaciones.fecha) > e.target.valueAsDate )
//       localStorage.setItem('fechaOperacion',filtroFecha)
//       localStorage.setItem('fechaOperacion',JSON.stringify(filtroFecha))
//       imprimirOperaciones(filtroFecha);
//   }else{
//       imprimirOperaciones(operaciones);
//   }

// })

 
const inicializar = () => {
  const inputsFecha = document.querySelectorAll('input[type="date"]');
  inputsFecha.forEach((input) => {
    input.valueAsDate = new Date();
  });
 
  verOperaciones(operaciones);
  imprimirOperaciones(operaciones);
  //agregar inicio de funcion nueva categoria para que se inicie al momento de abrir la pagina
};
 
window.onload = inicializar;
 
