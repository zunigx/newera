const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@3mmAnu3l",
    database: "jacinto2",
    port: 3306
});

//APIS DE USUARIOS
//Insertar Usuarios
app.post("/create", (req,res)=>{
    const nombre1 = req.body.nombre1;
    const apellido1 = req.body.apellido1;
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    const estatus = req.body.estatus;
    const id_perfil = req.body.id_perfil;


    db.query("INSERT INTO tusuario (nombre1, apellido1, usuario, clave, estatus, id_perfil) VALUES (?,?,?,?,?,?)", [nombre1, apellido1, usuario, clave, estatus, id_perfil],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//Mostrar Usuarios
app.get("/usuarios", (req,res)=>{
    db.query("SELECT * FROM tusuario", 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }

    });
});

//Modificar Usuarios
app.put("/update", (req,res)=>{
    const id_usuario = req.body.id_usuario;
    const nombre1 = req.body.nombre1;
    const apellido1 = req.body.apellido1;
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    const estatus = req.body.estatus;
    const id_perfil = req.body.id_perfil;


    db.query("UPDATE tusuario SET nombre1=?, apellido1=?, usuario=?, clave=?, estatus=?, id_perfil=? WHERE id_usuario=?", [nombre1, apellido1, usuario, clave, estatus, id_perfil,id_usuario],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//Baja Estatus a 0
app.put("/updateBaja/:id_usuario", (req,res)=>{
    const id_usuario = req.params.id_usuario;

    db.query("UPDATE tusuario SET estatus = 0 WHERE id_usuario = ?", id_usuario,
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error interno del servidor");
        }else{
            res.status(200).send("Usuario dado de baja correctamente");
        }
    });
});

//Alta Estatus a 1
app.put("/updateAlta/:id_usuario", (req,res)=>{
    const id_usuario = req.params.id_usuario;

    db.query("UPDATE tusuario SET estatus = 1 WHERE id_usuario = ?", id_usuario,
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error interno del servidor");
        }else{
            res.status(200).send("Usuario dado de baja correctamente");
        }
    });
});


