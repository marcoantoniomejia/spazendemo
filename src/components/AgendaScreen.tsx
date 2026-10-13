import React, { useState } from 'react';
import { Appointment, Cabin, Client, ScreenType } from '../types';

interface AgendaScreenProps {
  appointments: Appointment[];
  cabins: Cabin[];
  onOpenExpediente: (client?: Client) => void;
  onOpenPOS: (client?: Client) => void;
  onOpenIntake: (client?: Client) => void;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const AgendaScreen: React.FC<AgendaScreenProps> = ({
  appointments,
  cabins,
  onOpenExpediente,
  onOpenPOS,
  onOpenIntake,
  onNavigateScreen,
}) => {
  const [selectedDate, setSelectedDate] = useState<'hoy' | 'manana' | 'sabado'>('hoy');
  const [filterTherapist, setFilterTherapist] = useState('Todos los terapeutas');
  const [filterCabin, setFilterCabin] = useState('Todas las cabinas');
  const [showPendingPaymentOnly, setShowPendingPaymentOnly] = useState(false);
  const [waitingClients, setWaitingClients] = useState([
    {
      id: 'wait-1',
      name: 'Carla San Román',
      actionNote: 'Tomando infusión de menta',
      timeWaiting: 'Hace 10 min',
      appointmentTime: '12:30 PM',
      cabin: 'Cabina 1 • Elena M.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyUAwTR6wH-5IUZ7zCCLzTb_R4BHzAcKgL-wFCBj2w0Y-D120SYmnVz7tMD3WWTcMJzTmdPwKtSkwjilF8xh7nITwoIdhO1fy5fn70ocYD-m8Fe9JBQ1OQxCqHAqgSfE-GRug47V_HaBpSET0uGNIFvQ7fNp1KBpI-2ew36Ek5MQxEWfwBju-HwKJ7T3j93k7olWaBEw8AQ4O8_e9PSRAQFN8HRGLlMbi4Nk2Y5qz5sEcTkmL-91-9Zg',
      status: 'espera',
    },
    {
      id: 'wait-2',
      name: 'Fernando Garza',
      actionNote: 'Llegó con kit de cambio',
      timeWaiting: 'Hace 3 min',
      appointmentTime: '12:15 PM',
      cabin: 'Cabina 3 • Dra. Camila',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbL-802fP6sgm0GrhVMHxCBRh6tuCKYy1yVD3Yc1muiXyuQpTdCSKsnnfNZZnSkr0I1ade3fq21FhlEcEUWt6AiyVlnRlNok2hMJOWh8_gZEjLNgwHYLF2LOX_b1fNiqcw9alkr5gfupUEhQim_QpIwLZ0uGEBXIYoPJDAMo3BY9GJg7FQloxCb59otkn0MKBklA0WBW6ik-kVcdmgOqZSDJulsrM0gcqHc8149SFbRtiZ6C3AbyMnmQ',
      status: 'espera',
    },
  ]);

  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  const notifyTherapist = (therapistName: string, clientName: string) => {
    showToast(`🔔 Notificación enviada a ${therapistName}: ${clientName} ya está lista en sala.`);
  };

  const markCheckIn = (clientName: string) => {
    showToast(`✓ Check-in verificado para ${clientName}. Abriendo Ficha de Admisión.`);
    onOpenIntake();
  };

  const moveToDressingRoom = (clientName: string) => {
    showToast(`🚪 ${clientName} pasó al Vestidor Privado #02.`);
    setWaitingClients((prev) =>
      prev.map((c) => (c.name === clientName ? { ...c, actionNote: 'En Vestidor Privado' } : c))
    );
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Toast Alert */}
      {notificationToast && (
        <div className="fixed top-24 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-primary-fixed/30 animate-bounce">
          <span className="material-symbols-outlined text-lg">notifications_active</span>
          <span className="text-xs font-semibold">{notificationToast}</span>
        </div>
      )}

      {/* Top Filter Bar & Ambient State Header */}
      <section className="w-full bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-xs border border-primary-container/10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Switcher Pills */}
          <div className="inline-flex items-center bg-surface-container-low p-1 rounded-full gap-1">
            <button
              onClick={() => setSelectedDate('hoy')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedDate === 'hoy'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Hoy (24 Oct)
            </button>
            <button
              onClick={() => setSelectedDate('manana')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedDate === 'manana'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Mañana (25 Oct)
            </button>
            <button
              onClick={() => setSelectedDate('sabado')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedDate === 'sabado'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Sábado (26 Oct)
            </button>
            <button
              onClick={() => showToast('Calendario completo sincronizado')}
              className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors ml-1"
              title="Seleccionar otra fecha"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
            </button>
          </div>

          {/* Branch Occupancy Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            <span className="text-on-surface font-medium">Sucursal Polanco</span>
            <span className="text-outline-variant">•</span>
            <span>4 Cabinas activas</span>
            <span className="text-outline-variant">•</span>
            <span className="text-primary font-bold">98% Ocupación</span>
          </div>
        </div>

        {/* Filter Buttons & Legend */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto justify-between xl:justify-end">
          <div className="flex items-center gap-2">
            <select
              value={filterTherapist}
              onChange={(e) => setFilterTherapist(e.target.value)}
              className="bg-surface-container-low text-on-surface-variant text-xs py-2 px-3 rounded-xl border border-primary-container/10 focus:outline-none"
            >
              <option>Todos los terapeutas</option>
              <option>Elena Morales</option>
              <option>Mateo Valdés</option>
              <option>Dra. Camila Soria</option>
            </select>

            <select
              value={filterCabin}
              onChange={(e) => setFilterCabin(e.target.value)}
              className="bg-surface-container-low text-on-surface-variant text-xs py-2 px-3 rounded-xl border border-primary-container/10 focus:outline-none"
            >
              <option>Todas las cabinas</option>
              <option>Cabina 1 (Faciales)</option>
              <option>Cabina 2 (Masajes)</option>
              <option>Cabina 3 (Aparatología)</option>
            </select>

            <button
              onClick={() => {
                setShowPendingPaymentOnly(!showPendingPaymentOnly);
                showToast(
                  !showPendingPaymentOnly
                    ? 'Filtrando: 2 clientes con servicios concluidos pendientes de cobro'
                    : 'Mostrando todas las citas'
                );
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                showPendingPaymentOnly
                  ? 'bg-secondary text-on-secondary shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-sm">payments</span>
              <span>Pendientes de cobro</span>
            </button>
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-3 pl-2 py-1 text-xs text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
              <span>Confirmada</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span>En Cabina</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
              <span>Alerta / Cuidado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace: Split View 70% Timeline / 30% Quick Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: 70% Width Timeline Grid */}
        <section className="lg:col-span-8 flex flex-col gap-5 bg-surface-container-lowest rounded-2xl p-4 sm:p-6 shadow-xs border border-primary-container/10">
          {/* Panel Header & Ambience Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-surface-container-low">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">spa</span>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
                  Agenda de Cabinas &amp; Terapeutas
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Monitoreo en tiempo real de espacios y ritmos terapéuticos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-xl text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-primary">air</span>
              <span>Difusión Botánica Activa: Eucalipto &amp; Salvia</span>
            </div>
          </div>

          {/* Cabina Headers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {cabins.map((cab) => (
              <div key={cab.id} className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-surface-container-low border border-primary-container/5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-outline">
                    {cab.name}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-primary font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                    {cab.temperature}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-on-surface truncate">
                  {cab.specialty}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-on-surface-variant truncate">
                    {cab.assignedTherapist}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule Timeline Container */}
          <div className="relative w-full mt-2 flex flex-col gap-6 pb-2">
            {/* Live Current Time Indicator Marker (11:45 AM) */}
            <div className="relative w-full z-20 flex items-center my-1 pointer-events-none">
              <div className="flex items-center gap-2 bg-secondary text-on-secondary px-3 py-1 rounded-full shadow-md">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  11:45 AM — Ahora
                </span>
              </div>
              <div className="flex-1 h-0.5 bg-secondary/30 ml-2" />
            </div>

            {/* Slot Group: 10:30 AM - 12:00 PM (Franja Matutina) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-outline">
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  10:30 AM — Franja Matutina
                </span>
                <div className="flex-1 h-px bg-surface-container" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Card 1: Cabina 1 Valentina Restrepo */}
                <div className="col-span-1 bg-surface-container-low/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between border-l-4 border-secondary relative group hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                        En Cabina • 10:30 - 12:00
                      </span>
                      <span className="material-symbols-outlined text-secondary text-sm">timelapse</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-on-surface mt-0.5">Valentina Restrepo</h3>
                      <p className="text-xs text-primary font-medium mt-0.5">
                        Facial Hidratante + Algas
                      </p>
                      <span className="text-[11px] text-on-surface-variant">Duración: 80 min</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-tertiary-fixed/60 text-on-tertiary-fixed-variant text-xs">
                      <span className="material-symbols-outlined text-xs text-tertiary">warning</span>
                      <span className="font-semibold truncate">Piel Sensible • Alergia al Árnica</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-container">
                    <span className="text-xs text-on-surface-variant font-medium">Elena M.</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenExpediente(appointments[0].client)}
                        className="px-2 py-1 rounded-lg bg-surface text-primary hover:bg-surface-container text-xs font-semibold shadow-xs transition-colors"
                      >
                        Ficha
                      </button>
                      <button
                        onClick={() => onOpenPOS(appointments[0].client)}
                        className="px-2 py-1 rounded-lg bg-surface text-secondary hover:bg-surface-container text-xs font-semibold shadow-xs transition-colors"
                      >
                        + Producto
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2: Cabina 2 Rodrigo Mendizabal */}
                <div className="col-span-1 bg-surface-container-low/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between border-l-4 border-secondary relative group hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                        En Cabina • 11:00 - 12:30
                      </span>
                      <span className="material-symbols-outlined text-secondary text-sm">timelapse</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-on-surface mt-0.5">Rodrigo Mendizábal</h3>
                      <p className="text-xs text-primary font-medium mt-0.5">
                        Masaje Descontracturante
                      </p>
                      <span className="text-[11px] text-on-surface-variant">Duración: 60 min</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface-variant text-xs">
                      <span className="material-symbols-outlined text-xs text-secondary">info</span>
                      <span className="font-medium truncate">Lumbalgia L4-L5 • Presión Media</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-container">
                    <span className="text-xs text-on-surface-variant font-medium">Mateo V.</span>
                    <button
                      onClick={() => onOpenPOS(appointments[1].client)}
                      className="px-2.5 py-1 rounded-lg bg-surface text-primary hover:bg-surface-container text-xs font-semibold transition-colors"
                    >
                      Cobro Rápido
                    </button>
                  </div>
                </div>

                {/* Card 3: Cabina 3 Lucía Méndez */}
                <div className="col-span-1 bg-surface-container-low/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between border-l-4 border-secondary relative group hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                        En Cabina • 11:30 - 13:00
                      </span>
                      <span className="material-symbols-outlined text-secondary text-sm">timelapse</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-on-surface mt-0.5">Lucía Méndez</h3>
                      <p className="text-xs text-primary font-medium mt-0.5">
                        Radiofrecuencia Reafirmante
                      </p>
                      <span className="text-[11px] text-on-surface-variant">Duración: 60 min</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface-variant text-xs">
                      <span className="material-symbols-outlined text-xs text-primary">verified_user</span>
                      <span className="font-medium truncate">Sin implantes metálicos</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-container">
                    <span className="text-xs text-on-surface-variant font-medium">Dra. Camila S.</span>
                    <button
                      onClick={() => showToast('Parámetros de radiofrecuencia: 24W continuo')}
                      className="px-2.5 py-1 rounded-lg bg-surface text-primary hover:bg-surface-container text-xs font-semibold transition-colors"
                    >
                      Parámetros
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Slot Group: 12:30 PM - 14:00 PM (Franja Mediodía) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-outline">
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  12:30 PM — Franja Mediodía
                </span>
                <div className="flex-1 h-px bg-surface-container" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Card 4: Cabina 1 Carla San Román */}
                <div className="col-span-1 bg-surface-container-low/50 rounded-xl p-3.5 shadow-xs flex flex-col justify-between border-l-4 border-primary-container relative group hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                        Confirmada • 12:30 - 14:00
                      </span>
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-on-surface mt-0.5">Carla San Román</h3>
                      <p className="text-xs text-primary font-medium mt-0.5">
                        Ritual Relajante Lavanda &amp; Cuarzos
                      </p>
                      <span className="text-[11px] text-on-surface-variant">Duración: 75 min</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold">
                      <span className="material-symbols-outlined text-xs text-primary">person_add</span>
                      <span className="truncate">Primera Visita • Ficha Firmada</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-container">
                    <span className="text-xs text-on-surface-variant font-medium">Elena M.</span>
                    <button
                      onClick={() => onOpenIntake(appointments[3].client)}
                      className="px-2.5 py-1 rounded-lg bg-secondary-container/60 text-secondary text-xs font-bold hover:bg-secondary-container transition-colors"
                    >
                      En Espera (Ver Ficha)
                    </button>
                  </div>
                </div>

                {/* Sanitization Pause Cabina 2 */}
                <div className="col-span-1 bg-surface-container-low/30 rounded-xl p-3.5 flex flex-col justify-center items-center text-center gap-1.5 border border-dashed border-outline-variant/60">
                  <span className="material-symbols-outlined text-outline text-xl">sanitizer</span>
                  <div>
                    <span className="text-xs text-on-surface-variant font-bold block">
                      Pausa de Higienización &amp; Ventilación
                    </span>
                    <p className="text-[11px] text-outline">12:30 - 14:30 (Prep. Piedras Volcánicas)</p>
                  </div>
                </div>

                {/* Cabina 3 Fernando Garza */}
                <div className="col-span-1 bg-surface-container-low/40 rounded-xl p-3.5 flex flex-col justify-between border border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-outline uppercase font-semibold">13:15 - 14:15</span>
                    <span className="w-2 h-2 rounded-full bg-outline-variant" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-on-surface-variant block">
                      Drenaje Linfático Facial
                    </span>
                    <p className="text-[11px] text-outline">Fernando Garza • Dra. Camila S.</p>
                  </div>
                  <div className="flex items-center justify-between text-outline text-xs pt-2 border-t border-surface-container">
                    <span>Cliente en Vestidor</span>
                    <span className="material-symbols-outlined text-sm">schedule</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slot Group: 14:30 PM - 16:00 PM (Franja Vespertina) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-outline">
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  14:30 PM — Franja Vespertina
                </span>
                <div className="flex-1 h-px bg-surface-container" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cabina 1 Free */}
                <button
                  onClick={() => setIsNewAppointmentModalOpen(true)}
                  className="col-span-1 bg-surface-container-low/20 rounded-xl p-3.5 flex items-center justify-center text-outline text-xs font-semibold hover:bg-surface-container transition-colors cursor-pointer border border-dashed border-outline-variant/40"
                >
                  + Disponible para Reserva Rápida
                </button>

                {/* Cabina 2 Andrés Baeza */}
                <div className="col-span-1 bg-surface-container-low/50 rounded-xl p-3.5 shadow-xs flex flex-col justify-between border-l-4 border-primary-container relative group hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                        Confirmada • 14:30 - 16:00
                      </span>
                      <span className="material-symbols-outlined text-primary text-sm">event_available</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-on-surface mt-0.5">Andrés Baeza</h3>
                      <p className="text-xs text-primary font-medium mt-0.5">
                        Masaje Deportivo con Aromaterapia
                      </p>
                      <span className="text-[11px] text-on-surface-variant">Duración: 90 min</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container text-on-surface-variant text-xs">
                      <span className="material-symbols-outlined text-xs text-primary">fitness_center</span>
                      <span>Recuperación muscular pre-maratón</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-container">
                    <span className="text-xs text-on-surface-variant font-medium">Mateo V.</span>
                    <span className="text-[11px] text-outline font-medium">Confirmado vía WhatsApp</span>
                  </div>
                </div>

                {/* Cabina 3 Free */}
                <button
                  onClick={() => setIsNewAppointmentModalOpen(true)}
                  className="col-span-1 bg-surface-container-low/20 rounded-xl p-3.5 flex items-center justify-center text-outline text-xs font-semibold hover:bg-surface-container transition-colors cursor-pointer border border-dashed border-outline-variant/40"
                >
                  + Disponible para Reserva Rápida
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: 30% Width Quick Desk & Concierge */}
        <aside className="lg:col-span-4 flex flex-col gap-5">
          {/* Primary Action Button (+ Nueva Cita) */}
          <button
            onClick={() => setIsNewAppointmentModalOpen(true)}
            className="w-full h-12 bg-primary text-on-primary rounded-xl text-sm font-bold tracking-tight shadow-md hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">add_circle</span>
            <span>+ Nueva Cita de Bienestar</span>
          </button>

          {/* Clientes en Espera / Sala de Bienestar */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-xs border border-primary-container/10 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">self_improvement</span>
                <h3 className="text-sm font-bold text-on-surface">Sala de Bienestar</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-extrabold uppercase tracking-wider">
                {waitingClients.length} Clientes en Espera
              </span>
            </div>

            {waitingClients.map((client) => (
              <div key={client.id} className="bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-10 h-10 rounded-full object-cover shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-on-surface leading-tight">
                        {client.name}
                      </h4>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs text-primary">local_cafe</span>
                        <span>{client.actionNote}</span>
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-medium">
                    {client.timeWaiting}
                  </span>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant text-xs bg-surface-container-lowest/80 p-2 rounded-lg">
                  <span>Cita: <strong>{client.appointmentTime}</strong></span>
                  <span className="text-primary font-semibold">{client.cabin}</span>
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                  {client.name === 'Carla San Román' ? (
                    <>
                      <button
                        onClick={() => notifyTherapist('Elena Morales', client.name)}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-surface text-primary hover:bg-surface-container text-xs font-semibold text-center shadow-xs transition-colors"
                      >
                        Notificar a Elena
                      </button>
                      <button
                        onClick={() => markCheckIn(client.name)}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim text-xs font-semibold text-center transition-colors"
                      >
                        Check-in Realizado
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => moveToDressingRoom(client.name)}
                      className="w-full py-2 px-3 rounded-lg bg-secondary text-on-secondary hover:opacity-90 text-xs font-bold text-center shadow-xs transition-opacity flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">sensor_door</span>
                      <span>Pasar a Vestidor Privado</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Desk Operations Grid */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-xs border border-primary-container/10 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-on-surface">Acciones Rápidas de Recepción</h3>

            {/* Card: Cobro Rápido */}
            <div
              onClick={() => onOpenPOS()}
              className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-secondary shadow-xs">
                  <span className="material-symbols-outlined text-lg">point_of_sale</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-on-surface block">
                    Cobro Rápido &amp; Factura
                  </span>
                  <span className="text-[11px] text-secondary font-semibold">
                    $1,450 MXN pendiente (Cabina 2)
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-on-surface text-base">
                chevron_right
              </span>
            </div>

            {/* Card: Inventario de Esencias */}
            <div
              onClick={() => onNavigateScreen('admin')}
              className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-primary shadow-xs">
                  <span className="material-symbols-outlined text-lg">science</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-on-surface block">
                    Inventario &amp; Catálogo
                  </span>
                  <span className="text-[11px] text-tertiary font-semibold">
                    Lavanda Orgánica: 3 frascos restantes
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-on-surface text-base">
                chevron_right
              </span>
            </div>

            {/* Card: Cierre de Turno Z */}
            <div
              onClick={() => onNavigateScreen('corte_z')}
              className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-primary-container shadow-xs">
                  <span className="material-symbols-outlined text-lg">receipt_long</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-on-surface block">
                    Arqueo &amp; Corte de Caja Z
                  </span>
                  <span className="text-[11px] text-primary font-semibold">
                    Turno matutino listo para balance
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-on-surface text-base">
                chevron_right
              </span>
            </div>
          </div>

          {/* Daily Summary Banner with Soft Botanical Backdrop */}
          <div className="bg-primary-container text-on-primary rounded-2xl p-5 shadow-xs flex flex-col gap-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-on-primary-container font-bold">
                Resumen Diario • Polanco
              </span>
              <span className="flex items-center gap-1 text-[11px] text-secondary-fixed bg-secondary/30 px-2 py-0.5 rounded-full font-semibold">
                <span className="material-symbols-outlined text-xs">star</span>
                4.9 / 5 Satisfacción
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-2xl font-bold leading-none block">18</span>
                <span className="text-xs text-on-primary-container">Citas Programadas Hoy</span>
              </div>
              <div>
                <span className="text-2xl font-bold leading-none block">$24,800</span>
                <span className="text-xs text-on-primary-container">MXN Estimados</span>
              </div>
            </div>

            <div className="w-full bg-on-primary/15 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-secondary-fixed h-full rounded-full w-[82%]" />
            </div>

            <div className="flex items-center justify-between text-xs text-on-primary-container -mt-1">
              <span>82% de la jornada completada</span>
              <span>4 citas restantes</span>
            </div>
          </div>
        </aside>
      </div>

      {/* New Appointment Modal */}
      {isNewAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-primary-container/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">event_available</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-on-surface">Nueva Cita de Bienestar</h3>
                  <p className="text-xs text-outline">Programación en 3 pasos</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewAppointmentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('✓ Cita reservada con éxito y cabina bloqueada.');
                setIsNewAppointmentModalOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-on-surface mb-1">Nombre del Huésped</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Mariana Gómez o Carlos Echeverría"
                  className="w-full h-10 px-3 rounded-xl bg-surface border border-primary-container/20 text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Tratamiento / Ritual</label>
                  <select className="w-full h-10 px-2 rounded-xl bg-surface border border-primary-container/20 text-on-surface">
                    <option>Ritual Sensorial Lavanda &amp; Cuarzos</option>
                    <option>Masaje Descontracturante Profundo</option>
                    <option>Facial Hidratante Profundo</option>
                    <option>Masaje Deportivo con Aromaterapia</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Cabina Asignada</label>
                  <select className="w-full h-10 px-2 rounded-xl bg-surface border border-primary-container/20 text-on-surface">
                    <option>Cabina 1 — Flor de Loto</option>
                    <option>Cabina 2 — Piedra Zen</option>
                    <option>Cabina 3 — Brisa Serena</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Horario Deseado</label>
                  <select className="w-full h-10 px-2 rounded-xl bg-surface border border-primary-container/20 text-on-surface">
                    <option>15:00 - 16:30 (Hoy)</option>
                    <option>16:30 - 18:00 (Hoy)</option>
                    <option>18:00 - 19:30 (Hoy)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Terapeuta</label>
                  <select className="w-full h-10 px-2 rounded-xl bg-surface border border-primary-container/20 text-on-surface">
                    <option>Elena Morales</option>
                    <option>Mateo Valdés</option>
                    <option>Dra. Camila Soria</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">clean_hands</span>
                <span>Se asignará automáticamente el margen higiénico de 15 min.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewAppointmentModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold shadow-sm"
                >
                  Confirmar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
