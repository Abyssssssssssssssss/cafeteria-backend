-- Estructura de la base de datos Cafetería Escolar
CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    grupo VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    precio DECIMAL(5,2)
);

CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id INT,
    producto_id INT,
    cantidad INT,
    fecha DATE,
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Datos iniciales de prueba (Opcional para verificar)
INSERT INTO estudiantes (nombre, grupo) VALUES 
('Ana', 'Software 1'),
('Carlos', 'Software 2');

INSERT INTO productos (nombre, precio) VALUES 
('Sandwich', 2.50),
('Jugo', 1.00);