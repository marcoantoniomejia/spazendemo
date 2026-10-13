import React, { useState } from 'react';
import { Cabin, ServiceItem, Therapist } from '../types';

interface CatalogAdminScreenProps {
  therapists: Therapist[];
  services: ServiceItem[];
  cabins: Cabin[];
  onAddService: (newService: ServiceItem) => void;
  onAddTherapist: (newTherapist: Therapist) => void;
  onAddCabin: (newCabin: Cabin) => void;
}

export const CatalogAdminScreen: React.FC<CatalogAdminScreenProps> = ({
  therapists,
  services,
  cabins,
  onAddService,
  onAddTherapist,
  onAddCabin,
}) => {
  const [activeTab, setActiveTab] = useState<'therapists' | 'services' | 'cabins' | 'branch'>('therapists');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [wizardType, setWizardType] = useState<'servicio' | 'terapeuta' | 'cabina' | null>(null);
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState('Todos (14)');

  // Wizard form state
  const [wizServiceName, setWizServiceName] = useState('');
  const [wizServiceCategory, setWizServiceCategory] = useState<'Rituales Signature' | 'Masajes Terapéuticos' | 'Cuidado Facial' | 'Hidroterapia'>('Rituales Signature');
  const [wizPrice, setWizPrice] = useState('1850');
  const [wizDuration, setWizDuration] = useState('60');
  const [wizBuffer, setWizBuffer] = useState('15');

  // Therapist wizard state
  const [wizTherapistName, setWizTherapistName] = useState('');
  const [wizTherapistRole, setWizTherapistRole] = useState('Cosmiatra Senior');
  const [wizTherapistCabin, setWizTherapistCabin] = useState('Cabina 1 (Flor de Loto)');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (wizardType === 'servicio') {
      const newSrv: ServiceItem = {
        id: `srv-${Date.now()}`,
        name: wizServiceName || 'Nuevo Ritual Holístico',
        category: wizServiceCategory,
        description: 'Tratamiento holístico personalizado con esencias aromáticas botánicas y técnicas especializadas.',
        durationMinutes: parseInt(wizDuration) || 60,
        bufferMinutes: parseInt(wizBuffer) || 15,
        price: parseFloat(wizPrice) || 1500,
        isActive: true,
        visibleOnWeb: true,
      };
      onAddService(newSrv);
      showToast(`✓ Servicio "${newSrv.name}" guardado y visible en agenda.`);
    } else if (wizardType === 'terapeuta') {
      const newTher: Therapist = {
        id: `ther-${Date.now()}`,
        name: wizTherapistName || 'Nueva Especialista',
        role: wizTherapistRole,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs0nNctbb2TkvfH8oacn7eYHQuI1ijU6EOZ1UdnfnkhdpXI83BjlpaSeuP4dZzhwyyKEsitEmVSeoujzapDEBtbSfilRbk18jIcz6gAoIKznEaoitdyu1nA4WyIgGD_q5WwMD9rBd8Hoc6fWRwJlL1OOfvd3ETyJ1qsnkMoahbG0kK61Q0ZrWp_RCF2DP67fiYnarfJPUXF30AGYA2WZA_NkrbSiYwjkKamt8uMU1JWe07QMyprmOzTw',
        status: 'disponible',
        assignedCabin: wizTherapistCabin,
        schedule: 'Lun a Vie • 10:00 - 18:00',
        restPause: 'Pausa: 14:00 - 15:00',
        specialties: ['Masoterapia', 'Aromaterapia'],
        appointmentsThisMonth: 0,
        rating: 5.0,
      };
      onAddTherapist(newTher);
      showToast(`✓ Terapeuta "${newTher.name}" agregada con éxito al equipo.`);
    }

    setWizardType(null);
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-primary text-on-primary px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col max-w-3xl">
          <div className="flex items-center gap-2 mb-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
              Módulo de Gestión Operativa
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-on-surface-variant font-medium">Polanco Centro Holístico</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-on-surface tracking-tight">
            Configuración del Spa &amp; Catálogo Operativo
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            Gestiona tu equipo de terapeutas, carta de servicios y disponibilidad de cabinas con
            serenidad y claridad sin tecnicismos.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-start xl:self-end relative">
          <button
            onClick={() => showToast('Vista filtrada según horario matutino')}
            className="h-11 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-2 text-xs font-semibold shadow-xs transition-all"
          >
            <span className="material-symbols-outlined text-base text-primary">tune</span>
            <span>Vista Filtrada</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
              className="h-11 px-5 rounded-xl bg-primary hover:bg-primary-container text-on-primary flex items-center gap-2 text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              <span>Agregar Nuevo...</span>
              <span className="material-symbols-outlined text-sm opacity-80">expand_more</span>
            </button>

            {isAddMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-surface-container-lowest p-2 shadow-2xl border border-primary-container/10 z-30">
                <div className="text-[10px] font-bold uppercase tracking-wider text-outline px-3 py-1.5">
                  Creación Rápida
                </div>
                <button
                  onClick={() => {
                    setWizardType('terapeuta');
                    setIsAddMenuOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-surface-container-low flex items-center gap-3 text-on-surface transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">person_add</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold">Nuevo Terapeuta</div>
                    <div className="text-[10px] text-outline">Horarios y especialidades</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setWizardType('servicio');
                    setIsAddMenuOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-surface-container-low flex items-center gap-3 text-on-surface transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary-container/50 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-sm">spa</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold">Nuevo Servicio</div>
                    <div className="text-[10px] text-outline">Protocolos, tiempos y tarifas</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setWizardType('cabina');
                    setIsAddMenuOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-surface-container-low flex items-center gap-3 text-on-surface transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">meeting_room</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold">Nueva Cabina</div>
                    <div className="text-[10px] text-outline">Equipamiento y distribución</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Operational Metrics Micro-strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-primary-container/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-outline">Personal en Turno</div>
            <div className="text-base sm:text-xl font-bold text-on-surface mt-0.5">3 / 5 Activos</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl">self_improvement</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-primary-container/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-outline">Ocupación de Cabinas</div>
            <div className="text-base sm:text-xl font-bold text-on-surface mt-0.5">75% (3 de 4)</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-xl">hotel</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-primary-container/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-outline">Catálogo Visible</div>
            <div className="text-base sm:text-xl font-bold text-on-surface mt-0.5">{services.length} Rituales</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl">local_florist</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-primary-container/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-outline">Satisfacción Media</div>
            <div className="text-base sm:text-xl font-bold text-on-surface mt-0.5">4.96 ★</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-xl">verified</span>
          </div>
        </div>
      </div>

      {/* Horizontal Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-container-low max-w-fit overflow-x-auto">
        <button
          onClick={() => setActiveTab('therapists')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'therapists'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">group</span>
          <span>Terapeutas &amp; Horarios</span>
          <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold">
            {therapists.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'services'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">spa</span>
          <span>Servicios &amp; Precios</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant text-[10px] font-bold">
            {services.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cabins')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'cabins'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">domain</span>
          <span>Cabinas &amp; Salas</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant text-[10px] font-bold">
            {cabins.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('branch')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'branch'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">storefront</span>
          <span>Datos de Sucursal Polanco</span>
        </button>
      </div>

      {/* TAB CONTENT 1: Terapeutas & Horarios */}
      {(activeTab === 'therapists' || activeTab === 'branch') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-base">badge</span>
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-on-surface">
                  Terapeutas &amp; Especialistas
                </h2>
                <p className="text-xs text-outline">
                  Control de disponibilidad en tiempo real, ritmos de descanso y cabinas predilectas.
                </p>
              </div>
            </div>
            <button
              onClick={() => setWizardType('terapeuta')}
              className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-colors"
            >
              + Nuevo Terapeuta
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {therapists.map((ther) => (
              <div
                key={ther.id}
                className="p-5 rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-primary-container/10"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={ther.avatar}
                          alt={ther.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-fixed"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary ring-2 ring-surface-container-lowest" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm font-bold text-on-surface">{ther.name}</h3>
                        <span className="text-xs text-secondary font-semibold">{ther.role}</span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                      {ther.status === 'en_cabina' ? 'En Cabina' : 'Disponible'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low mb-3 text-xs">
                    <div className="flex items-center justify-between text-on-surface mb-0.5">
                      <span className="font-semibold">{ther.schedule}</span>
                      <button
                        onClick={() => showToast(`Editando horario de ${ther.name}`)}
                        className="text-primary font-bold hover:underline"
                      >
                        Editar
                      </button>
                    </div>
                    <p className="text-[11px] text-outline">{ther.restPause}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm text-primary">meeting_room</span>
                    <span>Espacio asignado: <strong>{ther.assignedCabin}</strong></span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ther.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-2 py-0.5 rounded-md bg-surface-container text-[11px] text-on-surface font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                  <span className="text-outline">
                    <strong>{ther.appointmentsThisMonth}</strong> citas este mes
                  </span>
                  <div className="flex items-center gap-1 text-secondary font-bold">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span>{ther.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB CONTENT 2: Servicios & Precios */}
      {(activeTab === 'services' || activeTab === 'branch') && (
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-base">spa</span>
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-on-surface">
                  Servicios &amp; Precios Populares
                </h2>
                <p className="text-xs text-outline">
                  Protocolos activos, tiempos higiénicos de amortiguación y visibilidad en portal web.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto text-xs">
              {['Todos (14)', 'Rituales Signature', 'Masajes Terapéuticos', 'Cuidado Facial'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setServiceCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      serviceCategoryFilter === cat
                        ? 'bg-primary text-on-primary font-bold'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-5 rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-primary-container/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-wider">
                      {srv.category}
                    </span>
                    <button
                      onClick={() => showToast(`Editando servicio: ${srv.name}`)}
                      className="text-outline hover:text-on-surface"
                      title="Editar"
                    >
                      <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-on-surface mb-1.5">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed line-clamp-2">
                    {srv.description}
                  </p>

                  <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5 text-xs mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-primary">timer</span>
                        Tiempo en camilla:
                      </span>
                      <span className="font-bold text-on-surface">{srv.durationMinutes} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-secondary">sanitizer</span>
                        Buffer higienización:
                      </span>
                      <span className="font-semibold text-secondary">+{srv.bufferMinutes} min</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-container flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-outline block">Tarifa</span>
                    <span className="text-base font-bold text-primary">
                      ${srv.price.toLocaleString()} <span className="text-[11px] font-normal text-outline">MXN</span>
                    </span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span className="text-xs font-semibold text-primary">Activo</span>
                    <div className="w-9 h-5 bg-primary rounded-full relative p-0.5 flex items-center justify-end">
                      <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB CONTENT 3: Cabinas & Salas */}
      {(activeTab === 'cabins' || activeTab === 'branch') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-base">meeting_room</span>
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-on-surface">
                  Cabinas &amp; Salas de Tratamiento
                </h2>
                <p className="text-xs text-outline">
                  Espacios sensoriales acondicionados, monitoreo térmico y equipamiento especializado.
                </p>
              </div>
            </div>
            <button
              onClick={() => showToast('Climatización central ajustada a 23.5°C')}
              className="px-3.5 py-1.5 rounded-xl bg-surface-container-low text-on-surface text-xs font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-primary">ac_unit</span>
              <span>Ajuste Central de Clima: 23.5°C</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cabins.map((cab) => (
              <div
                key={cab.id}
                className="p-5 rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-primary-container/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">spa</span>
                      <h3 className="text-sm font-bold text-on-surface">{cab.displayName}</h3>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        cab.status === 'ocupada'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-primary-fixed text-on-primary-fixed'
                      }`}
                    >
                      {cab.status === 'ocupada' ? 'Ocupada' : 'Libre'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-outline mb-3">
                    <span>{cab.type === 'individual' ? 'Individual' : 'Doble Parejas'}</span>
                    <span>•</span>
                    <span className="text-primary font-bold">{cab.temperature}</span>
                    <span>•</span>
                    <span>{cab.acoustic}</span>
                  </div>

                  {cab.currentClient && (
                    <div className="p-2.5 rounded-xl bg-surface-container-low mb-3 flex items-center justify-between text-xs">
                      <span>Cliente: <strong>{cab.currentClient}</strong></span>
                      <span className="text-secondary font-bold">Resta {cab.minutesRemaining} min</span>
                    </div>
                  )}

                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] uppercase font-bold text-outline block">
                      Equipamiento instalado:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cab.equipment.map((eq) => (
                        <span
                          key={eq}
                          className="px-2 py-0.5 rounded-md bg-surface-container text-[11px] text-on-surface-variant font-medium"
                        >
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                  <span className="text-outline">Terapeuta asignada:</span>
                  <span className="font-bold text-primary">{cab.assignedTherapist}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: 3-Step Intuitive Onboarding Assistant */}
      <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest shadow-sm border border-primary-container/10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-xl">auto_fix_high</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-on-surface">
                  Asistente Intuitivo de Incorporación
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase">
                  Paso a Paso
                </span>
              </div>
              <p className="text-xs text-outline">
                Configura cualquier elemento de tu spa en tres simples pasos sin código ni tecnicismos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWizardType('servicio')}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
            >
              Nuevo Ritual
            </button>
            <button
              onClick={() => setWizardType('terapeuta')}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-xs transition-colors"
            >
              Nuevo Terapeuta
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6">
          <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <span className="text-[10px] uppercase font-bold text-primary">Identidad</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-on-surface mb-1">¿Qué deseas crear?</h3>
              <p className="text-xs text-on-surface-variant">
                Selecciona si incorporarás a un terapeuta, darás de alta un ritual exclusivo o aperturarás una cabina.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-primary font-semibold">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Selección rápida en 1 clic</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <span className="text-[10px] uppercase font-bold text-primary">Lenguaje Humano</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-on-surface mb-1">Detalles sencillos</h3>
              <p className="text-xs text-on-surface-variant">
                Nombra el ritual con poesía sensorial, asigna tarifas en moneda local y selecciona beneficios.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-secondary font-semibold">
              <span className="material-symbols-outlined text-sm">tune</span>
              <span>Campos asistidos sin tecnicismos</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <span className="text-[10px] uppercase font-bold text-primary">Disponibilidad</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-on-surface mb-1">Horarios &amp; Espacios</h3>
              <p className="text-xs text-on-surface-variant">
                Configura tiempos de masaje, pausas de sanitización y sincronización automática.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-primary font-semibold">
              <span className="material-symbols-outlined text-sm">published_with_changes</span>
              <span>Sincronización instantánea</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Creation Wizard Modal */}
      {wizardType && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-2xl border border-primary-container/10 relative">
            <button
              onClick={() => setWizardType(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">
                  {wizardType === 'servicio'
                    ? 'spa'
                    : wizardType === 'terapeuta'
                    ? 'person_add'
                    : 'meeting_room'}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  {wizardType === 'servicio'
                    ? 'Agregar Nuevo Servicio al Catálogo'
                    : wizardType === 'terapeuta'
                    ? 'Registrar Nuevo Terapeuta'
                    : 'Aperturar Nueva Cabina'}
                </h3>
                <p className="text-xs text-outline">Paso 1 de 3: Identidad y Protocolo</p>
              </div>
            </div>

            <form onSubmit={handleWizardSubmit} className="space-y-4 text-xs">
              {wizardType === 'servicio' ? (
                <>
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">
                      Nombre comercial del ritual
                    </label>
                    <input
                      type="text"
                      required
                      value={wizServiceName}
                      onChange={(e) => setWizServiceName(e.target.value)}
                      placeholder="Ej. Masaje Ayurveda Abhyanga con Aceites Templados"
                      className="w-full h-10 px-3 rounded-xl bg-surface border border-primary-container/20 text-on-surface"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-on-surface mb-1">Categoría</label>
                      <select
                        value={wizServiceCategory}
                        onChange={(e) => setWizServiceCategory(e.target.value as any)}
                        className="w-full h-10 px-2 rounded-xl bg-surface border border-primary-container/20 text-on-surface"
                      >
                        <option>Rituales Signature</option>
                        <option>Masajes Terapéuticos</option>
                        <option>Cuidado Facial</option>
                        <option>Hidroterapia</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-on-surface mb-1">Tarifa (MXN)</label>
                      <input
                        type="number"
                        value={wizPrice}
                        onChange={(e) => setWizPrice(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl bg-surface border border-primary-container/20 text-on-surface"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-on-surface mb-1">
                        Duración en camilla
                      </label>
                      <select
                        value={wizDuration}
                        onChange={(e) => setWizDuration(e.target.value)}
                        className="w-full h-10 px-2 rounded-xl bg-surface border border-primary-container/20 text-on-surface"
                      >
                        <option value="50">50 minutos</option>
                        <option value="60">60 minutos</option>
                        <option value="75">75 minutos</option>
                        <option value="90">90 minutos</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-on-surface mb-1">
                        Buffer de higienización
                      </label>
                      <select
                        value={wizBuffer}
                        onChange={(e) => setWizBuffer(e.target.value)}
                        className="w-full h-10 px-2 rounded-xl bg-surface border border-primary-container/20 text-on-surface"
                      >
                        <option value="10">10 minutos (Rápido)</option>
                        <option value="15">15 minutos (Recomendado)</option>
                        <option value="20">20 minutos (Complejo)</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">
                      Nombre completo del terapeuta
                    </label>
                    <input
                      type="text"
                      required
                      value={wizTherapistName}
                      onChange={(e) => setWizTherapistName(e.target.value)}
                      placeholder="Ej. Carmen Del Valle"
                      className="w-full h-10 px-3 rounded-xl bg-surface border border-primary-container/20 text-on-surface"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-on-surface mb-1">Especialidad</label>
                      <input
                        type="text"
                        value={wizTherapistRole}
                        onChange={(e) => setWizTherapistRole(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl bg-surface border border-primary-container/20 text-on-surface"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-on-surface mb-1">Cabina Habitual</label>
                      <input
                        type="text"
                        value={wizTherapistCabin}
                        onChange={(e) => setWizTherapistCabin(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl bg-surface border border-primary-container/20 text-on-surface"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setWizardType(null)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold shadow-xs hover:bg-primary-container transition-colors"
                >
                  Guardar &amp; Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
