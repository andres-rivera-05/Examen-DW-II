import React, { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import axios from 'axios'

export const Reservas = () => {
  const [reservas,setReservas]= useState([])
  const [cambioEstado, setCambioEstado] = useState(0);
  const [usuario_id, setUsuarioId] = useState('')
  const [libro_id, setLibroId] = useState('')
  const [fechaCreacion, setFechaCreacion] = useState('')
  const [fechaDevolucion, setFechaDevolucion] = useState('')
  const [estado, setEstado] = useState('')
  const [alerta, setAlerta] = useState('')
  const [operacition, setOperation] = useState('')
  const [id, setId] = useState('')

  const getReservas =  async() => {
    const url ="http://localhost:5000/api/reserva"
    const result = await axios.get(url)
    setReservas(result.data)
  }

  useEffect(()=>{
    getReservas()
  }, [cambioEstado])


  const openModal = (operacion, id, usuario, libro, fechaCreacion, fechaDevolucion, estado) => {
    if (operacion === 1) {
      setUsuarioId('')
      setLibroId('')
      setFechaCreacion('')
      setFechaDevolucion('')
      setEstado('')
      setAlerta('')
      setOperation(operacion)
    } else {
      setId(id)
      setUsuarioId(usuario)
      setLibroId(libro)
      setFechaCreacion(fechaCreacion)
      setFechaDevolucion(fechaDevolucion)
      setEstado(estado)
      setOperation(operacion)
    }

  };

  const validar = async () => {
    if (operacition === 2) {
      const url = `http://localhost:5000/api/reserva/${id}`
      if (usuario_id.length === 0 || libro_id.length === 0 || fechaCreacion.length === 0 || fechaDevolucion.length === 0 || estado.length === 0) {
        setAlerta("Completa todos los campos!")
        return
      }

      const data = {
        usuario_id: usuario_id,
        libro_id: libro_id,
        fecha_reserva: fechaCreacion,
        fecha_devolucion: fechaDevolucion,
        estado: estado
      }

      await axios.put(url, data)
      setAlerta("Editado Exitosamente")
      setCambioEstado(prevState => prevState + 1)
    } else {
      const url = "http://localhost:5000/api/reserva"
      if (usuario_id.length === 0 || libro_id.length === 0 || fechaCreacion.length === 0 || fechaDevolucion.length === 0 || estado.length === 0) {
        setAlerta("Completa todos los campos!")
        return
      }

      const data = {
        usuario_id: usuario_id,
        libro_id: libro_id,
        fecha_reserva: fechaCreacion,
        fecha_devolucion: fechaDevolucion,
        estado: estado
      }

      await axios.post(url, data)
      setAlerta("Agregado Exitosamente")
      setCambioEstado(prevState => prevState + 1)
      setUsuarioId('')
      setLibroId('')
      setFechaCreacion('')
      setFechaDevolucion('')
      setEstado('')
    }
  };


  const closeClick = () => {
    setId('')
    setUsuarioId('')
    setLibroId('')
    setFechaCreacion('')
    setFechaDevolucion('')
    setEstado('')
    setAlerta('')
  };

  const borrarReserva = async (id) =>{
    const url = `http://localhost:5000/api/reserva/${id}`
    await axios.delete(url)
    setCambioEstado(prevState => prevState + 1)
  }

  return (
    <>
      <div className='container col-12 mt-5'>
        <h1 className='text-center text-white'>Sistema Biblioteca - Reservas</h1>
        <div className='mt-5'>
          <NavBar openModal={(operacion) => openModal(operacion)}/>
        </div>

        <table className='table table-bordered border-secondary'>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Libro</th>
              <th scope="col">Fecha Reserva</th>
              <th scope="col">Fecha Devoluvion</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((item) => (

              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre_usuario}</td>
                <td>{item.nombre_libro}</td>
                <td>{item.fecha_reserva}</td>
                <td>{item.fecha_devolucion}</td>
                <td>{item.estado}</td>
                <td className='text-center'>
                  <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#openModal" onClick={() => { openModal(2, item.id, item.id_usuario, item.id_libro, item.fecha_reserva, item.fecha_devolucion, item.estado)}} ><i className='fa-solid fa-pen-to-square'></i></button>
                  <button className='btn btn-danger' onClick={() => borrarReserva(item.id)}><i className='fa-solid fa-trash-can'></i></button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="openModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Crear Reserva</h1>
              <button type="button" onClick={() => closeClick()} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="hidden" readOnly value={id}></input>
              <div className="input-group mb-3">
                <div className="input-group-text"><span className='fa-solid fa-book'></span></div>
                <input type="text" className="form-control" value={libro_id} onChange={(e)=>setLibroId(e.target.value)} id="book" placeholder="ID Libro"></input>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-text"><span className='fa-solid fa-user'></span></div>
                <input type="text" className="form-control" value={usuario_id} onChange={(e) => setUsuarioId(e.target.value)} id="autor" placeholder="ID Usuario"></input>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-text"><span className='fa-solid fa-calendar-days'></span></div>
                <input type="text" className="form-control" value={fechaCreacion} onChange={(e) => setFechaCreacion(e.target.value)} id="Ano" placeholder="Fecha Reserva"></input>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-text"><span className='fa-solid fa-calendar-days'></span></div>
                <input type="text" className="form-control" value={fechaDevolucion} onChange={(e) => setFechaDevolucion(e.target.value)} id="Ano" placeholder="Fecha Devolucion"></input>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-text"><span className='fa-solid fa-toggle-on'></span></div>
                <input type="text" className="form-control" value={estado} onChange={(e) => setEstado(e.target.value)} id="estado" placeholder="Estado Disponible / Reservado"></input>
              </div>

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