//Borrar Usuarios
app.delete("/delete/:id_usuario", (req,res)=>{
    const id_usuario = req.params.id_usuario;

    db.query("DELETE FROM tusuario WHERE id_usuario=?", id_usuario,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
//Fin de APIS USUARIOS

//APIS Provedores
app.post("/createProve", (req,res)=>{
    const nombreProv = req.body.nombreProv;
    const estatus = req.body.estatus;


    db.query("INSERT INTO tprovedor (nombreProv, estatus) VALUES (?,?)", [nombreProv,estatus],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//Mostrar Provedores
app.get("/Provedores", (req,res)=>{
    db.query("SELECT * FROM tprovedor", 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }

    });
});

//Modificar Provedores
app.put("/updateProve", (req,res)=>{
    const id_provedor = req.body.id_provedor;
    const nombreProv = req.body.nombreProv;
    const estatus = req.body.estatus;



    db.query("UPDATE tprovedor SET nombreProv=?, estatus=? WHERE id_provedor=?", [nombreProv, estatus, id_provedor],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//Baja Estatus a 0
app.put("/updateBajaProve/:id_provedor", (req,res)=>{
    const id_provedor= req.params.id_provedor;

    db.query("UPDATE tprovedor SET estatus = 0 WHERE id_provedor = ?", id_provedor,
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error interno del servidor");
        }else{
            res.status(200).send("Provedor dado de baja correctamente");
        }
    });
});

//Alta Estatus a 1
app.put("/updateAltaProve/:id_provedor", (req,res)=>{
    const id_provedor = req.params.id_provedor;

    db.query("UPDATE tprovedor SET estatus = 1 WHERE id_provedor = ?", id_provedor,
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error interno del servidor");
        }else{
            res.status(200).send("Provedor dado de alta correctamente");
        }
    });
});


//Borrar Provedores
app.delete("/deleteProv/:id_provedor", (req,res)=>{
    const id_provedor = req.params.id_provedor;

    db.query("DELETE FROM tprovedor WHERE id_provedor=?", id_provedor,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
//Fin de APIS Provedores

//APIS Sucursales
app.post("/createSuc", (req,res)=>{
    const imagen_Sucursal = req.body.imagen_Sucursal
    const nombre = req.body.nombre;
    const estado = req.body.estado;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const estatus = req.body.estatus;


    db.query("INSERT INTO tsucursal (imagen_Sucursal, nombre, estado, direccion, telefono, estatus) VALUES (?,?,?,?,?,?)", [imagen_Sucursal,nombre,estado,direccion,telefono,estatus],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//Mostrar Sucursales
app.get("/Sucursales", (req,res)=>{
    db.query("SELECT * FROM tsucursal", 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }

    });
});

//Modificar Sucursales
app.put("/updateSuc", (req,res)=>{
    const id_sucursal = req.body.id_sucursal;
    const imagen_Sucursal = req.body.imagen_Sucursal;
    const nombre = req.body.nombre;
    const estado = req.body.estado;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const estatus = req.body.estatus;

    db.query("UPDATE tsucursal SET imagen_Sucursal=?, nombre=?, estado=?, direccion=?, telefono=?, estatus=? WHERE id_sucursal=?", [imagen_Sucursal, nombre, estado, direccion, telefono, estatus, id_sucursal],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


//Baja Estatus a 0
app.put("/updateBajaSuc/:id_sucursal", (req,res)=>{
    const id_sucursal= req.params.id_sucursal;

    db.query("UPDATE tsucursal SET estatus = 0 WHERE id_sucursal = ?", id_sucursal,
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error interno del servidor");
        }else{
            res.status(200).send("Sucursal dado de baja correctamente");
        }
    });
});

//Alta Estatus a 1
app.put("/updateAltaSuc/:id_sucursal", (req,res)=>{
    const id_sucursal = req.params.id_sucursal;

    db.query("UPDATE tsucursal SET estatus = 1 WHERE id_sucursal = ?", id_sucursal,
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error interno del servidor");
        }else{
            res.status(200).send("Sucursal dado de alta correctamente");
        }
    });
});


//Borrar Sucursales
app.delete("/deleteSuc/:id_sucursal", (req,res)=>{
    const id_sucursal = req.params.id_sucursal;

    db.query("DELETE FROM tsucursal WHERE id_sucursal=?", id_sucursal,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
//Fin de APIS Sucursales

// APIS Productos
app.post("/createProduct", (req, res) => {
    const nombre = req.body.nombre;
    const imagen = req.body.imagen;
    const descripcion = req.body.descripcion;
    const categoria = req.body.categoria;
    const precio = req.body.precio;
    const estatus = req.body.estatus;
    const fecha_creacion = req.body.fecha_creacion;
    const id_provedor = req.body.id_provedor;

        db.query("INSERT INTO tproductos (nombre, imagen, descripcion, categoria, precio, estatus, fecha_creacion, id_provedor) VALUES (?,?,?,?,?,?,?,?)",
            [nombre, imagen, descripcion, categoria, precio, estatus, fecha_creacion, id_provedor],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error al insertar el producto.");
                } else {
                    res.status(200).send("Producto insertado correctamente.");
                }
            });
    
});

//Mostrar Productos y nombre del provedor
app.get("/Productos", (req,res)=>{
    db.query("SELECT * FROM tproductos INNER JOIN tprovedor ON tproductos.id_provedor = tprovedor.id_provedor", 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }

    });
});

//Modificar Productos
app.put("/updateProduc", (req,res)=>{
    const id_producto = req.body.id_producto;
    const nombre = req.body.nombre;
    const imagen = req.body.imagen;
    const descripcion = req.body.descripcion;
    const categoria = req.body.categoria;
    const precio = req.body.precio;
    const estatus = req.body.estatus;
    const fecha_creacion = req.body.fecha_creacion;
    const id_provedor = req.body.id_provedor;

    db.query("UPDATE tproductos SET nombre=?, imagen=?, descripcion=?, categoria=?, precio=?, estatus=?, fecha_creacion=?, id_provedor=? WHERE id_producto=?", [nombre, imagen , descripcion, categoria, precio, estatus, fecha_creacion, id_producto,id_provedor],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


//Baja Estatus a 0
app.put("/updateBajaProduc/:id_producto", (req,res)=>{
    const id_producto= req.params.id_producto;

    db.query("UPDATE tproductos SET estatus = 0 WHERE id_producto = ?", id_producto,
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error interno del servidor");
        }else{
            res.status(200).send("Producto dado de baja correctamente");
        }
    });
});

//Alta Estatus a 1
app.put("/updateAltaProduc/:id_producto", (req,res)=>{
    const id_producto = req.params.id_producto;

    db.query("UPDATE tproductos SET estatus = 1 WHERE id_producto = ?", id_producto,
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error interno del servidor");
        }else{
            res.status(200).send("Producto dado de alta correctamente");
        }
    });
});


//Borrar Productos
app.delete("/deleteProduc/:id_producto", (req,res)=>{
    const id_producto = req.params.id_producto;

    db.query("DELETE FROM tproductos WHERE id_producto=?", id_producto,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
//Fin de APIS Productos

//Apis de Inventario
app.post("/createInventario", (req, res) => {
    const existencias = req.body.existencias;
    const minimo = req.body.minimo;
    const maximo = req.body.maximo;
    const id_producto = req.body.id_producto;
    const id_sucursal = req.body.id_sucursal;
    const id_provedor = req.body.id_provedor;

        db.query("INSERT INTO tinventario (existencias, minimo, maximo, id_producto, id_sucursal, id_provedor) VALUES (?,?,?,?,?,?)",
            [existencias, minimo, maximo, id_producto, id_sucursal, id_provedor],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error al insertar el inventario.");
                } else {
                    res.status(200).send("Inventario insertado correctamente.");
                }
            });
    
});

//Mostrar Inventario y nombre del producto,nombre de la sucursal y nombre deL provedor 
app.get("/Inventario", (req,res)=>{
    db.query("SELECT tinventario.*, tproductos.nombre AS nombre_producto, tprovedor.nombreProv AS nombre_proveedor, tsucursal.nombre AS nombre_sucursal FROM tinventario INNER JOIN tproductos ON tinventario.id_producto = tproductos.id_producto INNER JOIN tprovedor ON tproductos.id_provedor = tprovedor.id_provedor INNER JOIN tsucursal ON tinventario.id_sucursal = tsucursal.id_sucursal", 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }

    });
});

//Modificar Inventario
app.put("/updateInventario", (req,res)=>{
    const id_inventario = req.body.id_inventario;
    const existencias = req.body.existencias;
    const minimo = req.body.minimo;
    const maximo = req.body.maximo;
    const id_producto = req.body.id_producto;
    const id_sucursal = req.body.id_sucursal;
    const id_provedor = req.body.id_provedor;

    db.query("UPDATE tinventario SET existencias=?, minimo=?, maximo=?, id_producto=?, id_sucursal=?, id_provedor=? WHERE id_inventario=?", [existencias, minimo, maximo, id_producto, id_sucursal, id_provedor,id_inventario],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


//Baja Existencias a 0
app.put("/updateBajaInventario/:id_inventario", (req,res)=>{
    const id_inventario= req.params.id_inventario;

    db.query("UPDATE tinventario SET existencias = 0 WHERE id_inventario = ?", id_inventario,
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error interno del servidor");
        }else{
            res.status(200).send("Existencias en 0 correctamente");
        }
    });
});

//Alta Existencias
app.put("/updateAltaInventario/:id_inventario", (req,res)=>{
    const id_inventario = req.params.id_inventario;

    db.query("UPDATE tinventario SET existencias = 1 WHERE id_inventario = ?", id_inventario,
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error interno del servidor");
        }else{
            res.status(200).send("Existencias dadas de alta correctamente");
        }
    });
});


//Borrar Inventario
app.delete("/deleteInventario/:id_inventario", (req,res)=>{
    const id_inventario = req.params.id_inventario;

    db.query("DELETE FROM tinventario WHERE id_inventario=?", id_inventario,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
//Fin de APIS Inventario

//Buscador dinamico con filtros
// Endpoint para obtener la lista de empleados de la tabla tusuario
app.get("/tusuario", (req, res) => {
    db.query("SELECT * FROM tusuario", (err, result) => {
        if (err) {
            console.error("Error al ejecutar el SELECT en tusuario:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        res.send(result);
    });
});

// Endpoint para obtener la lista de proveedores de la tabla tprovedor
app.get("/tprovedor", (req, res) => {
    db.query("SELECT * FROM tprovedor", (err, result) => {
        if (err) {
            console.error("Error al ejecutar el SELECT en tprovedor:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        res.send(result);
    });
});

// Endpoint para obtener la lista de sucursales de la tabla tsucursal
app.get("/tsucursal", (req, res) => {
    db.query("SELECT * FROM tsucursal", (err, result) => {
        if (err) {
            console.error("Error al ejecutar el SELECT en tsucursal:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        res.send(result);
    });
});

// Endpoint para obtener la lista de productos de la tabla tproductos
app.get("/tproductos", (req, res) => {
    db.query("SELECT * FROM tproductos", (err, result) => {
        if (err) {
            console.error("Error al ejecutar el SELECT en tproductos:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        res.send(result);
    });
});

// Endpoint para obtener la lista de inventario de la tabla tinventario
app.get("/tinventario", (req, res) => {
    db.query("SELECT * FROM tinventario", (err, result) => {
        if (err) {
            console.error("Error al ejecutar el SELECT en tinventario:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        res.send(result);
    });
});

//Fin de buscador dinamico con filtros

app.listen(3001, ()=>{

    console.log("Estoy ocupando el puerto 3001")
})