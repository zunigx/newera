import React, { useState, useEffect } from 'react';
        import Axios from 'axios';
        import Swal from 'sweetalert2';
        import 'bootstrap/dist/css/bootstrap.min.css';

        function Productos() {
        const [id_producto, setIdProducto] = useState("");
        const [nombre, setNombre] = useState("");
        const [imagen, setImagen] = useState("");
        const [descripcion, setDescripcion] = useState("");
        const [categoria, setCategoria] = useState("");
        const [precio, setPrecio] = useState("");
        const [estatus, setEstatus] = useState("");
        const [fecha_creacion, setFecha_Creacion] = useState("");
        const [editar, setEditar] = useState(false);
        const [productosList, setProductosList] = useState([]);
        const [id_provedor, setId_Provedor] = useState("");
        const [provedoresList, setProveedoresList] = useState([]);

        const createProduct = () => {
            // Formatear la fecha
            const formattedDate = new Date(fecha_creacion).toISOString().split('T')[0];
        
            Axios.post("http://localhost:3001/createProduct", {
                nombre: nombre,
                imagen: imagen,
                descripcion: descripcion,
                categoria: categoria,
                precio: precio,
                estatus: estatus,
                fecha_creacion: formattedDate, // Utilizar la fecha formateada
                id_provedor: id_provedor,
            })
            .then(() => {
                getProductos();
                limpiarCampos();
                Swal.fire({
                    title: "<strong>Registro exitoso!!!</strong>",
                    html: "<i>El producto <strong>" + nombre + "</strong> fue registrado con éxito!!!</i>",
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
        

        const updateProduct = () => {
            const formattedDate = new Date(fecha_creacion).toISOString().split('T')[0];
            Axios.put("http://localhost:3001/updateProduc", {
            id_producto: id_producto,
            nombre: nombre,
            imagen: imagen,
            descripcion: descripcion,
            categoria: categoria,
            precio: precio,
            estatus: estatus,
            fecha_creacion: formattedDate,
            id_provedor: id_provedor
            })
            .then(() => {
                getProductos();
                limpiarCampos();
                Swal.fire({
                title: "<strong>Actualización exitosa!!!</strong>",
                html: "<i>El producto <strong>" + nombre + "</strong> fue actualizado con éxito!!!</i>",
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

        const updateBajaProduct = (id_producto) => {
            Axios.put(`http://localhost:3001/updateBajaProduc/${id_producto}`)
            .then(() => {
                getProductos();
                Swal.fire({
                icon: 'success',
                title: "<strong>Baja exitosa!!!</strong>",
                html: <i>El producto ha sido dado de baja!!</i>,
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

        const updateAltaProduct = (id_producto) => {
            Axios.put(`http://localhost:3001/updateAltaProduc/${id_producto}`)
            .then(() => {
                getProductos();
                Swal.fire({
                icon: 'success',
                title: "<strong>Alta exitosa!!!</strong>",
                html: <i>El producto ha sido dado de alta!!</i>,
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

        const deleteProduct = (id_producto) => {
            Swal.fire({
            title: "<strong>Eliminar</strong>",
            html: "<i>¿Realmente desea eliminar este producto?</i>",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
            }).then(result => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/deleteProduc/${id_producto}`)
                .then(() => {
                    getProductos();
                    limpiarCampos();
                    Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado.',
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
            setIdProducto("");
            setNombre("");
            setImagen("");
            setDescripcion("");
            setCategoria("");
            setPrecio("");
            setEstatus("");
            setFecha_Creacion("");
            setId_Provedor("");
            setEditar(false);
        };

        const editarProducto = (producto) => {
            setEditar(true);
            setIdProducto(producto.id_producto);
            setNombre(producto.nombre);
            setImagen(producto.imagen);
            setDescripcion(producto.descripcion);
            setCategoria(producto.categoria);
            setPrecio(producto.precio);
            setFecha_Creacion(producto.fecha_creacion.split('T')[0]);
            setEstatus(producto.estatus);
            setId_Provedor(producto.id_provedor);
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

        return (
            <div>
            <div className="container-fluid">
                <div className="row">
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Productos</h1>
                    </div>

                    <div className="card">
                    <div className="card-body">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Nombre:</span>
                            <input type="text" 
                            onChange={(event)=>{setNombre(event.target.value);}}
                            className="form-control" value={nombre} placeholder="Ingrese el nombre del producto" aria-label="Nombre del Producto" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Imagen:</span>
                            <input type="text" 
                            onChange={(event)=>{setImagen(event.target.value);}}
                            className="form-control" value={imagen} placeholder="Ingrese la URL de la imagen" aria-label="Imagen del Producto" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Descripcion:</span>
                            <input type="text" 
                            onChange={(event)=>{setDescripcion(event.target.value);}}
                            className="form-control" value={descripcion} placeholder="Ingrese la descripcion" aria-label="Descripcion del producto" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Categoria:</span>
                            <input type="text" 
                            onChange={(event)=>{setCategoria(event.target.value);}}
                            className="form-control" value={categoria} placeholder="Ingrese la categoria" aria-label="Categoria del producto" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Precio:</span>
                            <input type="text" 
                            onChange={(event)=>{setPrecio(event.target.value);}}
                            className="form-control" value={precio} placeholder="Ingrese el precio del producto" aria-label="Precio del producto" aria-describedby="basic-addon1"/>
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
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Fecha:</span>
                            <input type="text" 
                            onChange={(event)=>{setFecha_Creacion(event.target.value);}}
                            className="form-control" value={fecha_creacion} placeholder="Ingrese la fecha de creacion" aria-label="Fecha de creacion del producto" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Estatus:</span>
                            <input type="text" 
                            onChange={(event)=>{setEstatus(event.target.value);}}
                            className="form-control" value={estatus} placeholder="Ingrese el estatus" aria-label="Estatus del producto" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className="card-footer">
                        {
                        editar ?
                            <div>
                            <button className='btn btn-warning m-2' onClick={updateProduct}>Actualizar</button>
                            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                            </div>
                            : <button className='btn btn-success ' onClick={createProduct}>Registrar</button>
                        }
                    </div>
                    </div>

                    <div className="table-responsive mt-4">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Provedores</th>
                            <th scope="col">Fecha creacion</th>
                            <th scope="col">Estatus</th>
                            <th scope="col">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productosList.map((val, key) => (
                            <tr key={val.id_producto}>
                            <th scope="row">{val.id_producto}</th>
                            <td>{val.nombre}</td>
                            <td><img alt="Logo" width="80" height="80" className="d-inline-block align-text-top" src={val.imagen} /></td>
                            <td>{val.descripcion}</td>
                            <td>{val.categoria}</td>
                            <td>{val.precio}</td>
                            <td>{val.nombreProv}</td>
                            <td>{val.fecha_creacion.split('T')[0]}</td>
                            <td>{val.estatus}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Acciones">
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={() => editarProducto(val)}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => updateAltaProduct(val.id_producto)}
                                >
                                    Alta
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => updateBajaProduct(val.id_producto)}
                                >
                                    Baja
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => deleteProduct(val.id_producto)}
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

        export default Productos;