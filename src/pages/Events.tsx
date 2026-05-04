import { motion } from 'framer-motion';

const EVENTS = [
  {
    title: "Bodas de Ensueño",
    description: "Desde ramos de novia hasta la decoración completa del banquete. Creamos la atmósfera perfecta para tu gran día.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Aniversarios y Romances",
    description: "Expresa lo que sientes con flores. Diseños románticos que hablan por ti en esas fechas tan especiales.",
    image: "https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Eventos Corporativos",
    description: "Aporta elegancia y frescura a tu oficina o evento empresarial con arreglos sofisticados.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Cumpleaños y Celebraciones",
    description: "Color y alegría para celebrar la vida. Arreglos divertidos y personalizados para todas las edades.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=1200",
  }
];

const Events = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Eventos Especiales</h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Hacemos que tus momentos importantes sean visualmente inolvidables. 
            Nos encargamos de toda la decoración floral para que tú solo te preocupes de disfrutar.
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {EVENTS.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
            >
              <div className="flex-1 w-full">
                <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {event.description}
                </p>
                <button className="btn btn-primary">
                  Consultar Disponibilidad
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-fuchsia-100 rounded-[3rem] p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Tienes un evento en mente?</h2>
          <p className="text-lg text-fuchsia-800 mb-8 max-w-xl mx-auto">
            Cuéntanos tu idea y te ayudaremos a darle vida con la mejor selección floral de la ciudad.
          </p>
          <button className="btn btn-primary px-12">
            Contáctanos ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;
