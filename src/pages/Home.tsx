import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
        className="hidden md:block fixed top-0 left-0 w-full h-full object-cover object-right pointer-events-none z-0"
      />
      {/* Background Image for Mobile */}
      <img
        src="/fondomovilfl.jpeg"
        alt="Fondo móvil"
        className="block md:hidden fixed top-0 left-0 w-full h-full object-cover object-center pointer-events-none z-0"
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
                className="bg-white/80 backdrop-blur-lg p-8 md:p-0 rounded-[2.5rem] border border-white/45 shadow-xl shadow-secondary/5 md:shadow-none md:bg-transparent md:backdrop-blur-none md:border-none"
              >

                <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-secondary leading-[1.1] mb-6 md:mb-8">
                  Belleza <br /> 
                  <span className="font-serif italic font-light">Natural</span> para <br />
                  tu día a día.
                </h1>
                <p className="text-base md:text-xl text-secondary font-medium mb-8 md:mb-12 max-w-lg leading-relaxed [text-shadow:_0_2px_10px_rgba(255,255,255,0.8)]">
                  Floristería Rafael selecciona las flores más frescas y crea ramos únicos con un toque contemporáneo y elegante.
                </p>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  <Link to="/catalogo" className="bg-secondary text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold hover:bg-black transition-all hover:scale-105 shadow-xl flex items-center gap-3 text-sm md:text-base">
                    Explorar Colección <ArrowRight size={20} />
                  </Link>
                  <Link to="/contacto" className="px-8 md:px-10 py-4 md:py-5 rounded-full font-bold border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all text-sm md:text-base">
                    Presupuesto Personalizado
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section - Frosted Glass Editorial Layout */}
      <section className="py-32 bg-white/70 backdrop-blur-md relative z-10 border-y border-white/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Title & Text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Nuestra Filosofía</span>
              <h2 className="text-4xl md:text-6xl font-display font-light text-secondary leading-[1.1]">
                Compromiso con la <br />
                <span className="italic font-serif font-light text-primary">belleza</span> y el origen.
              </h2>
              <p className="text-gray-500 font-sans leading-relaxed text-sm md:text-base max-w-sm mt-4">
                Cada flor que entra en nuestro taller en Sevilla es seleccionada personalmente por su frescura, carácter y procedencia, garantizando ramos que respiran alma y naturaleza.
              </p>
            </div>

            {/* Right Column: Dynamic Editorial List */}
            <div className="lg:col-span-7 space-y-12">
              {[
                {
                  num: "01",
                  title: "Cultivo Local",
                  desc: "Colaboramos mano a mano con productores de cercanía para asegurar que cada flor se corte en su punto óptimo, manteniendo viva la frescura natural del campo."
                },
                {
                  num: "02",
                  title: "Diseño con Pasión",
                  desc: "Concebimos la floristería como una disciplina artística. Cada composición es una escultura viva que juega con texturas, formas contemporáneas y gamas cromáticas sofisticadas."
                },
                {
                  num: "03",
                  title: "Calidad Garantizada",
                  desc: "Nos obsesiona la durabilidad. Nos comprometemos con la frescura de nuestras flores y te acompañamos con asesoramiento sobre el cuidado botánico ideal."
                }
              ].map((pillar) => (
                <div key={pillar.num} className="flex gap-8 items-start border-b border-secondary/5 pb-8 last:border-none last:pb-0">
                  <span className="font-serif text-4xl md:text-5xl text-primary/80 font-light italic shrink-0 leading-none mt-1">{pillar.num}</span>
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold font-display text-secondary">{pillar.title}</h3>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl font-sans">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Banner - Frosted Glass Typography Banner */}
      <section className="py-32 bg-transparent relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white/75 backdrop-blur-md border border-white/40 rounded-[3rem] p-12 md:p-20 text-center space-y-8 shadow-lg shadow-black/[0.01]">
            <div className="w-12 h-px bg-primary/30 mx-auto"></div>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-secondary leading-tight max-w-3xl mx-auto italic">
              “Ramos que dicen lo que las <br />
              palabras no pueden”
            </h2>
            <p className="text-gray-500 max-w-md mx-auto font-sans leading-relaxed text-sm md:text-base">
              Desde nacimientos hasta celebraciones de vida, estamos aquí para acompañarte en cada momento importante de tu vida en Sevilla.
            </p>
            <div className="pt-4">
              <Link 
                to="/contacto" 
                className="inline-flex items-center gap-3 bg-secondary text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all hover:scale-105 shadow-xl text-sm"
              >
                Diseñar un encargo personalizado <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
