# Plan de Pruebas Unitarias

**Nombre de los Estudiantes:** Vicente Lopez e Igor Rojas

<br />

**Componente / Módulo Principal:** Home, Contacto.

<br />

**Fecha:** 21-10-2026

| ID | Componente <br> *(describe)* | Caso de Prueba<br>*(it / test)* | Preparación<br>*(Arrange: props, mocks)* | Acción<br>*(Act: fireEvent, render)* | Resultado Esperado<br>*(Assert: expect)* | Estado<br>*(Pasa / Falla)* |

| :--- | :--- | :--- | :--- | :--- | :--- | :--- |

| PU-001 | TarjetaProducto | Debe cambiar el texto del boton a "Guardado" al momento de hacer click | Creamos un objeto mock con informacion de "Herramientas" | Buscar la etiqueta, hacemos clic | El boton debe mostrar el texto "Guardado" | PASA |

| PU-002 | FormularioContacto | Debe permitir al usuario ingresar su nombre en el campo "Nombre" | Renderizar el formulario, buscar el campo "Nombre", y simular el ingreso del texto "Marco" | Evaluar | :--- | :--- |
