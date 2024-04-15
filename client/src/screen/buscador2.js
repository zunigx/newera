import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Buscador2() {
    const [nombre1, setNombre1] = useState("");
    const [apellido1, setApellido1] = useState("");
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [estatusUsuario, setEstatusUsuario] = useState("");
    const [usuariosList, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    
    const [nombreProv, setNombreProv] = useState("");
    const [estatusProveedor, setEstatusProveedor] = useState("");
    const [proveedoresList, setProveedores] = useState([]);
    const [proveedoresFiltrados, setProveedoresFiltrados] = useState([]);

    const [nombreSucursal, setNombreSucursal] = useState("");
    const [estadoSucursal, setEstadoSucursal] = useState("");
    const [direccionSucursal, setDireccionSucursal] = useState("");
    const [telefonoSucursal, setTelefonoSucursal] = useState("");
    const [estatusSucursal, setEstatusSucursal] = useState("");
    const [sucursalesList, setSucursales] = useState([]);
    const [sucursalesFiltradas, setSucursalesFiltradas] = useState([]);

    const [nombreProducto, setNombreProducto] = useState("");
    const [descripcionProducto, setDescripcionProducto] = useState("");
    const [categoriaProducto, setCategoriaProducto] = useState("");
    const [precioProducto, setPrecioProducto] = useState("");
    const [proveedorProducto, setProveedorProducto] = useState("");
    const [fechaCreacionProducto, setFechaCreacionProducto] = useState("");
    const [estatusProducto, setEstatusProducto] = useState("");
    const [productosList, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    
    const [existencias, setExistencias] = useState("");
    const [minimo, setMinimo] = useState("");
    const [maximo, setMaximo] = useState("");
    const [sucursalProducto, setSucursalProducto] = useState("");
    const [inventarioList, setInventario] = useState([]);
    const [inventarioFiltrado, setInventarioFiltrado] = useState([]);

    useEffect(() => {
        getUsuarios();
        getProveedores();
        getSucursales();
        getProductos();
        getInventario();
    }, []);

    const getUsuarios = () => {
        Axios.get("http://localhost:3001/tusuario").then((response) => {
            setUsuarios(response.data);
            setUsuariosFiltrados(response.data);
        });
    }

    const getProveedores = () => {
        Axios.get("http://localhost:3001/tprovedor").then((response) => {
            setProveedores(response.data);
            setProveedoresFiltrados(response.data);
        });
    }

    const getSucursales = () => {
        Axios.get("http://localhost:3001/tsucursal").then((response) => {
            setSucursales(response.data);
            setSucursalesFiltradas(response.data);
        });
    }

    const getProductos = () => {
        Axios.get("http://localhost:3001/tproductos").then((response) => {
            setProductos(response.data);
            setProductosFiltrados(response.data);
        });
    }

    const getInventario = () => {
        Axios.get("http://localhost:3001/tinventario").then((response) => {
            setInventario(response.data);
            setInventarioFiltrado(response.data);
        });
    }

    const buscarUsuarios = () => {
        let usuariosFiltradosTemp = usuariosList.filter((usuarios) => {
            return (
                usuarios.nombre1.toLowerCase().includes(nombre1.toLowerCase()) &&
                usuarios.apellido1.toString().includes(apellido1) &&
                usuarios.usuario.toLowerCase().includes(usuario.toLowerCase()) &&
                usuarios.clave.toLowerCase().includes(clave.toLowerCase()) &&
                usuarios.estatus.toString().includes(estatusUsuario)
            );
        });
        setUsuariosFiltrados(usuariosFiltradosTemp);
    }

    const buscarProveedores = () => {
        let proveedoresFiltradosTemp = proveedoresList.filter((proveedor) => {
            return (
                proveedor.nombreProv.toLowerCase().includes(nombreProv.toLowerCase()) &&
                proveedor.estatus.toString().includes(estatusProveedor)
            );
        });
        setProveedoresFiltrados(proveedoresFiltradosTemp);
    }

    const buscarSucursales = () => {
        let sucursalesFiltradasTemp = sucursalesList.filter((sucursal) => {
            return (
                sucursal.nombre.toLowerCase().includes(nombreSucursal.toLowerCase()) &&
                sucursal.estado.toLowerCase().includes(estadoSucursal.toLowerCase()) &&
                sucursal.direccion.toLowerCase().includes(direccionSucursal.toLowerCase()) &&
                sucursal.telefono.includes(telefonoSucursal) &&
                sucursal.estatus.toString().includes(estatusSucursal)
            );
        });
        setSucursalesFiltradas(sucursalesFiltradasTemp);
    }

    const buscarProductos = () => {
        let productosFiltradosTemp = productosList.map(producto => ({
            ...producto,
            fecha_creacion: new Date(producto.fecha_creacion).toLocaleDateString(),
            nombreProv: proveedoresList.find(proveedor => proveedor.id_provedor === producto.id_provedor)?.nombreProv || ""
        })).filter((producto) => {
            return (
                producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase()) &&
                producto.descripcion.toLowerCase().includes(descripcionProducto.toLowerCase()) &&
                producto.categoria.toLowerCase().includes(categoriaProducto.toLowerCase()) &&
                producto.precio.toString().includes(precioProducto) &&
                producto.estatus.toString().includes(estatusProducto) &&
                producto.nombreProv.toLowerCase().includes(proveedorProducto.toLowerCase())
            );  
        });
        setProductosFiltrados(productosFiltradosTemp);
    }
    
    const buscarInventario = () => {
        let inventarioFiltradoTemp = inventarioList.map(item => ({
            ...item,
            nombreProducto: productosList.find(producto => producto.id_producto === item.id_producto)?.nombre || "",
            nombreProv: proveedoresList.find(proveedor => proveedor.id_provedor === item.id_provedor)?.nombreProv || "",
            nombreSucursal: sucursalesList.find(sucursal => sucursal.id_sucursal === item.id_sucursal)?.nombre || ""
        })).filter(item => {
            return (
                item.existencias.toString().includes(existencias) &&
                item.minimo.toString().includes(minimo) &&
                item.maximo.toString().includes(maximo) &&
                item.nombreProducto.toLowerCase().includes(nombreProducto.toLowerCase()) &&
                item.nombreProv.toLowerCase().includes(proveedorProducto.toLowerCase()) &&
                item.nombreSucursal.toLowerCase().includes(sucursalProducto.toLowerCase())
            );
        });
        setInventarioFiltrado(inventarioFiltradoTemp);
    }
    
    

    return (
        <div className="container">
            {/* Campos Usuarios */}
            <h1 className="h4">Campos Usuarios</h1>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Nombre1" value={nombre1} onChange={(e) => setNombre1(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Apellido1" value={apellido1} onChange={(e) => setApellido1(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Clave" value={clave} onChange={(e) => setClave(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Estatus" value={estatusUsuario} onChange={(e) => setEstatusUsuario(e.target.value)} />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={buscarUsuarios}>Buscar Usuarios</button>
                </div>
            </div>

            {/* Tabla de usuarios */}
            <h2 className="h4">Tabla de Usuarios</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre1</th>
                        <th scope="col">Apellido1</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Clave</th>
                        <th scope="col">Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.nombre1}</td>
                            <td>{usuario.apellido1}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.clave}</td>
                            <td>{usuario.estatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Campos Proveedores */}
            <h1 className="h4">Campos Provedores</h1>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Nombre de Proveedor" value={nombreProv} onChange={(e) => setNombreProv(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Estatus" value={estatusProveedor} onChange={(e) => setEstatusProveedor(e.target.value)} />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={buscarProveedores}>Buscar Proveedores</button>
                </div>
            </div>

            {/* Tabla de proveedores */}
            <h2 className="h4">Tabla de Provedores</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre de Proveedor</th>
                        <th scope="col">Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedoresFiltrados.map((proveedor, index) => (
                        <tr key={index}>
                            <td>{proveedor.id_provedor}</td>
                            <td>{proveedor.nombreProv}</td>
                            <td>{proveedor.estatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
             {/* Campos Sucursales */}
            <h1 className="h4">Campos Sucursales</h1>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Nombre de Sucursal" value={nombreSucursal} onChange={(e) => setNombreSucursal(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Estado" value={estadoSucursal} onChange={(e) => setEstadoSucursal(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Dirección" value={direccionSucursal} onChange={(e) => setDireccionSucursal(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Teléfono" value={telefonoSucursal} onChange={(e) => setTelefonoSucursal(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Estatus" value={estatusSucursal} onChange={(e) => setEstatusSucursal(e.target.value)} />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={buscarSucursales}>Buscar Sucursales</button>
                </div>
            </div>
            {/* Tabla de sucursales */}
            <h2 className="h4">Tabla de Sucursales</h2>
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
                    </tr>
                </thead>
                <tbody>
                    {sucursalesFiltradas.map((sucursal, index) => (
                        <tr key={index}>
                            <td>{sucursal.id_sucursal}</td>
                            <td><img alt="Logo" width="50" height="50" className="d-inline-block align-text-top" src={sucursal.imagen_Sucursal} /></td>
                            <td>{sucursal.nombre}</td>
                            <td>{sucursal.estado}</td>
                            <td>{sucursal.direccion}</td>
                            <td>{sucursal.telefono}</td>
                            <td>{sucursal.estatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
             {/* Campos Productos */}
            <h1 className="h4">Campos Productos</h1>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Producto" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Descripcion" value={descripcionProducto} onChange={(e) => setDescripcionProducto(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Categoria" value={categoriaProducto} onChange={(e) => setCategoriaProducto(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="$Precio" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Provedor" value={proveedorProducto} onChange={(e) => setProveedorProducto(e.target.value)} />
                </div>
                <div className="col">
                    <input type="date" className="form-control" placeholder="Fecha Creación" value={fechaCreacionProducto} onChange={(e) => setFechaCreacionProducto(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Estatus" value={estatusProducto} onChange={(e) => setEstatusProducto(e.target.value)} />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={buscarProductos}>Buscar Productos</button>
                </div>
            </div>
            {/* Tabla de productos */}
            <h2 className="h4">Tabla de Productos</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Provedor</th>
                        <th scope="col">Fecha creacion</th>
                        <th scope="col">Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {productosFiltrados.map((producto, index) => (
                        <tr key={index}>
                            <td>{producto.id_producto}</td>
                            <td><img alt="Logo" width="50" height="50" className="d-inline-block align-text-top" src={producto.imagen} /></td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.categoria}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.nombreProv}</td>
                            <td>{producto.fecha_creacion.split('T')[0]}</td>
                            <td>{producto.estatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Campos de inventario */}
            <h1 className="h4">Campos de Inventario</h1>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Existencias" value={existencias} onChange={(e) => setExistencias(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Mínimo" value={minimo} onChange={(e) => setMinimo(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Máximo" value={maximo} onChange={(e) => setMaximo(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Producto" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Sucursal" value={sucursalProducto} onChange={(e) => setSucursalProducto(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Provedor" value={proveedorProducto} onChange={(e) => setProveedorProducto(e.target.value)} />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={buscarInventario}>Buscar Inventario</button>
                </div>
            </div>

            {/* Tabla de inventario */}
            <h2 className="h4">Tabla de Inventario</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Existencias</th>
                        <th scope="col">Mínimo</th>
                        <th scope="col">Máximo</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Sucursal</th>
                        <th scope="col">Provedor</th>
                    </tr>
                </thead>
                <tbody>
                    {inventarioFiltrado.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id_inventario}</td>
                            <td>{item.existencias}</td>
                            <td>{item.minimo}</td>
                            <td>{item.maximo}</td>
                            <td>{item.nombreProducto}</td>
                            <td>{item.nombreSucursal}</td>
                            <td>{item.nombreProv}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Buscador2;