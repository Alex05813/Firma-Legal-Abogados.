import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './abogado.css';

const Abogado = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [procesos, setProcesos] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const abogadoId = "1029144521"; // ID del abogado, esto puede ser dinámico si es necesario
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => (
      <div className="day" key={i}>
        {i + 1}
      </div>
    ));
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  useEffect(() => {
    // Realizando la solicitud GET para obtener los procesos del abogado
    axios.get('http://localhost:5000/api/procesos')
      .then(response => {
        // Filtrando los procesos que corresponden al abogado con el ID dado
        const procesosFiltrados = response.data.filter(proceso => proceso.numeroIdentificacionAbogado === abogadoId);
        setProcesos(procesosFiltrados);
        setLoading(false); // Cambiar el estado de carga
      })
      .catch(err => {
        setError(err); // Si ocurre un error, lo guardamos
        setLoading(false); // Cambiar el estado de carga
      });
  }, []);

  if (loading) {
    return <div>Cargando procesos...</div>;
  }

  if (error) {
    return <div>Error al cargar los procesos: {error.message}</div>;
  }

  return (
    <div>
      {/* Contenido Principal */}
      <main className="main-container">
        {/* Panel Izquierdo */}
        <section className="left-panel">
          <div className="process-section">
            <h2>Procesos</h2>
            <div className="stats">
              <div className="stat">Activos: {procesos.filter(p => p.estado === 'activo').length}</div>
              <div className="stat">En Revisión: {procesos.filter(p => p.estado === 'inactivo').length}</div>
              <div className="stat">Terminados: {procesos.filter(p => p.estado === 'terminado').length}</div>
            </div>
            <div className="chart-container">
              <canvas id="processChart"></canvas>
            </div>
          </div>
          <div className="news-section">
            <h2>Noticias Legales</h2>
            <ul className="news-list">
              <li>Reforma judicial aprobada en el congreso.</li>
              <li>Nuevas reglas sobre contratos laborales.</li>
              <li>Revisión de la ley de propiedad intelectual.</li>
            </ul>
          </div>
        </section>

        {/* Panel Central */}
        <section className="center-panel">
          <div className="calendar-section">
            <h2>Agenda</h2>
            <div className="calendar-container">
              <div className="calendar-header">
                <button className="nav-btn prev-month" onClick={handlePrevMonth}>
                  &lt;
                </button>
                <div className="month-year">
                  <span id="month">{months[currentDate.getMonth()]}</span>{' '}
                  <span id="year">{currentDate.getFullYear()}</span>
                </div>
                <button className="nav-btn next-month" onClick={handleNextMonth}>
                  &gt;
                </button>
              </div>
              <div className="calendar-days">
                <div className="day-name">Lun</div>
                <div className="day-name">Mar</div>
                <div className="day-name">Mié</div>
                <div className="day-name">Jue</div>
                <div className="day-name">Vie</div>
                <div className="day-name">Sáb</div>
                <div className="day-name">Dom</div>
                {renderCalendar()}
              </div>
            </div>
          </div>
          <div className="task-section">
            <h2>Tareas Pendientes</h2>
            <ul className="task-list">
              <li>
                <input type="checkbox" /> Revisión de contrato de Juan Pérez
              </li>
              <li>
                <input type="checkbox" /> Entrega de documentos al cliente María Gómez
              </li>
              <li>
                <input type="checkbox" /> Reunión con el juez asignado
              </li>
            </ul>
          </div>
        </section>

        {/* Panel Derecho */}
        <section className="right-panel">
          <div className="notes-section">
            <h2>Bloc de Notas</h2>
            <textarea placeholder="Escribe tus notas aquí..."></textarea>
            <button className="save-btn">Guardar Nota</button>
          </div>
          <div className="history-section">
            <h2>Historial</h2>
            <ul className="history-list">
              <li>Actualización de proceso 12345 - 2 días atrás</li>
              <li>Cita agendada con Luis Martínez - Hoy</li>
              <li>Documento subido: Contrato María Gómez - Ayer</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Panel Inferior */}
      <main className="main-more">
        <div className="down-panel">
          <div className="loading-animation">
            <svg
              className="gavel"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="100"
              height="100"
            >
              <rect x="30" y="40" width="40" height="15" fill="#415d7e" rx="1" />
              <rect x="47" y="15" width="6" height="40" fill="#415d7e" rx="3" />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Abogado;
