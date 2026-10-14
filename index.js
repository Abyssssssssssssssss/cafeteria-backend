const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Habilitar CORS

// Conexión a MySQL
const conexion = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'cafeteria'
});

conexion.connect(err => {
  if (err) {
    console.error('Error de conexión a la BD: ', err);
    return;
  }
  console.log('Conectado exitosamente a MySQL');
});

// ==========================================
// CRUD ESTUDIANTES
// ==========================================

app.get('/estudiantes', (req, res) => {
  conexion.query('SELECT * FROM estudiantes', (err, resultados) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(resultados);
  });
});

app.post('/estudiantes', (req, res) => {
  const { nombre, grupo } = req.body;
  conexion.query(
    'INSERT INTO estudiantes (nombre, grupo) VALUES (?, ?)',
    [nombre, grupo],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ mensaje: `Estudiante agregado: ${nombre}`, id: result.insertId });
    }
  );
});

app.put('/estudiantes/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, grupo } = req.body;
  conexion.query(
    'UPDATE estudiantes SET nombre=?, grupo=? WHERE id=?',
    [nombre, grupo, id],
    err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: `Estudiante con ID ${id} actualizado` });
    }
  );
});

app.delete('/estudiantes/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('DELETE FROM estudiantes WHERE id=?', [id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: `Estudiante con ID ${id} eliminado` });
  });
});

// ==========================================
// CRUD PRODUCTOS
// ==========================================

app.get('/productos', (req, res) => {
  conexion.query('SELECT * FROM productos', (err, resultados) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(resultados);
  });
});

app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;
  conexion.query(
    'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
    [nombre, precio],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ mensaje: `Producto agregado: ${nombre}`, id: result.insertId });
    }
  );
});

app.put('/productos/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, precio } = req.body;
  conexion.query(
    'UPDATE productos SET nombre=?, precio=? WHERE id=?',
    [nombre, precio, id],
    err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: `Producto con ID ${id} actualizado` });
    }
  );
});

app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('DELETE FROM productos WHERE id=?', [id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: `Producto con ID ${id} eliminado` });
  });
});

// ==========================================
// CRUD VENTAS (con JOIN)
// ==========================================

app.get('/ventas', (req, res) => {
  const sql = `
    SELECT v.id, e.nombre AS estudiante, p.nombre AS producto,
           v.cantidad, v.fecha, p.precio, (v.cantidad * p.precio) AS total
    FROM ventas v
    INNER JOIN estudiantes e ON v.estudiante_id = e.id
    INNER JOIN productos p ON v.producto_id = p.id
  `;
  conexion.query(sql, (err, resultados) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(resultados);
  });
});

app.post('/ventas', (req, res) => {
  const { estudiante_id, producto_id, cantidad, fecha } = req.body;
  const sql = 'INSERT INTO ventas (estudiante_id, producto_id, cantidad, fecha) VALUES (?, ?, ?, ?)';
  
  conexion.query(sql, [estudiante_id, producto_id, cantidad, fecha], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ mensaje: 'Venta registrada con éxito', id: result.insertId });
  });
});

app.put('/ventas/:id', (req, res) => {
  const id = req.params.id;
  const { estudiante_id, producto_id, cantidad, fecha } = req.body;
  const sql = 'UPDATE ventas SET estudiante_id=?, producto_id=?, cantidad=?, fecha=? WHERE id=?';

  conexion.query(sql, [estudiante_id, producto_id, cantidad, fecha, id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: `Venta con ID ${id} actualizada` });
  });
});

app.delete('/ventas/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('DELETE FROM ventas WHERE id=?', [id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: `Venta con ID ${id} eliminada` });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});