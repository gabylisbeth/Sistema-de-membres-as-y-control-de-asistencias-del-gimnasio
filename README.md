# 🏋️‍♂️ Sistema de Membresías y Control de Asistencias - UNEMI GymSoft

[cite_start]Prototipo de aplicación web interactiva desarrollado para la asignatura **Introducción a la ingeniería**[cite: 286], bajo la docencia de la **Ing. [cite_start]Palacios Zamora Kerly Vanessa**.

## 👥 Autores (Development Team)
* **Mendoza Medina Leonela Mishelle** [cite: 284]
* [cite_start]**Rivero Silva Gabriela Lisbeth** [cite: 285]

---

## 🚀 Trazabilidad de Requerimientos Implementados

Este prototipo interactivo (SPA) permite validar los siguientes puntos clave de la entrega técnica:

* [cite_start]**RF-01 (Registro de Miembros):** Formulario para la gestión del recepcionista[cite: 243]. [cite_start]Cuenta con mitigación de flujos alternativos controlando que no se registren identificaciones duplicadas[cite: 243].
* [cite_start]**RF-02 (Registro de Pagos Mensuales):** Implementa las **Clases de Equivalencia** definidas para la mensualidad de **$30.00**. [cite_start]Si ejecutas pruebas con valores límite ($29.99 o $30.01), el sistema bloqueará la caja chica de forma automática[cite: 270, 273].
* [cite_start]**RF-03 (Recuperación de Contraseña):** Simulación activa en el portal de Login para el envío de tokens con vencimiento controlado[cite: 247].
* **RNF-01 (Verificación Biométrica en < 2 segundos):** El módulo de huella simula una petición asíncrona que responde en exactamente `1.2s`, evaluando de forma interactiva las reglas de negocio en pantalla.
* [cite_start]**RNF-03 (Integridad de Datos):** Módulo de reportes automatizado que recopila en tiempo real las transacciones financieras calculando el flujo sin permitir manipulaciones[cite: 253, 319].
