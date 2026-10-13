import React, { useState } from 'react';
import { ShiftClosureData, ScreenType } from '../types';

interface CorteZScreenProps {
  closureData: ShiftClosureData;
  onNavigateScreen: (screen: ScreenType) => void;
  onFinishCorte: () => void;
}

export const CorteZScreen: React.FC<CorteZScreenProps> = ({
  closureData,
  onNavigateScreen,
  onFinishCorte,
}) => {
  // Cash breakdown state
  const [denominations, setDenominations] = useState<{ [key: number]: number }>({
    500: 6, // 3,000
    200: 4, // 800
    100: 3, // 300
    50: 1,  // 50
    20: 0,
  });

  const [coinsAmount, setCoinsAmount] = useState<number>(0);
  const [reserveFloat, setReserveFloat] = useState<number>(1000);
  const [auditNotes, setAuditNotes] = useState<string>(
    'Cierre de turno vespertino sin anomalías registradas. Se atendieron 18 pacientes, 100% de expedientes firmados digitalmente. 3 tratamientos acompañados con aromaterapia sin incidencias.'
  );
  const [isFinalized, setIsFinalized] = useState(false);

  // Calculate actual counted cash
  const calculateCashSubtotal = () => {
    let sum = 0;
    Object.entries(denominations).forEach(([denom, count]) => {
      sum += Number(denom) * count;
    });
    return sum + (coinsAmount || 0);
  };

  const countedCash = calculateCashSubtotal();
  const netCashDeposit = countedCash - reserveFloat;
  const expectedCash = closureData.systemExpected.cash;
  const cashDifference = netCashDeposit - expectedCash;

  const handleDenomChange = (denom: number, val: number) => {
    setDenominations(prev => ({
      ...prev,
      [denom]: Math.max(0, val || 0),
    }));
  };

  const handleQuickMatch = () => {
    // Auto populate to match exact system expectation
    setDenominations({
      500: 8, // 4,000
      200: 4, // 800
      100: 3, // 300
      50: 1,  // 50
      20: 0,
    });
    setReserveFloat(1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-surface-variant/40 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
            <span>Módulo de Auditoría Financiera • Sucursal Polanco</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif text-on-surface flex items-center gap-3">
            Arqueo de Caja &amp; Corte Z Diario
            <span className="text-xs font-sans px-2.5 py-1 bg-amber-500/10 text-amber-700 font-medium rounded-full border border-amber-500/20">
              Turno Vespertino • En Proceso
            </span>
          </h1>
          <p className="text-sm text-outline mt-1">
            Cierre contable tripartito: Conciliación de Efectivo, Vouchers Bancarios y Transferencias Móviles SPEI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateScreen('notificacion')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors"
          >
            <span className="material-symbols-outlined text-base">forward_to_inbox</span>
            Ver Notificación al Dueño
          </button>
          <button
            onClick={handleQuickMatch}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-outline hover:text-on-surface bg-surface-container rounded-lg transition-colors border border-surface-variant/60"
            title="Auto-conciliar efectivo para demostración rápida"
          >
            <span className="material-symbols-outlined text-sm">auto_fix_high</span>
            Cuadre Rápido (Demo)
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-surface-container-low p-5 rounded-2xl border border-surface-variant/30 relative overflow-hidden">
          <div className="flex items-center justify-between text-outline text-xs mb-2">
            <span>VENTAS BRUTAS TOTALES</span>
            <span className="material-symbols-outlined text-primary text-xl">payments</span>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-serif text-on-surface">
            ${closureData.totalSales.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-primary font-medium mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            18 transacciones liquidadas
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl border border-surface-variant/30">
          <div className="flex items-center justify-between text-outline text-xs mb-2">
            <span>SERVICIOS EN CABINA</span>
            <span className="material-symbols-outlined text-primary text-xl">spa</span>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-serif text-on-surface">
            ${closureData.serviceSales.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-outline mt-2">
            18 servicios (100% asistidos)
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl border border-surface-variant/30">
          <div className="flex items-center justify-between text-outline text-xs mb-2">
            <span>BOUTIQUE &amp; RETAIL</span>
            <span className="material-symbols-outlined text-primary text-xl">shopping_bag</span>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-serif text-on-surface">
            ${closureData.retailSales.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">arrow_upward</span>
            +22% cross-sell en mostrador
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl border border-surface-variant/30">
          <div className="flex items-center justify-between text-outline text-xs mb-2">
            <span>PROPINA RECOLECTADA</span>
            <span className="material-symbols-outlined text-amber-600 text-xl">volunteer_activism</span>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-serif text-on-surface">
            ${closureData.tipsTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-outline mt-2">
            A dispersar equitativamente al staff
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Tripartite Reconciliation & Cash Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Tripartite Channel Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface-container-low rounded-2xl border border-surface-variant/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-serif text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">balance</span>
                Conciliación Tripartita por Canal
              </h2>
              <span className="text-xs text-outline font-medium">Auditoría en tiempo real</span>
            </div>

            <div className="space-y-4">
              {/* Channel 1: Terminales Bancarias */}
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-variant/20 hover:border-surface-variant/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined">credit_card</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-on-surface">Terminales Bancarias (TPV 1 &amp; 2)</div>
                      <div className="text-xs text-outline">12 vouchers conciliados • VISA / MC / AMEX</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-base text-on-surface">
                      ${closureData.systemExpected.card.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      Cuadrado al 100%
                    </span>
                  </div>
                </div>
              </div>

              {/* Channel 2: Transferencias Móviles / SPEI */}
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-variant/20 hover:border-surface-variant/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-700 flex items-center justify-center">
                      <span className="material-symbols-outlined">account_balance</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-on-surface">Transferencias Móviles SPEI</div>
                      <div className="text-xs text-outline">3 folios verificados con CEP Banxico</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-base text-on-surface">
                      ${closureData.systemExpected.spei.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      Validado por SPEI
                    </span>
                  </div>
                </div>
              </div>

              {/* Channel 3: Efectivo en Caja */}
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-variant/20 hover:border-surface-variant/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                      <span className="material-symbols-outlined">savings</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-on-surface">Efectivo en Caja Físico</div>
                      <div className="text-xs text-outline">Esperado por sistema vs. Conteo en sobre</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-base text-on-surface">
                      ${netCashDeposit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </div>
                    {cashDifference === 0 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <span className="material-symbols-outlined text-[13px]">check_circle</span>
                        Cuadre Perfecto ($0.00 dif.)
                      </span>
                    ) : (
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        cashDifference > 0 
                          ? 'text-sky-700 bg-sky-50 border-sky-200' 
                          : 'text-terracotta bg-terracotta/10 border-terracotta/20'
                      }`}>
                        <span className="material-symbols-outlined text-[13px]">
                          {cashDifference > 0 ? 'arrow_upward' : 'warning'}
                        </span>
                        {cashDifference > 0 ? `Sobrante: +$${cashDifference}` : `Faltante: -$${Math.abs(cashDifference)}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reconciliation Audit Summary Table */}
            <div className="mt-6 pt-5 border-t border-surface-variant/30">
              <div className="text-xs font-semibold uppercase text-outline tracking-wider mb-3">
                Resumen de Arqueo y Desglose Operativo
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 text-on-surface/80">
                  <span>Fondo fijo de apertura (Caja chica base)</span>
                  <span className="font-mono">${closureData.startingFloat.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between py-1 text-on-surface/80">
                  <span>Ingresos en efectivo del turno</span>
                  <span className="font-mono text-primary font-medium">+${expectedCash.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between py-1 text-on-surface/80">
                  <span>Resguardo en caja para apertura de mañana</span>
                  <span className="font-mono text-outline">-${reserveFloat.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-surface-variant/40 font-bold text-on-surface">
                  <span className="text-primary">Efectivo Líquido a Envalijar / Depositar</span>
                  <span className="font-mono text-base text-primary">
                    ${netCashDeposit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Notes & Incidents */}
          <div className="bg-surface-container-low rounded-2xl border border-surface-variant/30 p-6">
            <h3 className="text-base font-semibold text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-outline">edit_note</span>
              Bitácora &amp; Observaciones del Turno
            </h3>
            <textarea
              value={auditNotes}
              onChange={(e) => setAuditNotes(e.target.value)}
              rows={3}
              className="w-full text-xs text-on-surface bg-surface-container-lowest border border-surface-variant/40 rounded-xl p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              placeholder="Escribe notas relevantes para el dueño o para el turno matutino..."
            />
            <div className="flex items-center justify-between text-[11px] text-outline mt-2">
              <span>Registrado por: <strong>{closureData.responsibleReceptionist}</strong></span>
              <span>Fecha: {new Date().toLocaleDateString('es-MX')} • 20:15 hrs</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Denomination Counter & Envelope Packing (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low rounded-2xl border border-surface-variant/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-serif text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calculate</span>
                Calculadora de Denominaciones
              </h2>
              <span className="text-xs text-outline">Conteo físico de billetes</span>
            </div>

            <div className="space-y-3">
              {[500, 200, 100, 50, 20].map((denom) => (
                <div
                  key={denom}
                  className="flex items-center justify-between bg-surface-container-lowest px-3 py-2.5 rounded-xl border border-surface-variant/20"
                >
                  <div className="flex items-center gap-2 w-28">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface">
                      ${denom}
                    </span>
                    <span className="text-xs text-outline">billetes</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDenomChange(denom, (denominations[denom] || 0) - 1)}
                      className="w-7 h-7 rounded-lg bg-surface-container text-outline hover:text-on-surface flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={denominations[denom] || 0}
                      onChange={(e) => handleDenomChange(denom, parseInt(e.target.value) || 0)}
                      className="w-12 text-center text-sm font-bold font-mono bg-transparent border border-surface-variant/40 rounded-lg py-1 focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => handleDenomChange(denom, (denominations[denom] || 0) + 1)}
                      className="w-7 h-7 rounded-lg bg-surface-container text-outline hover:text-on-surface flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right font-mono text-xs font-semibold text-on-surface">
                    ${((denominations[denom] || 0) * denom).toLocaleString('es-MX')}
                  </div>
                </div>
              ))}

              {/* Coins input */}
              <div className="flex items-center justify-between bg-surface-container-lowest px-3 py-2.5 rounded-xl border border-surface-variant/20">
                <div className="flex items-center gap-2 w-28">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface">
                    Monedas
                  </span>
                  <span className="text-xs text-outline">Fracc.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-outline">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={coinsAmount}
                    onChange={(e) => setCoinsAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-24 text-right text-sm font-bold font-mono bg-transparent border border-surface-variant/40 rounded-lg py-1 px-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="w-24 text-right font-mono text-xs font-semibold text-on-surface">
                  ${coinsAmount.toLocaleString('es-MX')}
                </div>
              </div>
            </div>

            {/* Total counted display */}
            <div className="mt-5 p-4 rounded-xl bg-surface-container border border-surface-variant/40 space-y-2">
              <div className="flex justify-between text-xs text-outline">
                <span>Total Físico en Gaveta</span>
                <span className="font-mono font-bold text-on-surface">${countedCash.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between text-xs text-outline">
                <span>Fondo Fijo que permanece</span>
                <span className="font-mono text-on-surface">-${reserveFloat.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-surface-variant/40 text-on-surface">
                <span>Efectivo Declarado a Enviar</span>
                <span className="font-mono text-primary text-base">${netCashDeposit.toLocaleString('es-MX')}</span>
              </div>
            </div>

            {/* Difference callout */}
            <div className={`mt-4 p-3 rounded-xl border text-xs flex items-center justify-between ${
              cashDifference === 0
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800'
                : cashDifference > 0
                ? 'bg-sky-500/10 border-sky-500/20 text-sky-800'
                : 'bg-terracotta/10 border-terracotta/20 text-terracotta'
            }`}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">
                  {cashDifference === 0 ? 'verified' : cashDifference > 0 ? 'info' : 'warning'}
                </span>
                <span>
                  {cashDifference === 0
                    ? 'Efectivo completamente cuadrado con el sistema'
                    : cashDifference > 0
                    ? `Diferencia a favor (Sobrante): +$${cashDifference.toFixed(2)}`
                    : `Diferencia en contra (Faltante): -$${Math.abs(cashDifference).toFixed(2)}`}
                </span>
              </div>
              <span className="font-bold font-mono">
                {cashDifference === 0 ? 'OK' : `$${cashDifference.toFixed(2)}`}
              </span>
            </div>

            {/* Close Shift Primary Action Button */}
            <div className="mt-6">
              <button
                onClick={() => {
                  setIsFinalized(true);
                  onFinishCorte();
                  onNavigateScreen('notificacion');
                }}
                className="w-full py-4 bg-primary text-on-primary rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">lock_clock</span>
                Cerrar Turno &amp; Enviar Corte Z al Propietario
              </button>
              <p className="text-[11px] text-center text-outline mt-2">
                Al confirmar, se sellará la bitácora contable y se enviará la alerta instantánea por WhatsApp y correo.
              </p>
            </div>
          </div>

          {/* Quick Staff Commission Preview */}
          <div className="bg-surface-container-low rounded-2xl border border-surface-variant/30 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-outline uppercase tracking-wider">
                Comisiones del Turno (Cálculo Automático)
              </span>
              <span className="text-[11px] text-primary font-medium">Boutique 10% + Servicios 15%</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-on-surface font-medium">Elena Morales (Terapeuta Líder)</span>
                <span className="font-mono text-on-surface font-semibold">$1,280.00</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-on-surface font-medium">Camila V. (Masoterapeuta)</span>
                <span className="font-mono text-on-surface font-semibold">$890.00</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-on-surface font-medium">Sofía Alarcón (Recepción)</span>
                <span className="font-mono text-on-surface font-semibold">$450.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
