import React, { useRef, useState, useEffect } from 'react';
import { Client } from '../types';

interface IntakeScreenProps {
  client?: Client;
  onCompleteIntake: (updatedClient: Client) => void;
  onCancel: () => void;
}

interface HealthChipItem {
  id: string;
  label: string;
  activeDescription: string;
  inactiveDescription: string;
  icon: string;
  status: 'critical' | 'care' | 'neutral';
  isActive: boolean;
}

export const IntakeScreen: React.FC<IntakeScreenProps> = ({
  client,
  onCompleteIntake,
  onCancel,
}) => {
  // Form State
  const [fullName, setFullName] = useState(client?.name || 'Valentina Restrepo Gómez');
  const [phone, setPhone] = useState(client?.phone || '+52 55 4192 8831');
  const [birthDate, setBirthDate] = useState(client?.birthDate || '14 de Noviembre de 1990');
  const [emergencyContact, setEmergencyContact] = useState(
    client?.emergencyContact?.name || 'Carlos Echeverría (Esposo)'
  );
  const [emergencyPhone, setEmergencyPhone] = useState(
    client?.emergencyContact?.phone || '+52 55 8821 9904'
  );

  // Health Chips State
  const [chips, setChips] = useState<HealthChipItem[]>([
    {
      id: 'arnica',
      label: 'Alergia severa a Árnica o Frutos Secos',
      activeDescription: 'Alerta activa: Aceites base libres de almendras y semillas.',
      inactiveDescription: 'Desactivado',
      icon: 'warning',
      status: 'critical',
      isActive: true,
    },
    {
      id: 'lumbalgia',
      label: 'Tensión o Dolor Lumbar Crónico',
      activeDescription: 'Precaución activa: Adaptación ergonómica de camilla.',
      inactiveDescription: 'Desactivado',
      icon: 'bolt',
      status: 'care',
      isActive: true,
    },
    {
      id: 'embarazo',
      label: 'Embarazo / Período de Gestación',
      activeDescription: 'Precaución maternal: Posición lateralizada obligatoria.',
      inactiveDescription: 'Desactivado',
      icon: 'pregnant_woman',
      status: 'care',
      isActive: false,
    },
    {
      id: 'hipertension',
      label: 'Hipertensión Arterial / Cardiovascular',
      activeDescription: 'Evitar hidroterapia a alta temperatura.',
      inactiveDescription: 'Desactivado',
      icon: 'favorite',
      status: 'care',
      isActive: false,
    },
    {
      id: 'cirugia',
      label: 'Cirugía o Procedimiento Reciente (< 6 meses)',
      activeDescription: 'Restricción en manipulación de tejidos.',
      inactiveDescription: 'Desactivado',
      icon: 'healing',
      status: 'care',
      isActive: false,
    },
    {
      id: 'piel_sensible',
      label: 'Sensibilidad Cutánea / Piel Atópica',
      activeDescription: 'Usar productos hipoalergénicos sin fragancias.',
      inactiveDescription: 'Desactivado',
      icon: 'dermatology',
      status: 'care',
      isActive: false,
    },
    {
      id: 'protesis',
      label: 'Prótesis / Implantes Metálicos',
      activeDescription: 'Prohibido uso de radiofrecuencia en zona afectada.',
      inactiveDescription: 'Desactivado',
      icon: 'accessibility_new',
      status: 'care',
      isActive: false,
    },
    {
      id: 'marcapasos',
      label: 'Marcapasos o Afecciones Cardíacas',
      activeDescription: 'Contraindicación absoluta para aparatología eléctrica.',
      inactiveDescription: 'Desactivado',
      icon: 'cardiology',
      status: 'critical',
      isActive: false,
    },
  ]);

  const [clinicalNotes, setClinicalNotes] = useState(
    'Evitar masajear zona de escápula derecha por molestia leve, mantener toallas tibias adicionales...'
  );

  // Sensory Preferences
  const [pressure, setPressure] = useState<'suave' | 'media' | 'firme'>('media');
  const [aroma, setAroma] = useState('lavanda');
  const [soundscape, setSoundscape] = useState('agua');

  // Consent & Signature
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [hasDrawnSignature, setHasDrawnSignature] = useState(true);

  // Canvas Drawing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  // Initialize canvas with simulated elegant signature
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw realistic curve placeholder
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#274a3e';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(40, 80);
    ctx.bezierCurveTo(70, 20, 85, 15, 100, 75);
    ctx.bezierCurveTo(110, 85, 120, 45, 140, 55);
    ctx.bezierCurveTo(150, 60, 160, 75, 180, 70);
    ctx.bezierCurveTo(200, 60, 210, 30, 230, 25);
    ctx.bezierCurveTo(240, 40, 250, 80, 270, 75);
    ctx.bezierCurveTo(290, 65, 310, 68, 330, 70);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(350, 70);
    ctx.bezierCurveTo(370, 70, 400, 50, 410, 72);
    ctx.bezierCurveTo(415, 85, 390, 95, 375, 90);
    ctx.bezierCurveTo(350, 80, 370, 60, 420, 65);
    ctx.stroke();
  }, []);

  const toggleChip = (id: string) => {
    setChips((prev) =>
      prev.map((chip) => {
        if (chip.id === id) {
          const nextActive = !chip.isActive;
          return {
            ...chip,
            isActive: nextActive,
            status: nextActive
              ? chip.id === 'arnica' || chip.id === 'marcapasos'
                ? 'critical'
                : 'care'
              : 'neutral',
          };
        }
        return chip;
      })
    );
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawnSignature(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = '#274a3e';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnSignature(false);
  };

  const handleSubmit = () => {
    if (!consentAccepted) {
      alert('Por favor acepte los términos del consentimiento informado para continuar.');
      return;
    }

    setSubmitFeedback('Guardando y transmitiendo a tablet de cabina...');

    const activeAllergies = chips
      .filter((c) => c.isActive && c.id === 'arnica')
      .map((c) => c.label + ': ' + c.activeDescription);

    const activeConditions = chips
      .filter((c) => c.isActive && c.id !== 'arnica')
      .map((c) => c.label + ': ' + c.activeDescription);

    const updatedClient: Client = {
      id: client?.id || 'cli-new',
      name: fullName,
      phone,
      email: client?.email || 'cliente@wellness.com',
      age: 34,
      birthDate,
      emergencyContact: {
        name: emergencyContact,
        phone: emergencyPhone,
      },
      visitsCount: (client?.visitsCount || 0) + 1,
      membership: client?.membership || 'Primera Visita • Ficha Verificada',
      avatar:
        client?.avatar ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCyUAwTR6wH-5IUZ7zCCLzTb_R4BHzAcKgL-wFCBj2w0Y-D120SYmnVz7tMD3WWTcMJzTmdPwKtSkwjilF8xh7nITwoIdhO1fy5fn70ocYD-m8Fe9JBQ1OQxCqHAqgSfE-GRug47V_HaBpSET0uGNIFvQ7fNp1KBpI-2ew36Ek5MQxEWfwBju-HwKJ7T3j93k7olWaBEw8AQ4O8_e9PSRAQFN8HRGLlMbi4Nk2Y5qz5sEcTkmL-91-9Zg',
      balance: client?.balance || 0,
      criticalAllergies: activeAllergies.length > 0 ? activeAllergies : client?.criticalAllergies || [],
      medicalConditions: activeConditions.length > 0 ? activeConditions : client?.medicalConditions || [],
      sensoryPreferences: {
        pressure,
        temperature: '24°C',
        aromatherapy:
          aroma === 'lavanda'
            ? 'Lavanda Francesa & Flor de Azahar'
            : aroma === 'eucalipto'
            ? 'Eucalipto Blanco & Salvia Silvestre'
            : 'Cítricos del Mediterráneo',
        soundscape:
          soundscape === 'agua'
            ? 'Agua & Bosque'
            : soundscape === 'cuencos'
            ? 'Cuencos Zen'
            : 'Silencio Total',
        targetAreas: 'Espalda superior y cuello',
        restrictedAreas: 'Ninguna',
      },
      hasSignedConsent: true,
      signedConsentDate: '24 Oct 2024 • 11:20 hrs',
      evolutionNotes: client?.evolutionNotes || [],
    };

    setTimeout(() => {
      setSubmitFeedback('✓ ¡Expediente firmado y transmitido con éxito!');
      setTimeout(() => {
        onCompleteIntake(updatedClient);
      }, 700);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-surface px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Tablet Mode Header */}
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-semibold mb-3">
              <span className="material-symbols-outlined text-sm text-primary">spa</span>
              <span>Sucursal Polanco • Cabina de Bienestar</span>
              <span className="w-1 h-1 rounded-full bg-outline" />
              <span className="text-primary font-bold">Tiempo estimado: 2 min</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-primary tracking-tight">
              Bienvenido a tu Espacio de Calma
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 max-w-2xl">
              Por favor comparte tus datos y preferencias de bienestar para personalizar tu sesión de
              forma segura y consciente.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2.5 rounded-2xl shadow-xs self-start md:self-auto border border-primary-container/10">
            <span className="material-symbols-outlined text-primary text-xl">self_improvement</span>
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold tracking-wider text-outline">
                Atención asignada
              </p>
              <p className="text-xs font-bold text-on-surface">Elena Morales / Mateo V.</p>
            </div>
          </div>
        </header>

        {/* 3-Step Progress Indicator */}
        <nav className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-xs border border-primary-container/10">
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <li className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-low">
              <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-base">check</span>
              </span>
              <div className="min-w-0">
                <span className="text-[10px] uppercase text-primary font-bold block">
                  Paso 1 • Completado
                </span>
                <span className="text-xs font-semibold text-on-surface truncate block">
                  Datos Personales
                </span>
              </div>
            </li>

            <li className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-high">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center ring-4 ring-primary-fixed/40 shrink-0">
                <span className="material-symbols-outlined text-base">medical_services</span>
              </span>
              <div className="min-w-0">
                <span className="text-[10px] uppercase text-primary font-bold block">
                  Paso 2 • En curso
                </span>
                <span className="text-xs font-bold text-on-surface truncate block">
                  Salud &amp; Contraindicaciones
                </span>
              </div>
            </li>

            <li className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-lowest opacity-80">
              <span className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <div className="min-w-0">
                <span className="text-[10px] uppercase text-outline font-bold block">
                  Paso 3 • Siguiente
                </span>
                <span className="text-xs text-on-surface-variant font-medium truncate block">
                  Consentimiento &amp; Firma
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Main Tablet Intake Form Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-primary-container/10 space-y-10">
          {/* BLOCK 1: Basic Info */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">person_pin</span>
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-primary">
                    Información Básica del Huésped
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Datos sincronizados con tu reserva digital previa.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                <span className="material-symbols-outlined text-sm">verified</span> Verificado
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-surface-container-low p-3.5 rounded-xl">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-outline mb-1">
                  Nombre Completo
                </label>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-sm font-semibold text-on-surface bg-transparent focus:outline-none"
                  />
                  <span className="material-symbols-outlined text-primary text-base">lock</span>
                </div>
              </div>

              <div className="bg-surface-container-low p-3.5 rounded-xl">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-outline mb-1">
                  WhatsApp &amp; Teléfono Móvil
                </label>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-sm font-semibold text-on-surface bg-transparent focus:outline-none"
                  />
                  <span className="inline-flex items-center gap-1 text-[11px] text-primary font-bold">
                    <span className="material-symbols-outlined text-xs">chat</span> Recibirá resumen
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-low p-3.5 rounded-xl">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-outline mb-1">
                  Fecha de Nacimiento
                </label>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full text-sm font-semibold text-on-surface bg-transparent focus:outline-none"
                  />
                  <span className="text-[11px] font-semibold text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-md">
                    34 años
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-low p-3.5 rounded-xl">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-outline mb-1">
                  Contacto de Emergencia
                </label>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full text-sm font-semibold text-on-surface bg-transparent focus:outline-none"
                  />
                  <span className="text-xs text-on-surface-variant">{emergencyPhone}</span>
                </div>
              </div>
            </div>
          </section>

          {/* BLOCK 2: Health & Contraindication Chips (Tactile Interactive) */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-container-low">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">shield</span>
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-primary">
                    Cuidado Clínico y Alertas Terapéuticas
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Ayúdanos a cuidar tu cuerpo. Tus respuestas calibran aceites, aromaterapia y manipulaciones.
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[10px] font-bold uppercase tracking-wider bg-primary-container/10 text-primary px-3 py-1 rounded-full">
                Toca para activar o desactivar
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {chips.map((chip) => {
                const isCritical = chip.isActive && chip.status === 'critical';
                const isCare = chip.isActive && chip.status === 'care';

                let containerClasses =
                  'bg-surface-container-low hover:bg-surface-container text-on-surface';
                let iconColor = 'text-outline';
                let statusIcon = 'radio_button_unchecked';

                if (isCritical) {
                  containerClasses =
                    'bg-error-container/40 text-on-error-container border border-error/30 shadow-xs';
                  iconColor = 'text-error';
                  statusIcon = 'check_circle';
                } else if (isCare) {
                  containerClasses =
                    'bg-secondary-container/40 text-on-secondary-container border border-secondary/30 shadow-xs';
                  iconColor = 'text-secondary';
                  statusIcon = 'check_circle';
                }

                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => toggleChip(chip.id)}
                    className={`w-full text-left p-4 rounded-xl flex items-start justify-between gap-3 transition-all min-h-[58px] cursor-pointer ${containerClasses}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`material-symbols-outlined text-xl mt-0.5 ${iconColor}`}>
                        {chip.icon}
                      </span>
                      <div>
                        <span
                          className={`block text-xs sm:text-sm font-bold ${
                            isCritical ? 'text-error' : isCare ? 'text-secondary' : 'text-on-surface'
                          }`}
                        >
                          {chip.label}
                        </span>
                        <span
                          className={`text-xs block mt-0.5 ${
                            isCritical
                              ? 'text-tertiary font-medium'
                              : isCare
                              ? 'text-on-secondary-container'
                              : 'text-outline'
                          }`}
                        >
                          {chip.isActive ? chip.activeDescription : chip.inactiveDescription}
                        </span>
                      </div>
                    </div>
                    <span className={`material-symbols-outlined text-lg ${iconColor}`}>
                      {statusIcon}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3">
              <label
                className="block text-xs font-semibold text-on-surface-variant mb-1.5"
                htmlFor="notes"
              >
                Otras consideraciones específicas para tu masoterapeuta (opcional)
              </label>
              <textarea
                id="notes"
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                rows={2}
                className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>
          </section>

          {/* BLOCK 3: Sensory Preferences */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-surface-container-low">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-base">tune</span>
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-primary">
                  Personalización de tu Experiencia Sensorial
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Cada elemento de la cabina responderá a tu necesidad de descanso presente.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Pressure Selector */}
              <div className="bg-surface-container-low p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">pan_tool</span> Intensidad de Presión
                  </span>
                  <span className="text-[10px] uppercase font-bold text-outline">
                    Ajustable en vivo
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPressure('suave')}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      pressure === 'suave'
                        ? 'bg-primary-container text-on-primary shadow-xs'
                        : 'bg-surface-container-lowest text-on-surface'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">Suave / Relajante</p>
                      <p className="text-[11px] opacity-80">Ritmo pausado, tacto sedoso y envolvente.</p>
                    </div>
                    {pressure === 'suave' && (
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPressure('media')}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      pressure === 'media'
                        ? 'bg-primary-container text-on-primary shadow-xs'
                        : 'bg-surface-container-lowest text-on-surface'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">Media / Descontracturante</p>
                      <p className="text-[11px] opacity-80">Alivio de nudos con descanso neuromuscular.</p>
                    </div>
                    {pressure === 'media' && (
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPressure('firme')}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      pressure === 'firme'
                        ? 'bg-primary-container text-on-primary shadow-xs'
                        : 'bg-surface-container-lowest text-on-surface'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">Firme / Tejido Profundo</p>
                      <p className="text-[11px] opacity-80">Presión focalizada sobre puntos gatillo.</p>
                    </div>
                    {pressure === 'firme' && (
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Aromatherapy & Soundscape */}
              <div className="bg-surface-container-low p-4 rounded-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5 mb-2.5">
                    <span className="material-symbols-outlined text-sm">maps_ar</span> Aromaterapia en Difusor
                  </span>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setAroma('lavanda')}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                        aroma === 'lavanda'
                          ? 'bg-surface-container-highest text-on-surface font-semibold shadow-2xs'
                          : 'bg-surface-container-lowest text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">
                          water_drop
                        </span>
                        <div>
                          <p className="text-xs font-bold">Lavanda Francesa &amp; Flor de Azahar</p>
                          <p className="text-[11px] text-outline">Calma absoluta y ritmo cardíaco suave.</p>
                        </div>
                      </div>
                      {aroma === 'lavanda' && (
                        <span className="material-symbols-outlined text-primary text-base">done</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAroma('eucalipto')}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                        aroma === 'eucalipto'
                          ? 'bg-surface-container-highest text-on-surface font-semibold shadow-2xs'
                          : 'bg-surface-container-lowest text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">air</span>
                        <div>
                          <p className="text-xs font-bold">Eucalipto Blanco &amp; Salvia Silvestre</p>
                          <p className="text-[11px] text-outline">Despeje respiratorio y claridad mental.</p>
                        </div>
                      </div>
                      {aroma === 'eucalipto' && (
                        <span className="material-symbols-outlined text-primary text-base">done</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAroma('citricos')}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                        aroma === 'citricos'
                          ? 'bg-surface-container-highest text-on-surface font-semibold shadow-2xs'
                          : 'bg-surface-container-lowest text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">
                          light_mode
                        </span>
                        <div>
                          <p className="text-xs font-bold">Cítricos del Mediterráneo &amp; Verbena</p>
                          <p className="text-[11px] text-outline">Revitalizante y elevación del ánimo.</p>
                        </div>
                      </div>
                      {aroma === 'citricos' && (
                        <span className="material-symbols-outlined text-primary text-base">done</span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-sm">volume_up</span> Paisaje Sonoro
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSoundscape('agua')}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold text-center transition-all ${
                        soundscape === 'agua'
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      Agua &amp; Bosque
                    </button>
                    <button
                      type="button"
                      onClick={() => setSoundscape('cuencos')}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold text-center transition-all ${
                        soundscape === 'cuencos'
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      Cuencos Zen
                    </button>
                    <button
                      type="button"
                      onClick={() => setSoundscape('silencio')}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold text-center transition-all ${
                        soundscape === 'silencio'
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      Silencio Total
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BLOCK 4: Legal Informed Consent & Digital Signature Canvas */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">gavel</span>
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-primary">
                    Consentimiento Informado y Normativa de Salud
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Protección a tu bienestar bajo lineamientos sanitarios y privacidad de datos.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-outline hidden sm:block">
                Expediente Clínico Digital #AURA-24-901
              </span>
            </div>

            <div className="bg-surface-container-low/70 rounded-xl p-4 text-xs text-on-surface-variant max-h-28 overflow-y-auto leading-relaxed space-y-2 border border-primary-container/10">
              <p>
                Declaro bajo protesta de decir verdad que la información de salud proporcionada es
                verídica, exacta y completa al momento de esta sesión. Entiendo plenamente que los
                tratamientos de Aura Spa &amp; Wellness tienen fines exclusivos de relajación, alivio de
                estrés y bienestar holístico, y no sustituyen consultas ni diagnósticos médicos especializados.
              </p>
              <p>
                Autorizo el uso de las esencias botánicas y técnicas seleccionadas de acuerdo con mis
                respuestas y acepto las políticas de privacidad y protección de datos clínicos sensibles.
                Me comprometo a notificar a mi masoterapeuta en cualquier instante si experimento
                incomodidad térmica, dolor o molestia durante la experiencia.
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={(e) => setConsentAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded text-primary focus:ring-0 accent-primary"
              />
              <span className="text-xs text-on-surface font-medium leading-relaxed">
                He leído conscientemente y acepto el consentimiento informado, así como la
                confidencialidad de mi expediente de salud en Aura Spa &amp; Wellness.
              </span>
            </label>

            {/* Signature Canvas Box */}
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">ink_pen</span> Firma Digital de Aceptación
                </span>
                <span className="text-[11px] text-outline">
                  24 Oct 2024 • 11:20 hrs (Registro Polanco)
                </span>
              </div>

              {/* Interactive Canvas */}
              <div className="relative w-full h-36 bg-surface-container-lowest rounded-xl overflow-hidden shadow-inner border border-primary-container/20">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={140}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full cursor-crosshair"
                />
                <div className="absolute bottom-5 left-4 right-4 h-0.5 bg-surface-container pointer-events-none" />
                <span className="absolute bottom-1.5 left-4 text-[10px] uppercase font-bold text-outline tracking-wider pointer-events-none">
                  {fullName}
                </span>

                {hasDrawnSignature && (
                  <span className="absolute top-2.5 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-primary text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    <span className="material-symbols-outlined text-xs">verified_user</span> Firma Válida
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={clearSignature}
                  className="inline-flex items-center gap-1 text-xs text-on-surface-variant hover:text-on-surface font-semibold py-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">restart_alt</span>
                  <span>Limpiar y volver a trazar firma</span>
                </button>
                <span className="text-[10px] uppercase font-bold text-outline">
                  Huella de sesión encriptada
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Action Footer */}
        <footer className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-lg border border-primary-container/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <div>
              <p className="text-xs font-bold text-on-surface">Expediente al 100% verificado</p>
              <p className="text-[11px] text-outline">
                Sincronización en vivo con tablet de Cabina 01 (Elena Morales)
              </p>
            </div>
          </div>

          {submitFeedback && (
            <div className="text-xs font-bold text-primary animate-pulse">{submitFeedback}</div>
          )}

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 sm:flex-initial h-11 px-5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-semibold transition-colors"
            >
              Regresar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 sm:flex-initial h-11 px-7 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirmar &amp; Pasar a Cabina</span>
              <span className="material-symbols-outlined text-base">east</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
