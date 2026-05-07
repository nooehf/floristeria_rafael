import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, type Product, type Category } from '../lib/supabase';
import { useCart } from '../context/CartContext';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const [prodRes, catRes] = await Promise.all([
        supabase.from('products').select('*').order('id', { ascending: true }),
        supabase.from('categories').select('*').order('name', { ascending: true })
      ]);
      
      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory ? p.category_id === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-40 md:pt-48 pb-24 bg-white">
      <div className="container mx-auto px-6">
        <header className="mb-20 text-center max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-secondary mb-6"
          >
            Colecciones Seleccionadas
          </motion.h1>
          <p className="text-lg text-gray-500">
            Piezas únicas diseñadas para transformar cualquier espacio. 
            Frescura garantizada y entrega en el mismo día.
          </p>
        </header>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative group px-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search size={22} className="text-primary" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué ramo buscas hoy?..."
              className="w-full pl-16 pr-32 py-6 bg-primary/5 border-2 border-primary/10 rounded-[2.5rem] text-secondary placeholder-gray-400 focus:bg-white focus:border-primary focus:shadow-2xl focus:shadow-primary/10 outline-none transition-all duration-500 text-lg"
            />
            <div className="absolute right-3 inset-y-3 flex items-center">
              <button className="h-full px-8 bg-secondary text-white rounded-full font-bold text-sm hover:bg-black transition-all shadow-lg hover:scale-105 active:scale-95">
                Buscar
              </button>
            </div>
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-32 inset-y-0 flex items-center text-gray-300 hover:text-red-400 transition-colors mr-4"
                >
                  <X size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 mb-10 pb-4 md:flex-wrap md:justify-center md:mb-16">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`whitespace-nowrap px-6 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === null 
                ? 'bg-secondary text-white shadow-xl shadow-secondary/20 -translate-y-0.5' 
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
            }`}
          >
            Todos
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === null ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {products.length}
            </span>
          </button>
          
          {categories.map((cat) => {
            const count = products.filter(p => p.category_id === cat.id).length;
            if (count === 0 && selectedCategory !== cat.id) return null; // Only show non-empty categories unless selected

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-6 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat.id 
                    ? 'bg-secondary text-white shadow-xl shadow-secondary/20 -translate-y-0.5' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                }`}
              >
                {cat.name}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>


        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gray-300" size={32} />
            </div>
            <h3 className="text-2xl font-display font-bold text-secondary mb-3">
              {searchQuery ? 'No hay resultados para tu búsqueda' : 'No hay productos aquí'}
            </h3>
            <p className="text-gray-500 mb-8">
              {searchQuery 
                ? 'Prueba con otras palabras clave o explora nuestras categorías.' 
                : 'Estamos preparando nuevas sorpresas para esta sección. ¡Vuelve pronto!'}
            </p>
            <button 
              onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
              className="text-primary font-bold hover:underline"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/producto/${product.id}`} className="block">
                  <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-gray-100 mb-4 md:mb-8">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="hidden md:flex absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full items-center justify-center shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-secondary hover:text-white text-secondary group-hover:hover:text-white z-10"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                  <div className="px-1 md:px-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 md:mb-2">
                      <h3 className="text-sm md:text-2xl font-display font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                      <span className="text-xs md:text-xl font-bold text-secondary">
                        {product.allow_custom_price && !product.price_options?.length ? 'Desde ' : ''}
                        {Number(product.price).toFixed(0)}€
                      </span>
                    </div>
                    <p className="text-gray-500 text-[10px] md:text-sm line-clamp-1 md:line-clamp-2">{product.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
