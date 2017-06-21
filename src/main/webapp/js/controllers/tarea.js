class TareasController {

  constructor(tareaService, $timeout) {
      this.tareaService = tareaService
      this.$timeout = $timeout
      this.errors = []
      this.tareas = []
      this.tareaSeleccionada = null
      this.getTareas()
  }

  notificarErrorTareas(infoError) {
  	this.notificarError(this, infoError)
  	this.getTareas()
  }

  transformarATarea(jsonTarea) {
    return Tarea.asTarea(jsonTarea)
  }

  // TRAER LAS TAREAS
  getTareas() {
    this.tareaService.findAll((response) => {
      this.tareas = _.map(response.data, this.transformarATarea)
    }, () => {
    	notificarError(this)
    })
  }

  // CUMPLIR TAREA
  cumplir(tarea) {
    tarea.cumplir()
    this.tareaService.update(tarea, () => {
      this.getTareas()
    }, notificarErrorTareas)
  }

  // FUNCIONES PARA ASIGNAR
  // Llamamos al popup de Tareas
  beginAsignar(tarea) {
    this.tareaSeleccionada = tarea
  }

  // Se produce la asignación propiamente dicha
  asignar(asignatario) {
	  this.tareaSeleccionada.asignadoA = asignatario
    tareaService.update(this.tareaSeleccionada, () => { }, notificarError);
  }


}


// TODO: Agendar que en realidad el cumplir tiene que ir antes de llamar al
// server
// Y si hay error tirar un getTareas() y a la lona.
// hay que armar
// 1) En el index.html el popup
// 2) En el controllers.js a) el beginAsignar que levanta el popup, b) nos
// traemos los asignatarios posibles,
// con lo cual hay que generar oooootro service, y tambien en el server un
// AsignatarioController,
// porque asi funciona REST.
// armar una directiva para el combo de asignatarios