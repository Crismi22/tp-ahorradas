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
const btnsEliminarCategoria = document.querySelectorAll('.btn-eliminar-categoria');
const btnsEditarCategoria = document.querySelectorAll('.btn-editar-categoria');
const btnCancelarEdicionCategoria = document.getElementById('btn-cancelar-categoria');
const btnGuardarCategoriaEditada = document.getElementById('btn-guardar-categoria');

//  SECCIONES
const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');
const reportes = document.getElementById('reportes');

//  OPERACIONES
let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
const obtenerOperaciones = () => {return JSON.parse(localStorage.getItem('operaciones')) || [];}
const nuevaOperacion = document.getElementById('nueva-operacion');
const descripcionOperacion = document.getElementById('descripcion-operacion');
const montoOperacion = document.getElementById('monto-operacion');
const tipoOperacion = document.getElementById('tipo-operacion');
const categoriaNuevaOperacion = document.getElementById('categoria-nueva-operacion');
const fechaOperacion = document.getElementById('fecha-operacion');

//  EDITAR OPERACIONES
const editarOperacionSection = document.getElementById('editar-operacion');
const editarDescripcion = document.getElementById('editar-descripcion-operacion');
const editarMonto = document.getElementById('editar-monto-operacion');
const editarTipo = document.getElementById('editar-tipo-operacion');
const editarCategoriaOp = document.getElementById('editar-categoria-nueva-operacion');
const editarFechaOp = document.getElementById('editar-fecha-operacion');
const botonesEditar = document.querySelectorAll('.btn-editar');
const botonesEliminar = document.querySelectorAll('.btn-eliminar');

//FILTROS
const cajaFiltros = document.getElementById('caja-filtros');
const filtroTipo = document.getElementById('tipo-filtros');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroFecha = document.getElementById('filtro-fecha');
const filtroOrden = document.getElementById('filtro-ordenar');

//CATEGORIAS
const btnAgregarCategoria = document.getElementById('btn-agregar-categoria');
const btnVolverVista1 = document.getElementById('btn-regresar');
const categoriaInput = document.getElementById('categoria-input');
const listaDeCategorias = document.getElementById('lista-categoria');
const sectionEditarCategoria = document.getElementById('editar-categorias');
const inputEditarCategoria = document.getElementById('editar-categoria');

//REPORTES
const sinReportes = document.getElementById('sin-reportes');
const conReportes = document.getElementById('con-reportes');


 
////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------------- HEADER ------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////
                                  

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
  
  // ......... Ocultar secciones de balance y categorías .........
  reportes.classList.remove('oculto');
  balance.classList.add('oculto');
  categorias.classList.add('oculto');
  nuevaOperacion.classList.add('oculto');
  
  // ......... Ocultar contenedor CON/SIN reportes ......... 
  if(!operaciones.length){
    conReportes.classList.add('oculto')
    sinReportes.classList.remove('oculto')
  } else {
    conReportes.classList.remove('oculto')
    sinReportes.classList.add('oculto')
  }
  
  // ......... Inicializaciones ......... 
  imprimirResumenCategorias(JSON.parse(localStorage.getItem('operaciones')));
  imprimirMesMayorGananciaYGasto(JSON.parse(localStorage.getItem('operaciones')));
  imprimirTotalesPorMes(operaciones)
  imprimirTotalesPorCategoria(operaciones, arrayCategoriasDefault)
});

////////////////////////////////////////////////////////////////////////////////////////////////
// -------------------------------------- SECTION BALANCE --------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////// Contenedor BALANCE ////////////////////////////////

// -------------------------------- Ganancias - Gasto - Total --------------------------------

// ......... Total Ganancias .........                                            
const totalGanancias = (arr) => {
  let ganancias = arr.filter(operacion => 
    operacion.tipo === 'ganancia').reduce((prev, current) =>
    prev + Number(current.monto), 0)
  return ganancias
}

// ......... Total Gastos .........                                            
const totalGastos = (arr) => {
  let gastos = arr.filter(operacion => 
    operacion.tipo === 'gasto').reduce((prev, current) =>
    prev + Number(current.monto), 0)
  return gastos
};

const pintarBalance = (arr) => {
  const totalBalance = totalGanancias(arr) - totalGastos(arr);
  let str = `
    <div class="items">
      <p>Ganancias</p>
      <div class="text-success">+$${totalGanancias(arr)}</div>
    </div>  
    <div class="items">
      <p>Gastos</p>
      <div class="text-danger">-$${totalGastos(arr)}</div>
    </div>
    <div class="items align-middle">
      <p class="fs-5">Total</p>
      <div class="fw-semibold">$${totalBalance}</div>
    </div>`

  document.getElementById('contenedor-balance-total').innerHTML = str;
}



