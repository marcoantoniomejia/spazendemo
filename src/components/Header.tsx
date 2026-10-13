import React, { useState } from 'react';
import { ScreenType, UserRole } from '../types';
import { SpaZenLogo } from './SpaZenLogo';

interface HeaderProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenExpediente: () => void;
  onOpenGuidedTour: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  currentRole,
  onSelectRole,
  onOpenExpediente,
  onOpenGuidedTour,
  searchQuery,
  onSearchChange,
  onLogout,
}) => {
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('Aura Polanco (Demo Tenant)');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const branches = [
    'Aura Polanco (Demo Tenant)',
    'Aura San Pedro MTY (Tenant)',
    'Aura Roma Norte (Tenant)',
    'Zenith Luxury Spa (Tenant)',
  ];

  // Internal system operational screens (Landing page is the external entrance)
  const screens: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'agenda', label: '1. Agenda & Cabinas', icon: 'calendar_view_day' },
    { id: 'intake', label: '2. Intake & Firma', icon: 'checklist' },
    { id: 'admin', label: '3. Catálogo & Salas', icon: 'settings' },
    { id: 'pos', label: '4. Cobro POS', icon: 'point_of_sale' },
    { id: 'corte_z', label: '5. Arqueo & Corte Z', icon: 'receipt_long' },
    { id: 'notificacion', label: '6. Notificación Dueño', icon: 'chat' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-40 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(45,55,48,0.05)] border-b border-primary-container/10">
        <div className="h-20 max-w-[1720px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Brand: SPA ZEN ADMIN platform logo & Active Tenant */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => onSelectScreen('agenda')}
              className="hover:opacity-90 transition-opacity cursor-pointer text-left"
              title="SPA Zen Admin — Ir a Agenda y Cabinas"
            >
              <SpaZenLogo size="md" showSubtitle={true} />
            </button>

            {/* Tenant / Branch Indicator */}
            <div className="relative hidden xl:block pl-3 border-l border-primary-container/20">
              <div className="text-[9px] font-bold uppercase tracking-wider text-outline mb-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Tenant Activo</span>
              </div>
              <button
                onClick={() => setIsBranchOpen(!isBranchOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface hover:text-primary hover:bg-surface-container transition-colors cursor-pointer text-xs font-semibold border border-primary-container/15"
              >
                <span className="material-symbols-outlined text-sm text-primary">domain</span>
                <span className="max-w-[160px] truncate">{selectedBranch}</span>
                <span className="material-symbols-outlined text-xs text-outline">keyboard_arrow_down</span>
              </button>

              {isBranchOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-surface-container-lowest shadow-xl border border-primary-container/10 p-1.5 z-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-outline px-2.5 py-1">
                    Cambiar Sucursal
                  </div>
                  {branches.map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setSelectedBranch(b);
                        setIsBranchOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedBranch === b
                          ? 'bg-primary-fixed text-primary font-semibold'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <span>{b}</span>
                      {selectedBranch === b && (
                        <span className="material-symbols-outlined text-sm">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="flex-1 max-w-md mx-2 hidden lg:flex items-center">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar cliente, expediente o servicio... (Ctrl+K)"
                className="w-full h-10 pl-10 pr-4 bg-surface rounded-xl text-xs text-on-surface placeholder:text-outline border border-primary-container/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Screen Navigation Quick Links for Demo & Evaluation */}
          <nav className="hidden 2xl:flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
            {screens.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  currentScreen === s.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Controls: Ficha Drawer Trigger, Guided Journey, Role, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct button to open Clinical File slide-over */}
            <button
              onClick={onOpenExpediente}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-xs font-semibold shadow-xs transition-colors"
              title="Abrir Ficha Clínica y Bienestar (Slide-over)"
            >
              <span className="material-symbols-outlined text-base">clinical_notes</span>
              <span className="hidden md:inline">Expediente</span>
            </button>

            {/* Guided Journey Button */}
            <button
              onClick={onOpenGuidedTour}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-on-secondary hover:opacity-95 text-xs font-semibold shadow-sm transition-all"
              title="Ver el flujo completo paso a paso (Caso Mariana Gómez)"
            >
              <span className="material-symbols-outlined text-base">explore</span>
              <span className="hidden sm:inline">Caso Mariana G.</span>
            </button>

            {/* Date Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
              <span>24 Oct 2024</span>
            </div>

            {/* Help & Support Button */}
            <button
              onClick={() => setIsHelpOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-sm text-secondary">help</span>
              <span>Ayuda</span>
            </button>

            {/* User Profile & Role Switcher */}
            <div className="relative pl-1">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2.5 text-left p-1 rounded-xl hover:bg-surface-container-low transition-colors"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjDjr1yiC4w5Hnk5YBsM6W4AT8ozEPu1EiOLO5bVEs844C0W3SegcYuWCvGhW29DnyzUN43sk2x8kyWQ5JxJkkgtlP4ia1LxQsgr8u8tYqQ6ktzly3wP53ZQE5c4ifByk8Wu6ZycdR2wJpoIfCNsX3CYjJYt32MqvA4VDL_ZRcoSUXQkhrqDGicAsHs2jgxWCz-ERug5pnOfaMJLorxpzGJyn4QTXfvv6ii33bLBNUyPkp6XXKAxx0bQ"
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div className="hidden sm:flex flex-col leading-none">
                  <span className="text-xs font-bold text-on-surface">Sofía</span>
                  <span className="text-[10px] uppercase font-semibold text-outline capitalize mt-0.5">
                    {currentRole}
                  </span>
                </div>
                <span className="material-symbols-outlined text-sm text-outline hidden sm:inline">
                  expand_more
                </span>
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-surface-container-lowest shadow-2xl border border-primary-container/10 p-2 z-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-outline px-3 py-1.5">
                    Simular Rol de Usuario
                  </div>
                  <button
                    onClick={() => {
                      onSelectRole('recepcionista');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center gap-3 ${
                      currentRole === 'recepcionista'
                        ? 'bg-primary-fixed text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg text-primary">person</span>
                    <div>
                      <div className="font-semibold">Sofía (Recepcionista)</div>
                      <div className="text-[10px] text-outline">Agenda, Check-in, Cobro POS, Corte Z</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('terapeuta');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center gap-3 ${
                      currentRole === 'terapeuta'
                        ? 'bg-primary-fixed text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg text-secondary">self_improvement</span>
                    <div>
                      <div className="font-semibold">Mateo / Elena (Terapeutas)</div>
                      <div className="text-[10px] text-outline">Cabinas, Expediente, Alertas de Alergias</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('dueno');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center gap-3 ${
                      currentRole === 'dueno'
                        ? 'bg-primary-fixed text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg text-primary">manage_accounts</span>
                    <div>
                      <div className="font-semibold">Lic. Marcela (Dueña / Dirección)</div>
                      <div className="text-[10px] text-outline">Catálogo, Despacho WhatsApp/Email, Finanzas</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('paciente');
                      onSelectScreen('intake');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center gap-3 ${
                      currentRole === 'paciente'
                        ? 'bg-primary-fixed text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg text-secondary">tablet_mac</span>
                    <div>
                      <div className="font-semibold">Paciente (Modo Tablet Sala)</div>
                      <div className="text-[10px] text-outline">Formulario táctil de salud &amp; firma</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-primary-container/10" />

                  <button
                    onClick={() => {
                      setIsRoleDropdownOpen(false);
                      if (onLogout) {
                        onLogout();
                      } else {
                        onSelectScreen('landing');
                      }
                    }}
                    className="w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center gap-3 text-terracotta hover:bg-terracotta/10 font-semibold"
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    <div>
                      <div>Cerrar Sesión</div>
                      <div className="text-[10px] text-outline font-normal">Salir al portal de bienvenida</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile / Secondary Navigation Bar for screens */}
        <div className="2xl:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-primary-container/10 bg-surface-container-low/80 scrollbar-none">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectScreen(s.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 shrink-0 ${
                currentScreen === s.id
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-on-surface bg-surface-container-lowest'
              }`}
            >
              <span className="material-symbols-outlined text-xs">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 max-w-md w-full shadow-2xl border border-primary-container/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-on-surface">Conserje de Soporte Aura</h3>
                  <p className="text-xs text-outline">Atención 24/7 para recepcionistas y dueños</p>
                </div>
              </div>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-low text-xs space-y-2 text-on-surface-variant">
              <p>
                <strong>Línea Directa de Urgencias:</strong> +52 (55) 4192-8800 (Ext. 104)
              </p>
              <p>
                <strong>Mesa Contable &amp; Discrepancias:</strong> contabilidad@auraspa.com
              </p>
              <p>
                <strong>Protocolos de Contraindicaciones:</strong> Manual digital disponible en cabinas.
              </p>
            </div>
            <button
              onClick={() => setIsHelpOpen(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
