import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingPortalScreen } from './components/LandingPortalScreen';
import { AgendaScreen } from './components/AgendaScreen';
import { IntakeScreen } from './components/IntakeScreen';
import { ExpedienteDrawer } from './components/ExpedienteDrawer';
import { CatalogAdminScreen } from './components/CatalogAdminScreen';
import { POSScreen } from './components/POSScreen';
import { CorteZScreen } from './components/CorteZScreen';
import { ExecutiveDispatchScreen } from './components/ExecutiveDispatchScreen';
import { GuidedTourModal } from './components/GuidedTourModal';
import {
  mockAppointments,
  mockBoutiqueProducts,
  mockCabins,
  mockClients,
  mockDefaultShiftClosure,
  mockServices,
  mockTherapists,
  mockValentina,
} from './data/mockData';
import {
  Appointment,
  BoutiqueProduct,
  Cabin,
  Client,
  EvolutionNote,
  ScreenType,
  ServiceItem,
  ShiftClosureData,
  Therapist,
  UserRole,
} from './types';

export default function App() {
  // Current screen & role state - starts on the Landing and Access entrance page
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole>('recepcionista');

  // Application Data States
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [cabins, setCabins] = useState<Cabin[]>(mockCabins);
  const [therapists, setTherapists] = useState<Therapist[]>(mockTherapists);
  const [services, setServices] = useState<ServiceItem[]>(mockServices);
  const [boutiqueProducts, setBoutiqueProducts] = useState<BoutiqueProduct[]>(mockBoutiqueProducts);
  const [closureData, setClosureData] = useState<ShiftClosureData>(mockDefaultShiftClosure);

  // Expediente Drawer State
  const [isExpedienteOpen, setIsExpedienteOpen] = useState(false);
  const [selectedClientForExpediente, setSelectedClientForExpediente] = useState<Client>(mockValentina);

  // Guided Tour Modal State
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Global Toast / Feedback alert banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Open Expediente Drawer for a specific client
  const handleOpenExpediente = (client?: Client) => {
    if (client) {
      setSelectedClientForExpediente(client);
    } else {
      setSelectedClientForExpediente(mockValentina);
    }
    setIsExpedienteOpen(true);
  };

  // Intake Completion Handler
  const handleCompleteIntake = (updatedClient: Client) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
    setSelectedClientForExpediente(updatedClient);
    showToast(`✓ Intake y Consentimiento de ${updatedClient.name} firmado legalmente y archivado.`);
    setCurrentScreen('agenda');
    // Open drawer to show the updated clinical file
    setTimeout(() => {
      setIsExpedienteOpen(true);
    }, 500);
  };

  // Add Evolution note to client
  const handleAddNoteToExpediente = (note: EvolutionNote) => {
    const updatedClient: Client = {
      ...selectedClientForExpediente,
      evolutionNotes: [note, ...selectedClientForExpediente.evolutionNotes],
    };
    setSelectedClientForExpediente(updatedClient);
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
    showToast('✓ Nota clínica de evolución guardada correctamente en el expediente.');
  };

  // Finish Corte Z Handler
  const handleFinishCorte = () => {
    showToast('✓ Turno vespertino cerrado. Notificación instantánea despachada al propietario.');
  };

  const [headerSearch, setHeaderSearch] = useState('');

  return (
    <div className={`min-h-screen bg-surface text-on-surface font-sans flex flex-col selection:bg-primary-container selection:text-white ${currentScreen !== 'landing' ? 'pt-20' : ''}`}>
      {/* Global Navigation Header - ONLY displayed inside the system (removed on landing page) */}
      {currentScreen !== 'landing' && (
        <Header
          currentScreen={currentScreen}
          onSelectScreen={setCurrentScreen}
          currentRole={currentRole}
          onSelectRole={setCurrentRole}
          onOpenExpediente={() => handleOpenExpediente(selectedClientForExpediente)}
          onOpenGuidedTour={() => setIsTourOpen(true)}
          searchQuery={headerSearch}
          onSearchChange={setHeaderSearch}
          onLogout={() => setCurrentScreen('landing')}
        />
      )}

      {/* Main Screen Router */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'landing' && (
          <LandingPortalScreen
            onEnterSpa={() => setCurrentScreen('agenda')}
            onOpenScreen={setCurrentScreen}
            onOpenGuidedTour={() => setIsTourOpen(true)}
          />
        )}

        {currentScreen === 'agenda' && (
          <AgendaScreen
            appointments={appointments}
            cabins={cabins}
            onOpenExpediente={handleOpenExpediente}
            onOpenPOS={() => setCurrentScreen('pos')}
            onOpenIntake={() => setCurrentScreen('intake')}
            onNavigateScreen={setCurrentScreen}
          />
        )}

        {currentScreen === 'intake' && (
          <IntakeScreen
            client={selectedClientForExpediente}
            onCompleteIntake={handleCompleteIntake}
            onCancel={() => setCurrentScreen('agenda')}
          />
        )}

        {currentScreen === 'expediente' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl">medical_information</span>
            </div>
            <h2 className="text-2xl font-serif text-on-surface mb-2">Expediente Clínico Biofílico</h2>
            <p className="text-sm text-outline mb-6">
              El expediente se despliega como un slide-over lateral sin perder la vista de la agenda, para que recepción y terapeutas no recarguen la página.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsExpedienteOpen(true)}
                className="px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold shadow-md hover:bg-primary-container transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">dock_to_left</span>
                Desplegar Ficha de Valentina Restrepo
              </button>
              <button
                onClick={() => setCurrentScreen('agenda')}
                className="px-4 py-3 bg-surface-container text-outline hover:text-on-surface rounded-xl text-sm font-semibold transition-colors"
              >
                Ver Agenda
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'admin' && (
          <CatalogAdminScreen
            therapists={therapists}
            services={services}
            cabins={cabins}
            onAddService={(newServ) => {
              setServices((prev) => [newServ, ...prev]);
              showToast(`✓ Servicio "${newServ.name}" agregado al catálogo exitosamente.`);
            }}
            onAddTherapist={(newTher) => {
              setTherapists((prev) => [newTher, ...prev]);
              showToast(`✓ Terapeuta "${newTher.name}" registrado correctamente.`);
            }}
            onAddCabin={(newCab) => {
              setCabins((prev) => [newCab, ...prev]);
              showToast(`✓ Cabina "${newCab.name}" creada exitosamente.`);
            }}
          />
        )}

        {currentScreen === 'pos' && (
          <POSScreen
            client={selectedClientForExpediente}
            boutiqueProducts={boutiqueProducts}
            onNavigateScreen={setCurrentScreen}
          />
        )}

        {currentScreen === 'corte_z' && (
          <CorteZScreen
            closureData={closureData}
            onNavigateScreen={setCurrentScreen}
            onFinishCorte={handleFinishCorte}
          />
        )}

        {currentScreen === 'notificacion' && (
          <ExecutiveDispatchScreen
            closureData={closureData}
            onNavigateScreen={setCurrentScreen}
          />
        )}
      </main>

      {/* Expediente Clinical Slide-over Drawer */}
      <ExpedienteDrawer
        isOpen={isExpedienteOpen}
        onClose={() => setIsExpedienteOpen(false)}
        client={selectedClientForExpediente}
        onAddNote={handleAddNoteToExpediente}
      />

      {/* Interactive Guided Tour Modal */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onGoToScreen={setCurrentScreen}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 animate-fadeIn">
          <span className="material-symbols-outlined text-xl text-primary-fixed">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
