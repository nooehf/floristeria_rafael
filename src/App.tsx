import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Flower2, ShoppingBag, Calendar, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Events from './pages/Events';
import Contact from './pages/Contact';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="glass-nav">
          <div className="container py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-pink-400 to-fuchsia-500 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                <Flower2 size={24} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-600">
                Floristería Rafael
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              <Link to="/" className="font-medium hover:text-fuchsia-600 transition-colors">Inicio</Link>
              <Link to="/catalogo" className="font-medium hover:text-fuchsia-600 transition-colors">Catálogo</Link>
              <Link to="/eventos" className="font-medium hover:text-fuchsia-600 transition-colors">Eventos</Link>
              <Link to="/contacto" className="btn btn-primary py-2 px-6">Contacto</Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-fuchsia-600" onClick={toggleMenu}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-fuchsia-100 shadow-xl fade-in">
              <div className="flex flex-col p-6 gap-4">
                <Link to="/" onClick={toggleMenu} className="flex items-center gap-3 text-lg font-medium p-2 hover:bg-fuchsia-50 rounded-lg">
                  <Flower2 size={20} /> Inicio
                </Link>
                <Link to="/catalogo" onClick={toggleMenu} className="flex items-center gap-3 text-lg font-medium p-2 hover:bg-fuchsia-50 rounded-lg">
                  <ShoppingBag size={20} /> Catálogo
                </Link>
                <Link to="/eventos" onClick={toggleMenu} className="flex items-center gap-3 text-lg font-medium p-2 hover:bg-fuchsia-50 rounded-lg">
                  <Calendar size={20} /> Eventos
                </Link>
                <Link to="/contacto" onClick={toggleMenu} className="flex items-center gap-3 text-lg font-medium p-2 hover:bg-fuchsia-50 rounded-lg">
                  <Mail size={20} /> Contacto
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-fuchsia-950 text-fuchsia-100 py-12">
          <div className="container text-center">
            <div className="flex justify-center mb-6">
              <Flower2 size={32} className="text-fuchsia-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Floristería Rafael</h2>
            <p className="max-w-md mx-auto mb-8 text-fuchsia-200">
              Transformando momentos en recuerdos inolvidables a través de la belleza de las flores.
            </p>
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            </div>
            <p className="text-sm text-fuchsia-400">
              © {new Date().getFullYear()} Floristería Rafael. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
