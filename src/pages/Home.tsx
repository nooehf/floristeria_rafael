import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Flowers" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-600 text-sm font-bold mb-4">
              DESDE 1995
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Arte en cada <br />
              <span className="text-fuchsia-600 italic">Pétalo</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              En Floristería Rafael, no solo vendemos flores; creamos experiencias visuales y emocionales. 
              Descubre arreglos únicos diseñados con pasión y frescura garantizada.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalogo" className="btn btn-primary">
                Ver Catálogo <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link to="/contacto" className="btn bg-white text-gray-800 hover:bg-gray-50 border border-gray-200">
                Pide Presupuesto
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-fuchsia-100 text-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Calidad Premium</h3>
              <p className="text-gray-600">Seleccionamos cada flor a mano para asegurar que recibas solo lo mejor.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Envío Rápido</h3>
              <p className="text-gray-600">Entregamos tus sentimientos a tiempo, con cuidado y profesionalismo.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Compra Segura</h3>
              <p className="text-gray-600">Garantía de satisfacción en cada pedido. Tu felicidad es nuestra prioridad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section bg-fuchsia-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800" 
                alt="Our Shop" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6">Bienvenidos a Nuestro Jardín</h2>
              <p className="text-lg text-gray-700 mb-6 italic">
                "Las flores son el lenguaje secreto del alma."
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Floristería Rafael nació con la visión de acercar la naturaleza a las personas de una manera artística. 
                Cada ramo que sale de nuestras manos lleva una historia, un sentimiento y un compromiso inquebrantable 
                con la excelencia. Visítanos y deja que el aroma y los colores te inspiren.
              </p>
              <Link to="/eventos" className="text-fuchsia-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Conoce nuestros servicios para eventos <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
