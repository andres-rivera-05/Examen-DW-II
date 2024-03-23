import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Registro = () => {

    const [Form, setForm] = useState({ nombre: '', gmail: '', imagen: '', contrasenia: '' })
    const [mensaje, setMensaje] = useState('')

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === "imagen") {
            const img = e.target.files[0];
            setForm({ ...Form, [name]: img });
            return
        }
        setForm({ ...Form, [name]: value });
    }

    const submitHandler = async (event) => {
        try {
            if (Form.nombre.length === 0 || Form.gmail.length === 0 ||
                Form.imagen.length === 0 || Form.contrasenia.length === 0) {
                setMensaje("completa los campos")
                return
            }

            event.preventDefault();
            const url = "http://localhost:5000/api/usuario"
            const dataFormulario = new FormData()

            dataFormulario.append("nombre", Form.nombre);
            dataFormulario.append("gmail", Form.gmail);
            dataFormulario.append("imagen", Form.imagen)
            dataFormulario.append("contrasenia", Form.contrasenia)
            await axios.post(url, dataFormulario)
            setMensaje("Usuario Registrado!")
        } catch (err) {
            console.log(err)
            setMensaje("ocurrio un error!")
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
                                <input type="text" className="form-control" name='nombre' onChange={onChangeHandler} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Correo electronico</label>
                                <input type="email" name='gmail' onChange={onChangeHandler} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Contrasena</label>
                                <input type="password" name='contrasenia' onChange={onChangeHandler} className="form-control" />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="formFileLg" className="form-label">Foto de perfil</label>
                                <input className="form-control form-control-lg" onChange={onChangeHandler} name='imagen' type="file" />
                            </div>

                        </form>
                        <div class="d-grid gap-2 d-md-flex">
                            <button type="button" className="btn btn-primary w-50" onClick={submitHandler}>Registrar</button>
                            <button type="button" className="btn btn-primary w-50">Limpiar</button>
                        </div>
                        <div className='mensaje'>{mensaje}</div>
                    </div>
                </div>
            </div>

        </>
    )
}
