import { motion } from 'framer-motion';
import { ShoppingBag, Plus } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: "Pureza Blanca",
    description: "Composición minimalista de lirios y rosas blancas.",
    price: 42,
    image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Jardín Silvestre",
    description: "Flores de temporada con un toque rústico y natural.",
    price: 35,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Orquídea Zen",
    description: "Elegancia duradera en maceta de piedra volcánica.",
    price: 48,
    image: "https://images.unsplash.com/photo-1567606143328-2bbd11419bb5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Ramo de Autor",
    description: "Diseño exclusivo de nuestro jefe de floristas.",
    price: 65,
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Eucalipto & Algodón",
    description: "Composición seca ideal para decoración interior.",
    price: 28,
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    name: "Caja Luxury Mint",
    description: "Presentación premium en caja de terciopelo verde pastel.",
    price: 75,
    image: "https://images.unsplash.com/photo-1558985103-b230df875086?auto=format&fit=crop&q=80&w=800",
  }
];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PRODUCTS.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-100 mb-8">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-secondary hover:text-white">
                  <Plus size={24} />
                </button>
              </div>
              <div className="px-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-display font-bold text-secondary">{product.name}</h3>
                  <span className="text-xl font-bold text-primary">{product.price}€</span>
                </div>
                <p className="text-gray-500 text-sm">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
