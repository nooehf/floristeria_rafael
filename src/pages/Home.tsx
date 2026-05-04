import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Minimalist & Elegant */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-[#f9fafb]">
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1200" 
              alt="Flores" 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f9fafb] to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary font-bold text-xs uppercase tracking-widest mb-8">
                <Leaf size={14} /> Naturaleza en casa
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-bold text-secondary leading-[1.1] mb-8">
                Belleza <br /> 
                <span className="italic font-light">Natural</span> para <br />
                tu día a día.
              </h1>
              <p className="text-xl text-gray-500 mb-12 max-w-lg leading-relaxed">
                Floristería Rafael selecciona las flores más frescas y crea arreglos únicos con un toque contemporáneo y elegante.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/catalogo" className="bg-secondary text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all hover:scale-105 shadow-xl flex items-center gap-3">
                  Explorar Colección <ArrowRight size={20} />
                </Link>
                <Link to="/contacto" className="px-10 py-5 rounded-full font-bold border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all">
                  Presupuesto Personalizado
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - White & Mint */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="w-16 h-16 bg-pastel-mint rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Leaf size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Cultivo Local</h3>
              <p className="text-gray-500 leading-relaxed">
                Trabajamos con productores locales para garantizar la máxima frescura y sostenibilidad en cada ramo.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="w-16 h-16 bg-pastel-mint rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Diseño con Pasión</h3>
              <p className="text-gray-500 leading-relaxed">
                Cada arreglo es una pieza de arte única, creada por expertos floristas con años de experiencia.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="w-16 h-16 bg-pastel-mint rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Calidad Garantizada</h3>
              <p className="text-gray-500 leading-relaxed">
                Nos comprometemos con la durabilidad de nuestras flores. Si no estás satisfecho, lo arreglamos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Banner - Black & Pastel Green */}
      <section className="py-24 bg-pastel-green">
        <div className="container mx-auto px-6">
          <div className="bg-secondary rounded-[4rem] overflow-hidden relative p-12 md:p-24">
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800" 
                alt="Background" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 max-w-2xl text-white">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Arreglos que dicen lo que las palabras no pueden.</h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Desde nacimientos hasta celebraciones de vida, estamos aquí para acompañarte en cada momento importante.
              </p>
              <button className="px-12 py-5 rounded-full bg-white text-secondary font-bold hover:scale-105 transition-all">
                Ver servicios para eventos
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
