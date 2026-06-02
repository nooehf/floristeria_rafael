import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, Check, Send, Flower2 } from 'lucide-react';

const EVENT_SERVICES = [
  {
    id: "weddings",
    title: "Bodas de Autor",
    subtitle: "Alta Costura Floral",
    description: "Diseñamos atmósferas completas donde cada detalle botánico narra vuestra historia. Desde el ramo de novia más íntimo hasta grandes instalaciones aéreas y arcos de ceremonia esculpidos en el momento exacto.",
    quote: "Las flores son el hilo conductor de las emociones en vuestro día más recordado.",
    features: [
      "Diseño de ramos de novia personalizados",
      "Decoración de altar e iglesias con flores naturales",
      "Centros de mesa coordinados y candelabros decorados",
      "Instalaciones colgantes y arcos florales a medida",
      "Coordinación de montaje y desmontaje en finca"
    ],
    mainImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=400"
    ]
  },
  {
    id: "corporate",
    title: "Dirección de Arte Corporativo",
    subtitle: "Identidad Floral y Sofisticación",
    description: "Espacios de trabajo que inspiran y galas que deslumbran. Traducimos la esencia de tu marca en composiciones de diseño contemporáneo para showrooms, cenas de gala, ferias y embellecimiento de hoteles u oficinas en Sevilla.",
    quote: "La belleza natural de una flor comunica frescura, calidad y atención al detalle de tu marca.",
    features: [
      "Decoración floral para recepciones y salas de juntas",
      "Ramos de gran formato para banquetes y galas",
      "Diseños temáticos para lanzamientos de productos",
      "Suscripciones semanales de flores frescas para oficinas",
      "Logotipos corporativos integrados con elementos botánicos"
    ],
    mainImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1520854221256-174b1ec353ef?auto=format&fit=crop&q=80&w=400"
    ]
  },
  {
    id: "social",
    title: "Celebraciones Privadas",
    subtitle: "Cenas con encanto y momentos únicos",
    description: "Hacemos que tus reuniones íntimas sean extraordinarias. Ofrecemos diseños delicados para cumpleaños, bautizos, comuniones y cenas privadas en casa o fincas rurales, cuidando la mantelería y el estilismo global.",
    quote: "Reunir a personas que amas alrededor de una mesa decorada con mimo es el arte de celebrar.",
    features: [
      "Diseño de vajilla y flores integradas para cenas privadas",
      "Decoración estacional y coronas de bienvenida para el hogar",
      "Detalles florales y marcasitios para los invitados",
      "Diseños delicados para bautizos y comuniones íntimas",
      "Servicio de consultoría de estilismo para mesas de gala"
    ],
    mainImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1558985103-b230df875086?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=400"
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "El Encuentro",
    description: "Agendamos una charla (presencial en Sevilla o virtual) para conversar sobre tu idea, paleta de colores preferida, el espacio de celebración y las emociones que quieres transmitir."
  },
  {
    num: "02",
    title: "El Proyecto Botánico",
    description: "Desarrollamos una propuesta a medida con un moodboard de texturas y flores de temporada. Definimos la paleta de colores exacta y la arquitectura floral del espacio."
  },
  {
    num: "03",
    title: "La Creación Efímera",
    description: "En el día del evento, nuestro taller se traslada a la localización. Esculpimos cada arco floral, ramo y centro de mesa garantizando la máxima frescura y presencia."
  }
];

