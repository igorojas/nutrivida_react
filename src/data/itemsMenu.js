export const itemsMenu = [
    { href: '/', label: 'Inicio', icon: 'fa fa-fw fa-home' },
    { href: '/productos', label: 'Catálogo de Compras', icon: 'fa fa-fw fa-shopping-cart' },
    { href: '/agendar', label: 'Agendar Cita', icon: 'fa fa-fw fa-calendar' },
    { href: '/login', label: 'Iniciar Sesión', icon: 'fa fa-fw fa-user', split: true }
];

// Item que reemplaza a "Iniciar Sesión" cuando hay una sesión iniciada (lo elige Header.jsx).
// El acceso al Panel de Control no va en la barra: el administrador lo encuentra dentro de Mi Perfil.
export const itemPerfil = { href: '/perfil', label: 'Mi Perfil', icon: 'fa fa-fw fa-user', split: true };
