-- Script SQL para poblar la tabla payment_methods con datos iniciales (solo id y name)
-- Solo se pueden crear pagos con estos metodos,sino tirara error

INSERT INTO payment_method (name) VALUES 
('Visa'),
('MasterCard'),
('MP'),
('Efectivo'),
('Transferencia Bancaria'),
('PayPal');

INSERT INTO transaction_status (name) VALUES 
('Pending'),
('completed'),
('refunded');