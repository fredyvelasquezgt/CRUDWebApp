import { useState } from "react";
import { nanoid } from 'nanoid'

function App() {


  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  //valor false porque cambia cuando presiono 'agregar'
  const [modoEdicion, setModoEdicion] = useState(false)


  const agregarTarea = (e) => {
    e.preventDefault() //evita que se proceso el formulario con el get
    if (!tarea.trim()) {
      console.log('Elemento vacio')
      return
    }
    console.log(tarea) // no se despliega hasta que la tarea este vacia

    setTareas([...tareas,
    {
      id: nanoid(),
      NombreTarea: tarea
    }]);

    setTarea('') //limpia el formulario
  }

  const eliminarTarea = (id) => {
    
    //filto los que sean distintos al id que estoy recibiendo
    //si el id es igual, lo saco
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado) //como arrayFiltrado modifica el array setTareas

  }

  const editar = (item) => {
    setModoEdicion(true)
    setTarea(item.NombreTarea) //relaciono el nombre de la tarea con el campo
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center" >CRUD simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.NombreTarea}</span>
                  <button
                    className="btn btn-danger 
              btn-sm float-end mx-2"
              onClick={() => eliminarTarea(item.id)}>
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning 
                    btn-sm float-end"
                    onClick={() => editar(item)}
                    >
                    Editar
                  </button>
                </li>
              ))
            }


          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
                modoEdicion ? 'Editar tarea' : 'Agregar tarea'
            }
          </h4>
          <form
            onSubmit={agregarTarea}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e => setTarea(e.target.value))} //relacion de input con el estado
              value={tarea}
            />

            {
              modoEdicion ? (
                <button className="btn-warning btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn-dark btn-block" type="submit">Agregar</button>
              )
            }

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
