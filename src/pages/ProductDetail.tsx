import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Star, ShoppingBag } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | 'custom' | null>(null);
  const [customPrice, setCustomPrice] = useState<string>('');
  const { addToCart } = useCart();

  const getFinalPrice = () => {
    if (selectedOption === 'custom') return parseFloat(customPrice) || 0;
    if (selectedOption !== null && product?.price_options?.[selectedOption as number]) {
      return product.price_options[selectedOption as number].price;
    }
    return product?.price || 0;
  };

  const getFinalLabel = () => {
    if (selectedOption === 'custom') return 'Precio Personalizado';
    if (selectedOption !== null && product?.price_options?.[selectedOption as number]) {
      return product.price_options[selectedOption as number].label;
    }
    return product?.price_label || 'Estándar';
  };

  const isPriceValid = () => {
    if (selectedOption !== 'custom') return true;
    const price = parseFloat(customPrice);
    if (isNaN(price)) return false;
    if (product?.min_custom_price && price < product.min_custom_price) return false;
    if (product?.max_custom_price && price > product.max_custom_price) return false;
    return price > 0;
  };

  const handleAdd = () => {
    if (product && isPriceValid()) {
      const price = getFinalPrice();
      addToCart(product, price, getFinalLabel());
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (product && isPriceValid()) {
      const price = getFinalPrice();
      const label = getFinalLabel();
      const text = `¡Hola! Me gustaría encargar este producto directamente:\n\n- 1x ${product.name} ${label ? `(${label})` : ''} - ${price.toFixed(2)}€\n\n*Total estimado: ${price.toFixed(2)}€*`;
      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/34600000000?text=${encodedText}`, '_blank');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', Number(id))
        .single();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 flex justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

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
            <div className="text-4xl font-bold text-secondary mb-10">
              {getFinalPrice() > 0 ? `${getFinalPrice().toFixed(2)}€` : `${Number(product.price).toFixed(0)}€`}
            </div>

            {/* Price Selection */}
            {(product.price_options && product.price_options.length > 0 || product.allow_custom_price) && (
              <div className="mb-10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-secondary uppercase tracking-widest">Selecciona una opción</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Base Price Option */}
                  <button
                    onClick={() => setSelectedOption(null)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      selectedOption === null 
                        ? 'border-primary bg-primary-light/30' 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="text-xs font-bold text-primary uppercase mb-1">{product.price_label || 'Estándar'}</div>
                    <div className="text-lg font-bold text-secondary">{Number(product.price).toFixed(2)}€</div>
                  </button>

                  {product.price_options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        selectedOption === idx 
                          ? 'border-primary bg-primary-light/30' 
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="text-xs font-bold text-primary uppercase mb-1">{option.label}</div>
                      <div className="text-lg font-bold text-secondary">{option.price.toFixed(2)}€</div>
                    </button>
                  ))}
                  
                  {product.allow_custom_price && (
                    <button
                      onClick={() => setSelectedOption('custom')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        selectedOption === 'custom' 
                          ? 'border-primary bg-primary-light/30' 
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="text-xs font-bold text-primary uppercase mb-1">Personalizado</div>
                      <div className="text-lg font-bold text-secondary">Elige tu precio</div>
                    </button>
                  )}
                </div>
                
                {selectedOption === 'custom' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                      <p className="text-sm text-secondary font-medium">
                        ✨ ¡Tú pones el presupuesto! Diseñaremos algo especial ajustado a lo que indiques.
                      </p>
                      {(product.min_custom_price || product.max_custom_price) && (
                        <p className="text-xs text-primary font-bold mt-2 uppercase tracking-tight flex gap-3">
                          {product.min_custom_price && <span>Mínimo: {product.min_custom_price}€</span>}
                          {product.max_custom_price && <span>Máximo: {product.max_custom_price}€</span>}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-1">Escribe tu presupuesto (€)</label>
                      <input
                        type="number"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value)}
                        placeholder="Ej: 50.00"
                        className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-bold text-lg ${
                          customPrice && !isPriceValid() 
                            ? 'border-red-200 focus:border-red-400 text-red-500' 
                            : 'border-transparent focus:border-primary-light text-secondary'
                        }`}
                      />
                      {customPrice && !isPriceValid() && (
                        <p className="text-xs text-red-500 font-bold ml-1 animate-pulse">
                          El precio debe estar dentro de los límites permitidos.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            
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

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleBuyNow}
                disabled={!isPriceValid() || (selectedOption === 'custom' && !customPrice)}
                className="flex-grow bg-secondary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all hover:scale-[1.02] shadow-xl disabled:opacity-50 disabled:grayscale"
              >
                Encargar ahora
              </button>
              <button 
                onClick={handleAdd}
                disabled={!isPriceValid() || (selectedOption === 'custom' && !customPrice)}
                className={`px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all disabled:opacity-50 ${
                  added 
                    ? 'bg-primary text-white border-2 border-primary scale-[1.02] shadow-xl' 
                    : 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white'
                } disabled:opacity-50`}
              >
                {added ? (
                  <>
                    <Check size={20} />
                    ¡Añadido!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    Añadir al encargo
                  </>
                )}
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
