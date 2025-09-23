import React, { useState } from 'react';

// Se asume que Tailwind CSS está disponible.
const App = () => {
  // Estado para controlar la sección actual que se muestra.
  const [seccionActiva, setSeccionActiva] = useState('home');
  // Nuevo estado para almacenar los detalles de la reserva.
  const [reserva, setReserva] = useState(null);

  // Datos para el menú de Entradas
  const entradas = [
    { nombre: 'Aros de Cebolla', precio: 3500, descripcion: 'Aros de cebolla rebozados y crujientes, servidos con salsa de la casa.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Aros+de+Cebolla' },
    { nombre: 'Papas con Cheddar y Panceta', precio: 4500, descripcion: 'Papas fritas con abundante queso cheddar derretido y panceta crocante.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Papas+Cheddar' },
  ];

  // Datos para el menú de hamburguesas
  const hamburguesas = [
    { nombre: 'Clásica Americana', precio: 7500, descripcion: 'La hamburguesa clásica que nunca falla con queso cheddar y lechuga fresca.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Hamburguesa+1' },
    { nombre: 'Doble Queso', precio: 8500, descripcion: 'Dos jugosas carnes y doble porción de queso derretido.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Hamburguesa+2' },
    { nombre: 'Veggie Delicia', precio: 7000, descripcion: 'Hecha con lentejas y garbanzos, acompañada de aguacate y tomate.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Hamburguesa+3' },
    { nombre: 'Hamburguesa Picante', precio: 8000, descripcion: 'Con jalapeños, salsa picante de la casa y un toque de crema agria.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Hamburguesa+4' },
    { nombre: 'La Ranchera', precio: 9200, descripcion: 'Carne a la parrilla, aros de cebolla crujientes y salsa BBQ ahumada.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Hamburguesa+5' },
    { nombre: 'Hamburguesa con Huevo', precio: 7800, descripcion: 'La combinación perfecta de carne, queso y un huevo frito.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Hamburguesa+6' },
    { nombre: 'La Italiana', precio: 9500, descripcion: 'Con mozzarella, tomate seco y pesto de albahaca.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Hamburguesa+7' },
    { nombre: 'Hamburguesa de Pollo', precio: 7200, descripcion: 'Pechuga de pollo a la parrilla, lechuga y aderezo especial.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Hamburguesa+8' },
    { nombre: 'La Suprema', precio: 10500, descripcion: 'Carne, bacon, queso, cebolla caramelizada y salsa de champiñones.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Hamburguesa+9' },
    { nombre: 'El Rey', precio: 12000, descripcion: 'Nuestra hamburguesa premium con carne de wagyu, trufa y rúcula.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Hamburguesa+10' },
  ];

  // Datos para el menú de Bebidas
  const bebidas = [
    { nombre: 'Gaseosa', precio: 1500, descripcion: 'Coca-Cola, Pepsi, Sprite.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Gaseosa' },
    { nombre: 'Cerveza Artesanal', precio: 2500, descripcion: 'Variedad de cervezas locales, consultar disponibilidad.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Cerveza' },
    { nombre: 'Agua Mineral', precio: 1000, descripcion: 'Agua mineral con o sin gas.', imagen: 'https://placehold.co/400x300/F9A825/ffffff?text=Agua' },
  ];

  // Horarios de atención según el día de la semana.
  const horariosPorDia = {
    // 1-4 (Lunes a Jueves)
    lun_jue: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'],
    // 5-6 (Viernes a Sábado)
    vie_sab: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'],
    // 0 (Domingo)
    domingo: [],
  };

  // Estado para almacenar los horarios disponibles de la fecha seleccionada.
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  // Estado para indicar si la fecha seleccionada es un domingo.
  const [esDomingo, setEsDomingo] = useState(false);

  // Función para manejar el cambio de fecha y actualizar los horarios.
  const manejarCambioFecha = (e) => {
    const fecha = e.target.value;
    if (!fecha) {
      setHorariosDisponibles([]);
      setEsDomingo(false);
      return;
    }
    const diaSemana = new Date(`${fecha}T12:00:00`).getUTCDay(); // Usar UTC para evitar problemas de zona horaria.

    let nuevosHorarios = [];
    let esDomingo = false;
    switch (diaSemana) {
      case 0: // Domingo
        esDomingo = true;
        break;
      case 1:
      case 2:
      case 3:
      case 4: // Lunes a Jueves
        nuevosHorarios = horariosPorDia.lun_jue;
        break;
      case 5:
      case 6: // Viernes y Sábado
        nuevosHorarios = horariosPorDia.vie_sab;
        break;
      default:
        break;
    }
    setEsDomingo(esDomingo);
    setHorariosDisponibles(nuevosHorarios);
  };
  
  // Componente para la notificación temporal (reemplazo de alert)
  const [mensaje, setMensaje] = useState(null);
  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => {
      setMensaje(null);
    }, 3000);
  };
  
  const handleReserva = (e) => {
    e.preventDefault();
    if (esDomingo) {
      mostrarMensaje("No se pueden hacer reservas los domingos.");
      return;
    }
    const formData = new FormData(e.target);
    const nuevaReserva = {
      nombre: formData.get('nombre'),
      dni: formData.get('dni'),
      telefono: formData.get('telefono'), 
      fecha: formData.get('fecha'),
      horario: formData.get('horario'),
      descripcion: formData.get('descripcion'),
    };
    setReserva(nuevaReserva);
    mostrarMensaje("¡Reserva realizada con éxito!");
  };

  const handleCancelacion = () => {
    setReserva(null);
    mostrarMensaje("Tu reserva ha sido cancelada.");
  };

  // Calcula las fechas mínima y máxima permitidas.
  const fechaMinima = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
  const fechaMaxima = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0];

  return (
    <div className="bg-gray-100 font-[Inter]">
      {/* Mensaje de notificación */}
      {mensaje && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-xl animate-fade-in-down z-50">
          {mensaje}
        </div>
      )}

      {/* Barra de Navegación */}
      <nav className="fixed top-0 left-0 w-full z-10 bg-white shadow-lg p-4 flex justify-between items-center px-6">
        <div className="text-3xl font-bold text-yellow-600">Hamburguesas El Sol</div>
        <div className="hidden md:flex space-x-6">
          <button onClick={() => setSeccionActiva('home')} className={`text-lg font-medium transition-colors duration-300 ${seccionActiva === 'home' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-600 hover:text-yellow-600'}`}>Inicio</button>
          <button onClick={() => setSeccionActiva('menu')} className={`text-lg font-medium transition-colors duration-300 ${seccionActiva === 'menu' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-600 hover:text-yellow-600'}`}>Menú</button>
          <button onClick={() => setSeccionActiva('reservas')} className={`flex items-center text-lg font-medium transition-colors duration-300 ${seccionActiva === 'reservas' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-600 hover:text-yellow-600'}`}>
            Reservas {reserva && <span className="ml-1 text-xl">😊</span>}
          </button>
          <button onClick={() => setSeccionActiva('contacto')} className={`text-lg font-medium transition-colors duration-300 ${seccionActiva === 'contacto' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-600 hover:text-yellow-600'}`}>Contacto</button>
        </div>
        {/* Aquí se podría agregar un menú para móviles */}
      </nav>

      {/* Contenido de la página */}
      <main className="pt-20">
        {seccionActiva === 'home' && (
          <section id="home" className="space-y-16">
            {/* Fotos de Hamburguesas - Primer Pantallazo */}
            <div className="relative h-[60vh] md:h-[80vh] bg-cover bg-center rounded-b-3xl shadow-lg" style={{ backgroundImage: 'url("https://placehold.co/1200x800/F9A825/ffffff?text=Hamburguesas+deliciosas")' }}>
              <div className="absolute inset-0 bg-black opacity-40 rounded-b-3xl"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">¡Las mejores hamburguesas de la ciudad!</h1>
                <p className="mt-4 text-xl md:text-2xl font-light">Sabor inigualable en cada bocado.</p>
              </div>
            </div>

            {/* Fotos del Local */}
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Nuestro Ambiente</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                  <img src="https://placehold.co/600x400/D4B7A4/ffffff?text=Interior" alt="Interior del local" className="w-full h-48 object-cover"/>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                  <img src="https://placehold.co/600x400/D4B7A4/ffffff?text=Exterior" alt="Fachada del local" className="w-full h-48 object-cover"/>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                  <img src="https://placehold.co/600x400/D4B7A4/ffffff?text=Cocina" alt="Cocina abierta" className="w-full h-48 object-cover"/>
                </div>
              </div>
            </div>

            {/* Horarios de Atención */}
            <div className="bg-gray-800 text-white py-12 rounded-t-3xl shadow-inner">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Horarios de Atención</h2>
                <p className="text-lg">
                  Lunes a Jueves: <span className="font-bold">12:00 PM - 10:00 PM</span><br/>
                  Viernes y Sábado: <span className="font-bold">12:00 PM - 11:00 PM</span><br/>
                  Domingo: <span className="font-bold">Cerrado</span>
                </p>
              </div>
            </div>
          </section>
        )}

        {seccionActiva === 'menu' && (
          <section id="menu" className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Nuestro Menú</h2>
            
            {/* Sección de Entradas */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Entradas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {entradas.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer">
                  <img src={item.imagen} alt={item.nombre} className="w-full h-56 object-cover"/>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold text-gray-800">{item.nombre}</h4>
                      <span className="text-2xl font-extrabold text-yellow-600">${item.precio}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sección de Hamburguesas */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Hamburguesas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {hamburguesas.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer">
                  <img src={item.imagen} alt={item.nombre} className="w-full h-56 object-cover"/>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold text-gray-800">{item.nombre}</h4>
                      <span className="text-2xl font-extrabold text-yellow-600">${item.precio}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sección de Bebidas */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Bebidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bebidas.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer">
                  <img src={item.imagen} alt={item.nombre} className="w-full h-56 object-cover"/>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold text-gray-800">{item.nombre}</h4>
                      <span className="text-2xl font-extrabold text-yellow-600">${item.precio}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {seccionActiva === 'reservas' && (
          <section id="reservas" className="container mx-auto px-4 py-12 min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              {reserva ? (
                // Muestra la reserva si existe
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-green-600 mb-2">¡Reserva Confirmada!</h2>
                  <p className="text-xl text-gray-800">
                    Tu mesa está reservada para el <span className="font-bold">{reserva.fecha}</span> a las <span className="font-bold">{reserva.horario}</span>.
                  </p>
                  <ul className="text-left max-w-sm mx-auto space-y-2 text-gray-700">
                    <li><span className="font-semibold">Nombre:</span> {reserva.nombre}</li>
                    <li><span className="font-semibold">DNI:</span> {reserva.dni}</li>
                    <li><span className="font-semibold">Teléfono:</span> {reserva.telefono}</li>
                    {reserva.descripcion && (
                      <li><span className="font-semibold">Descripción:</span> {reserva.descripcion}</li>
                    )}
                  </ul>
                  <button 
                    onClick={handleCancelacion}
                    className="mt-6 px-6 py-3 border border-red-600 text-red-600 font-medium rounded-full shadow-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300">
                    Cancelar Reserva
                  </button>
                </div>
              ) : (
                // Muestra el formulario si no hay reserva
                <>
                  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Reserva tu Mesa</h2>
                  
                  <form onSubmit={handleReserva} className="space-y-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
                      <input type="text" id="nombre" name="nombre" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 transition"/>
                    </div>
                    <div>
                      <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
                      <input type="text" id="dni" name="dni" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 transition"/>
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                      <input type="tel" id="telefono" name="telefono" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 transition"/>
                    </div>
                    <div>
                      <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha de la Reserva</label>
                      <input type="date" id="fecha" name="fecha" required min={fechaMinima} max={fechaMaxima} onChange={manejarCambioFecha} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 transition"/>
                      <p className="text-center text-sm text-gray-600 mt-2">
                        Solo puedes reservar con un máximo de un mes de anticipación.
                      </p>
                    </div>
                    <div>
                      <label htmlFor="horario" className="block text-sm font-medium text-gray-700">Horario</label>
                      {esDomingo ? (
                        <p className="text-red-500 font-semibold mt-2">Lo sentimos, la hamburguesería está cerrada los domingos.</p>
                      ) : (
                        <select id="horario" name="horario" required={!esDomingo} disabled={esDomingo} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 transition">
                          <option value="">Selecciona un horario</option>
                          {horariosDisponibles.map(horario => (
                            <option key={horario} value={horario}>{horario}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div>
                      <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción (opcional)</label>
                      <textarea id="descripcion" name="descripcion" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 transition"></textarea>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300 transform hover:-translate-y-1">
                        Reservar Mesa
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </section>
        )}

        {seccionActiva === 'contacto' && (
          <section id="contacto" className="container mx-auto px-4 py-12 min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contáctanos</h2>
              <p className="text-gray-600 mb-4">
                Si tienes alguna pregunta, no dudes en contactarnos.
              </p>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Dirección:</strong> Avenida Principal 123, Ciudad
                </p>
                <p>
                  <strong>Teléfono:</strong> +54 9 11 1234-5678
                </p>
                <p>
                  <strong>Email:</strong> contacto@hamburguesaselsol.com
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Pie de Página */}
      <footer className="bg-gray-900 text-white py-6 text-center mt-12">
        <div className="container mx-auto px-4">
          <p className="text-sm">&copy; 2023 Hamburguesas El Sol. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