//////////////////////////////// Contenedor OPERACIONES ////////////////////////////////

// -------------------------------- BTN Nueva Operación --------------------------------                                                

// ......... BTN Nueva Operacion .........                                            
btnNuevaOperacion.addEventListener('click', () => {
  balance.classList.add('oculto');
  nuevaOperacion.classList.remove('oculto');
});

// ......... Agregar Nueva Operaciom .........      
const verOperaciones = (arr) => {
  if (!arr.length) {
    document.getElementById('sin-operaciones').classList.remove('oculto');
    document.getElementById('con-operaciones').classList.add('oculto');
  } else {
    document.getElementById('sin-operaciones').classList.add('oculto');
    document.getElementById('con-operaciones').classList.remove('oculto');
  }
};

// ......... BTN Agregar Operacion .........      
btnAgregarOperacion.addEventListener('click', (e) => {
  e.preventDefault();
  if (
    descripcionOperacion.value.trim().length == 0 ||
    montoOperacion.value == 0
  ) {
    alertify.error('Todos los campos deben ser completados, y el monto mayor a 0');
    return;
  }


// -------------------------------- Operaciones --------------------------------
  const crearOperaciones = {
    id: uuidv4(),
    descripcion: descripcionOperacion.value,
    monto: montoOperacion.value,
    tipo: tipoOperacion.value,
    categoria: categoriaNuevaOperacion.value,
    fecha: fechaOperacion.value,
  };

  operaciones.push(crearOperaciones);
  balance.classList.remove('oculto');
  nuevaOperacion.classList.add('oculto');
  descripcionOperacion.value = '';
  montoOperacion.value = 0;
  tipoOperacion.value = 'gasto';
  categoriaNuevaOperacion.value = 'seleccionar';
  fechaOperacion.valueAsDate = new Date();
  verOperaciones(operaciones); 
  localStorage.setItem('operaciones', JSON.stringify(operaciones));

  imprimirOperaciones(operaciones);
  alertify.message('Operación agregada con éxito');
});

// ......... Carga de operaciones .........      
let opEditar = []

