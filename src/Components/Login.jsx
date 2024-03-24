import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const Login = () => {

  const [nombre, setNombre] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState()
  const navigate = useNavigate()

  const submitHandler = async () => {
    const url = `http://localhost:5000/api/usuario/auth/${nombre}/${contrasena}`

    try {
      await axios.get(url)
      navigate('/')
    } catch (err) {
      setMensaje("Credenciales Incorrectas!")
      console.error(err)
    }

  }
  return (
    <>
      <div className='container'>
        <div className="row mx-auto">
          <div className="col-5 mx-auto mt-5">
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor='nombre' className="form-label">Nombre Usuario</label>
                <input type="text" className="form-control" name='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Contrasena</label>
                <input type="password" name='contrasenia' value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="form-control" />
              </div>
            </form>
            <div className="d-grid gap-2 d-md-flex">
              <button type="button" className="btn btn-primary w-100" onClick={() => submitHandler()}>Iniciar Session</button>
            </div>
            <div className='mensaje text-center mt-3 mb-3'>{mensaje}</div>
          </div>
        </div>
      </div>
    </>
  )
}
