-- =====================================================
-- Script de datos de prueba para el sistema de órdenes
-- Archivo: database/seeds/seed-data.sql
-- =====================================================

-- Limpiar datos existentes (opcional - descomenta si necesitas limpiar)
-- TRUNCATE TABLE "detalle_de_trasaccion" CASCADE;
-- TRUNCATE TABLE "transaccion" CASCADE;
-- TRUNCATE TABLE "orden" CASCADE;
-- TRUNCATE TABLE "ubicacion" CASCADE;
-- TRUNCATE TABLE "producto" CASCADE;
-- TRUNCATE TABLE "metodo_de_pago" CASCADE;
-- TRUNCATE TABLE "estado_trasaccion" CASCADE;
-- TRUNCATE TABLE "estado" CASCADE;

-- =====================================================
-- INSERTAR ESTADOS
-- =====================================================
INSERT INTO estado (valor, descripcion) VALUES 
('Pendiente', 'Orden pendiente de procesamiento'),
('En proceso', 'Orden en proceso de preparación'),
('Entregado', 'Orden entregada exitosamente'),

-- =====================================================
-- INSERTAR ESTADOS DE TRANSACCIÓN
-- =====================================================
INSERT INTO estado_trasaccion (valor, descripcion) VALUES 
('Pendiente', 'Transacción pendiente de procesamiento'),
('Completado', 'Transacción completada exitosamente'),
('Reembolsado', 'Transacción reembolsada'),

-- =====================================================
-- INSERTAR MÉTODOS DE PAGO
-- =====================================================
INSERT INTO metodo_de_pago (id_cobro, codigo, nombre) VALUES 
(1, 'CC001', 'Tarjeta de Crédito Visa'),
(2, 'CC002', 'Tarjeta de Crédito MasterCard'),
(3, 'DB001', 'Tarjeta de Débito'),
(4, 'TB001', 'Transferencia Bancaria'),
(5, 'PP001', 'PayPal'),
(6, 'EF001', 'Efectivo'),
(7, 'MP001', 'MercadoPago'),
(8, 'UP001', 'Uala Pay');

-- =====================================================
-- INSERTAR UBICACIONES
-- =====================================================
INSERT INTO ubicacion (calle, numero, lat, long) VALUES 
('Av. Córdoba', '1234', -31.4201, -64.1888),
('San Martín', '567', -31.4135, -64.1810),
('Rivadavia', '890', -31.4167, -64.1833),
('9 de Julio', '2341', -31.4089, -64.1765),
('Belgrano', '456', -31.4156, -64.1901),
('Mitre', '789', -31.4178, -64.1845),
('Sarmiento', '1023', -31.4145, -64.1889),
('Colón', '678', -31.4190, -64.1823);

-- =====================================================
-- INSERTAR PRODUCTOS
-- =====================================================
INSERT INTO producto (precio) VALUES 
(25.99),  -- Hamburguesa Clásica
(32.50),  -- Pizza Margherita
(18.75),  -- Ensalada César
(45.00),  -- Parrillada para 2
(12.99),  -- Empanadas (docena)
(22.80),  -- Milanesa con papas
(15.50),  -- Sandwich de jamón y queso
(38.90),  -- Bife de chorizo
(28.75),  -- Pasta boloñesa
(16.25);  -- Papas fritas grandes

-- =====================================================
-- INSERTAR ÓRDENES
-- =====================================================
INSERT INTO orden (estado, id_ubicacion) VALUES 
(1, 1),  -- Pendiente, Av. Córdoba 1234
(2, 2),  -- En proceso, San Martín 567
(3, 3),  -- Entregado, Rivadavia 890
(1, 4),  -- Pendiente, 9 de Julio 2341
(2, 5),  -- En proceso, Belgrano 456
(3, 6),  -- Entregado, Mitre 789
(1, 7),  -- Pendiente, Sarmiento 1023
(4, 8),  -- Cancelado, Colón 678
(1, 1),  -- Pendiente, Av. Córdoba 1234
(2, 3);  -- En proceso, Rivadavia 890

