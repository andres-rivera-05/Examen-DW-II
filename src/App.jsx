import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Home } from './Components/Home'
import { NavBar } from './Components/NavBar'
import { Usuarios } from './Components/Usuarios'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/navbar' element={<NavBar />} />
      <Route path='/usuarios' element={<Usuarios />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App