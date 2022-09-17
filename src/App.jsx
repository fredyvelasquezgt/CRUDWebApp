import { useState } from "react";

function App() {


  const [tarea, setTarea] = useState('')


  const agregarTarea = (e) => {
    e.preventDefault() //evita que se proceso el formulario con el get
    if(!tarea.trim()) {
      console.log('Elemento vacio')
      return 
    }
    console.log('tarea') // no se despliega hasta que la tarea este vacia

  }
  return (
    <div className="container mt-5">
      <h1 className="text-center" >CRUD simple</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="lead">Nombre de la tarea</span>
              <button className="btn btn-danger btn-sm float-end mx-2">Eliminar</button>
              <button className="btn btn-warning btn-sm float-end">Editar</button>
            </li>
          </ul>
        </div>
        <div className="col-4">
        <h4 className="text-center">Formulario</h4>
        <form
          onSubmit={agregarTarea}>
          <input 
          type="text" 
          className="form-control mb-2"
          placeholder="Ingrese tarea"
          onChange={( e => setTarea(e.target.value))} //relacion de input con el estado
           />
           <button className="btn-dark btn-block" type="submit">Agregar</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default App;
