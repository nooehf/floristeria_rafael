import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado (simulado)');
  };

  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacta con Nosotros</h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Ya sea para un pedido especial, una duda o un evento, 
            no dudes en escribirnos. Te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-fuchsia-50">
              <h2 className="text-2xl font-bold mb-8">Información de contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Nuestra Tienda</h4>
                    <p className="text-text-muted">Calle de las Flores, 123, 28001 Madrid</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Teléfono</h4>
                    <p className="text-text-muted">+34 912 345 678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p className="text-text-muted">hola@floristeriarafael.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-bold mb-4">Síguenos</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-fuchsia-600 hover:bg-fuchsia-50 rounded-full flex items-center justify-center transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-fuchsia-600 hover:bg-fuchsia-50 rounded-full flex items-center justify-center transition-all">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-fuchsia-600 hover:bg-fuchsia-50 rounded-full flex items-center justify-center transition-all">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 bg-gray-200 rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center bg-fuchsia-50">
                <p className="text-fuchsia-400 font-medium">Mapa Interactivo próximamente</p>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-fuchsia-50"
          >
            <h2 className="text-2xl font-bold mb-8">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 ml-1">Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">Asunto</label>
                <input 
                  type="text" 
                  placeholder="¿En qué podemos ayudarte?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">Mensaje</label>
                <textarea 
                  rows={4} 
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all resize-none"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full py-4 flex gap-2">
                <Send size={18} /> Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
