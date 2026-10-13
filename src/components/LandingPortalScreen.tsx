import React, { useState } from 'react';
import { ScreenType } from '../types';
import { SpaZenLogo } from './SpaZenLogo';

interface LandingPortalScreenProps {
  onEnterSpa: () => void;
  onOpenScreen: (screen: ScreenType) => void;
  onOpenGuidedTour: () => void;
}

export const LandingPortalScreen: React.FC<LandingPortalScreenProps> = ({
  onEnterSpa,
  onOpenScreen,
  onOpenGuidedTour,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [subdomain, setSubdomain] = useState('aura-polanco');
  const [email, setEmail] = useState('sofia@auraspa.com');
  const [password, setPassword] = useState('zenpassword123');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMessage('¡Acceso concedido! Entrando a Sucursal Polanco...');
    setTimeout(() => {
      onEnterSpa();
    }, 600);
  };

  return (
    <div className="w-full flex flex-col bg-surface text-on-surface">
      {/* PUBLIC LANDING HEADER WITH PROMINENT LOGIN BUTTON */}
      <header className="sticky top-0 left-0 right-0 z-30 bg-surface-container-lowest/90 backdrop-blur-md border-b border-primary-container/10 px-4 sm:px-8 lg:px-12 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Logo: SPA ZEN ADMIN */}
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <SpaZenLogo size="md" showSubtitle={true} />
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-on-surface-variant">
            <a href="#beneficios" className="hover:text-primary transition-colors">
              Beneficios
            </a>
            <a href="#portal-acceso" className="hover:text-primary transition-colors">
              Portal de Acceso
            </a>
            <a href="#precios" className="hover:text-primary transition-colors">
              Planes &amp; Precios
            </a>
          </nav>

          {/* Right Action Buttons with Prominent Login Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenGuidedTour}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-base">explore</span>
              <span>Tour Demo</span>
            </button>

            {/* Direct Login Button to Agenda y Cabinas */}
            <button
              onClick={onEnterSpa}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer"
              title="Iniciar sesión e ingresar directamente a la Agenda y Cabinas"
            >
              <span className="material-symbols-outlined text-base">login</span>
              <span>Iniciar Sesión (Login)</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden px-4 sm:px-8 lg:px-12 py-12 lg:py-20 bg-surface">
        {/* Organic ambient gradient shapes */}
        <div className="absolute -top-32 right-[-10%] w-[580px] h-[580px] rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-15%] -left-20 w-[460px] h-[460px] rounded-full bg-secondary-container/25 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Floating Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low shadow-xs mb-6 transform hover:-translate-y-0.5 transition-transform duration-300">
            <span className="text-sm">🌿</span>
            <span className="text-xs font-semibold text-primary tracking-wide">
              Diseñado específicamente para Spas, Centros Holísticos y Clínicas de Bienestar
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface max-w-4xl mb-6 leading-tight">
            La serenidad que tus terapeutas merecen,{' '}
            <span className="italic text-primary font-normal block sm:inline">
              el control que tu spa necesita.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
            El software de gestión clínica y operativa con cero fricción técnica. Diseñado para
            recepción y terapeutas sin experiencia en sistemas: agenda visual de cabinas, fichas
            clínicas con alertas de contraindicaciones y cobro inmediato.
          </p>

          {/* Action CTAs: Direct Login Button prominently featured */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={onEnterSpa}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">calendar_view_day</span>
              <span>Entrar al Sistema (Login Directo a Agenda)</span>
            </button>

            <a
              href="#portal-acceso"
              className="w-full sm:w-auto h-12 px-7 rounded-xl bg-surface-container text-on-surface font-semibold text-sm shadow-xs hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">domain</span>
              <span>Portal de Acceso</span>
            </a>

            <button
              onClick={onOpenGuidedTour}
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-surface-container-low text-primary font-semibold text-sm shadow-xs hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">play_circle</span>
              <span>Ver Caso Guiado</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-on-surface-variant text-xs pb-8">
            <div className="flex items-center gap-1 text-secondary">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-sm text-[#C89B7B]">
                  star
                </span>
              ))}
              <span className="text-on-surface ml-1 font-bold">4.96/5 satisfacción</span>
            </div>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <span>Más de 180 spas y clínicas operando en México y Latam</span>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 text-primary font-medium">
              <span className="material-symbols-outlined text-sm">verified</span>
              Cumplimiento de expedientes clínicos
            </span>
          </div>

          {/* Interactive Mockup Preview Shell */}
          <div className="relative w-full max-w-5xl mt-4 pt-2">
            {/* Floating Live Badges */}
            <div className="absolute -top-4 -left-2 sm:left-4 z-20 flex items-center gap-2 bg-surface-container-lowest/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C89B7B]" />
              </span>
              <span className="text-xs font-semibold text-on-surface">
                Cabina 1: Facial en curso (45 min)
              </span>
            </div>

            <div className="absolute -top-3 -right-2 sm:right-6 z-20 flex items-center gap-2 bg-error-container/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md text-on-error-container">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Alerta de Árnica Activa
              </span>
            </div>

            <button
              onClick={() => onOpenScreen('agenda')}
              className="absolute -bottom-4 right-8 z-20 hidden md:flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl shadow-xl hover:bg-primary-container transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">touch_app</span>
              <span className="text-xs font-medium">Entrar al Tablero de Cabinas</span>
            </button>

            {/* Main Reception Shell Card */}
            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden text-left p-4 sm:p-6 border border-primary-container/10">
              {/* Top Window Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 bg-surface-container-low/70 -mx-4 -mt-4 px-5 py-3 sm:-mx-6 sm:-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-outline-variant/60" />
                  <span className="w-3 h-3 rounded-full bg-outline-variant/60" />
                  <span className="w-3 h-3 rounded-full bg-outline-variant/60" />
                  <span className="ml-2 text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Panel de Cabinas en Tiempo Real · Sucursal Polanco
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold bg-surface-container px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-primary" /> Sistema En Línea
                  </span>
                  <span className="text-xs text-on-surface-variant hidden sm:inline">
                    Hoy, 11:45 hrs
                  </span>
                </div>
              </div>

              {/* Cabinas Matrix Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Cabina 1 */}
                <div className="bg-surface-container-low rounded-xl p-4 flex flex-col justify-between relative overflow-hidden border-l-4 border-secondary">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-on-surface">Cabina Bambú</span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">
                        En Tratamiento
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-primary">Facial Hidratante Profundo</p>
                      <p className="text-xs text-on-surface-variant">Huésped: Valentina Restrepo G.</p>
                      <p className="text-xs text-on-surface-variant">Terapeuta: Elena Morales</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-xs bg-surface-container-lowest/80 p-2 rounded-lg">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">timer</span> Restan 22 min
                    </span>
                    <span className="flex items-center gap-1 text-error font-medium">
                      <span className="material-symbols-outlined text-sm">error</span> Alergia Árnica
                    </span>
                  </div>
                </div>

                {/* Cabina 2 */}
                <div className="bg-surface-container-low rounded-xl p-4 flex flex-col justify-between relative overflow-hidden border-l-4 border-primary">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-on-surface">Suite Piedra Zen</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold">
                        Listo en Espera
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-primary">Masaje Descontracturante</p>
                      <p className="text-xs text-on-surface-variant">Cliente: Rodrigo Mendizábal</p>
                      <p className="text-xs text-on-surface-variant">Terapeuta: Mateo Valdés</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-xs bg-surface-container-lowest/80 p-2 rounded-lg">
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <span className="material-symbols-outlined text-sm">check_circle</span> Ficha firmada
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-secondary">
                      Sala de Té
                    </span>
                  </div>
                </div>

                {/* Cabina 3 */}
                <div className="bg-surface-container-low rounded-xl p-4 flex flex-col justify-between relative overflow-hidden border-l-4 border-outline-variant">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-on-surface">Cabina Brisa Serena</span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold">
                        Sanitización (15m)
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-on-surface-variant italic">Protocolo de Limpieza &amp; Ozono</p>
                      <p className="text-xs text-on-surface-variant">Próxima cita: 12:15 hrs</p>
                      <p className="text-xs text-primary font-medium">Dra. Camila Soria</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-xs bg-surface-container-lowest/80 p-2 rounded-lg">
                    <span className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-sm">air</span> Difusor Activo
                    </span>
                    <span className="text-outline">Buffer libre</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE MODULES */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-surface-container-low/50" id="modulos">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs text-secondary uppercase tracking-widest font-bold block mb-2">
              Módulos Especializados
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-3">
              Diseñado para la calma en cabina y la precisión en caja
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              Eliminamos las pantallas abrumadoras. Cada vista fue concebida junto a cosmetólogas,
              terapeutas corporales y administradores de spas de retiro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-primary-container/10">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">calendar_view_week</span>
                </div>
                <h3 className="text-base font-bold text-on-surface mb-2">
                  Agenda Visual de Cabinas &amp; Tiempos de Sanitización
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
                  Visualiza en un panel táctil la disponibilidad por espacio y terapeuta. Incluye un
                  amortiguador higiénico inteligente de 15 minutos automáticos entre sesiones para
                  ventilar la cabina, cambiar sábanas y activar difusores sin prisas.
                </p>
              </div>
              <div className="bg-surface-container p-3 rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">clean_hands</span>
                <span className="text-xs text-on-surface">
                  Sin empalmes de clientes ni salas apresuradas.
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-primary-container/10">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-2xl">medical_information</span>
                </div>
                <h3 className="text-base font-bold text-on-surface mb-2">
                  Ficha Clínica &amp; Confort Holístico
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
                  Banderas de seguridad inmediata: alertas de alergias cutáneas, hipertensión, prótesis
                  o estado de embarazo. Acompañado de notas sensoriales: tipo de música preferida,
                  presión del masaje y esencias botánicas no toleradas.
                </p>
              </div>
              <div className="bg-surface-container p-3 rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-lg">
                  notifications_active
                </span>
                <span className="text-xs text-on-surface">
                  Protege legalmente a tu spa y cuida integralmente a tu huésped.
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-primary-container/10">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">spa</span>
                </div>
                <h3 className="text-base font-bold text-on-surface mb-2">
                  Cero Capacitación Técnica
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
                  Olvídate de manuales de 50 páginas. Usamos lenguaje real y amigable para el equipo:
                  <em> "Cliente en sala de relajación"</em>, <em>"Cabina lista para aromaterapia"</em>{' '}
                  o <em>"Listo para cobro"</em>. Cualquier terapeuta aprende en menos de 10 minutos.
                </p>
              </div>
              <div className="bg-surface-container p-3 rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">mood</span>
                <span className="text-xs text-on-surface">
                  Recepcionistas tranquilas, huéspedes en serenidad absoluta.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTAL DE ACCESO MULTI-TENANT */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 lg:py-24 bg-surface" id="portal-acceso">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-primary-container/15">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-primary-fixed/20 pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-on-primary mb-3 shadow-sm">
                <span className="material-symbols-outlined text-2xl">domain</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface mb-2">
                Acceso a tu Espacio de Trabajo / Spa Portal
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Ingresa al entorno seguro y personalizado de tu sucursal o clínica de bienestar.
              </p>
            </div>

            {/* Tenant Authentication Form */}
            <form onSubmit={handleLogin} className="max-w-md mx-auto flex flex-col gap-4 relative z-10">
              {/* Workspace Slug */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="tenant-slug">
                    Subdominio del Spa
                  </label>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                    <span className="material-symbols-outlined text-xs">check_circle</span> Espacio verificado ✓
                  </span>
                </div>
                <div className="relative flex items-center">
                  <input
                    id="tenant-slug"
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    placeholder="nombre-de-tu-spa"
                    className="w-full h-11 pl-3 pr-36 rounded-xl bg-surface-container-low text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <span className="absolute right-3 text-xs text-on-surface-variant font-medium select-none pointer-events-none">
                    .spazenadmin.com
                  </span>
                </div>
              </div>

              {/* Staff Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-on-surface" htmlFor="staff-email">
                  Correo del Staff / Terapeuta
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">
                    alternate_email
                  </span>
                  <input
                    id="staff-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu.nombre@tuspawellness.com"
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container-low text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="staff-pass">
                    Contraseña
                  </label>
                  <span className="text-xs text-primary hover:underline cursor-pointer">
                    ¿Olvidaste tu clave?
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">
                    lock
                  </span>
                  <input
                    id="staff-pass"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-11 pl-10 pr-10 rounded-xl bg-surface-container-low text-on-surface text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {loginMessage && (
                <div className="p-2.5 rounded-lg bg-primary-fixed text-primary text-xs font-semibold text-center animate-fade-in">
                  {loginMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 mt-2 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">login</span>
                <span>Iniciar Sesión • Entrar a Agenda &amp; Cabinas</span>
              </button>

              {/* Instant One-Click Bypass Button */}
              <button
                type="button"
                onClick={onEnterSpa}
                className="w-full py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-primary-container/20"
              >
                <span className="material-symbols-outlined text-sm">bolt</span>
                <span>Acceso Rápido Directo (Sin credenciales)</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-between text-center gap-2 pt-3 border-t border-surface-container text-xs">
                <span className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                  ¿Olvidaste el subdominio de tu spa?
                </span>
                <a href="#precios" className="text-primary font-bold hover:underline">
                  ¿Quieres registrar un nuevo spa?
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* PRICING & TIERS */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 lg:py-24 bg-surface-container-low/40" id="precios">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs text-secondary uppercase tracking-widest block mb-2 font-bold">
              Inversión Transparente
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-3">
              Planes claros diseñados para crecer con tu santuario
            </h2>
            <p className="text-sm text-on-surface-variant">
              Prueba cualquiera de nuestros planes sin costo por 14 días. Sin contratos forzosos.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-2 bg-surface-container-high p-1.5 rounded-full mt-6">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Anual <span className="text-secondary font-bold">(2 meses gratis 🎁)</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* PLAN 1: ESENCIA */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 border border-primary-container/10">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-on-surface">ESENCIA</h3>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-medium text-primary">
                    Boutique
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mb-6">
                  Para spas boutique y cabinas de masajes independientes.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-primary">
                    {billingCycle === 'monthly' ? '$49' : '$39'}
                  </span>
                  <span className="text-xs text-on-surface-variant">USD / mes</span>
                </div>
                <ul className="space-y-3 text-xs text-on-surface mb-8">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>1 a 3 Terapeutas asignadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Hasta 2 Cabinas de atención simultánea</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Agenda visual táctil e intuitiva</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-700 text-base">verified</span>
                    <span className="font-semibold text-primary">Consentimiento digital en tablet con firma</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Cuestionario médico básico de salud &amp; alergias</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Cobro rápido y facturación básica</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Recordatorios automáticos por email</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Soporte estándar de conserjería</span>
                  </li>
                </ul>
              </div>
              <a
                href="#portal-acceso"
                className="w-full h-11 rounded-xl bg-surface-container text-primary text-xs font-semibold flex items-center justify-center hover:bg-surface-container-high transition-colors"
              >
                Elegir Esencia
              </a>
            </div>

            {/* PLAN 2: ARMONÍA (FEATURED) */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between relative transform lg:-translate-y-2 border-2 border-secondary/30">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-4 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase shadow-md">
                MÁS ELEGIDO
              </div>
              <div>
                <div className="flex items-center justify-between mb-4 pt-1">
                  <h3 className="text-base font-bold text-primary">ARMONÍA</h3>
                  <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                    Integral
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mb-6">
                  Para spas medianos y centros de estética integral de alto flujo.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-primary">
                    {billingCycle === 'monthly' ? '$99' : '$79'}
                  </span>
                  <span className="text-xs text-on-surface-variant">USD / mes</span>
                </div>
                <ul className="space-y-3 text-xs text-on-surface mb-8">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#C89B7B] text-base">check_circle</span>
                    <span className="font-semibold">Hasta 6 Terapeutas simultáneas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#C89B7B] text-base">check_circle</span>
                    <span>Hasta 3 Cabinas y suites dobles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#C89B7B] text-base">check_circle</span>
                    <span className="font-semibold">Consentimiento digital en tablet con firma y sello legal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#C89B7B] text-base">check_circle</span>
                    <span className="font-semibold">Expediente y Ficha Clínica Completa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#C89B7B] text-base">check_circle</span>
                    <span className="text-error font-semibold">Alertas de Alergias &amp; Contraindicaciones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#C89B7B] text-base">check_circle</span>
                    <span>Amortiguador de desinfección automático</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#C89B7B] text-base">check_circle</span>
                    <span>Registro de comisiones y descansos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#C89B7B] text-base">check_circle</span>
                    <span>Recordatorios por WhatsApp directo</span>
                  </li>
                </ul>
              </div>
              <a
                href="#portal-acceso"
                className="w-full h-12 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center hover:bg-primary-container shadow-md transition-all gap-2"
              >
                <span>Probar Armonía 14 días gratis</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>

            {/* PLAN 3: ZENITH */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 border border-primary-container/10">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-on-surface">ZENITH</h3>
                  <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-medium text-on-surface-variant">
                    Clínicas &amp; Cadenas
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mb-6">
                  Para cadenas, spas de hotel de lujo y clínicas médicas de bienestar.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-primary">A Medida</span>
                  <span className="text-xs text-on-surface-variant">según sucursales</span>
                </div>
                <ul className="space-y-3 text-xs text-on-surface mb-8">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Más de 6 Terapeutas (ilimitadas)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Cabinas ilimitadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Gestión multi-sucursal centralizada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Consentimiento digital en tablet con firma</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Encriptación médica grado clínico</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    <span>Asesor dedicado de migración de datos</span>
                  </li>
                </ul>
              </div>
              <a
                href="#portal-acceso"
                className="w-full h-11 rounded-xl bg-surface-container text-primary text-xs font-semibold flex items-center justify-center hover:bg-surface-container-high transition-colors"
              >
                Contactar a un Asesor de Spa
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & SECURITY */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-surface">
        <div className="max-w-5xl mx-auto bg-surface-container-low/70 rounded-3xl p-6 sm:p-10 text-center border border-primary-container/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">lock</span>
              </div>
              <span className="font-semibold text-sm text-on-surface">Datos Cifrados SSL 256-bit</span>
              <p className="text-xs text-on-surface-variant max-w-xs">
                Información médica y notas privadas de huéspedes encriptadas en tránsito y reposo.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <span className="font-semibold text-sm text-on-surface">Cumplimiento Clínico</span>
              <p className="text-xs text-on-surface-variant max-w-xs">
                Fichas preparadas bajo lineamientos de salud y protección de datos personales.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">cloud_done</span>
              </div>
              <span className="font-semibold text-sm text-on-surface">99.9% Disponibilidad</span>
              <p className="text-xs text-on-surface-variant max-w-xs">
                Infraestructura redundante para que tu recepción y cabinas nunca se detengan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-lowest border-t border-primary-container/10 px-4 sm:px-8 lg:px-12 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <SpaZenLogo size="sm" showSubtitle={true} />
          
          <div className="text-xs text-outline text-center md:text-right space-y-1">
            <p>© 2026 SPA Zen Admin SaaS. Plataforma de gestión vertical multi-tenant.</p>
            <p className="text-[11px] text-outline/80">Diseñado para spas independientes, cadenas hoteleras y clínicas de bienestar holístico.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
