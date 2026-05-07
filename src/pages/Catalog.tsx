import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, type Product, type Category } from '../lib/supabase';
import { useCart } from '../context/CartContext';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
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

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category_id === selectedCategory)
    : products;

  return (
    <div className="pt-32 pb-24 bg-white">
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

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`whitespace-nowrap px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === null 
                ? 'bg-secondary text-white shadow-xl shadow-secondary/20 -translate-y-1' 
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
                className={`whitespace-nowrap px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat.id 
                    ? 'bg-secondary text-white shadow-xl shadow-secondary/20 -translate-y-1' 
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
              <Plus className="text-gray-300 rotate-45" size={32} />
            </div>
            <h3 className="text-2xl font-display font-bold text-secondary mb-3">No hay productos aquí</h3>
            <p className="text-gray-500 mb-8">Estamos preparando nuevas sorpresas para esta sección. ¡Vuelve pronto!</p>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-primary font-bold hover:underline"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-100 mb-8">
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
                      className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-secondary hover:text-white text-secondary group-hover:hover:text-white z-10"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                  <div className="px-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-display font-bold text-secondary group-hover:text-primary transition-colors">{product.name}</h3>
                      <span className="text-xl font-bold text-secondary">{Number(product.price).toFixed(0)}€</span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
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
