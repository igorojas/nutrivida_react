// Link: reemplaza las etiquetas <a> para navegar sin recargar la página.
// useLocation: hook para obtener la URL activa y saber en qué página está el usuario.
import { Link, useLocation } from 'react-router-dom';
import { itemsMenu } from '../data/itemsMenu';

function Header({ cantidad = 0 }) {
  // Obtiene la ruta de la URL activa (ejemplo: "/", "/productos", "/login")
  const location = useLocation();

  // Un enlace está activo si su ruta coincide exactamente con la URL actual.
  // Excepción: el detalle de un producto (/producto/3) mantiene activo "Catálogo de Compras" (/productos),
  // igual que el producto.html original.
  const esActivo = (href) =>
    location.pathname === href ||
    (href === '/productos' && location.pathname.startsWith('/producto/'));

  return (
    <>
      <header id="encabezado">
        <div className="header-brand">
          <i className="fa fa-leaf logo-icono" aria-hidden="true"></i>
          <h1>Nutrivida</h1>
        </div>
        <p className="eslogan">Planea Saludable Para Una Vida Memorable</p>
      </header>

      <nav className="topnav">
        {/*
          Mapeo dinámico del menú de navegación:
          Recorremos la lista 'itemsMenu' para generar cada enlace del menú.
        */}
        {itemsMenu.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={`${esActivo(item.href) ? 'active' : ''} ${item.split ? 'split' : ''}`}
          >
            {/*
              1. Evaluamos con 'esActivo' si la ruta de la URL actual coincide con la propiedad 'href' del elemento del menú.
                Si coincide, le asigna la clase 'active' para resaltarlo.
              2. Evaluamos si el elemento tiene la propiedad 'split: true'. Si es así, le agrega la clase 'split' para empujarlo
                hacia el extremo derecho de la barra de navegación en el CSS (como en "Iniciar Sesión").
            */}
            <i className={item.icon}></i> {item.label}
          </Link>
        ))}
        <span className="carrito-contador">
          <i className="fa fa-fw fa-shopping-basket"></i> Carrito (<span id="carrito-num">{cantidad}</span>)
        </span>
      </nav>
    </>
  );
}

export default Header;
