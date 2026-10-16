import { requisitosContrasena } from '../utils/validaciones';

// Cuadro que marca los 4 requisitos de la contraseña mientras se escribe.
// valor: contraseña escrita. visible: true mientras el campo tiene el foco (el CSS lo oculta por defecto con #message).
function RequisitosContrasena({ valor, visible }) {
  const req = requisitosContrasena(valor);
  // Cada requisito lleva 'valid' si se cumple o 'invalid' si no (clases del CSS original, con ✔ y ✖).
  const clase = (cumple) => (cumple ? 'valid' : 'invalid');

  return (
    <div id="message" style={{ display: visible ? 'block' : 'none' }}>
      <h3>La contraseña debe contener lo siguiente:</h3>
      <p className={clase(req.minuscula)}>Una letra <b>minúscula</b></p>
      <p className={clase(req.mayuscula)}>Una letra <b>mayúscula</b></p>
      <p className={clase(req.numero)}>Un <b>número</b></p>
      <p className={clase(req.largo)}>Mínimo <b>8 caracteres</b></p>
    </div>
  );
}

export default RequisitosContrasena;
