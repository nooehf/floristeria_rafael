import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

const Catalog = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {PRODUCTS.map((product, index) => (
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
                  <div className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-secondary hover:text-white text-secondary group-hover:hover:text-white">
                    <Plus size={24} />
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-display font-bold text-secondary group-hover:text-primary transition-colors">{product.name}</h3>
                    <span className="text-xl font-bold text-secondary">{product.price}€</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
