import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Menu, X, Instagram, Facebook, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import Home from './pages/Home.tsx';
import Catalog from './pages/Catalog.tsx';
import Events from './pages/Events.tsx';
import Contact from './pages/Contact.tsx';
import ProductDetail from './pages/ProductDetail.tsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
        <ScrollToTop />
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-secondary p-2.5 rounded-2xl text-white group-hover:rotate-12 transition-transform duration-300">
                <Flower2 size={26} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold tracking-tight text-secondary">
                  Floristería Rafael
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold -mt-1">
                  Madrid • Since 1995
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-2 items-center bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
              {[
                { name: 'Inicio', path: '/' },
                { name: 'Catálogo', path: '/catalogo' },
                { name: 'Eventos', path: '/eventos' },
                { name: 'Contacto', path: '/contacto' }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative px-6 py-2.5 text-sm font-bold transition-colors duration-300 z-10 ${
                    (hoveredPath ? hoveredPath === link.path : location.pathname === link.path) ? 'text-white' : 'text-secondary'
                  }`}
                >
                  {link.name}
                  {(location.pathname === link.path || hoveredPath === link.path) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-secondary rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-secondary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`absolute top-full left-0 w-full overflow-hidden md:hidden border-t border-gray-50 ${scrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-white'}`}
              >
                <div className="flex flex-col p-8 gap-6">
                  {[
                    { name: 'Inicio', path: '/' },
                    { name: 'Catálogo', path: '/catalogo' },
                    { name: 'Eventos', path: '/eventos' },
                    { name: 'Contacto', path: '/contacto' }
                  ].map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-3xl font-display font-bold transition-colors ${
                        location.pathname === link.path ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Footer Info Short */}
                <div className="px-8 pb-8 flex justify-between items-end">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Madrid</h4>
                    <p className="text-secondary text-sm font-medium">Calle de las Flores, 123</p>
                  </div>
                  <div className="flex gap-4">
                    <Instagram size={20} className="text-gray-400" />
                    <Phone size={20} className="text-gray-400" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
          </Routes>
        </main>

        {/* Footer - Elegant Black & White */}
        <footer className="bg-secondary text-white pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <Flower2 size={32} className="text-primary-light" />
                  <span className="text-2xl font-display font-bold tracking-tight">Floristería Rafael</span>
                </div>
                <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                  Creamos arreglos únicos que cuentan historias. Calidad premium y atención al detalle en cada pétalo desde hace más de 25 años.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Phone size={18} />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-6">Secciones</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
                  <li><Link to="/catalogo" className="hover:text-white transition-colors">Catálogo</Link></li>
                  <li><Link to="/eventos" className="hover:text-white transition-colors">Eventos</Link></li>
                  <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-6">Horario</h4>
                <ul className="space-y-4 text-gray-400">
                  <li>Lunes - Viernes: 09:00 - 20:00</li>
                  <li>Sábado: 10:00 - 14:00</li>
                  <li>Domingo: Cerrado</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Floristería Rafael. Todos los derechos reservados.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/34600000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[100] group"
        >
          <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
          <div className="relative bg-secondary text-white p-2.5 rounded-full shadow-2xl hover:bg-black transition-all duration-300 hover:scale-110 flex items-center gap-3">
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-sm pl-2">
              ¿En qué podemos ayudarte?
            </span>
            <div className="bg-[#25D366] p-2 rounded-full">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
          </div>
        </a>
      </div>
  );
}

export default App;
