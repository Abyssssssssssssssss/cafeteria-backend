import React from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Cafetería Escolar</h1>
      <FormularioVenta />
      <hr />
      <ListaVentas />
    </div>
  );
}

export default App;