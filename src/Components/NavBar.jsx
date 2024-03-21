import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = ({ onBusquedaClick, onFiltroChange, openModal }) => {

  const handlerFiltroChange = (event) => {
    onFiltroChange(event.target.value);
  };

  const handlerBusquedaClick = (event) => {
    event.preventDefault();
    onBusquedaClick();
  };

  const handlerOpenModal = (op) => {
    openModal(op);
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

              <div className="btn-group dropup">
                <Link to={'/categorias'} className="nav-link active" aria-current="page" href="#">Categorias</Link>
                <li className="btn  dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </li>
                <ul className="dropdown-menu">
                  <li><Link to={'/novelas'} className="dropdown-item" href="#">Novelas</Link></li>
                  <li><Link to={'/terror'} className="dropdown-item" href="#">Terror</Link></li>
                  <li><Link to={'/drama'} className="dropdown-item" href="#">Drama</Link></li>
                  <li><Link to={'/enciclopedias'} className="dropdown-item" href="#">Enciclopedias</Link></li>
                </ul>
              </div>

              <li className="nav-item">
                <Link to={'/reservas'} className="nav-link active" href="#">Reservas</Link>
              </li>
              <li className="nav-item">
                <Link to={'/usuarios'} className="nav-link active" href="#" aria-disabled="true">Usuarios</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="text" onChange={handlerFiltroChange} placeholder="Buscar: id, titulo, autor, estado" aria-label="Search"></input>
              <button className="btn btn-outline-success" onClick={handlerBusquedaClick} >Search</button>
            </form>
          </div>
        </div>
      </nav>

    </>
  )
}
