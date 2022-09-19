import {useState} from "react";
import {nanoid} from 'nanoid'

function App() {

  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  //valor false porque cambia cuando presiono 'agregar'
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  //Toma los errores del form
  const [error, setError] = useState(null)

  const agregarTarea = (e) => {
    e.preventDefault() //evita que se proceso el formulario con el get
    if (!tarea.trim()) {
      console.log('Elemento vacio')
      setError('Escriba algo por favor')
      return
    }
    console.log(tarea) // no se despliega hasta que la tarea este vacia

    setTareas([...tareas,
    {
      id: nanoid(),
      NombreTarea: tarea
    }]);

    setTarea('') //limpia el 
    setError(null)

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
    setId(item.id) //aqui ya puedo usar el id
  }

  const editarTarea = (e) => {
    e.preventDefault()
    if (!tarea.trim()) {
      setError('Escriba algo por favor')
      return
    }

    
    const arrayEditado = tareas.map(
      item => item.id === id ? {id, NombreTarea: tarea}:item
      )

      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('') //relaciono el nombre de la tarea con el campo
      setId('') //aqui ya puedo usar el id
      setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center" >CRUD simple de Fredy</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {

              tareas.length === 0 ? (
                  <li className="list-group-item">No hay tareas</li>
              ) : (
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
              ) 
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
            onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e => setTarea(e.target.value))} //relacion de input con el estado
              value={tarea}
            />

            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
               
              )
            }

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
