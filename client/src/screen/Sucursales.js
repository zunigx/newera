import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sucursales() {
  const [imagen_Sucursal, setImagen_Sucursal] = useState("");
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estatus, setEstatus] = useState("");
  const [editar, setEditar] = useState(false);
  const [id_sucursal, setId_sucursal] = useState("");
  const [sucursalesList, setSucursalesList] = useState([]);

  const createSucursal = () => {
    Axios.post("http://localhost:3001/createSuc", {
      imagen_Sucursal: imagen_Sucursal,
      nombre: nombre,
      estado: estado,
      direccion: direccion,
      telefono: telefono,
      estatus: estatus
    })
      .then(() => {
        getSucursales();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso!!!</strong>",
          html: "<i>La sucursal <strong>" + nombre + "</strong> fue registrada con éxito!!!</i>",
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

  const updateSucursal = () => {
    Axios.put("http://localhost:3001/updateSuc", {
      id_sucursal: id_sucursal,
      imagen_Sucursal: imagen_Sucursal,
      nombre: nombre,
      estado: estado,
      direccion: direccion,
      telefono: telefono,
      estatus: estatus
    })
      .then(() => {
        getSucursales();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización exitosa!!!</strong>",
          html: "<i>La sucursal <strong>" + nombre + "</strong> fue actualizada con éxito!!!</i>",
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

  const updateBajaSucursal = (id_sucursal) => {
    Axios.put(`http://localhost:3001/updateBajaSuc/${id_sucursal}`)
      .then(() => {
        getSucursales();
        Swal.fire({
          icon: 'success',
          title: "<strong>Baja exitosa!!!</strong>",
          html: `<i>La sucursal ha sido dada de baja!!</i>`,
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

  const updateAltaSucursal = (id_sucursal) => {
    Axios.put(`http://localhost:3001/updateAltaSuc/${id_sucursal}`)
      .then(() => {
        getSucursales();
        Swal.fire({
          icon: 'success',
          title: "<strong>Alta exitosa!!!</strong>",
          html: `<i>La sucursal ha sido dada de alta!!</i>`,
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

  const deleteSucursal = (id_sucursal) => {
    Swal.fire({
      title: "<strong>Eliminar</strong>",
      html: "<i>¿Realmente desea eliminar esta sucursal?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!',
    }).then(result => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteSuc/${id_sucursal}`)
          .then(() => {
            getSucursales();
            limpiarCampos();
            Swal.fire({
              icon: 'success',
              title: 'Sucursal eliminada.',
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
    setImagen_Sucursal("");
    setNombre("");
    setEstado("");
    setDireccion("");
    setTelefono("");
    setEstatus("");
    setEditar(false);
  };

  const editarSucursal = (sucursal) => {
    setEditar(true);
    setImagen_Sucursal(sucursal.imagen_Sucursal);
    setNombre(sucursal.nombre);
    setEstado(sucursal.estado);
    setDireccion(sucursal.direccion);
    setTelefono(sucursal.telefono);
    setEstatus(sucursal.estatus);
    setId_sucursal(sucursal.id_sucursal);
  };

  const getSucursales = () => {
    Axios.get("http://localhost:3001/Sucursales")
      .then((response) => {
        setSucursalesList(response.data);
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
    getSucursales();
  }, []); 

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Sucursales</h1>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Imagen de la Sucursal:</span>
                  <input type="text" 
                    onChange={(event)=>{setImagen_Sucursal(event.target.value);}}
                    className="form-control" value={imagen_Sucursal} placeholder="Ingrese la URL de la imagen" aria-label="Imagen de la Sucursal" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Nombre de la Sucursal:</span>
                  <input type="text" 
                    onChange={(event)=>{setNombre(event.target.value);}}
                    className="form-control" value={nombre} placeholder="Ingrese el nombre de la sucursal" aria-label="Nombre de la Sucursal" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Estado:</span>
                  <input type="text" 
                    onChange={(event)=>{setEstado(event.target.value);}}
                    className="form-control" value={estado} placeholder="Ingrese el estado" aria-label="Estado" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Dirección:</span>
                  <input type="text" 
                    onChange={(event)=>{setDireccion(event.target.value);}}
                    className="form-control" value={direccion} placeholder="Ingrese la dirección" aria-label="Dirección" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Teléfono:</span>
                  <input type="text" 
                    onChange={(event)=>{setTelefono(event.target.value);}}
                    className="form-control" value={telefono} placeholder="Ingrese el teléfono" aria-label="Teléfono" aria-describedby="basic-addon1"/>
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
                    <button className='btn btn-warning m-2' onClick={updateSucursal}>Actualizar</button> 
                    <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                  </div>
                  :<button className='btn btn-success ' onClick={createSucursal}>Registrar</button>
                }
              </div>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Estatus</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sucursalesList.map((val, key) => (
                    <tr key={val.id_sucursal}>
                      <th scope="row">{val.id_sucursal}</th>
                      <td><img alt="Logo" width="80" height="80" className="d-inline-block align-text-top" src={val.imagen_Sucursal} /></td>
                      <td>{val.nombre}</td>
                      <td>{val.estado}</td>
                      <td>{val.direccion}</td>
                      <td>{val.telefono}</td>
                      <td>{val.estatus}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Acciones">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => editarSucursal(val)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => updateAltaSucursal(val.id_sucursal)}
                          >
                            Alta
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => updateBajaSucursal(val.id_sucursal)} 
                          >
                            Baja
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteSucursal(val.id_sucursal)}
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

export default Sucursales;
