import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';

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
                  <a 
                    href="https://maps.app.goo.gl/u7himKY8LL25s3VZ7" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-primary transition-colors block"
                  >
                    C. Ventura de la Vega, 1<br />41005 Sevilla, España
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-pastel-mint rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Teléfono</h4>
                  <p className="text-gray-500">+34 954 63 86 60<br />Tiene Whatsapp</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-pastel-mint rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Horario</h4>
                  <p className="text-gray-500">
                    Lunes - Viernes: 10:00 - 14:00 y 17:00 - 20:00<br />
                    Sábados: 10:00 - 14:00<br />
                    Domingos: Cerrado
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full aspect-square lg:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 relative group"
          >
            <iframe
              title="Ubicación Floristería Rafael"
              src="https://maps.google.com/maps?q=Florister%C3%ADa%20Rafael,%20Calle%20Ventura%20de%20la%20Vega%201,%2041005%20Sevilla&t=&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-none"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
