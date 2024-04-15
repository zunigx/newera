/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function Usuarios() {
  const [nombre1, setNombre1] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [estatus, setEstatus] = useState("");
  const [id_perfil, setId_perfil] = useState("");
  const [id_usuario, setId_usuario] = useState("");
  const [editar, setEditar] = useState(false);
  const [usuariosList, setUsuarios] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre1: nombre1,
      apellido1: apellido1,
      usuario: usuario,
      clave: clave,
      estatus: estatus,
      id_perfil: id_perfil,
    })
      .then(() => {
        getUsuarios();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso!!!</strong>",
          html: "<i>El usuario <strong>" + usuario + "</strong> fue registrado con éxito!!!</i>",
          icon: 'success',
          timer: 3000
        });
      })
      .catch((error) => {
        let errorMessage = error.response ? error.response.data.message : "Error de red";
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id_usuario: id_usuario,
      nombre1: nombre1,
      apellido1: apellido1,
      usuario: usuario,
      clave: clave,
      estatus: estatus,
      id_perfil: id_perfil,
    })
      .then(() => {
        getUsuarios();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización exitosa!!!</strong>",
          html: "<i>El usuario <strong>" + usuario + "</strong> fue actualizado con éxito!!!</i>",
          icon: 'success',
          timer: 3000
        });
      })
      .catch((error) => {
        let errorMessage = error.response ? error.response.data.message : "Error de red";
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      });
  };

  const updateBaja = (val) => {
    Axios.put(`http://localhost:3001/updateBaja/${val.id_usuario}`)
      .then(() => {
        getUsuarios();
        Swal.fire({
          icon: 'success',
          title: "<strong>Baja exitosa!!!</strong>",
          html: `<i>El usuario <strong>${val.usuario}</strong> ha sido dado de baja!!</i>`,
          timer: 3000,
          showConfirmButton: true
        });
      })
      .catch((error) => {
        let errorMessage = error.response ? error.response.data.message : "Error de red";
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      });
  };

  const updateAlta = (val) => {
    Axios.put(`http://localhost:3001/updateAlta/${val.id_usuario}`)
      .then(() => {
        getUsuarios();
        Swal.fire({
          icon: 'success',
          title: "<strong>Alta exitosa!!!</strong>",
          html: `<i>El usuario <strong>${val.usuario}</strong> ha sido dado de alta!!</i>`,
          timer: 3000,
          showConfirmButton: true
        });
      })
      .catch((error) => {
        let errorMessage = error.response ? error.response.data.message : "Error de red";
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      });
  };

  const deleteUsu = (val) => {
    Swal.fire({
      title: "<strong>Eliminar</strong>",
      html: "<i>¿Realmente desea eliminar a <strong>" + val.usuario + "</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
    }).then(result => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id_usuario}`)
          .then(() => {
            getUsuarios();
            limpiarCampos();
            Swal.fire({
              icon: 'success',
              title: val.usuario + ' fue eliminado.',
              showConfirmButton: false,
              timer: 3000,
            });
          })
          .catch((error) => {
            let errorMessage = error.response ? error.response.data.message : "Error de red";
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: errorMessage
            });
          });
      }
    });
  };

  const limpiarCampos = () => {
    setNombre1("");
    setApellido1("");
    setUsuario("");
    setClave("");
    setEstatus("");
    setId_perfil("");
    setId_usuario("");
    setEditar(false);
  };

  const editarUsuario = (val) => {
    setEditar(true);
    setNombre1(val.nombre1);
    setApellido1(val.apellido1);
    setUsuario(val.usuario);
    setClave(val.clave);
    setEstatus(val.estatus);
    setId_perfil(val.id_perfil);
    setId_usuario(val.id_usuario);
  };

  const getUsuarios = () => {
    Axios.get("http://localhost:3001/usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        let errorMessage = "Error de red";
        if (error.response) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      });
  };

  useEffect(() => {
    getUsuarios();
  }, []); 



  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Usuarios</h1>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Nombre:</span>
                  <input type="text" 
                    onChange={(event)=>{setNombre1(event.target.value);}}
                    className="form-control" value={nombre1} placeholder="Ingrese Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Apellidos:</span>
                  <input type="text" 
                    onChange={(event)=>{setApellido1(event.target.value);}}
                    className="form-control" value={apellido1} placeholder="Ingrese Apellidos" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Usuario:</span>
                  <input type="text" 
                    onChange={(event)=>{setUsuario(event.target.value);}}
                    className="form-control" value={usuario} placeholder="Ingrese Usuario" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Clave:</span>
                  <input type="text" 
                    onChange={(event)=>{setClave(event.target.value);}} 
                    className="form-control" value={clave} placeholder="Ingrese Clave" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Estatus:</span>
                  <input type="number" 
                    onChange={(event)=>{setEstatus(event.target.value);}}
                    className="form-control" value={estatus} placeholder="Ingrese Estatus" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Perfil:</span>
                  <input type="number" 
                    onChange={(event)=>{setId_perfil(event.target.value);}}
                    className="form-control" value={id_perfil} placeholder="Ingrese Perfil" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
              </div>
              <div className="card-footer">
                {
                  editar?
                  <div>
                    <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
                    <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                  </div>
                  :<button className='btn btn-success ' onClick={add}>Registrar</button>
                }
              </div>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Clave</th>
                    <th scope="col">Estatus</th>
                    <th scope="col">Perfil</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosList.map((val, key) => (
                    <tr key={val.id_usuario}>
                      <th scope="row">{val.id_usuario}</th>
                      <td>{val.nombre1}</td>
                      <td>{val.apellido1}</td>
                      <td>{val.usuario}</td>
                      <td>{val.clave}</td>
                      <td>{val.estatus}</td>
                      <td>{val.id_perfil}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Acciones">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => editarUsuario(val)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => updateAlta(val)}
                          >
                            Alta
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => updateBaja(val)} 
                          >
                            Baja
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteUsu(val)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;
