import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'tarjeta' | ''>('');
  const [pickupDay, setPickupDay] = useState('');

  const isFormValid = customerName.trim() !== '' && paymentMethod !== '' && pickupDay !== '';

  const handleWhatsAppCheckout = () => {
    if (!isFormValid) return;

    const paymentText = paymentMethod === 'efectivo' ? 'Efectivo' : 'Tarjeta';
    const itemsList = items.map(item => `- ${item.quantity}x ${item.name} ${item.selectedLabel ? `(${item.selectedLabel})` : ''} - ${(item.selectedPrice !== undefined ? item.selectedPrice * item.quantity : item.price * item.quantity).toFixed(2)}€`).join('\n');
    
    const text = `¡Hola! Me gustaría hacer el siguiente encargo:\n\n*DATOS DEL CLIENTE:*\n- Nombre: ${customerName}\n- Día de recogida: ${pickupDay}\n- Método de pago: ${paymentText}\n\n*PEDIDO:*\n${itemsList}\n\n*Total estimado: ${totalPrice.toFixed(2)}€*`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/34954638660?text=${encodedText}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-secondary" />
                <h2 className="text-xl font-display font-bold text-secondary">Tu Encargo</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Tu cesta está vacía</p>
                  <button onClick={onClose} className="text-primary font-bold hover:underline">
                    Ver catálogo
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl bg-gray-50" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-secondary truncate">{item.name}</h3>
                      {item.selectedLabel && (
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.selectedLabel}</p>
                      )}
                      <p className="text-primary font-bold text-sm">{(item.selectedPrice !== undefined ? item.selectedPrice * item.quantity : item.price * item.quantity).toFixed(2)}€</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedLabel)}
                            className="p-1 hover:bg-gray-50 text-gray-500 rounded-l-lg transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedLabel)}
                            className="p-1 hover:bg-gray-50 text-gray-500 rounded-r-lg transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id, item.selectedLabel)}
                          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50/50 space-y-4">
                <div className="space-y-4 mb-4">
                  <h3 className="font-bold text-secondary text-sm uppercase tracking-widest">Datos del encargo</h3>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Nombre Completo</label>
                    <input 
                      type="text" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Tu nombre y apellidos"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Día de recogida</label>
                      <input 
                        type="date" 
                        value={pickupDay}
                        onChange={(e) => setPickupDay(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Pago en tienda</label>
                      <select 
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as 'efectivo' | 'tarjeta')}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary appearance-none"
                      >
                        <option value="" disabled>Seleccionar...</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="tarjeta">Tarjeta</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-gray-500 font-medium">Total estimado</span>
                  <span className="text-2xl font-bold text-secondary">{totalPrice.toFixed(2)}€</span>
                </div>
                
                <button 
                  onClick={handleWhatsAppCheckout}
                  disabled={!isFormValid}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl ${
                    isFormValid 
                      ? 'bg-[#25D366] text-white hover:bg-[#1EBE5D] hover:scale-[1.02] shadow-[#25D366]/20' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-transparent'
                  }`}
                >
                  <Send size={18} />
                  Enviar encargo por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
