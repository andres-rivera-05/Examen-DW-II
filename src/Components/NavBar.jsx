import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = ({ openModal, categoriaOp }) => {

  const handlerOpenModal = (op) => {
    openModal(op);
  }

  const handlerCategoriaOp = (categoriaOpcion) => {
    categoriaOp(categoriaOpcion)
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">Biblioteca</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


              <div className="btn-group dropup">
                <Link to={'/'} className="nav-link active" aria-current="page" href="#">Libros <button className='btn btn-success btn-add' data-bs-toggle="modal" data-bs-target="#openModal" onClick={() => handlerOpenModal(1)}><i className='fa-solid fa-circle-plus'></i></button></Link>
              </div>

              <div className="btn-group">
                <Link to={'/categorias'} className="nav-link active" aria-current="page" href="#">Categorias</Link>
                <li className="btn  dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </li>
                <ul className="dropdown-menu">
                  <li onClick={() => handlerCategoriaOp(1)} className="dropdown-item">Ficcion</li>
                  <li onClick={() => handlerCategoriaOp(2)} className="dropdown-item">Novela</li>
                  <li onClick={() => handlerCategoriaOp(3)} className="dropdown-item">Historia</li>
                  <li onClick={() => handlerCategoriaOp(4)}  className="dropdown-item">Ciencia</li>
                </ul>
              </div>

              <li className="nav-item">
                <Link to={'/reservas'} className="nav-link active" href="#">Reservas <button className='btn btn-success btn-add' data-bs-toggle="modal" data-bs-target="#openModal" onClick={() => handlerOpenModal(1)}><i className='fa-solid fa-circle-plus'></i></button></Link>
              </li>
              <li className="nav-item">
                <Link to={'/usuarios'} className="nav-link active" href="#" aria-disabled="true">Usuarios</Link>
              </li>
            </ul>       
          </div>
        </div>
      </nav>

    </>
  )
}
