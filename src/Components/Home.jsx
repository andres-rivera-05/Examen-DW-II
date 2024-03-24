import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavBar } from './NavBar';
import { borrarLibro, obtenerLibros } from '../Services/Funciones.js';

export const Home = () => {

  const [dataLibros, setDataLibros] = useState([]);
  const [cambioEstado, setCambioEstado] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [nombre, setNombre] = useState('')
  const [autor, setAutor] = useState('')
  const [anio, setAnio] = useState('')
  const [estado, setEstado] = useState('')
  const [id, setId] = useState('')
  const [alerta, setAlerta] = useState('')
  const [operacition, setOperation] = useState('')
  const [categoria, setCategoria] = useState('')

  console.log(categoria)
  useEffect(() => {
    const fetchDatda = async () => {
      try {
        const libros = await obtenerLibros();
        setDataLibros(libros)
      } catch (err) {
        console.error("Error al obtener datos:", err);
      } finally {
        setIsLoading(false)
      }
    }
    fetchDatda();
  }, [cambioEstado])

  const handlerFiltroChange = (value) => {
    setFiltro(value);
    if (value.trim() === '') {
      setBusquedaRealizada(false)
      setNoResultados(false)
    }
  };

  const handlerBorrarLibro = async (idLibro) => {
    try {
      await borrarLibro(idLibro, setCambioEstado)
    } catch (error) {
      console.error("Error al borrar libro:", error);
    }
  };

  const openModal = (operacion, id, name, autor, anio, estado, categoria) => {
    if (operacion === 1) {
      setNombre('')
      setAutor('')
      setAnio('')
      setEstado('')
      setAlerta('')
      setCategoria('')
      setOperation(operacion)
    }else{
      setId(id)
      setNombre(name)
      setAutor(autor)
      setAnio(anio)
      setEstado(estado)
      setCategoria(categoria)
      setOperation(operacion)
    }

  };

  const validar = async () => {
    if (operacition === 2) {
      const url = `http://localhost:5000/api/libro/${id}`
      if (nombre.length === 0 || autor.length === 0 || anio.length === 0 || estado.length === 0) {
        setAlerta("Completa todos los campos!")
        return
      }

      const data = {
        titulo: nombre,
        autor: autor,
        anio_publicacion: anio,
        estado: estado,
        categoria_id : categoria
      }

      await axios.put(url, data)
      setAlerta("Editado Exitosamente")

    } else {
      const url = "http://localhost:5000/api/libro"
      if (nombre.length === 0 || autor.length === 0 || anio.length === 0 || estado.length === 0) {
        setAlerta("Completa todos los campos!")
        return
      }

      const data = {
        titulo: nombre,
        autor: autor,
        anio_publicacion: anio,
        estado: estado,
        categoria_id: categoria
      }

      await axios.post(url, data)
      setAlerta("Agregado Exitosamente")
      setCambioEstado(prevState => prevState + 1)
      setNombre('')
      setAutor('')
      setAnio('')
      setEstado('')
      setCategoria('')
    }
  };

  const closeClick = () => {
    setId('')
    setNombre('')
    setAutor('')
    setAnio('')
    setEstado('')
    setAlerta('')
  };


  return (
    <>
      <div className='container col-10 mt-5'>
        <h1 className='text-center text-white'>Sistema Biblioteca</h1>
        <div className='mt-5'>
          <NavBar
            openModal={(operacion) => openModal(operacion)}></NavBar>
        </div>

        {
          isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table className='table table-bordered border-secondary'>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Libros</th>
                  <th scope="col">Autor</th>
                  <th scope="col">Ano Publicacion</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {                 
                    dataLibros.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.titulo}</td>
                        <td>{item.autor}</td>
                        <td>{item.anio_publicacion}</td>
                        <td>{item.estado}</td>
                        <td className='text-center'>
                          <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#openModal" onClick={() => openModal(2, item.id, item.titulo, item.autor, item.anio_publicacion, item.estado, item.categoria_id)}><i className='fa-solid fa-pen-to-square'></i></button>
                          <button className='btn btn-danger' onClick={() => handlerBorrarLibro(item.id)}><i className='fa-solid fa-trash-can'></i></button>
                        </td>
                      </tr>
                    )               
                  )
                }
              </tbody>
            </table>
          )
        }
      </div>

      <div className="modal fade" id="openModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Libro</h1>
              <button type="button" onClick={() => closeClick()} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="hidden" readOnly value={id}></input>
              <div className="input-group mb-3">
                <div className="input-group-text"><span className='fa-solid fa-book'></span></div>
                <input type="text" className="form-control" id="book" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre"></input>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-text"><span className='fa-solid fa-user'></span></div>
                <input type="text" className="form-control" id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Autor"></input>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-text"><span className='fa-solid fa-calendar-days'></span></div>
                <input type="text" className="form-control" id="Ano" value={anio} onChange={(e) => setAnio(e.target.value)} placeholder="Ano publicacion"></input>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-text"><span className='fa-solid fa-toggle-on'></span></div>
                <input type="text" className="form-control" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} placeholder="Estado Disponible / Reservado"></input>
              </div>
              <select className="form-select" value={categoria} onChange={(e)=>setCategoria(e.target.value)} aria-label="Default select example">
                <option selected>Categoria</option>
                <option value="1">Ficcion</option>
                <option value="2">Novelas</option>
                <option value="3">Terror</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => closeClick()} data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={() => validar()}>Guardar</button>
              <div className="input-group mb-3">
                <div className="alertaInfo mx-auto">{alerta}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