-- =====================================================
-- INSERTAR TRANSACCIONES
-- =====================================================
INSERT INTO transaccion (id_orden, metodo_de_pago, tiempo_de_pago, id_reembolso) VALUES 
(1, 1, '2024-06-10 14:30:00', NULL),     -- Orden 1, Tarjeta Visa
(2, 3, '2024-06-10 15:45:00', NULL),     -- Orden 2, Débito
(3, 2, '2024-06-09 18:20:00', NULL),     -- Orden 3, MasterCard
(4, 5, '2024-06-11 12:15:00', NULL),     -- Orden 4, PayPal
(5, 4, '2024-06-11 16:30:00', NULL),     -- Orden 5, Transferencia
(6, 1, '2024-06-08 19:45:00', NULL),     -- Orden 6, Tarjeta Visa
(7, 7, '2024-06-11 13:22:00', NULL),     -- Orden 7, MercadoPago
(8, 6, '2024-06-10 20:10:00', 'REF001'), -- Orden 8, Efectivo (reembolsada)
(9, 2, '2024-06-11 11:35:00', NULL),     -- Orden 9, MasterCard
(10, 8, '2024-06-11 17:18:00', NULL);    -- Orden 10, Uala Pay

-- =====================================================
-- INSERTAR DETALLES DE TRANSACCIÓN
-- =====================================================
INSERT INTO detalle_de_trasaccion (id_transaccion, id_estado_de_pago, transaccion, id_producto) VALUES 
-- Transacción 1 (Orden 1)
(1, 2, 'TXN001_ITEM1', 1),  -- Hamburguesa Clásica - Completado
(1, 2, 'TXN001_ITEM2', 10), -- Papas fritas - Completado

-- Transacción 2 (Orden 2)
(2, 2, 'TXN002_ITEM1', 2),  -- Pizza Margherita - Completado
(2, 2, 'TXN002_ITEM2', 9),  -- Pasta boloñesa - Completado

-- Transacción 3 (Orden 3)
(3, 2, 'TXN003_ITEM1', 4),  -- Parrillada para 2 - Completado

-- Transacción 4 (Orden 4)
(4, 1, 'TXN004_ITEM1', 5),  -- Empanadas - Pendiente
(4, 1, 'TXN004_ITEM2', 7),  -- Sandwich - Pendiente

-- Transacción 5 (Orden 5)
(5, 2, 'TXN005_ITEM1', 6),  -- Milanesa con papas - Completado

-- Transacción 6 (Orden 6)
(6, 2, 'TXN006_ITEM1', 8),  -- Bife de chorizo - Completado
(6, 2, 'TXN006_ITEM2', 3),  -- Ensalada César - Completado

-- Transacción 7 (Orden 7)
(7, 1, 'TXN007_ITEM1', 1),  -- Hamburguesa Clásica - Pendiente

-- Transacción 8 (Orden 8 - Reembolsada)
(8, 3, 'TXN008_ITEM1', 2),  -- Pizza Margherita - Reembolsado

-- Transacción 9 (Orden 9)
(9, 2, 'TXN009_ITEM1', 9),  -- Pasta boloñesa - Completado
(9, 2, 'TXN009_ITEM2', 10), -- Papas fritas - Completado

-- Transacción 10 (Orden 10)
(10, 1, 'TXN010_ITEM1', 4), -- Parrillada para 2 - Pendiente
(10, 1, 'TXN010_ITEM2', 5); -- Empanadas - Pendiente

-- =====================================================
-- VERIFICAR LOS DATOS INSERTADOS
-- =====================================================
-- SELECT 'Estados' as tabla, COUNT(*) as registros FROM estado
-- UNION ALL
-- SELECT 'Estados Transacción', COUNT(*) FROM estado_trasaccion
-- UNION ALL  
-- SELECT 'Métodos de Pago', COUNT(*) FROM metodo_de_pago
-- UNION ALL
-- SELECT 'Ubicaciones', COUNT(*) FROM ubicacion
-- UNION ALL
-- SELECT 'Productos', COUNT(*) FROM producto
-- UNION ALL
-- SELECT 'Órdenes', COUNT(*) FROM orden
-- UNION ALL
-- SELECT 'Transacciones', COUNT(*) FROM transaccion
-- UNION ALL
-- SELECT 'Detalles Transacción', COUNT(*) FROM detalle_de_trasaccion;