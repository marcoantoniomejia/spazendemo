import React, { useState } from 'react';
import { BoutiqueProduct, CartItem, Client, ScreenType } from '../types';

interface POSScreenProps {
  client?: Client;
  boutiqueProducts: BoutiqueProduct[];
  onNavigateScreen: (screen: ScreenType) => void;
  onPaymentSuccess?: () => void;
}

export const POSScreen: React.FC<POSScreenProps> = ({
  client,
  boutiqueProducts,
  onNavigateScreen,
  onPaymentSuccess,
}) => {
  const activeClientName = client?.name || 'Rodrigo Mendizábal';
  const activeClientPhone = client?.phone || '+52 55 4192 8831';
  const activeClientMembership = client?.membership || 'Serenity Silver';

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'item-srv-1',
      type: 'service',
      name: 'Masaje Descontracturante (60m)',
      subtitle: 'Terapeuta: Mateo Valdés',
      price: 1350.0,
      quantity: 1,
      tag: 'Servicio Cabina',
    },
    {
      id: 'item-prod-1',
      type: 'product',
      name: 'Aceite Árnica & Enebro 120ml',
      subtitle: 'Recomendado por Mateo',
      price: 480.0,
      quantity: 1,
      tag: 'Boutique Retail',
    },
    {
      id: 'item-prod-2',
      type: 'product',
      name: 'Bruma Lavanda & Azahar 250ml',
      subtitle: 'Uso diario noche',
      price: 390.0,
      quantity: 1,
      tag: 'Boutique Retail',
    },
  ]);

  const [activeCategory, setActiveCategory] = useState('Todos (24)');
  const [selectedTip, setSelectedTip] = useState<'10' | '15' | '20' | 'libre'>('15');
  const [customTip, setCustomTip] = useState(200.0);
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'tarjeta' | 'spei'>('efectivo');
  const [cashReceived, setCashReceived] = useState(3000.0);
  const [sendWhatsApp, setSendWhatsApp] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCheckoutFinishedModalOpen, setIsCheckoutFinishedModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: BoutiqueProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id: `item-${Date.now()}`,
            type: 'product',
            name: product.name,
            subtitle: product.description,
            price: product.price,
            quantity: 1,
            tag: 'Boutique Retail',
          },
        ];
      }
    });
    showToast(`✓ "${product.name}" agregado al ticket.`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const serviceSubtotal = cartItems
    .filter((i) => i.type === 'service')
    .reduce((sum, i) => sum + i.price * i.quantity, 0);

  const rawBoutiqueSubtotal = cartItems
    .filter((i) => i.type === 'product')
    .reduce((sum, i) => sum + i.price * i.quantity, 0);

  // 10% discount on boutique for Serenity Membership
  const boutiqueDiscount = rawBoutiqueSubtotal * 0.1;
  const boutiqueSubtotalAfterDiscount = rawBoutiqueSubtotal - boutiqueDiscount;

  const iva = (serviceSubtotal + boutiqueSubtotalAfterDiscount) * 0.16;

  let tipAmount = 0;
  if (selectedTip === '10') tipAmount = serviceSubtotal * 0.1;
  else if (selectedTip === '15') tipAmount = serviceSubtotal * 0.15;
  else if (selectedTip === '20') tipAmount = serviceSubtotal * 0.2;
  else tipAmount = customTip;

  const grandTotal = serviceSubtotal + boutiqueSubtotalAfterDiscount + iva + tipAmount;
  const changeDue = Math.max(0, cashReceived - grandTotal);

  const handleFinishCheckout = () => {
    setIsCheckoutFinishedModalOpen(true);
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-primary text-on-primary px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Workspace Bar */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-xs border border-primary-container/10 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-[10px] uppercase font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Módulo de Recepción &amp; Caja
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="text-xs font-bold text-secondary">Cobro Rápido &amp; Boutique</span>
          </div>
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
              Punto de Venta &amp; Cobro de Sesión
            </h1>
            <span className="text-xs text-outline hidden sm:inline">
              Terminal #02 • Sucursal Polanco
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant font-medium">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low shadow-xs">
            <span className="material-symbols-outlined text-sm text-primary">spa</span>
            <span>Cabina 2 (Piedra Zen)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low shadow-xs">
            <span className="material-symbols-outlined text-sm text-secondary">person_check</span>
            <span>Cliente: <strong>{activeClientName}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low shadow-xs">
            <span className="material-symbols-outlined text-sm text-outline">point_of_sale</span>
            <span>Cajera: <strong>Sofía R.</strong></span>
          </div>
        </div>
      </div>

      {/* 2-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SECTION (60%): Client Intake + Boutique */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Active Patient Card */}
          <div className="w-full bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-xs border border-primary-container/10 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIjntc22GmWxQ5EvlYD_AdxzXCaNSP42C_n3ChX5f_mjdpyXO0Vh9tTknVUTMDJ1itp9uAXyPYrCF2uxcW7pyWGupN8-NGPn8F_g3a0GclRvw5-QnfxOA8CuTywDPugRVup1gVgUhg9-6eed78GGIjm7E-GYZoYJx7qO7HrvyhajYuYCMyTxPaFTiPZ8ksbF8xUFCDgL6UDwLyKMKLB1-tv4av6ByXvkTai_LmvfaRfxUE2CMrm1njeQ"
                    alt={activeClientName}
                    className="w-14 h-14 rounded-full object-cover shadow-xs ring-2 ring-primary-fixed"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs">
                    <span className="material-symbols-outlined text-xs">verified</span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-on-surface">
                      {activeClientName}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-wider">
                      {activeClientMembership}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-on-surface-variant text-xs mt-0.5">
                    <span>Tel: {activeClientPhone}</span>
                    <span>•</span>
                    <span>4ª Visita del mes</span>
                    <span>•</span>
                    <span className="text-primary font-bold">Saldo a favor: $0.00</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => showToast('Lista de clientes cargada')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface text-xs font-semibold self-start"
              >
                <span className="material-symbols-outlined text-sm">switch_account</span>
                <span>Cambiar cliente</span>
              </button>
            </div>

            {/* Completed Service Summary Ribbon */}
            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-xl">self_improvement</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface">
                      Masaje Descontracturante Espalda &amp; Cuello
                    </span>
                    <span className="text-outline text-[11px]">60 min</span>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    Terapeuta: <strong>Mateo Valdés</strong> • Finalizó hace 8 min en Cabina 2
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold self-start sm:self-center">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Tratamiento Concluido
              </span>
            </div>

            {/* Care Recommendation / Upsell */}
            <div className="p-3.5 rounded-xl bg-secondary-container/40 flex items-start gap-3 border border-secondary/20">
              <span className="material-symbols-outlined text-secondary text-lg mt-0.5">
                medical_services
              </span>
              <div className="flex-1 flex flex-col gap-0.5 text-xs">
                <span className="text-[10px] uppercase font-bold text-secondary">
                  Recomendación Terapéutica Post-Sesión
                </span>
                <p className="text-on-surface">
                  Terapeuta Mateo recomendó el <strong>Aceite Vehicular de Árnica &amp; Enebro</strong>{' '}
                  para prolongar el alivio muscular y desinflamar la zona en casa.
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(boutiqueProducts[0])}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold hover:bg-secondary/90 transition-colors shadow-xs"
              >
                Sugerir al Ticket
              </button>
            </div>
          </div>

          {/* Boutique Retail Catalogue */}
          <div className="w-full bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-xs border border-primary-container/10 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-xl">shopping_bag</span>
                  <h3 className="text-base font-bold text-on-surface">Boutique &amp; Cuidado en Casa</h3>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Prescripciones holísticas y cosmética botánica para llevar
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-base">
                  barcode_scanner
                </span>
                <input
                  type="text"
                  placeholder="Escanear SKU o código..."
                  className="w-full h-9 pl-9 pr-8 bg-surface rounded-xl text-xs text-on-surface border border-primary-container/20 focus:outline-none"
                />
                <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-outline px-1.5 py-0.5 rounded bg-surface-container font-mono">
                  F4
                </kbd>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {[
                'Todos (24)',
                'Aceites & Aromaterapia',
                'Cremas & Emulsiones',
                'Sueros & Mascarillas',
                'Kits de Bienestar',
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
              {boutiqueProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 rounded-2xl bg-surface hover:bg-surface-container-low transition-all border border-primary-container/10 flex flex-col justify-between gap-2.5"
                >
                  <div className="relative w-full h-32 rounded-xl overflow-hidden bg-surface-container">
                    {prod.image ? (
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-3xl">spa</span>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs text-secondary text-[10px] font-bold">
                      {prod.badge}
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold">
                      {prod.stock} en stock
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-on-surface line-clamp-1">{prod.name}</h4>
                    <p className="text-[11px] text-on-surface-variant line-clamp-1">
                      {prod.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-bold text-primary">
                      ${prod.price} <span className="text-[10px] font-normal text-outline">MXN</span>
                    </span>
                    <button
                      onClick={() => handleAddToCart(prod)}
                      className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary text-xs font-bold hover:bg-primary transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (40%): Digital Checkout Terminal */}
        <aside className="lg:col-span-5 flex flex-col gap-4 sticky top-24">
          <div className="w-full bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-md border border-primary-container/10 flex flex-col gap-4">
            {/* Ticket Header */}
            <div className="flex items-center justify-between pb-3 bg-surface-container-low/60 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 p-5 sm:p-6 rounded-t-2xl border-b border-primary-container/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-on-surface">Detalle de Cuenta</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant">
                    #TKT-8492
                  </span>
                </div>
                <span className="text-[11px] text-outline mt-0.5 block">
                  Jueves 24 Oct • 12:15 PM
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-secondary" /> En Cobro
              </span>
            </div>

            {/* Cart Items */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-outline block">
                Servicios &amp; Artículos Seleccionados
              </span>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2 relative border-l-4 border-primary"
                >
                  <div className="flex items-start justify-between gap-2 pl-1">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-primary block">
                        {item.tag}
                      </span>
                      <h5 className="text-xs font-bold text-on-surface">{item.name}</h5>
                      <span className="text-[11px] text-on-surface-variant">{item.subtitle}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-on-surface">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="block text-[10px] text-outline">MXN</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pl-1 pt-1 border-t border-surface-container">
                    <div className="inline-flex items-center bg-surface-container-lowest rounded-lg p-0.5 shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-on-surface hover:bg-surface-container"
                      >
                        <span className="material-symbols-outlined text-xs">remove</span>
                      </button>
                      <span className="px-2 text-xs font-bold text-on-surface">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-on-surface hover:bg-surface-container"
                      >
                        <span className="material-symbols-outlined text-xs">add</span>
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-outline hover:text-error text-xs"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-base">delete_outline</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Loyalty Discount */}
            <div className="p-3 rounded-xl bg-secondary-container/30 flex items-center justify-between text-xs border border-secondary/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">loyalty</span>
                <div>
                  <span className="font-bold text-on-surface block">Descuento Membresía Serenity</span>
                  <span className="text-[10px] text-on-secondary-container">-10% en Boutique</span>
                </div>
              </div>
              <span className="font-bold text-secondary">-${boutiqueDiscount.toFixed(2)} MXN</span>
            </div>

            {/* Tip Selector */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-sm">
                    volunteer_activism
                  </span>
                  Propina para Mateo Valdés:
                </span>
                <span className="text-[10px] uppercase font-bold text-outline">Opcional</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {(['10', '15', '20', 'libre'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTip(t)}
                    className={`py-1.5 rounded-lg text-center transition-all ${
                      selectedTip === t
                        ? 'bg-primary text-on-primary font-bold shadow-xs'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="block font-bold">
                      {t === 'libre' ? 'Libre' : `+${t}%`}
                    </span>
                    <span className="block text-[10px] opacity-80">
                      ${t === '10' ? (serviceSubtotal * 0.1).toFixed(0) : t === '15' ? (serviceSubtotal * 0.15).toFixed(0) : t === '20' ? (serviceSubtotal * 0.2).toFixed(0) : customTip.toFixed(0)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Breakdown Subtotals */}
            <div className="space-y-1.5 text-xs text-on-surface-variant pt-2 border-t border-surface-container">
              <div className="flex justify-between">
                <span>Subtotal Servicios de Cabina</span>
                <span>${serviceSubtotal.toFixed(2)} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal Boutique (Con dto.)</span>
                <span>${boutiqueSubtotalAfterDiscount.toFixed(2)} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>IVA Trasladado (16%)</span>
                <span>${iva.toFixed(2)} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>Propina sugerida terapeuta</span>
                <span>${tipAmount.toFixed(2)} MXN</span>
              </div>

              {/* Grand Total */}
              <div className="p-3.5 rounded-xl bg-primary text-on-primary flex items-center justify-between shadow-xs mt-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-primary-fixed tracking-wider block">
                    Gran Total a Pagar
                  </span>
                  <span className="text-[11px] text-primary-fixed/80">Incluye impuestos &amp; propina</span>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight block">
                    ${grandTotal.toFixed(2)}
                  </span>
                  <span className="text-[10px] uppercase text-primary-fixed tracking-wider">
                    Pesos Mexicanos (MXN)
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-on-surface block">Método de Pago</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('efectivo')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all cursor-pointer ${
                    paymentMethod === 'efectivo'
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl mb-0.5">payments</span>
                  <span className="text-xs">Efectivo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('tarjeta')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all cursor-pointer ${
                    paymentMethod === 'tarjeta'
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl mb-0.5">credit_card</span>
                  <span className="text-xs">Tarjeta (Clip)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('spei')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all cursor-pointer ${
                    paymentMethod === 'spei'
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl mb-0.5">account_balance</span>
                  <span className="text-xs">SPEI Transfer</span>
                </button>
              </div>

              {/* Cash Drawer Calculator (Active when Efectivo) */}
              {paymentMethod === 'efectivo' && (
                <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2.5 border border-primary-container/10">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="cash-in" className="font-bold text-on-surface">
                      Monto recibido del cliente:
                    </label>
                    <span className="text-[10px] text-outline font-mono">F2</span>
                  </div>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface font-bold text-sm">
                      $
                    </span>
                    <input
                      id="cash-in"
                      type="number"
                      value={cashReceived}
                      onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                      className="w-full h-10 pl-7 pr-12 bg-surface-container-lowest rounded-xl text-base font-bold text-on-surface border border-primary-container/20 focus:outline-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-outline">
                      MXN
                    </span>
                  </div>

                  {/* Quick preset buttons */}
                  <div className="flex items-center gap-1.5 text-xs">
                    {[2700, 3000, 4000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setCashReceived(preset)}
                        className={`flex-1 py-1 rounded-lg text-center font-bold ${
                          cashReceived === preset
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        ${preset.toLocaleString()}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCashReceived(Math.ceil(grandTotal))}
                      className="flex-1 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-bold"
                    >
                      Exacto
                    </button>
                  </div>

                  {/* Change output banner */}
                  <div className="p-2.5 rounded-xl bg-primary-fixed flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
                      <span className="material-symbols-outlined text-base">currency_exchange</span>
                      <span>Cambio a entregar:</span>
                    </div>
                    <span className="text-base font-bold text-primary">
                      ${changeDue.toFixed(2)} <span className="text-xs font-normal">MXN</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Receipt Delivery Checkbox */}
            <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl hover:bg-surface-container-low transition-colors">
              <input
                type="checkbox"
                checked={sendWhatsApp}
                onChange={(e) => setSendWhatsApp(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
              />
              <span className="text-xs text-on-surface">
                Enviar ticket digital y cuidados por WhatsApp al <strong>{activeClientPhone}</strong>
              </span>
            </label>

            {/* Checkout Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => showToast('🖨️ Imprimiendo ticket térmico fiscal #TKT-8492...')}
                className="px-3 h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-semibold flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">print</span>
                <span className="hidden sm:inline">Ticket</span>
              </button>

              <button
                type="button"
                onClick={handleFinishCheckout}
                className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Finalizar Cobro (${grandTotal.toFixed(2)} MXN)</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Checkout Finished Modal */}
      {isCheckoutFinishedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-primary-container/10 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-primary-fixed text-primary flex items-center justify-center mx-auto shadow-xs">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-on-surface">¡Cobro Registrado Exitosamente!</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Ticket #TKT-8492 emitido por un total de <strong>${grandTotal.toFixed(2)} MXN</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span>Método empleado:</span>
                <strong className="capitalize">{paymentMethod}</strong>
              </div>
              <div className="flex justify-between">
                <span>Cambio devuelto:</span>
                <strong className="text-primary">${changeDue.toFixed(2)} MXN</strong>
              </div>
              <div className="flex justify-between">
                <span>Propina a Mateo Valdés:</span>
                <strong className="text-secondary">${tipAmount.toFixed(2)} MXN</strong>
              </div>
              {sendWhatsApp && (
                <div className="flex items-center gap-1.5 text-primary font-bold pt-1 border-t border-surface-container">
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>Recibo enviado a WhatsApp ({activeClientPhone})</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCheckoutFinishedModalOpen(false);
                  onNavigateScreen('corte_z');
                }}
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors"
              >
                Ir a Corte Z de Caja
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCheckoutFinishedModalOpen(false);
                  onNavigateScreen('agenda');
                }}
                className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors"
              >
                Volver a la Agenda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
