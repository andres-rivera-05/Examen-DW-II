import React,{useState, useEffect} from 'react'
import { NavBar } from './NavBar'
import axios from 'axios'

export const Usuarios = () => {

  const [ TablaUsers, setTablaUsers ] = useState([])

  const url ="http://localhost:5000/api/usuario"

  const getUsuarios = async () => {
    const result = await axios.get(url)
    setTablaUsers(result.data)
  }

  useEffect(()=>{
    getUsuarios();
  },[])

   
  return (
    <>
      <div className='container col-12 mt-5'>
        <h1 className='text-center text-white'>Sistema Biblioteca - Usuarios</h1>
        <div className='mt-5'>
          <NavBar></NavBar>
        </div>

        <table className='table table-bordered border-secondary'>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Avatar</th>
              <th scope="col">Nombre</th>
              <th scope="col">Gmail</th>
              <th scope="col">Reservas</th>
            </tr>
          </thead>
          <tbody>
            {TablaUsers.map((item) => (

              <tr key={item.id}>
                <td>{item.id}</td>
                <td className='td-img'>
                  <img className='avatar' src={`data:${item.mime_type};base64,${item.imagen}`} width={50} alt="avatar"/>
                </td>
                <td>{item.nombre}</td>
                <td>{item.gmail}</td>
                <td>{item.total_reservas}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
