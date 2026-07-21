# GymSoft: Sistema de Membresías y Control de Asistencias

##  Autores (Development Team)
* **Mendoza Medina Leonela Mishelle** 
* **Rivero Silva Gabriela Lisbeth** 

---

##  Trazabilidad de Requerimientos Implementados

Este prototipo interactivo permite gestionar y validar los siguientes requerimientos clave de la entrega técnica:

###  Requerimientos Funcionales (RF)

* **RF-01 (Registro de nuevos miembros):** El sistema permite al recepcionista ingresar los datos personales y de membresía de un nuevo usuario en la base de datos. Cuenta con mitigación de flujos alternativos controlando que no se registren identificaciones duplicadas.
* **RF-02 (Registro de pagos mensuales):** Permite al administrador registrar el pago realizado por un usuario, actualizando su fecha de vigencia. Implementa las Clases de Equivalencia definidas para la mensualidad fija de **$30.00**. Si se ejecutan pruebas con valores límite ($29.99 o $30.01), el sistema bloqueará la caja chica de forma automática.
* **RF-03 (Recuperación de contraseña):** Permite a los usuarios solicitar el restablecimiento de su contraseña a través de su correo electrónico registrado mediante el envío de un enlace o token temporal con expiración de 30 minutos.

---

###  Requerimientos No Funcionales (RNF)

* **RNF-01 (Tiempo de respuesta en recepción):** El sistema debe procesar y validar la verificación de asistencia y acceso en menos de dos segundos ($< 2\text{s}$) para evitar retrasos en horas pico.
* **RNF-02 (Seguridad lógica y acceso):** Implementa un esquema de autenticación híbrido diseñado para el personal autorizado, garantizando un acceso seguro mediante la verificación de credenciales contra una base de datos cifrada.
* **RNF-03 (Integridad y precisión de datos):** Módulo de reportes automatizado que recopila en tiempo real las transacciones financieras y tasas de asistencia, calculando los flujos con precisión matemática y sin permitir manipulaciones externas.

---

##  Tecnologías Utilizadas
* **Frontend:** HTML5, Tailwind CSS 
* **Lógica:** JavaScript (Vanilla) 
* **Persistencia:** LocalStorage 
* **Iconografía:** Lucide Icons 
