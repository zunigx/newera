/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function Proveedores() {
  const [nombreProv, setNombreProv] = useState("");
  const [estatus, setEstatus] = useState("");
  const [editar, setEditar] = useState(false);
  const [id_provedor, setId_provedor] = useState("");
  const [provedoresList, setProveedoresList] = useState([]);

  const createProve = () => {
    Axios.post("http://localhost:3001/createProve", {
      nombreProv: nombreProv,
      estatus: estatus
    })
      .then(() => {
        getProveedores();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso!!!</strong>",
          html: "<i>El proveedor <strong>" + nombreProv + "</strong> fue registrado con éxito!!!</i>",
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

  const updateProve = () => {
    Axios.put("http://localhost:3001/updateProve", {
      id_provedor: id_provedor,
      nombreProv: nombreProv,
      estatus: estatus
    })
      .then(() => {
        getProveedores();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización exitosa!!!</strong>",
          html: "<i>El proveedor <strong>" + nombreProv + "</strong> fue actualizado con éxito!!!</i>",
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

  const updateBajaProve = (id_provedor) => {
    Axios.put(`http://localhost:3001/updateBajaProve/${id_provedor}`)
      .then(() => {
        getProveedores();
        Swal.fire({
          icon: 'success',
          title: "<strong>Baja exitosa!!!</strong>",
          html: `<i>El provedor ha sido dado de baja!!</i>`,
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

  const updateAltaProve = (id_provedor) => {
    Axios.put(`http://localhost:3001/updateAltaProve/${id_provedor}`)
      .then(() => {
        getProveedores();
        Swal.fire({
          icon: 'success',
          title: "<strong>Alta exitosa!!!</strong>",
          html: `<i>El proveedor a sido dado de alta!!</i>`,
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

  const deleteProv = (id_provedor) => {
    Swal.fire({
      title: "<strong>Eliminar</strong>",
      html: "<i>¿Realmente desea eliminar a este proveedor?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
    }).then(result => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteProv/${id_provedor}`)
          .then(() => {
            getProveedores();
            limpiarCampos();
            Swal.fire({
              icon: 'success',
              title: 'Proveedor eliminado.',
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
    setNombreProv("");
    setEstatus("");
    setEditar(false);
  };

  const editarProveedor = (proveedor) => {
    setEditar(true);
    setNombreProv(proveedor.nombreProv);
    setEstatus(proveedor.estatus);
    setId_provedor(proveedor.id_provedor);
  };

  const getProveedores = () => {
    Axios.get("http://localhost:3001/Provedores")
      .then((response) => {
        setProveedoresList(response.data);
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
    getProveedores();
  }, []); 

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Provedores</h1>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Nombre del Proveedor:</span>
                  <input type="text" 
                    onChange={(event)=>{setNombreProv(event.target.value);}}
                    className="form-control" value={nombreProv} placeholder="Ingrese el nombre del proveedor" aria-label="Nombre del Proveedor" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Estatus:</span>
                  <input type="text" 
                    onChange={(event)=>{setEstatus(event.target.value);}}
                    className="form-control" value={estatus} placeholder="Ingrese el estatus" aria-label="Estatus" aria-describedby="basic-addon1"/>
                </div>
              </div>
              <div className="card-footer">
                {
                  editar?
                  <div>
                    <button className='btn btn-warning m-2' onClick={updateProve}>Actualizar</button> 
                    <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                  </div>
                  :<button className='btn btn-success ' onClick={createProve}>Registrar</button>
                }
              </div>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre del Proveedor</th>
                    <th scope="col">Estatus</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {provedoresList.map((val, key) => (
                    <tr key={val.id_provedor}>
                      <th scope="row">{val.id_provedor}</th>
                      <td>{val.nombreProv}</td>
                      <td>{val.estatus}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Acciones">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => editarProveedor(val)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => updateAltaProve(val.id_provedor)}
                          >
                            Alta
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => updateBajaProve(val.id_provedor)} 
                          >
                            Baja
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteProv(val.id_provedor)}
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

export default Proveedores;