const imprimirOperaciones = (arr) => {
  document.getElementById('operaciones').innerHTML = ''; 
  let str = '';
  arr.forEach((operacion) => {
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
            <span class = 'col-3 font-size-item text-start fw-semibold'> ${descripcion}</span>
            <span class = 'col-3 font-size-item text-start'> ${categoria}</span>
            <span class = 'col-2 fecha text-end'> ${fecha}</span>
            <span class = 'col-2 font-size-item text-end ${tipo == 'ganancia' ? 'green' : 'red'}'>$${monto}</span>
            <span class = 'col-2 font-size-item'>
            <div class='d-flex flex-column'>
              <a class='btn-editar text-end' data-id=${id} href='#'>Editar</a>
              <a class='btn-eliminar text-end' data-id=${id} href='#'>Eliminar</a>
            </div>
          </div>
        </div>
        `;
    document.getElementById('operaciones').innerHTML = str;
  });

  let operaciones = obtenerOperaciones();
  

// -------------------------------- Acciones - Editar y Eliminar --------------------------------
  
  // ......... BTN Eliminar Operación .........      
  botonesEliminar.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const opEliminado = operaciones.filter((operacion) => operacion.id !== e.target.dataset.id);
      localStorage.setItem('operaciones', JSON.stringify(opEliminado));
      operaciones = JSON.parse(localStorage.getItem('operaciones'));
      imprimirOperaciones(operaciones);
      verOperaciones(operaciones);
      alertify.error('Operación eliminada con éxito');
    });
  });
  

  // ......... BTN Editar Operación .........      
  botonesEditar.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      opEditar = operaciones.filter((operacion) => operacion.id === e.target.dataset.id);
      editarOperacion(opEditar) 
    });
  });
  pintarBalance(operaciones);
};

btnAgregarOperacionEditada.addEventListener('click', (e) => {

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


// ......... BTN Cancelar Edicion .........  
btnCancelarEdicion.addEventListener('click', () => {
  balance.classList.remove('oculto');
  categorias.classList.add('oculto');
  reportes.classList.add('oculto');
  editarOperacionSection.classList.add('oculto');
});

// ......... BTN Cancelar Operación ......... 
btnCancelar.addEventListener('click', () => {
  balance.classList.remove('oculto');
  nuevaOperacion.classList.add('oculto');
});


//////////////////////////////// Contenedor FILTROS ////////////////////////////////

// -------------------------------- BTN Ocultar Filtros --------------------------------                                                

btnOcultarFiltros.addEventListener('click', () => {
  cajaFiltros.classList.toggle('oculto');
});

const filtros = () => {
  const porCategoria = filtroCategoria.value;
  const porTipo = filtroTipo.value;
  const porOrden = filtroOrden.value
  const filtroFecha = filtroFecha.value

  let operaciones = obtenerOperaciones();

// -------------------------------- Filtro Categoria --------------------------------
  if (porCategoria !== "todas") {
    operaciones = operaciones.filter(
      (operacion) => operacion.categoria === porCategoria.value
    );
  }
// -------------------------------- Filtro Tipo --------------------------------
  if (porTipo !== "todos") {
    operaciones = operaciones.filter(
      (operacion) => operacion.tipo === porTipo.value
    );
  }
// -------------------------------- Filtro Ordenar por --------------------------------
  // ......... Mas reciente .........    
  if (porOrden === "mas-reciente") {
    operaciones = operaciones.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  }
  // ......... Menos reciente .........    
  if (porOrden === "menos-reciente") {
    operaciones = operaciones.sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }
  // ......... Menor monto .........    
  if (porOrden === "menor-monto") {
    operaciones = operaciones.sort(
      (a, b) => Number(a.monto) - Number(b.monto)
    );
  }
  // ......... Mayor monto .........    
  if (porOrden === "mayor-monto") {
    operaciones = operaciones.sort(
      (a, b) => Number(b.monto) - Number(a.monto)
    );
  }
  // ......... A-Z .........    
  if (porOrden === "a-z") {
    operaciones = operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
        return -1;
      }
    });
  }
  // ......... Z-A .........    
  if (porOrden === "z-a") {
    operaciones = operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
        return -1;
      }
    });
  }
// -------------------------------- Filtro Fecha --------------------------------
  if (filtroFecha !== new Date()) {
    operaciones = operaciones.filter(
      (operacion) => new Date(operacion.fecha) >= new Date(filtroFecha)
    );
  }
  imprimirOperaciones(operaciones)
  verOperaciones(operaciones)
};

filtroFecha.addEventListener('change', filtros);
filtroCategoria.addEventListener('change', filtros)
filtroTipo.addEventListener('change', filtros)
filtroOrden.addEventListener('change', filtros)




////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------ SECTION CATEGORIAS ------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////

let arrayCategoriasDefault = JSON.parse(localStorage.getItem('categorias')) || [
  {
    categoria: "Comida",
    id: uuidv4(),
  },
  {
    categoria: "Servicios",
    id: uuidv4(),
  },
  {
    categoria: "Salidas",
    id: uuidv4(),
  },
  {
    categoria: "Educacion",
    id: uuidv4(),
  },
  {
    categoria: "Transporte",
    id: uuidv4(),
  },
  {
    categoria: "Trabajo",
    id: uuidv4(),
  },
];

localStorage.setItem('categorias', JSON.stringify(arrayCategoriasDefault)); 

//para filtros
const generarCategoria = () => {
  const selects = document.getElementsByClassName('select-categoria');
  for(let i = 0; i < selects.length; i++){
    const select = selects[i];
    select.innerHTML = '';
    if(select.classList.contains('filtro-categoria')){
      select.innerHTML = '<option>Todas</option>'        
    }
    for(let j = 0; j < arrayCategoriasDefault.length; j++){
      select.innerHTML += `<option value=${arrayCategoriasDefault[j].categoria}>${arrayCategoriasDefault[j].categoria}</option>`       
    }
  }
}
generarCategoria();
 
let categoriasAEditar = []; //array para guardar categorias editadas

const imprimirCategorias = () => {
  let str = '';
  arr = JSON.parse(localStorage.getItem('categorias'));
  if(arr != null){
    arr.forEach((arrayCategoriasDefault) =>{
      const {id, categoria} = arrayCategoriasDefault;
      str = str += `
        <div class='mi-flex justify-content-between aling-items-start'>
          <div class="estilo-categorias">${categoria}</div>
          <div>
            <a href="#" class="btn-editar-categoria me-2" data-id=${id}>Editar</a>
            <a href="#" class="btn-eliminar-categoria" data-id=${id}>Eliminar</a> 
          </div>
        </div>
      `; 
    })
    document.getElementById('lista-categorias').innerHTML = str; 
  }
}

imprimirCategorias();

// ......... Vaciar Input Categoria .........    
const limpiarInputCategoria = () => {
  categoriaInput.value = '';
};

// -------------------------------- BTN agregar categoria --------------------------------
btnAgregarCategoria.addEventListener('click', () => {
  const nuevaCategoria = {
    categoria: categoriaInput.value, 
    id: uuidv4()
  }

  arrayCategoriasDefault.push(nuevaCategoria)
  localStorage.setItem('categorias', JSON.stringify(arrayCategoriasDefault))
  arrayCategoriasDefault = JSON.parse(localStorage.getItem(categorias))
  imprimirCategorias(arrayCategoriasDefault)
  limpiarInputCategoria()
  alertify.message('Categoria agregada con éxito');
})

imprimirCategorias(arrayCategoriasDefault)
generarCategoria(arrayCategoriasDefault);


// -------------------------------- BTN cancelar Categoria --------------------------------
btnVolverVista1.addEventListener('click', () => {
  sectionEditarCategoria.classList.add('oculto');
  categorias.classList.add('oculto'); 
  balance.classList.remove('oculto');
})

// -------------------------------- BTN Eliminar Categoria --------------------------------
btnsEliminarCategoria.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const aliminado = arrayCategoriasDefault.filter(
      (categorias) => categorias.id !== e.target.dataset.id
    );
    localStorage.setItem('categorias', JSON.stringify(aliminado));
    arrayCategoriasDefault = JSON.parse(localStorage.getItem('categorias'));
    imprimirCategorias()
    generarCategoria()
    alertify.error('Categoria eliminada con éxito');
  })
})
 
// -------------------------------- BTN Editar Categoria --------------------------------
btnsEditarCategoria.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    sectionEditarCategoria.classList.remove('oculto');
    categorias.classList.add('oculto');
    categoriasAEditar = arrayCategoriasDefault.filter(
      (categorias) => categorias.id === e.target.dataset.id       
    );
    editarCategoria(categoriasAEditar)
  });
});

btnGuardarCategoriaEditada.addEventListener('click', (e) => {
  const categoriaActualizada = {...categoriasAEditar[0]}
  categoriaActualizada.categoria = inputEditarCategoria.value;
  sectionEditarCategoria.classList.add('oculto');
  categorias.classList.remove('oculto');

  const guardarCategoria = arrayCategoriasDefault.map((categorias) => 
    categorias.id === categoriaActualizada.id ? categoriaActualizada : categorias);

 
  localStorage.setItem('categorias', JSON.stringify(guardarCategoria));
  arrayCategoriasDefault = JSON.parse(localStorage.getItem('categorias'));
  imprimirCategorias(arrayCategoriasDefault);
  generarCategoria(arrayCategoriasDefault); //actualizar categorias editadas en diferentes select
  alertify.message('Categoria editada con éxito');
});

const editarCategoria = () => {
  const categoriaActualizada = {...editarCategoria}
  categoriaActualizada.categoria = inputEditarCategoria.value
  arrayCategoriasDefault = JSON.parse(localStorage.getItem('categorias'));
};


                                                // -------------------------------- BTN cancelar edicion Categoria --------------------------------
btnCancelarEdicionCategoria.addEventListener('click', () => {
  sectionEditarCategoria.classList.add('oculto');
  categorias.classList.remove('oculto'); 
})

  

////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------- SECTION REPORTES -------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////// RESUMEN ////////////////////////////////
                                      
const imprimirResumenCategorias = (operaciones) => {

// -------------------------------- Categoría con mayor ganancia --------------------------------     
  const categoriaMayorGanancia = operaciones.filter((operacion) => operacion.tipo === 'ganancia').sort((a, b) => b.monto - a.monto);
  if (categoriaMayorGanancia.length > 0) {
    document.getElementById('categoria-mayor-ganancia').innerHTML = `
      <div class="col-6">
        <p class="text-start fw-semibold">Categoría con mayor ganancia</p>
      </div>
      <div class="col-3">
        <p class="text-end">${categoriaMayorGanancia[0].categoria}</p>
      </div>
      <div class="col-3">
        <p class="text-end green">$${categoriaMayorGanancia[0].monto}</p>
      </div>
      `;
  }

// -------------------------------- Categoría con mayor gasto --------------------------------

  const categoriaMayorGasto = operaciones.filter((operacion) => operacion.tipo === 'gasto').sort((a, b) => b.monto - a.monto);
  if (categoriaMayorGasto.length > 0) {
    document.getElementById('categoria-mayor-gasto').innerHTML = `
      <div class="col-6">
        <p class="text-start fw-semibold">Categoría con mayor gasto</p>
      </div>
      <div class="col-3">
        <p class="text-end">${categoriaMayorGasto[0].categoria}</p>
      </div>
      <div class="col-3">
        <p class="text-end red">$${categoriaMayorGasto[0].monto}</p>
      </div>
      `;
  };
};

// -------------------------------- Categoría con mayor balance --------------------------------
// FUNCION SIN REALIZAR DEBIDO A QUE EL MONTO QUE DA POR RESULTADO EL BALANCE PUEDE SER POSITIVO O NEGATIVO

                                              
const imprimirMesMayorGananciaYGasto = (operaciones) => {
  const resumenMes = operaciones.sort((a, b) => b.monto - a.monto);
  // const mesesSinRepetir = [... new Set(operaciones.map(operacion => 
  //   operacion.fecha.split('-')[1]))].sort()
  //   console.log(mesesSinRepetir)
  // const gastosPorMes = mesesSinRepetir.forEach((mes) => operacion.fecha.split('-')[1] == mes)
  // console.log(gastosPorMes)

// -------------------------------- Mes con mayor ganancia --------------------------------
  const mesMayorGanancia = resumenMes.filter((operacion) => operacion.tipo === 'ganancia');
  if (mesMayorGanancia.length > 0) {
    // console.log(mesMayorGanancia)
    document.getElementById('mes-mayor-ganancia').innerHTML = `
      <div class="col-6">
        <p class="text-start fw-semibold">Mes con mayor ganancia</p>
      </div>
      <div class="col-3">
        <p class="text-end">${new Date(mesMayorGanancia[0].fecha).getMonth() + 1}/${new Date(mesMayorGanancia[0].fecha).getFullYear()}</p>
      </div>
      <div class="col-3">
        <p class="text-end green">$${mesMayorGanancia[0].monto}</p>
      </div>
    `;
  };
  const gananciaPorMes = mesMayorGanancia.filter((operacion) => operacion.fecha.split('-')[1])

// -------------------------------- Mes con mayor gasto --------------------------------
  const mesMayorGasto = resumenMes.filter((operacion) => operacion.tipo === 'gasto');
  if (mesMayorGasto.length > 0) {
    document.getElementById('mes-mayor-gasto').innerHTML = `
      <div class="col-6">
        <p class="text-start fw-semibold">Mes con mayor gasto</p>
      </div>
      <div class="col-3">
        <p class="text-end">${new Date(mesMayorGasto[0].fecha).getMonth() + 1}/${new Date(mesMayorGasto[0].fecha).getFullYear()}</p>
      </div>
      <div class="col-3">
        <p class="text-end red">$${mesMayorGasto[0].monto}</p>
      </div>
    `;
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const filtroMeses = [... new Set(arr.map(operacion => 
  //   operacion.fecha.split('-')[1]))].sort()

  // for (let i = 0; i < filtroMeses.length; i++) {
  //   const filtroOperacionesPorMes = resumenMes.filter((operacion) => operacion.fecha.split('-')[1] === filtroMeses[i]);  
  //   const porTipoGanancia = operacionesPorMes.filter(operacion => 
  //     operacion.tipo === 'ganancia').reduce((count, current) => count + Number(current.monto) ,0);
  //   const porTipoGasto = operacionesPorMes.filter(operacion => 
  //     operacion.tipo === 'gasto').reduce((count, current) => count + Number(current.monto) ,0);
      
      
  // // const mesMayorGanancia = resumenMes.filter((operacion) => operacion.tipo === 'ganancia');
  // if (mesMayorGanancia.length > 0) {
  //   document.getElementById('mes-mayor-ganancia').innerHTML = `
  //     <div class="col-6">
  //       <p class="text-start fw-semibold">Mes con mayor ganancia</p>
  //     </div>
  //     <div class="col-3">
  //       <p class="text-end">${new Date(mesMayorGanancia[0].fecha).getMonth() + 1}/${new Date(mesMayorGanancia[0].fecha).getFullYear()}</p>
  //     </div>
  //     <div class="col-3">
  //       <p class="text-end green">$${mesMayorGanancia[0].monto}</p>
  //     </div>
  //   `;
  // }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                                 


//////////////////////////////// TOTALES POR CATEGORIA ////////////////////////////////

const imprimirTotalesPorCategoria = (operaciones, arrayCategoriasDefault) => {
  let str = ''
  let totalesPorCategoriaBalance = 0;
  document.getElementById('totales-por-categoria').innerHTML = '';
  
  arrayCategoriasDefault.forEach(arrayCategoriasDefault => {
    const porCategoria = operaciones.filter(operacion => operacion.categoria === arrayCategoriasDefault.categoria)
    const porCategoriaGanancia = porCategoria.filter(operacion => operacion.tipo === 'ganancia').reduce((count, current) => count + Number(current.monto) ,0)
    const porCategoriaGasto = porCategoria.filter(operacion => operacion.tipo === 'gasto').reduce((count, current) => count + Number(current.monto) ,0)
    totalesPorCategoriaBalance = porCategoriaGanancia - porCategoriaGasto;

    if(porCategoriaGanancia > 0 || porCategoriaGasto > 0){
      str += `
      <div class="row align-items-start">
        <div class="col-3"> 
          <p class="fw-semibold text-start">${arrayCategoriasDefault.categoria}</p>
        </div>
        <div class="col-3"> 
          <p class="text-end text-success">+$${porCategoriaGanancia}</p>
        </div>
        <div class="col-3"> 
          <p class="text-end text-danger">-$${porCategoriaGasto}</p>
        </div>
        <div class="col-3"> 
          <p class="text-end">$${totalesPorCategoriaBalance}</p>
        </div>
      </div>
      `;
    }
  document.getElementById('totales-por-categoria').innerHTML = str;  
  });
};  


//////////////////////////////// TOTALES POR MES ////////////////////////////////

const imprimirTotalesPorMes = arr => {
  let totalPorMesBalance = 0;
  const mesesSinRepetir = [... new Set(arr.map(operacion => 
    operacion.fecha.split('-')[1]))].sort()
  //   `${new Date(operacion.fecha).getMonth() + 1}/${new Date(operacion.fecha).getFullYear()}`)),].sort();
  document.getElementById('totales-por-mes').innerHTML = '';
  let str = ''

  let ganancia = 0;
  for (let i = 0; i < mesesSinRepetir.length; i++) {
    const operacionesPorMes = arr.filter(operacion => 
      operacion.fecha.split('-')[1] === mesesSinRepetir[i]);
    const porTipoGanancia = operacionesPorMes.filter(operacion => 
      operacion.tipo === 'ganancia')
      for (let j = 0; j < porTipoGanancia.length; j++) {
        // if(porTipoGanancia[j].fecha.split('-')[1] === porTipoGanancia[j+1].fecha.split('-')[1])
        // ganancia = ganancia + Number(porTipoGanancia[j].monto)
        // console.log(ganancia)
      console.log(porTipoGanancia[j].fecha.split('-')[1])
      }
      
      const gananciaPorMes = porTipoGanancia.reduce((count, current) => count + Number(current.monto) ,0);
    console.log(gananciaPorMes)  
    

    const porTipoGasto = operacionesPorMes.filter(operacion => 
      operacion.tipo === 'gasto').reduce((count, current) => count + Number(current.monto) ,0);
      // console.log(porTipoGasto)

    totalPorMesBalance = gananciaPorMes - porTipoGasto
   
    str += `
      <div class="row align-items-start">
        <div class="col-3"> 
          <p class="fw-semibold text-start">${mesesSinRepetir[i]}</p>
        </div>
        <div class="col-3"> 
          <p class="text-end text-success">+$${gananciaPorMes}</p>
        </div>
        <div class="col-3"> 
          <p class="text-end text-danger">-$${porTipoGasto}</p>
        </div>
        <div class="col-3"> 
          <p class="text-end">$${totalPorMesBalance}</p>
        </div>
      </div>
      `;
        
    document.getElementById('totales-por-mes').innerHTML = str;
  };
  // console.log(ganancia)
};
    
    
////////////////////////////////////////////////////////////////////////////////////////////////
// -------------------------------- INICIALIZACION DE FUNCIONES --------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////

const inicializar = () => {
  const inputsFecha = document.querySelectorAll('input[type="date"]');
  inputsFecha.forEach((input) => {
    input.valueAsDate = new Date();
  });
  pintarBalance(operaciones)
  verOperaciones(operaciones);
  imprimirOperaciones(operaciones);
  obtenerOperaciones(operaciones);
  generarCategoria(arrayCategoriasDefault);
};

window.onload = inicializar;