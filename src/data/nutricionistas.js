// Mismo método que en productos.js: import.meta.glob importa de una vez todas las imágenes de cada carpeta.
const fotosNutri = import.meta.glob('../assets/img/nutricionistas/*', { eager: true, import: 'default' });
const imagenesPlanes = import.meta.glob('../assets/img/planes/*', { eager: true, import: 'default' });

// Busca una imagen por carpeta y nombre; si el nombre no coincide, avisa por consola en vez de dejar la foto rota sin explicación.
const buscar = (archivos, carpeta, nombre) => {
  const url = archivos[`../assets/img/${carpeta}/${nombre}`];
  if (!url) console.warn(`Imagen no encontrada: ${carpeta}/${nombre}`);
  return url;
};

// Datos de los nutricionistas de NutriVida.
// 'foto' es el retrato redondo y 'imagen' la portada de la tarjeta (imagen de uno de los planes).
export const nutricionistas = [
  {
    id: 1,
    nombre: 'Camila Rojas',
    especialidad: 'Nutrición Deportiva',
    foto: buscar(fotosNutri, 'nutricionistas', 'nutricionista(1).png'),
    imagen: buscar(imagenesPlanes, 'planes', 'proteico_fitness.jpg'),
    bio: 'Trabaja con deportistas y personas activas, ayudando a mejorar el rendimiento físico y la recuperación muscular a través de la alimentación.',
    experiencia: '8 años de experiencia'
  },
  {
    id: 2,
    nombre: 'Matías Fuentes',
    especialidad: 'Control de Peso',
    foto: buscar(fotosNutri, 'nutricionistas', 'nutricionista(2).png'),
    imagen: buscar(imagenesPlanes, 'planes', 'control_peso.jpg'),
    bio: 'Especialista en el acompañamiento de procesos de baja y mantención de peso, con un enfoque realista y sostenible en el tiempo.',
    experiencia: '10 años de experiencia'
  },
  {
    id: 3,
    nombre: 'Valentina Soto',
    especialidad: 'Salud Metabólica',
    foto: buscar(fotosNutri, 'nutricionistas', 'nutricionista(3).png'),
    imagen: buscar(imagenesPlanes, 'planes', 'detox_verde.jpg'),
    bio: 'Enfocada en el manejo nutricional de la diabetes, resistencia a la insulina, colesterol y otras condiciones metabólicas.',
    experiencia: '6 años de experiencia'
  },
  {
    id: 4,
    nombre: 'Diego Herrera',
    especialidad: 'Alimentación Vegetariana/Vegana',
    foto: buscar(fotosNutri, 'nutricionistas', 'nutricionista(4).png'),
    imagen: buscar(imagenesPlanes, 'planes', 'vegetariano_integral.jpg'),
    bio: 'Ayuda a pacientes a llevar una alimentación vegetariana o vegana completa y balanceada, cuidando cada nutriente esencial.',
    experiencia: '7 años de experiencia'
  }
];
