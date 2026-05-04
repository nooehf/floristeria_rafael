import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardCheck, ArrowLeft, Plus, Check, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-display font-bold mb-6">Producto no encontrado</h2>
        <Link to="/catalogo" className="btn btn-primary">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 bg-white">
      <div className="container mx-auto px-6">
        <Link to="/catalogo" className="inline-flex items-center gap-2 text-gray-400 hover:text-secondary mb-12 transition-colors">
          <ArrowLeft size={20} /> Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] bg-gray-50 shadow-2xl">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-6"
          >
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-6">
              <Star size={14} fill="currentColor" /> Producto Destacado
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-secondary mb-6">{product.name}</h1>
            <div className="text-4xl font-bold text-secondary mb-10">{product.price}€</div>
            
            <p className="text-xl text-gray-500 leading-relaxed mb-12">
              {product.description} Nuestra selección premium garantiza que cada flor llegue en su punto óptimo de frescura y belleza.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-6 h-6 rounded-full bg-pastel-mint flex items-center justify-center text-primary">
                  <Check size={14} />
                </div>
                <span>Envío en el mismo día disponible</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-6 h-6 rounded-full bg-pastel-mint flex items-center justify-center text-primary">
                  <Check size={14} />
                </div>
                <span>Tarjeta de dedicatoria gratuita incluida</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-6 h-6 rounded-full bg-pastel-mint flex items-center justify-center text-primary">
                  <Check size={14} />
                </div>
                <span>Envoltura premium artesanal</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="flex-grow bg-secondary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all hover:scale-[1.02] shadow-xl">
                Encargar ahora
              </button>
              <button className="px-10 py-5 rounded-2xl border-2 border-secondary font-bold text-secondary hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-3">
                <ClipboardCheck size={20} /> Añadir al encargo
              </button>
            </div>

            <div className="mt-16 pt-16 border-t border-gray-100">
              <h4 className="text-lg font-bold mb-4">Detalles del cuidado</h4>
              <p className="text-gray-500 leading-relaxed">
                Para que tus flores duren más, mantén el agua limpia, corta los tallos en diagonal cada dos días y evita la luz solar directa prolongada.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
