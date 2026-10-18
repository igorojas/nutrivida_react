import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import CampoFormulario from './CampoFormulario';
import { productos } from '../data/productos';
import { mensajes } from '../utils/validaciones';

// Categorías del catálogo, sacadas de los propios productos (Set quita las repetidas): no hay que mantener otra lista a mano.
const CATEGORIAS = [...new Set(productos.map((p) => p.categoria))];
const VACIO = { nombre: '', categoria: CATEGORIAS[0], precio: '', descripcion: '' };

// Formulario del Panel de Control para crear un producto.
// onAgregar(producto) la define la view (Admin); aquí solo se validan los datos.
function FormularioProducto({ onAgregar }) {
  const [datos, setDatos] = useState(VACIO);

  // [name] entre corchetes usa el nombre del campo como clave: actualiza solo ese dato.
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  // Muestra el mensaje con alert (como los demás formularios) y devuelve el foco al campo con error.
  const rechazar = (mensaje, id) => {
    alert(mensaje);
    document.getElementById(id).focus();
  };

  const enviar = (e) => {
    e.preventDefault();

    const precio = parseInt(datos.precio);
    if (datos.nombre.trim() === '') return rechazar(mensajes.productoNombre, 'producto-nombre');
    if (!precio || precio < 1) return rechazar(mensajes.productoPrecio, 'producto-precio');
    if (datos.descripcion.trim() === '') return rechazar(mensajes.productoDescripcion, 'producto-descripcion');

    onAgregar({ ...datos, nombre: datos.nombre.trim(), descripcion: datos.descripcion.trim(), precio });
    setDatos(VACIO);
  };

  return (
    <Form id="form-producto" className="admin-form" onSubmit={enviar}>
      <CampoFormulario id="producto-nombre" name="nombre" claseGrupo="campo-form" etiqueta="Nombre del producto" placeholder="Ej: Proteína de Soya 1kg" required value={datos.nombre} onChange={cambiar} />
      <CampoFormulario id="producto-categoria" name="categoria" as="select" claseGrupo="campo-form" etiqueta="Categoría" value={datos.categoria} onChange={cambiar}>
        {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
      </CampoFormulario>
      <CampoFormulario id="producto-precio" name="precio" tipo="number" min="1" claseGrupo="campo-form" etiqueta="Precio ($)" placeholder="Ej: 9990" required value={datos.precio} onChange={cambiar} />
      <CampoFormulario id="producto-descripcion" name="descripcion" as="textarea" rows={3} claseGrupo="campo-form" etiqueta="Descripción" placeholder="Describe brevemente el producto" required value={datos.descripcion} onChange={cambiar} />

      <button type="submit" className="btn-confirmar">Agregar producto</button>
    </Form>
  );
}

export default FormularioProducto;
