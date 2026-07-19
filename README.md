# GymSoft: Sistema de Membresías y Control de Asistencias 

## Autores (Development Team)
* **Mendoza Medina Leonela Mishelle** 
* **Rivero Silva Gabriela Lisbeth** 

---

## Trazabilidad de Requerimientos Implementados

Este prototipo interactivo permite validar los siguientes puntos clave de la entrega técnica:

* **RF-01 (Registro de Miembros):** Formulario para la gestión del recepcionista. Cuenta con mitigación de flujos alternativos controlando que no se registren identificaciones duplicadas.
* **RF-02 (Registro de Pagos Mensuales):** Implementa las **Clases de Equivalencia** definidas para la mensualidad de **$30.00**.Si ejecutas pruebas con valores límite ($29.99 o $30.01), el sistema bloqueará la caja chica de forma automática.
* **RF-03 (Recuperación de Contraseña):** Simulación activa en el portal de Login para el envío de tokens con vencimiento controlado.
* **RNF-01 (Verificación Biométrica en < 2 segundos):** El módulo de huella simula una petición asíncrona que responde en exactamente `1.2s`, evaluando de forma interactiva las reglas de negocio en pantalla.
* **RNF-03 (Integridad de Datos):** Módulo de reportes automatizado que recopila en tiempo real las transacciones financieras calculando el flujo sin permitir manipulaciones.
