/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Usuarios from './screen/Usuarios';
import Provedores from './screen/Provedores';
import InicioDash from "./screen/InicioDash";
import Sucursales from "./screen/Sucursales";
import logotipo from './img/logo1.png';
import Productos from "./screen/Productos";
import Inventario from "./screen/Inventario";
import Buscador2 from "./screen/buscador2";
import Login from "./screen/Login";


function App() {
  return (
    <div className="App">
      <Router>
        <header className="bg-dark text-white">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link className="navbar-brand text-white" to="/inicioDash">
                <img src={logotipo} alt="Logo" width="35" height="30" className="d-inline-block align-text-top" />
              </Link>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://static.thenounproject.com/png/2367782-200.png" alt="John Doe" className="rounded-circle" width="40" height="40" />
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><button className="dropdown-item" onClick={() => window.location.href = "cerrar_sesion.php"}>Cerrar Sesión</button></li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/inicioDash" className='nav-link'>Inicio</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/usuarios" className='nav-link'>Usuarios</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/provedores" className='nav-link'>Proveedores</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/sucursales" className='nav-link'>Sucursales</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/productos" className='nav-link'>Productos</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/inventario" className='nav-link'>Inventario</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/buscador2" className='nav-link'>Buscador Dinamico Filtros</Link>
                  </li>

                </ul>
              </div>
            </nav>

            <main role="main" className="col-md-10 px-md-4">
              <Routes>
                <Route path="/inicioDash" element={<InicioDash />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/provedores" element={<Provedores />} />
                <Route path="/sucursales" element={<Sucursales />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/inventario" element={<Inventario />} />
                <Route path="/buscador2" element={<Buscador2 />} />

              </Routes>
            </main>
          </div>
        </div>

        <footer className="w-100 d-flex align-items-center justify-content-center bg-dark text-white">
          <p className="fs-5 px-3 pt-3">New Era &copy; Emmanuel Zuñiga 2024</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
