import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Flower2, ShoppingBag, Calendar, Mail, Menu, X, Instagram, Facebook, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Events from './pages/Events';
import Contact from './pages/Contact';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
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
            <div className="hidden md:flex gap-10 items-center">
              <Link to="/" className="text-sm font-semibold hover:text-primary transition-colors">Inicio</Link>
              <Link to="/catalogo" className="text-sm font-semibold hover:text-primary transition-colors">Catálogo</Link>
              <Link to="/eventos" className="text-sm font-semibold hover:text-primary transition-colors">Eventos</Link>
              <Link to="/contacto" className="bg-secondary text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-all hover:shadow-lg">
                Contacto
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-secondary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col p-8 gap-6">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-bold text-secondary">Inicio</Link>
                <Link to="/catalogo" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-bold text-secondary">Catálogo</Link>
                <Link to="/eventos" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-bold text-secondary">Eventos</Link>
                <Link to="/contacto" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-bold text-secondary text-primary">Contacto</Link>
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/contacto" element={<Contact />} />
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
      </div>
    </Router>
  );
}

export default App;
