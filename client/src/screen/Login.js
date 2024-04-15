import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const connection = require('../models/conexion');

const login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const [result] = await connection.query('SELECT * FROM usuario WHERE username = ? AND password = ?', [username, password]);

    if (result.length > 0) {
      const { tipo, id_usuario, ...userData } = result[0];
      res.send({ id_usuario, tipo, ...userData }); 
      console.log(id_usuario); 
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { login };
