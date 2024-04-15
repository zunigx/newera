import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function Inventario() {
const [id_inventario, setIdinventario] = useState("");
const [existencias, setExistencias] = useState("");
const [minimo, setMinimo] = useState("");
const [maximo, setMaximo] = useState("");
const [id_producto, setIdProducto] = useState("");
const [id_sucursal, setIdSucursal] = useState("");
const [id_provedor, setId_Provedor] = useState("");
const [editar, setEditar] = useState(false);
const [productosList, setProductosList] = useState([]);
const [sucursalesList, setSucursalesList] = useState([]);
const [provedoresList, setProveedoresList] = useState([]);
const [inventarioList, setInventarioList] = useState([]);

const createInventario = () => {
    Axios.post("http://localhost:3001/createInventario", {
        existencias: existencias,
        minimo: minimo,
        maximo: maximo,
        id_producto: id_producto,
        id_sucursal: id_sucursal,
        id_provedor: id_provedor,
    })
    .then(() => {
        getInventario();
        limpiarCampos();
        Swal.fire({
            title: "<strong>Registro exitoso!!!</strong>",
            html: "<i>El inventario fue registrado con éxito!!!</i>",
            icon: 'success',
            timer: 3000
        });
    })
    .catch((error) => {
        let errorMessage = error.response ? error.response.data : "Error de red";
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage
        });
    });
};


const updateInventario = () => {
    Axios.put("http://localhost:3001/updateInventario", {
    id_inventario: id_inventario,
    existencias: existencias,
    minimo: minimo,
    maximo: maximo,
    id_producto: id_producto,
    id_sucursal: id_sucursal,
    id_provedor: id_provedor
    })
    .then(() => {
        getInventario();
        limpiarCampos();
        Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i>El inventario fue actualizado con éxito!!!</i>",
        icon: 'success',
        timer: 3000
        });
    })
    .catch((error) => {
        let errorMessage = error.response ? error.response.data : "Error de red";
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
        });
    });
};

const updateBajaInventario = (id_inventario) => {
    Axios.put(`http://localhost:3001/updateBajaInventario/${id_inventario}`)
    .then(() => {
        getInventario();
        Swal.fire({
        icon: 'success',
        title: "<strong>Baja exitosa!!!</strong>",
        html: <i>Las existencias se reiniciaron a 0!!</i>,
        timer: 3000,
        showConfirmButton: true
        });
    })
    .catch((error) => {
        let errorMessage = error.response ? error.response.data : "Error de red";
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
        });
    });
};

const updateAltaInventario = (id_inventario) => {
    Axios.put(`http://localhost:3001/updateAltaInventario/${id_inventario}`)
    .then(() => {
        getInventario();
        Swal.fire({
        icon: 'success',
        title: "<strong>Alta exitosa!!!</strong>",
        html: <i>Las existencias se han dado de alta!!</i>,
        timer: 3000,
        showConfirmButton: true
        });
    })
    .catch((error) => {
        let errorMessage = error.response ? error.response.data : "Error de red";
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
        });
    });
};

