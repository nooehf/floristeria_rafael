import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Ramo Pasión Roja",
    description: "Docena de rosas rojas premium con follaje de temporada.",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=600",
    category: "Ramos"
  },
  {
    id: 2,
    name: "Cesta Primavera",
    description: "Mezcla vibrante de tulipanes, margaritas y gerberas.",
    price: 38.50,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=600",
    category: "Cestas"
  },
  {
    id: 3,
    name: "Orquídea Blanca Elegance",
    description: "Orquídea Phalaenopsis de dos varas en maceta de cerámica.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1567606143328-2bbd11419bb5?auto=format&fit=crop&q=80&w=600",
    category: "Plantas"
  },
  {
    id: 4,
    name: "Arreglo Minimalista",
    description: "Lirios y eucalipto en un jarrón de cristal moderno.",
    price: 52.00,
    image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&q=80&w=600",
    category: "Moderno"
  },
  {
    id: 5,
    name: "Ramo Silvestre",
    description: "Flores de campo recién cortadas para un aire natural.",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&q=80&w=600",
    category: "Ramos"
  },
  {
    id: 6,
    name: "Caja de Rosas Luxury",
    description: "24 rosas en caja de terciopelo exclusiva.",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1558985103-b230df875086?auto=format&fit=crop&q=80&w=600",
    category: "Premium"
  }
];

const Catalog = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Catálogo</h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Explora nuestra colección cuidadosamente seleccionada para cada ocasión. 
            Calidad, frescura y diseño en cada entrega.
          </p>
        </div>

        <div className="grid grid-2 lg:grid-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card group"
            >
              <div className="relative h-64 mb-6 overflow-hidden rounded-xl">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-fuchsia-600 shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-text-muted text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-fuchsia-600">{product.price.toFixed(2)}€</span>
                <button className="btn btn-primary py-2 px-4 text-sm flex gap-2">
                  <ShoppingCart size={18} /> Añadir
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
