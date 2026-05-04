import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EVENTS = [
  {
    title: "Bodas Inolvidables",
    description: "Diseñamos la atmósfera de tu boda con elegancia y personalización total. Ramos, ceremonias y banquetes con un sello distintivo.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    tags: ["Ceremonia", "Ramos", "Decoración"]
  },
  {
    title: "Eventos Corporativos",
    description: "Eleva la imagen de tu empresa con detalles florales sofisticados para oficinas, galas y presentaciones.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200",
    tags: ["Oficina", "Galas", "Aperturas"]
  },
  {
    title: "Celebraciones Íntimas",
    description: "Cumpleaños, bautizos o cenas especiales. Aportamos el toque natural que hace cada momento más acogedor.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=1200",
    tags: ["Cenas", "Cumpleaños", "Bautizos"]
  }
];

const Events = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-6">
        <header className="mb-32 text-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-6xl md:text-8xl font-display font-bold text-secondary mb-12 tracking-tight"
          >
            Tus Momentos, <br />
            Nuestra <span className="text-primary italic font-light">Esencia</span>.
          </motion.h1>
          <div className="h-px w-24 bg-primary mx-auto mb-12"></div>
        </header>

        <div className="space-y-48">
          {EVENTS.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-20`}
            >
              <div className="flex-1 w-full relative">
                <div className="absolute -inset-4 bg-pastel-mint rounded-[3rem] -z-10 rotate-2"></div>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full aspect-[4/3] object-cover rounded-[2.5rem] shadow-2xl"
                />
              </div>
              <div className="flex-1 space-y-8">
                <div className="flex gap-3">
                  {event.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold uppercase tracking-widest text-primary border border-primary-light px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary">{event.title}</h2>
                <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
                  {event.description}
                </p>
                <button className="flex items-center gap-4 text-secondary font-bold group hover:gap-6 transition-all duration-300">
                  Solicitar información <ArrowRight className="text-primary" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
