import React, { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import axios from 'axios'

export const Categorias = () => {

  const [dataCategorias, setCategoria] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [contador, setContador] = useState(0)

  console.log(contador)

  const categoriaOp = async (op) => {
    try {
      let url = "http://localhost:5000/api/libro/categoria";
      if (op) {
        url = `http://localhost:5000/api/libro/categoria/${op}`
      } 
      console.log("valor del op: ", op)
      console.log(url)
      const result = await axios.get(url)
      setCategoria(result.data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    categoriaOp()
  }, [contador])

  return (
    <>
      <div className='container col-10 mt-5'>
        <h1 className='text-center text-white'>Sistema Biblioteca - Categorias</h1>
        <div className='mt-5'>
          <NavBar
            categoriaOp={(op) => categoriaOp(op)}
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
                  <th scope="col">Categoria</th>
                </tr>
              </thead>
              <tbody>
                {
                  dataCategorias.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.titulo}</td>
                      <td>{item.autor}</td>
                      <td>{item.anio_publicacion}</td>
                      <td>{item.estado}</td>
                      <td >{item.nombre_categoria}</td>
                    </tr>
                  )
                  )
                }
              </tbody>
            </table>
          )
        }
      </div>
    </>
  )
}