const Events = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: 'wedding',
    location: '',
    date: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-36 md:pt-44 pb-32 bg-[#fafbf7] overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10 text-xs font-bold uppercase tracking-widest">
                <Sparkles size={13} className="text-primary animate-pulse" /> Estilismo Floral
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold text-secondary leading-[1.05] tracking-tight">
                El arte de <br />
                hacer eterno lo <br />
                <span className="text-primary italic font-light font-serif">efímero</span>.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed font-sans">
                En Floristería Rafael concebimos el diseño floral para eventos como una obra de arte viva. Vestimos vuestras celebraciones en Sevilla y alrededores con composiciones orgánicas, elegantes y cargadas de intención.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#contact-form"
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-[#11321e] transition-all hover:scale-105 shadow-lg shadow-primary/15 flex items-center gap-3 text-sm"
                >
                  Diseñar mi evento <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Collage Images */}
          <div className="lg:col-span-6 relative h-[450px] md:h-[550px] w-full mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute left-8 top-12 w-3/5 aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" 
                alt="Boda floral" 
                className="w-full h-full object-cover grayscale-[0.1]"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50, y: 30, rotate: 3 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute right-0 top-24 w-1/2 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=600" 
                alt="Detalle mesa floral" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute left-0 bottom-4 w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white z-20 hidden md:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=500" 
                alt="Velas y flores" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="absolute right-12 bottom-12 bg-[#e8f5e9]/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-primary/10 shadow-lg z-20 flex items-center gap-3">
              <Flower2 size={24} className="text-primary" />
              <div className="text-left">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Flores de Autor</p>
                <p className="text-xs font-bold text-secondary">Sevilla desde 1984</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List - Sequential Asymmetric Layout */}
      <section className="bg-white py-28 border-y border-gray-100 space-y-36">
        <div className="container mx-auto px-6">
          <header className="max-w-3xl mx-auto text-center mb-24 space-y-4">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Servicios Exclusivos</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary">
              Nuestras Especialidades
            </h2>
            <p className="text-gray-500 font-sans text-lg">
              Diseño integral y dirección artística adaptada a la escala de cada celebración.
            </p>
          </header>

          <div className="space-y-32 max-w-6xl mx-auto">
            {EVENT_SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image side */}
                <div className={`lg:col-span-6 space-y-6 ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <img 
                      src={service.mainImage} 
                      alt={service.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 text-white">
                      <p className="text-xs uppercase tracking-widest text-primary-light font-bold mb-1">{service.subtitle}</p>
                      <h3 className="text-2xl font-bold font-display">{service.title}</h3>
                    </div>
                  </div>
                  
                  {/* Gallery */}
                  <div className="grid grid-cols-2 gap-4">
                    {service.gallery.map((imgUrl, i) => (
                      <div key={i} className="aspect-[16/10] rounded-2xl overflow-hidden shadow-md group">
                        <img 
                          src={imgUrl} 
                          alt="Detalle" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text side */}
                <div className="lg:col-span-6 space-y-8">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase">{service.subtitle}</span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-sans text-lg">
                      {service.description}
                    </p>
                  </div>

                  <div className="p-6 bg-pastel/40 border border-primary-light rounded-2xl italic text-primary text-sm font-sans flex items-start gap-4">
                    <span className="text-3xl font-display leading-none text-primary/30">“</span>
                    <p className="relative top-1">{service.quote}</p>
                  </div>

                  <div className="space-y-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Qué incluye el servicio:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 font-sans">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Design Process Section */}
      <section className="container mx-auto px-6 py-28">
        <header className="max-w-2xl mx-auto text-center mb-24 space-y-4">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Paso a paso</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary">
            Cómo Creamos Tu Atmósfera
          </h2>
          <div className="h-0.5 w-16 bg-primary/30 mx-auto mt-6"></div>
        </header>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="space-y-6 group">
              <span className="font-serif text-4xl md:text-5xl text-primary/80 font-light italic shrink-0 leading-none block border-b border-primary/10 pb-4">
                {step.num}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-secondary">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed font-sans text-sm md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Simplified, Single-Step Contact Form */}
      <section id="contact-form" className="container mx-auto px-6 max-w-4xl">
        <div className="bg-[#1a4d2e] rounded-[3.5rem] text-white overflow-hidden relative shadow-2xl">
          <div className="absolute right-0 top-0 w-2/5 h-full opacity-5 pointer-events-none hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800" 
              alt="Decorative" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-16 relative z-10">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold tracking-widest text-[#e8f5e9]/70 uppercase">Contacto para Eventos</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-4 leading-tight">
                Diseñemos tu espacio
              </h2>
              <p className="text-[#e8f5e9]/80 font-sans mb-12">
                Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas para dar forma a tu propuesta floral.
              </p>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center border border-white/10 space-y-6"
              >
                <div className="w-16 h-16 bg-[#e8f5e9]/10 rounded-full flex items-center justify-center mx-auto text-[#e8f5e9]">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold font-display">¡Consulta Recibida!</h3>
                <p className="text-[#e8f5e9]/80 font-sans max-w-md mx-auto">
                  Hemos guardado los detalles de tu consulta. Rafael o un miembro de nuestro equipo floral en Sevilla se pondrá en contacto contigo en las próximas 24 horas.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-white hover:underline text-sm font-bold pt-4"
                >
                  Enviar otra consulta
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#e8f5e9]/70">Nombre completo</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Tu nombre" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-all text-white placeholder-white/35"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#e8f5e9]/70">Email de contacto</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="correo@ejemplo.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-all text-white placeholder-white/35"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#e8f5e9]/70">Tipo de Evento</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-all text-white appearance-none [&>option]:text-secondary"
                    >
                      <option value="wedding">Boda / Enlace</option>
                      <option value="corporate">Evento Corporativo</option>
                      <option value="social">Celebración Privada</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#e8f5e9]/70">Lugar y Fecha del Evento</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                      <input 
                        type="text" 
                        name="location"
                        placeholder="Ej. Octubre 2026, Sevilla" 
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-white transition-all text-white placeholder-white/35"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#e8f5e9]/70">Cuéntanos más sobre tu idea</label>
                    <textarea 
                      name="message"
                      rows={4} 
                      placeholder="Indícanos detalles sobre la escala del evento, paleta de colores preferida o cualquier idea que tengas en mente..." 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-all text-white resize-none placeholder-white/35"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-white text-primary font-bold px-10 py-3.5 rounded-xl hover:bg-[#e8f5e9] transition-all flex items-center gap-2 text-xs shadow-lg"
                  >
                    <Send size={14} /> Enviar Consulta
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
