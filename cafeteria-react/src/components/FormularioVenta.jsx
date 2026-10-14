import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormularioVenta({ onVentaRegistrada }) {
  const [formData, setFormData] = useState({
    estudiante_id: '',
    producto_id: '',
    cantidad: '',
    fecha: ''
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  // Cargar listas de estudiantes y productos al iniciar
  useEffect(() => {
    axios.get('http://localhost:3000/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error('Error al cargar estudiantes:', err));

    axios.get('http://localhost:3000/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/ventas', formData)
      .then(res => {
        alert(res.data.message || res.data.mensaje || 'Venta registrada con éxito');
        
        // Limpiar el formulario
        setFormData({
          estudiante_id: '',
          producto_id: '',
          cantidad: '',
          fecha: ''
        });

        // Notificar a App.jsx para recargar la tabla de ventas
        if (onVentaRegistrada) {
          onVentaRegistrada();
        }
      })
      .catch(err => console.error('Error al registrar venta:', err));
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <select 
          name="estudiante_id" 
          value={formData.estudiante_id} 
          onChange={handleChange} 
          required
        >
          <option value="">Seleccione estudiante</option>
          {estudiantes.map(e => (
            <option key={e.id} value={e.id}>
              {e.nombre} - {e.grupo}
            </option>
          ))}
        </select>

        <select 
          name="producto_id" 
          value={formData.producto_id} 
          onChange={handleChange} 
          required
        >
          <option value="">Seleccione producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre} - ${p.precio}
            </option>
          ))}
        </select>

        <input 
          type="number" 
          name="cantidad" 
          placeholder="Cantidad" 
          value={formData.cantidad} 
          onChange={handleChange} 
          required 
        />

        <input 
          type="date" 
          name="fecha" 
          value={formData.fecha} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
}

export default FormularioVenta;