const deleteInventario = (id_inventario) => {
    Swal.fire({
    title: "<strong>Eliminar</strong>",
    html: "<i>¿Realmente desea eliminar este inventario?</i>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo!',
    }).then(result => {
    if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteInventario/${id_inventario}`)
        .then(() => {
            getInventario();
            limpiarCampos();
            Swal.fire({
            icon: 'success',
            title: 'Inventario eliminado.',
            showConfirmButton: false,
            timer: 3000,
            });
        })
        .catch((error) => {
            let errorMessage = error.response ? error.response.data : "Error de red";
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
    setIdinventario("");
    setExistencias("");
    setMinimo("");
    setMaximo("");
    setIdProducto("");
    setIdSucursal("");
    setId_Provedor("");
    setEditar(false);
};

const editarInventario = (inventario) => {
    setEditar(true);
    setIdinventario(inventario.id_inventario);
    setExistencias(inventario.existencias);
    setMinimo(inventario.minimo);
    setMaximo(inventario.maximo);
    setIdSucursal(inventario.id_sucursal);
    setId_Provedor(inventario.id_provedor);
    setIdProducto(inventario.id_producto);
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


const getProductos = () => {
    Axios.get("http://localhost:3001/Productos")
    .then((response) => {
        setProductosList(response.data);
    })
    .catch((error) => {
        let errorMessage = "Error de red";
        if (error.response) {
        errorMessage = error.response.data;
        }
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
        });
    });
};

useEffect(() => {
    getProductos();
}, []); 

const getInventario = () => {
    Axios.get("http://localhost:3001/Inventario")
        .then((response) => {
        setInventarioList(response.data);
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
    getInventario();
}, []); 


return (
    <div>
    <div className="container-fluid">
        <div className="row">
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Inventario</h1>
            </div>

            <div className="card">
            <div className="card-body">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Existencias:</span>
                    <input type="text" 
                    onChange={(event)=>{setExistencias(event.target.value);}}
                    className="form-control" value={existencias} placeholder="Ingrese la existencia " aria-label="Existencia" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Minimo:</span>
                    <input type="text" 
                    onChange={(event)=>{setMinimo(event.target.value);}}
                    className="form-control" value={minimo} placeholder="Ingrese el mimimo" aria-label="Minimo" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Maximo:</span>
                    <input type="text" 
                    onChange={(event)=>{setMaximo(event.target.value);}}
                    className="form-control" value={maximo} placeholder="Ingrese el maximo" aria-label="Maximo" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">Producto: </label>
                <select 
                    className="form-select" 
                    value={id_producto} 
                    onChange={(event)=>{setIdProducto(event.target.value);}}
                    required
                >
                    <option value="">Seleccionar producto</option>
                    {productosList.map(val => (
                    <option key={val.id_producto} value={val.id_producto}>{val.nombre}</option>
                    ))}
                </select>
                </div>
                <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">Sucursal: </label>
                <select 
                    className="form-select" 
                    value={id_sucursal} 
                    onChange={(event)=>{setIdSucursal(event.target.value);}}
                    required
                >
                    <option value="">Seleccionar sucursal</option>
                    {sucursalesList.map(val => (
                    <option key={val.id_sucursal} value={val.id_sucursal}>{val.nombre}</option>
                    ))}
                </select>
                </div>
                <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">Provedor: </label>
                <select 
                    className="form-select" 
                    value={id_provedor} 
                    onChange={(event)=>{setId_Provedor(event.target.value);}}
                    required
                >
                    <option value="">Seleccionar provedor</option>
                    {provedoresList.map(val => (
                    <option key={val.id_provedor} value={val.id_provedor}>{val.nombreProv}</option>
                    ))}
                </select>
                </div>
            </div>
            <div className="card-footer">
                {
                editar ?
                    <div>
                    <button className='btn btn-warning m-2' onClick={updateInventario}>Actualizar</button>
                    <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                    </div>
                    : <button className='btn btn-success ' onClick={createInventario}>Insertar Inventario por Sucursal</button>
                }
            </div>
            </div>

            <div className="table-responsive mt-4">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Existencias</th>
                    <th scope="col">Minimo</th>
                    <th scope="col">Maximo</th>
                    <th scope="col">Productos</th>
                    <th scope="col">Sucursales</th>
                    <th scope="col">Provedores</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {inventarioList.map((val, key) => (
                    <tr key={val.id_inventario}>
                    <th scope="row">{val.id_inventario}</th>
                    <td>{val.existencias}</td>
                    <td>{val.minimo}</td>
                    <td>{val.maximo}</td>
                    <td>{val.nombre_producto}</td>
                    <td>{val.nombre_sucursal}</td>
                    <td>{val.nombre_proveedor}</td>
                    <td>
                        <div className="btn-group" role="group" aria-label="Acciones">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => editarInventario(val)}
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => updateAltaInventario(val.id_inventario)}
                        >
                            Alta
                        </button>
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => updateBajaInventario(val.id_inventario)}
                        >
                            Reiniciar
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteInventario(val.id_inventario)}
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

export default Inventario;