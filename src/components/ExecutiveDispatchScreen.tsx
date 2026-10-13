import React, { useState } from 'react';
import { ShiftClosureData, ScreenType } from '../types';

interface ExecutiveDispatchScreenProps {
  closureData: ShiftClosureData;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const ExecutiveDispatchScreen: React.FC<ExecutiveDispatchScreenProps> = ({
  closureData,
  onNavigateScreen,
}) => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email'>('whatsapp');
  const [isCopied, setIsCopied] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<'sent' | 'delivered' | 'read'>('read');

  const currentDateStr = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const currentTimeStr = '20:18';

  const copyWhatsAppText = () => {
    const rawText = `🌿 *CORTE Z DIARIO - AURA SPA & WELLNESS*
📍 *Sucursal:* Polanco • Turno Vespertino
📅 *Fecha:* ${currentDateStr} • ${currentTimeStr} hrs
👤 *Cierre realizado por:* ${closureData.responsibleReceptionist}

━━━━━━━━━━━━━━━━━━━━━
📊 *MÉTRICAS CLAVE DEL DÍA:*
• 💰 *Ventas Totales Brutas:* $${closureData.totalSales.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
• 💆‍♀️ *Servicios en Cabina:* $${closureData.serviceSales.toLocaleString('es-MX', { minimumFractionDigits: 2 })} (18 citas)
• 🛍️ *Boutique & Retail:* $${closureData.retailSales.toLocaleString('es-MX', { minimumFractionDigits: 2 })} (+22% cross-sell)
• 🤝 *Propinas Recolectadas:* $${closureData.tipsTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}

━━━━━━━━━━━━━━━━━━━━━
⚖️ *CONCILIACIÓN POR CANALES:*
• 💳 *Terminales Bancarias (TPV):* $${closureData.systemExpected.card.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ✅ (100% Cuadrado)
• 📲 *Transferencias SPEI:* $${closureData.systemExpected.spei.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ✅ (3 validadas)
• 💵 *Efectivo en Sobre (Líquido):* $${closureData.systemExpected.cash.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ✅ (Cuadre perfecto)
• 🔒 *Fondo Fijo en Caja:* $${closureData.startingFloat.toLocaleString('es-MX', { minimumFractionDigits: 2 })} (Resguardado)

━━━━━━━━━━━━━━━━━━━━━
📋 *ESTATUS CLÍNICO & COMPLIANCE:*
• Expedientes nuevos (Intake): 4 completados y firmados digitalmente
• Incidentes médicos/alergias: 0 (Protocolo de advertencia respetado)
• Ocupación de Cabinas: 94.2%

📝 *Notas de Recepción:*
"Cierre sin anomalías. Se atendieron 18 pacientes, 100% expedientes al día. Fondo de apertura verificado."

🔗 *Ver reporte auditado completo:*
https://polanco.spazenadmin.com/corte-z/20261012-vesp`;

    navigator.clipboard?.writeText(rawText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-surface-variant/40 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-sm">notifications_active</span>
            <span>Módulo de Notificación &amp; Despacho Ejecutivo</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif text-on-surface flex items-center gap-3">
            Alerta Instantánea al Propietario
            <span className="text-xs font-sans px-2.5 py-1 bg-emerald-500/10 text-emerald-800 font-medium rounded-full border border-emerald-500/20 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">done_all</span>
              Despacho Automatizado Activo
            </span>
          </h1>
          <p className="text-sm text-outline mt-1">
            Simulador interactivo del reporte automático enviado al WhatsApp y Correo del socio director tras el sellado de caja.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateScreen('corte_z')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-outline hover:text-on-surface bg-surface-container rounded-lg border border-surface-variant/50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Volver al Arqueo
          </button>
          <button
            onClick={copyWhatsAppText}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg shadow-sm hover:bg-primary-container transition-all"
          >
            <span className="material-symbols-outlined text-base">
              {isCopied ? 'check' : 'content_copy'}
            </span>
            {isCopied ? 'Copiado al Portapapeles' : 'Copiar Texto WhatsApp'}
          </button>
        </div>
      </div>

      {/* Tabs Switcher: WhatsApp Preview vs Executive HTML Email */}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'whatsapp'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-surface-container text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">chat</span>
          WhatsApp Mensaje Inmediato (Smartphone)
        </button>
        <button
          onClick={() => setActiveTab('email')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'email'
              ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
              : 'bg-surface-container text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">mail</span>
          Reporte Ejecutivo por Correo (HTML/PDF)
        </button>
      </div>

      {/* Tab 1: WhatsApp Smartphone Simulator */}
      {activeTab === 'whatsapp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Smartphone Frame (Col 6) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[400px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700/80 relative">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>

              {/* Phone Screen Container */}
              <div className="w-full bg-[#0b141a] rounded-[36px] overflow-hidden flex flex-col h-[740px] text-slate-100 font-sans">
                {/* Status Bar */}
                <div className="pt-2 px-6 pb-2 flex justify-between items-center text-[11px] text-slate-300 font-medium">
                  <span>20:18</span>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="material-symbols-outlined text-sm">signal_cellular_alt</span>
                    <span className="material-symbols-outlined text-sm">wifi</span>
                    <span className="material-symbols-outlined text-sm">battery_full</span>
                  </div>
                </div>

                {/* WhatsApp Chat Header */}
                <div className="bg-[#1f2c34] px-4 py-2.5 flex items-center justify-between border-b border-slate-700/40">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-300 text-lg">arrow_back</span>
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-serif text-sm border border-emerald-400/30">
                        🌿
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#1f2c34]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-1.5 leading-tight">
                        Aura Spa Zen Bot
                        <span className="material-symbols-outlined text-emerald-400 text-xs" title="Cuenta Oficial Verificada">
                          verified
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">En línea • Bot Oficial Sucursal Polanco</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <span className="material-symbols-outlined text-lg">videocam</span>
                    <span className="material-symbols-outlined text-lg">call</span>
                    <span className="material-symbols-outlined text-lg">more_vert</span>
                  </div>
                </div>

                {/* Chat Messages Body with WhatsApp Wallpaper */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b141a] text-xs"
                  style={{
                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                  }}
                >
                  {/* Timestamp Bubble */}
                  <div className="flex justify-center my-2">
                    <span className="bg-[#182229] text-[10px] text-slate-400 px-2.5 py-1 rounded-lg uppercase tracking-wide">
                      HOY
                    </span>
                  </div>

                  {/* System message bubble */}
                  <div className="flex justify-center mb-2">
                    <div className="bg-[#182229]/80 text-[10px] text-amber-200/80 px-3 py-1 rounded-lg text-center max-w-[280px]">
                      🔒 Los mensajes están cifrados de extremo a extremo. Aura Spa Zen Admin v2.5.
                    </div>
                  </div>

                  {/* WhatsApp Message Card */}
                  <div className="bg-[#005c4b] text-slate-100 rounded-2xl rounded-tl-sm p-3.5 shadow-md max-w-[92%] ml-auto border border-emerald-500/20">
                    {/* Header Inside Card */}
                    <div className="flex items-center gap-1.5 font-bold text-[13px] text-emerald-200 pb-1.5 border-b border-emerald-700/60 mb-2">
                      <span>🌿</span>
                      <span>CORTE Z DIARIO - AURA SPA POLANCO</span>
                    </div>

                    <div className="text-[11px] text-emerald-100 space-y-1 mb-2.5">
                      <div>📍 <strong>Sucursal:</strong> Polanco • Turno Vespertino</div>
                      <div>📅 <strong>Fecha:</strong> {currentDateStr}</div>
                      <div>👤 <strong>Cierre por:</strong> {closureData.responsibleReceptionist}</div>
                    </div>

                    {/* Financial summary block */}
                    <div className="bg-[#025142] p-2.5 rounded-xl border border-emerald-600/40 mb-2.5 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                        📊 MÉTRICAS FINANCIERAS
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span>Total Bruto Facturado:</span>
                        <span className="font-mono text-emerald-200 text-sm">
                          ${closureData.totalSales.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-200">
                        <span>• Servicios Cabina (18):</span>
                        <span className="font-mono">${closureData.serviceSales.toLocaleString('es-MX')}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-200">
                        <span>• Boutique Retail (+22%):</span>
                        <span className="font-mono">${closureData.retailSales.toLocaleString('es-MX')}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-amber-200">
                        <span>• Propinas recolectadas:</span>
                        <span className="font-mono">${closureData.tipsTotal.toLocaleString('es-MX')}</span>
                      </div>
                    </div>

                    {/* Tripartite Breakdown block */}
                    <div className="bg-[#025142] p-2.5 rounded-xl border border-emerald-600/40 mb-2.5 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                        ⚖️ CONCILIACIÓN POR CANALES
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-200">
                        <span>💳 Terminal TPV (12 vchs):</span>
                        <span className="font-mono">${closureData.systemExpected.card.toLocaleString('es-MX')} ✅</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-200">
                        <span>📲 SPEI / Transferencias (3):</span>
                        <span className="font-mono">${closureData.systemExpected.spei.toLocaleString('es-MX')} ✅</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-200 font-semibold text-emerald-200">
                        <span>💵 Efectivo en Sobre (Líquido):</span>
                        <span className="font-mono">${closureData.systemExpected.cash.toLocaleString('es-MX')} ✅</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-300 pt-1 border-t border-emerald-700/60">
                        <span>🔒 Fondo Fijo en Gaveta:</span>
                        <span className="font-mono">${closureData.startingFloat.toLocaleString('es-MX')}</span>
                      </div>
                    </div>

                    {/* Operational Highlights */}
                    <div className="text-[10px] text-emerald-100/90 space-y-1 mb-2">
                      <div>📋 <strong>Expedientes Nuevos:</strong> 4 firmados en tablet (100%)</div>
                      <div>🛡️ <strong>Incidentes Médicos:</strong> 0 reportados (Alergias verificadas)</div>
                      <div>🏷️ <strong>Ocupación:</strong> 94.2% (18/19 turnos)</div>
                    </div>

                    {/* Link button preview inside WhatsApp */}
                    <a
                      href="#ver-reporte"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('email');
                      }}
                      className="block text-center py-1.5 px-3 bg-[#0a382e] hover:bg-[#0e483b] rounded-lg text-emerald-300 text-[11px] font-semibold border border-emerald-600/50 transition-colors"
                    >
                      📄 Abrir Informe Completo Auditado (PDF)
                    </a>

                    {/* Message timestamp and blue ticks */}
                    <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-200/70 mt-2">
                      <span>20:18</span>
                      <span className="material-symbols-outlined text-[13px] text-sky-400">done_all</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Input Bar */}
                <div className="bg-[#1f2c34] px-3 py-2 flex items-center gap-2 border-t border-slate-700/30">
                  <span className="material-symbols-outlined text-slate-400 text-lg">mood</span>
                  <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1.5 text-xs text-slate-400">
                    Mensaje...
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-lg">mic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right explanation column (Col 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-surface-container-low rounded-2xl border border-surface-variant/30 p-6">
              <h2 className="text-lg font-serif text-on-surface mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">security</span>
                Beneficios de la Notificación al Dueño en Tiempo Real
              </h2>
              <p className="text-xs text-outline leading-relaxed mb-4">
                El dueño o inversionista recibe el reporte contable exacto sin tener que llamar a recepción ni esperar al día siguiente. 
                Los datos se encriptan y se envían de forma fidedigna directamente de la base contable.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-variant/20">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-lg">alarm_on</span>
                  </div>
                  <div className="text-xs font-bold text-on-surface">Cero Espera</div>
                  <div className="text-[11px] text-outline mt-0.5">
                    El mensaje se dispara a los 3 segundos de hacer clic en "Cerrar Turno".
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-variant/20">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-lg">verified_user</span>
                  </div>
                  <div className="text-xs font-bold text-on-surface">Auditoría Ciega</div>
                  <div className="text-[11px] text-outline mt-0.5">
                    Recepción no puede alterar los números del sistema sin dejar huella de auditoría.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-variant/20">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-700 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-lg">pie_chart</span>
                  </div>
                  <div className="text-xs font-bold text-on-surface">Visibilidad Multisede</div>
                  <div className="text-[11px] text-outline mt-0.5">
                    Si el spa opera Polanco, Condesa y Roma, el dueño recibe el consolidado unificado.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-variant/20">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-lg">clinical_notes</span>
                  </div>
                  <div className="text-xs font-bold text-on-surface">Blindaje Legal</div>
                  <div className="text-[11px] text-outline mt-0.5">
                    Confirma que el 100% de los pacientes nuevos firmaron su consentimiento médico.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-surface-container-low rounded-2xl border border-surface-variant/30 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider">
                Parámetros de Configuración del Despacho
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-surface-variant/20">
                  <div>
                    <div className="font-semibold text-on-surface">WhatsApp del Propietario</div>
                    <div className="text-[11px] text-outline">+52 55 4192 8840 (Directo Socio Fundador)</div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-800 rounded font-semibold text-[10px]">
                    Activo
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-surface-variant/20">
                  <div>
                    <div className="font-semibold text-on-surface">Copia a Dirección Financiera</div>
                    <div className="text-[11px] text-outline">finanzas@auraspa.mx • PDF Adjunto</div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-800 rounded font-semibold text-[10px]">
                    Activo
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateScreen('agenda')}
                  className="w-full py-3 bg-surface-container text-primary font-semibold text-xs rounded-xl hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 border border-surface-variant/50"
                >
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  Volver a la Agenda del Spa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Executive HTML Email Template Preview */}
      {activeTab === 'email' && (
        <div className="mt-6 max-w-4xl mx-auto bg-surface-container-lowest rounded-2xl border border-surface-variant/40 shadow-xl overflow-hidden">
          {/* Email Client Simulated Header */}
          <div className="bg-surface-container px-6 py-4 border-b border-surface-variant/40">
            <div className="flex items-center justify-between text-xs text-outline mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="ml-2 font-mono">Bandeja de Entrada • Correo Ejecutivo</span>
              </div>
              <span>Recibido hace 2 minutos</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-outline">
                <strong>De:</strong> Sistema Central &lt;reportes@spazenadmin.com&gt;
              </div>
              <div className="text-xs text-outline">
                <strong>Para:</strong> Dirección General &lt;director@auraspa.mx&gt;
              </div>
              <div className="text-base font-bold text-on-surface">
                🌿 Corte Z Vespertino - Polanco | Total: ${closureData.totalSales.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN [Auditoría Exitosa]
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-8 space-y-6">
            <div className="text-center pb-6 border-b border-surface-variant/30">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
                AURA SPA &amp; WELLNESS • SUCURSAL POLANCO
              </div>
              <h2 className="text-2xl font-serif text-on-surface">
                Reporte de Cierre &amp; Liquidación Contable
              </h2>
              <p className="text-xs text-outline mt-1">
                Fecha de Emisión: {currentDateStr} • 20:18 hrs • ID Reporte: #CRTZ-20261012-09
              </p>
            </div>

            {/* Metric KPI Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 text-center">
                <div className="text-xs text-outline">Ventas Brutas</div>
                <div className="text-xl font-bold font-serif text-on-surface mt-1">
                  ${closureData.totalSales.toLocaleString('es-MX')}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 text-center">
                <div className="text-xs text-outline">Servicios Cabina</div>
                <div className="text-xl font-bold font-serif text-on-surface mt-1">
                  ${closureData.serviceSales.toLocaleString('es-MX')}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 text-center">
                <div className="text-xs text-outline">Boutique &amp; Retail</div>
                <div className="text-xl font-bold font-serif text-emerald-800 mt-1">
                  ${closureData.retailSales.toLocaleString('es-MX')}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 text-center">
                <div className="text-xs text-outline">Efectivo Líquido</div>
                <div className="text-xl font-bold font-serif text-primary mt-1">
                  ${closureData.systemExpected.cash.toLocaleString('es-MX')}
                </div>
              </div>
            </div>

            {/* Reconciliation table in email */}
            <div className="rounded-xl border border-surface-variant/40 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container font-semibold text-outline">
                  <tr>
                    <th className="p-3">Canal de Pago</th>
                    <th className="p-3">Transacciones</th>
                    <th className="p-3 text-right">Monto Declarado</th>
                    <th className="p-3 text-right">Estatus Auditoría</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/30 text-on-surface">
                  <tr>
                    <td className="p-3 font-medium">Terminales Bancarias (TPV 1 &amp; 2)</td>
                    <td className="p-3 text-outline">12 vouchers</td>
                    <td className="p-3 text-right font-mono font-semibold">
                      ${closureData.systemExpected.card.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right text-emerald-700 font-semibold">100% Conciliado</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Transferencias SPEI (Banxico)</td>
                    <td className="p-3 text-outline">3 transferencias</td>
                    <td className="p-3 text-right font-mono font-semibold">
                      ${closureData.systemExpected.spei.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right text-emerald-700 font-semibold">Validado por SPEI</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Efectivo Líquido a Envalijar</td>
                    <td className="p-3 text-outline">En sobre lacrado</td>
                    <td className="p-3 text-right font-mono font-semibold text-primary">
                      ${closureData.systemExpected.cash.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right text-emerald-700 font-semibold">Cuadre Exacto</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Clinical & Staff Commission note */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 text-xs text-outline space-y-2">
              <div className="font-semibold text-on-surface">Notas de Auditoría Clínica &amp; Seguridad:</div>
              <p>
                • 100% de los pacientes de primera vez completaron el intake médico biofílico con firma digital en tablet.<br/>
                • Cero incidentes o reacciones alérgicas reportadas por terapeutas.<br/>
                • Cabinas desinfectadas y preparadas con protocolo de aromaterapia y sanitización de 15 minutos entre sesiones.
              </p>
            </div>

            {/* Email Footer */}
            <div className="pt-4 border-t border-surface-variant/30 flex justify-between items-center text-[11px] text-outline">
              <span>SPA Zen Admin Cloud • Seguridad Bancaria AES-256</span>
              <button
                onClick={() => alert('Descargando archivo ZIP con vouchers y tickets digitales en PDF...')}
                className="text-primary hover:underline font-semibold"
              >
                Descargar Adjunto (PDF Certificado)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
