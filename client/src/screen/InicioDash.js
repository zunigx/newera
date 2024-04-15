/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function InicioDash() {
  return (
    <div style={{ minHeight: "100vh", position: "relative", paddingBottom: "50px" }}>
      <div className="container-fluid">
        <div className="row">
        <main className="col-lg-10 p-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Bienvenido Administrador</h1>
            </div>
            <h1>Panel de Control</h1> 
                <img src="https://cdn.pixabay.com/photo/2019/10/15/09/06/control-4551114_1280.png" alt="John Doe"  width="80" height="50"/>
                <br></br>
                <br></br>  
                <strong>Nombre del Administrador</strong> 
                <p>Emmanuel Zuñiga Suarez</p> 
                <strong>Grupo:</strong>  
                <p>T219</p>
                <strong>Matricula:</strong>
                <p>2022371089</p>  
                <strong>Universidad:</strong>
                <p>Universidad Tecnologica de Queretaro (UTEQ)</p>  
                <a href="Grafica_Dinam.php" className="btn btn-outline-danger">Graficas Dinamicas</a>
                <a href="index.php" className="btn btn-outline-warning">Buscador Dinamico</a>
        </main>
        </div>
        </div>
    </div>
  );
}

export default InicioDash;
