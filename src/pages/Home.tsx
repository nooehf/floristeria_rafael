import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Guardar el tiempo objetivo basado en el scroll (el vídeo se completa al 70% del scroll del Hero)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (video && video.duration) {
      const progress = Math.min(Math.max(latest / 0.7, 0), 1);
      targetTimeRef.current = progress * video.duration;
    }
  });

  // Bucle de suavizado (Lerp) en cada frame
  useEffect(() => {
    let animationFrameId: number;
    const video = videoRef.current;

    const smoothPlay = () => {
      if (video && video.duration) {
        // Interpolación lineal: actual + (objetivo - actual) * suavizado
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.001) {
          currentTimeRef.current += diff * 0.06; // Suavizado al 6% por fotograma
          video.currentTime = currentTimeRef.current;
        }
      }
      animationFrameId = requestAnimationFrame(smoothPlay);
    };

    animationFrameId = requestAnimationFrame(smoothPlay);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      targetTimeRef.current = 0;
      currentTimeRef.current = 0;
    }
  }, []);

  // Las letras se mantienen al 100% de opacidad mientras el vídeo se dibuja (hasta 0.7) y luego se desvanecen hacia el 0.9
  const textOpacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.7, 0.9], [0, 0, -40]);

  return (
    <div className="relative bg-[#f9fafb]">
      {/* Background Video - Fixed to viewport behind all sections */}
      <video
        ref={videoRef}
        src="/video-bg.webm"
        muted
        playsInline
        preload="auto"
        className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none z-0"
      />
      <div className="fixed inset-0 bg-[#f9fafb]/10 z-0 pointer-events-none" />

      {/* Hero Section - Sticky Scroll Track */}
      <div ref={containerRef} className="relative h-[220vh] z-10">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-transparent">
          {/* Hero Content */}
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                style={{ opacity: textOpacity, y: textY }}
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
        </div>
      </div>

      {/* Philosophy Section - White & Mint (Semi-transparent overlay) */}
      <section className="py-32 bg-white/90 backdrop-blur-md relative z-10 border-t border-gray-100/50">
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
              <p className="text-gray-500 leading-relaxed font-sans text-sm">
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
              <p className="text-gray-500 leading-relaxed font-sans text-sm">
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
              <p className="text-gray-500 leading-relaxed font-sans text-sm">
                Nos comprometemos con la durabilidad de nuestras flores. Si no estás satisfecho, lo arreglamos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Banner - Black & Pastel Green (Semi-transparent overlay) */}
      <section className="py-24 bg-[#e8f5e9]/95 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-6">
          <div className="bg-secondary rounded-[4rem] overflow-hidden relative p-12 md:p-24 shadow-2xl">
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800" 
                alt="Background" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 max-w-2xl text-white">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Arreglos que dicen lo que las palabras no pueden.</h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed font-sans">
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
