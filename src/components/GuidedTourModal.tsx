import React, { useState } from 'react';
import { ScreenType } from '../types';

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToScreen: (screen: ScreenType) => void;
}

interface TourStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  screen: ScreenType;
  icon: string;
  badge: string;
  kpiHighlight: string;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onGoToScreen,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const tourSteps: TourStep[] = [
    {
      step: 1,
      title: '1. Landing Page y Acceso Multi-tenant',
      subtitle: 'Captación & Onboarding Comercial',
      description:
        'Presenta los planes de suscripción de SPA Zen Admin (Esencia, Armonía y Zenith) y el portal de inicio de sesión con subdominio personalizado para cada spa.',
      screen: 'landing',
      icon: 'domain',
      badge: 'SaaS Multi-tenant',
      kpiHighlight: '3 planes según terapeutas y cabinas',
    },
    {
      step: 2,
      title: '2. Agenda Operativa & Cabinas',
      subtitle: 'El Corazón del Spa en Tiempo Real',
      description:
        'Matriz visual interactiva organizada por salas de tratamiento con bloques de tiempo que respetan los 15 minutos obligatorios de sanitización y aromaterapia.',
      screen: 'agenda',
      icon: 'calendar_month',
      badge: 'Cero Sobrevuelo',
      kpiHighlight: '15 min buffer de sanitización estricto',
    },
    {
      step: 3,
      title: '3. Intake & Consentimiento Digital en Tablet',
      subtitle: 'Sala de Espera & Seguridad Clínica',
      description:
        'Pantalla biofílica para tablets táctiles. El cliente nuevo toca chips de salud (alergias a nueces, embarazo, lumbalgia) y estampa su firma digital legal con sello de tiempo.',
      screen: 'intake',
      icon: 'draw',
      badge: 'Blindaje Legal 100%',
      kpiHighlight: 'Tiempo de admisión: de 12 min a < 2.5 min',
    },
    {
      step: 4,
      title: '4. Expediente Clínico & Alertas de Bienestar',
      subtitle: 'Slide-over Lateral sin Perder Contexto',
      description:
        'Ficha clínica con badges visuales terracota/ámbar de advertencia médica, mapa anatómico de zonas a cuidar, notas de evolución y firmas históricas del paciente.',
      screen: 'expediente',
      icon: 'medical_information',
      badge: '0% Riesgo Negligencia',
      kpiHighlight: 'Alerta instantánea al terapeuta antes de tocar',
    },
    {
      step: 5,
      title: '5. Catálogo & Administración de Operaciones',
      subtitle: 'Control de Terapeutas, Servicios & Cabinas',
      description:
        'Módulo maestro para configurar especialidades del staff, tiempos de sanitización de cada cabina y asistente paso a paso para dar de alta nuevos rituales.',
      screen: 'admin',
      icon: 'admin_panel_settings',
      badge: 'Configuración Rápida',
      kpiHighlight: 'Control de comisiones y certificaciones',
    },
    {
      step: 6,
      title: '6. Cobro & Punto de Venta (POS + Boutique)',
      subtitle: 'Checkout Rápido & Cross-sell en Mostrador',
      description:
        'Caja registradora táctil que sugiere al recepcionista productos de boutique recomendados por el terapeuta, calcula propinas y divide pagos en efectivo/tarjeta.',
      screen: 'pos',
      icon: 'point_of_sale',
      badge: '+22% Retail Attachment',
      kpiHighlight: 'Cálculo de cambio y ticket WhatsApp instantáneo',
    },
    {
      step: 7,
      title: '7. Arqueo & Corte de Caja (Corte Z)',
      subtitle: 'Conciliación Contable Tripartita',
      description:
        'Concilia en segundos las terminales bancarias, transferencias SPEI y el efectivo en sobre con calculadora de billetes y resguardo de fondo de apertura.',
      screen: 'corte_z',
      icon: 'account_balance_wallet',
      badge: 'Cuadre en < 4 minutos',
      kpiHighlight: 'De 40 min manuales a < 4 min sin descuadre',
    },
    {
      step: 8,
      title: '8. Notificación Automática al Propietario',
      subtitle: 'Despacho Inmediato por WhatsApp & Email',
      description:
        'Simulador interactivo del smartphone donde el socio director recibe el balance contable completo, expedientes firmados e incidencias en tiempo real.',
      screen: 'notificacion',
      icon: 'send_to_mobile',
      badge: 'Tranquilidad Total',
      kpiHighlight: 'Mensaje instantáneo encriptado con métricas clave',
    },
  ];

  const currentStep = tourSteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < tourSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      onGoToScreen(tourSteps[nextIndex].screen);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      onGoToScreen(tourSteps[prevIndex].screen);
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
    onGoToScreen(tourSteps[index].screen);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest max-w-2xl w-full rounded-3xl border border-surface-variant/40 shadow-2xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="bg-primary text-on-primary px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">
                {currentStep.icon}
              </span>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-primary-fixed">
                Recorrido Guiado • Caso de Negocio Completo
              </div>
              <h2 className="text-lg font-serif font-bold text-white leading-tight">
                Paso {currentStep.step} de 8: {currentStep.subtitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              {currentStep.badge}
            </span>
            <span className="text-xs text-outline font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">monitoring</span>
              {currentStep.kpiHighlight}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold font-serif text-on-surface mb-2">
              {currentStep.title}
            </h3>
            <p className="text-sm text-outline leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Stepper dots */}
          <div className="pt-2 flex items-center justify-center gap-1.5">
            {tourSteps.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => handleJumpToStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-surface-variant hover:bg-surface-variant-high'
                }`}
                title={step.title}
              />
            ))}
          </div>
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-surface-container flex items-center justify-between border-t border-surface-variant/30">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-1 transition-all ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed text-outline'
                : 'text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Anterior
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onGoToScreen(currentStep.screen);
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors"
            >
              Explorar esta Pantalla
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2 text-xs font-bold text-on-primary bg-primary hover:bg-primary-container rounded-xl shadow-sm transition-all flex items-center gap-1"
            >
              <span>{currentStepIndex === tourSteps.length - 1 ? 'Finalizar Tour' : 'Siguiente'}</span>
              <span className="material-symbols-outlined text-sm">
                {currentStepIndex === tourSteps.length - 1 ? 'check' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
