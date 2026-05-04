import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-6xl font-display font-bold text-secondary mb-8">Hablemos de <br /><span className="text-primary italic font-light">Flores</span>.</h1>
            <p className="text-xl text-gray-500 mb-16 max-w-md leading-relaxed">
              Estamos aquí para ayudarte a elegir el regalo perfecto o diseñar la decoración de tu próximo gran evento.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-pastel-mint rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Visítanos</h4>
                  <p className="text-gray-500">Calle de las Flores, 123<br />28001 Madrid, España</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-pastel-mint rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Llámanos</h4>
                  <p className="text-gray-500">+34 912 345 678<br />Atención personalizada</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-pastel-mint rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Email</h4>
                  <p className="text-gray-500">hola@floristeriarafael.com<br />Respuesta en menos de 24h</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-50"
          >
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Nombre</label>
                  <input type="text" placeholder="Ej. Ana García" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-light transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email</label>
                  <input type="email" placeholder="ana@ejemplo.com" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-light transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Mensaje</label>
                <textarea rows={5} placeholder="Cuéntanos qué necesitas..." className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-light transition-all resize-none" />
              </div>
              <button className="w-full bg-secondary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all group">
                Enviar mensaje <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
