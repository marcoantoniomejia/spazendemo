import React, { useState } from 'react';
import { Client, EvolutionNote } from '../types';

interface ExpedienteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
  onAddNote: (note: EvolutionNote) => void;
}

export const ExpedienteDrawer: React.FC<ExpedienteDrawerProps> = ({
  isOpen,
  onClose,
  client,
  onAddNote,
}) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newTreatmentName, setNewTreatmentName] = useState('Facial Hidratante Profundo');
  const [newObservation, setNewObservation] = useState('');
  const [newTherapist, setNewTherapist] = useState('Elena Morales');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObservation.trim()) return;

    const newNote: EvolutionNote = {
      id: `note-${Date.now()}`,
      date: `Hoy, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • 24 Oct 2024`,
      cabin: 'Cabina 1 Bambú',
      treatmentName: newTreatmentName,
      protocol: 'Registro clínico de evolución',
      clinicalObservation: newObservation,
      therapistName: newTherapist,
      therapistAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBs0nNctbb2TkvfH8oacn7eYHQuI1ijU6EOZ1UdnfnkhdpXI83BjlpaSeuP4dZzhwyyKEsitEmVSeoujzapDEBtbSfilRbk18jIcz6gAoIKznEaoitdyu1nA4WyIgGD_q5WwMD9rBd8Hoc6fWRwJlL1OOfvd3ETyJ1qsnkMoahbG0kK61Q0ZrWp_RCF2DP67fiYnarfJPUXF30AGYA2WZA_NkrbSiYwjkKamt8uMU1JWe07QMyprmOzTw',
      therapistRole: 'Cosmiatra Senior',
      isValidated: true,
    };

    onAddNote(newNote);
    setIsAddingNote(false);
    setNewObservation('');
    showToast('✓ Nota de evolución agregada y firmada con éxito.');
  };

  const downloadConsentPdf = () => {
    showToast('📄 Descargando Consentimiento Informado (PDF Clínico con e.Firma)...');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-xs transition-opacity"
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-60 bg-primary text-on-primary px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Slide-over Panel (560px Desktop) */}
      <aside
        aria-label="Ficha Clínica y Bienestar del Cliente"
        className="absolute top-0 right-0 bottom-0 w-full md:w-[560px] bg-surface-container-lowest shadow-2xl flex flex-col overflow-hidden border-l border-primary-container/10"
      >
        {/* 1. Drawer Header */}
        <header className="p-5 sm:p-6 bg-surface-container-low shrink-0 border-b border-primary-container/10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-16 h-16 rounded-2xl object-cover shadow-xs ring-2 ring-primary-fixed"
                />
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 shadow ring-2 ring-surface-container-lowest"
                  title="En cabina actualmente"
                />
              </div>

              <div className="space-y-1">
                <h1 className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
                  {client.name}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-xs text-outline font-medium">
                  <span>{client.age} años</span>
                  <span>•</span>
                  <span className="text-primary font-semibold">
                    {client.visitsCount} visitas en Aura Spa
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container text-[11px] font-bold">
                  <span className="material-symbols-outlined text-xs">workspace_premium</span>
                  <span>{client.membership}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => showToast('Modo edición activado')}
                className="p-2 rounded-xl text-outline hover:text-primary hover:bg-surface-container transition-colors"
                title="Editar expediente"
              >
                <span className="material-symbols-outlined text-lg">edit</span>
              </button>
              <button
                onClick={onClose}
                aria-label="Cerrar ficha"
                className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </div>

          {/* Contact Micro-strip */}
          <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 text-on-surface-variant text-xs bg-surface-container-lowest/90 p-2.5 rounded-xl border border-primary-container/10">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-primary">phone_iphone</span>
              <span className="font-semibold">{client.phone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-secondary">mail</span>
              <span className="truncate max-w-[180px]">{client.email}</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-full">
              Auditado
            </span>
          </div>
        </header>

        {/* Scrollable Drawer Body with Clinical Sections */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* 2. Prominent Safety & Care Alerts (Contraindicaciones Críticas) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] uppercase tracking-wider text-outline font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-tertiary">
                  health_and_safety
                </span>
                <span>Alertas de Cuidado y Contraindicaciones Clínicas</span>
              </h2>
              <span className="text-xs text-tertiary font-bold">2 Críticas • 1 Precaución</span>
            </div>

            {/* Terracotta Red Alert: Alergias Severas */}
            <div className="p-4 rounded-2xl bg-tertiary-fixed/30 text-on-tertiary-fixed border border-tertiary/20 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-tertiary font-bold">
                <span className="material-symbols-outlined text-lg">error</span>
                <span className="text-xs uppercase tracking-wide">
                  Alergias &amp; Contraindicaciones Críticas
                </span>
              </div>
              <div className="space-y-2 pl-6 text-xs leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5 shrink-0" />
                  <p className="font-medium">
                    <strong className="font-bold">Alergia severa al Árnica y Frutos Secos:</strong>{' '}
                    Terminantemente prohibido el uso de aceite vehicular de almendras dulces o
                    emulsiones con nuez de macadamia.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5 shrink-0" />
                  <p className="font-medium">
                    <strong className="font-bold">Sensibilidad vascular en mejillas:</strong> Evitar
                    exfoliación química ácida fuerte (AHA/BHA &gt; 5%) y microdermoabrasión agresiva.
                  </p>
                </div>
              </div>
            </div>

            {/* Amber Alert: Condición Médica (Embarazo) */}
            <div className="p-4 rounded-2xl bg-secondary-container/40 text-on-secondary-fixed border border-secondary/20 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-secondary font-bold">
                <span className="material-symbols-outlined text-lg">pregnant_woman</span>
                <span className="text-xs uppercase tracking-wide">
                  Condición Médica / Precaución Maternal
                </span>
              </div>
              <div className="pl-6 text-xs leading-relaxed">
                <p>
                  <strong className="font-bold">Embarazo 2do Trimestre (Semana 18):</strong> Posición
                  lateralizada obligatoria con cojines de soporte lumbar y entre rodillas. Cero
                  presión en puntos reflexológicos de tobillos y región sacra.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Client Comfort & Sensory Preferences */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] uppercase tracking-wider text-outline font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">nature_people</span>
                <span>Preferencias Sensoriales &amp; Confort en Cabina</span>
              </h2>
              <span className="text-xs text-primary font-bold">Perfil Holístico</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-surface-container-low shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-base">touch_app</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-outline">Presión de Masaje</span>
                  <p className="text-xs font-bold text-on-surface">Suave a Media</p>
                  <p className="text-[11px] text-outline">Enfoque descontracturante gentil</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-base">device_thermostat</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-outline">Temperatura Cabina</span>
                  <p className="text-xs font-bold text-on-surface">Cálida (24°C)</p>
                  <p className="text-[11px] text-outline">Manta térmica de bambú ligera</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shrink-0">
                  <span className="material-symbols-outlined text-base">psychology_alt</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-outline">Aromaterapia Favorita</span>
                  <p className="text-xs font-bold text-on-surface">Lavanda &amp; Bergamota</p>
                  <p className="text-[11px] text-outline">Esencias 100% orgánicas</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-outline shrink-0">
                  <span className="material-symbols-outlined text-base">music_note</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-outline">Paisaje Acústico</span>
                  <p className="text-xs font-bold text-on-surface">Cuencos Tibetanos</p>
                  <p className="text-[11px] text-outline">Lluvia suave de fondo</p>
                </div>
              </div>
            </div>

            {/* Anatomical Map Banner */}
            <div className="p-3.5 rounded-xl bg-surface-container-low shadow-xs flex items-start gap-3 border border-primary-container/10">
              <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-base">accessibility_new</span>
              </div>
              <div className="flex-1 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-outline">
                    Mapa de Zonas Anatómicas
                  </span>
                  <span className="text-primary font-bold">Personalizado</span>
                </div>
                <p className="text-on-surface">
                  <strong className="text-primary font-bold">Zonas prioritarias:</strong> Cuello
                  superior, trapecios, hombros y relajación podal con toallas tibias.
                </p>
                <p className="text-tertiary font-semibold">
                  <strong>Zona a excluir:</strong> Zona lumbar baja (por indicación ginecológica).
                </p>
              </div>
            </div>
          </section>

          {/* 4. Chronological Session Progress Notes */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] uppercase tracking-wider text-outline font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">clinical_notes</span>
                <span>Notas de Evolución &amp; Seguimiento Clínico</span>
              </h2>
              <span className="text-xs text-primary font-semibold">
                {client.evolutionNotes.length} Registros
              </span>
            </div>

            {/* Add note inline form */}
            {isAddingNote ? (
              <form
                onSubmit={handleSaveNote}
                className="p-4 rounded-2xl bg-surface-container-low border border-primary-container/20 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">Nueva Nota de Evolución</span>
                  <button
                    type="button"
                    onClick={() => setIsAddingNote(false)}
                    className="text-xs text-outline hover:text-on-surface"
                  >
                    Cancelar
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-outline mb-0.5">Tratamiento</label>
                    <input
                      type="text"
                      value={newTreatmentName}
                      onChange={(e) => setNewTreatmentName(e.target.value)}
                      className="w-full h-8 px-2.5 rounded-lg bg-surface text-on-surface border border-primary-container/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-outline mb-0.5">Terapeuta</label>
                    <input
                      type="text"
                      value={newTherapist}
                      onChange={(e) => setNewTherapist(e.target.value)}
                      className="w-full h-8 px-2.5 rounded-lg bg-surface text-on-surface border border-primary-container/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-outline mb-0.5">
                    Observación Clínica Post-Sesión
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={newObservation}
                    onChange={(e) => setNewObservation(e.target.value)}
                    placeholder="Describe el estado de la musculatura, reacciones cutáneas y recomendaciones al cliente..."
                    className="w-full p-2.5 rounded-lg bg-surface text-xs text-on-surface border border-primary-container/20 resize-none focus:outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary-container transition-colors"
                  >
                    Guardar y Firmar Nota
                  </button>
                </div>
              </form>
            ) : null}

            {/* Notes Timeline */}
            <div className="space-y-4 relative before:absolute before:top-3 before:bottom-3 before:left-4 before:w-0.5 before:bg-surface-variant">
              {client.evolutionNotes.map((note) => (
                <article key={note.id} className="relative pl-10 space-y-2">
                  <div className="absolute left-2.5 top-2 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-surface-container-lowest" />
                  <div className="p-4 rounded-xl bg-surface-container-low shadow-xs space-y-2.5 border border-primary-container/5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                          {note.date}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-primary">
                        {note.cabin}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-on-surface">
                        {note.treatmentName}
                      </h3>
                      <p className="text-[11px] text-outline font-medium">{note.protocol}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container-lowest text-xs text-on-surface space-y-1">
                      <p className="font-semibold text-primary">Observación Clínica:</p>
                      <p className="leading-relaxed">{note.clinicalObservation}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={note.therapistAvatar}
                          alt={note.therapistName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-on-surface">{note.therapistName}</span>
                        <span className="text-[10px] uppercase text-outline">• {note.therapistRole}</span>
                      </div>
                      <span className="text-[11px] text-primary font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        <span>Firma Validada</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 5. Digital Documents & Legal Wellness Consents */}
          <section className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-wider text-outline font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-secondary">verified_user</span>
              <span>Consentimiento Informado &amp; Documentación Legal</span>
            </h2>

            <div className="p-3.5 rounded-xl bg-surface-container-low shadow-xs flex items-center justify-between gap-3 border border-primary-container/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-tertiary shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">
                    Consentimiento Médico de Prácticas Prenatales
                  </p>
                  <p className="text-[11px] text-outline">
                    Firmado digitalmente con e.Firma el 12 Sep 2024 (Válido)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={downloadConsentPdf}
                className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface text-primary text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>PDF</span>
              </button>
            </div>
          </section>
        </div>

        {/* 6. Quick Action Footer */}
        <footer className="p-4 sm:p-5 bg-surface-container-low shrink-0 border-t border-primary-container/10 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddingNote(true)}
              className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>+ Nueva Nota de Sesión</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Abriendo calendario para agendar seguimiento.')}
              className="w-full sm:w-auto h-11 px-4 rounded-xl bg-secondary text-on-secondary text-xs font-bold hover:opacity-90 transition-opacity shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">calendar_add_on</span>
              <span>Agendar Seguimiento</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-on-surface-variant font-medium">
            <button
              type="button"
              onClick={() => showToast('Ficha clínica transmitida a la tablet de Cabina 1.')}
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-xs">share</span>
              <span>Compartir Ficha con Cabina</span>
            </button>
            <span className="text-outline">Última actualización: Hoy, 11:15 AM</span>
          </div>
        </footer>
      </aside>
    </div>
  );
};
