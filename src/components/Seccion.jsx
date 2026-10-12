function Seccion({ id, titulo, children, className = 'seccion' }) {
  return (
    <section id={id} className={className}>
      {titulo && <h2>{titulo}</h2>}
      {children}
    </section>
  );
}

export default Seccion;