import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flower2, LogOut, Plus, Pencil, Trash2, X, Save,
  Package, AlertCircle, Check, ImageIcon, Loader2, Upload, Tag
} from 'lucide-react';
import { supabase, type Product, type Category } from '../lib/supabase';

const emptyProduct = { name: '', description: '', price: 0, image: '', category_id: undefined, price_options: [], allow_custom_price: false };
const emptyCategory = { name: '', slug: '' };

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (!error) setCategories(data || []);
  }, []);

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('id', { ascending: true });

    if (error) {
      showToast('Error al cargar productos', 'error');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin');
        return;
      }
      fetchProducts();
      fetchCategories();
    });
  }, [navigate, fetchProducts, fetchCategories]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const extractFilename = (url: string) => {
    if (!url) return null;
    const parts = url.split('/product-images/');
    return parts.length > 1 ? parts[1] : null;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const openCreate = () => {
    setEditingProduct({ ...emptyProduct });
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      showToast('La imagen supera el límite de 200KB', 'error');
      return;
    }

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);

    if (uploadError) {
      showToast('Error al subir la imagen', 'error');
      setUploadingImage(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    setEditingProduct(prev => prev ? { ...prev, image: publicUrl } : prev);
    setUploadingImage(false);
    showToast('Imagen subida correctamente', 'success');
  };

  const handleSave = async () => {
    if (!editingProduct) return;
    if (!editingProduct.name || !editingProduct.description || !editingProduct.price || !editingProduct.image) {
      showToast('Rellena todos los campos', 'error');
      return;
    }

    setSaving(true);

    if (editingProduct.id) {
      // Update
      const originalProduct = products.find(p => p.id === editingProduct.id);
      
      const { error } = await supabase
        .from('products')
        .update({
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
          image: editingProduct.image,
          category_id: editingProduct.category_id,
          price_options: editingProduct.price_options || [],
          allow_custom_price: editingProduct.allow_custom_price || false,
        })
        .eq('id', editingProduct.id);

      if (error) {
        showToast('Error al actualizar el producto', 'error');
      } else {
        // Eliminar foto antigua si ha cambiado
        if (originalProduct && originalProduct.image !== editingProduct.image) {
          const oldFileName = extractFilename(originalProduct.image);
          if (oldFileName) {
            await supabase.storage.from('product-images').remove([oldFileName]);
          }
        }
        showToast('Producto actualizado correctamente', 'success');
      }
    } else {
      // Create
      const { error } = await supabase
        .from('products')
        .insert({
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
          image: editingProduct.image,
          category_id: editingProduct.category_id,
          price_options: editingProduct.price_options || [],
          allow_custom_price: editingProduct.allow_custom_price || false,
        });

      if (error) {
        showToast('Error al crear el producto', 'error');
      } else {
        showToast('Producto creado correctamente', 'success');
      }
    }

    setSaving(false);
    closeModal();
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    const product = products.find(p => p.id === id);
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      showToast('Error al eliminar el producto', 'error');
    } else {
      // Eliminar foto de storage
      if (product && product.image) {
        const fileName = extractFilename(product.image);
        if (fileName) {
          await supabase.storage.from('product-images').remove([fileName]);
        }
      }
      showToast('Producto eliminado correctamente', 'success');
      fetchProducts();
    }
    setDeleteConfirm(null);
  };

  const handleSaveCategory = async () => {
    if (!editingCategory) return;
    if (!editingCategory.name || !editingCategory.slug) {
      showToast('Rellena todos los campos', 'error');
      return;
    }

    setSaving(true);
    if (editingCategory.id) {
      await supabase.from('categories').update(editingCategory).eq('id', editingCategory.id);
      showToast('Categoría actualizada', 'success');
    } else {
      await supabase.from('categories').insert(editingCategory);
      showToast('Categoría creada', 'success');
    }
    setSaving(false);
    setShowCatModal(false);
    fetchCategories();
  };

  const handleDeleteCategory = async (id: number) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) showToast('Error al eliminar (puede tener productos)', 'error');
    else {
      showToast('Categoría eliminada', 'success');
      fetchCategories();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-secondary text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl">
              <Flower2 size={24} />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold">Panel Admin</h1>
              <p className="text-gray-400 text-xs">Floristería Rafael</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-gray-400 hover:text-white text-sm transition-colors hidden sm:block">
              Ver web →
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            >
              <LogOut size={16} />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          {[
            { id: 'products', name: 'Productos', icon: Package },
            { id: 'categories', name: 'Categorías', icon: Tag }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-4 border-b-2 font-bold text-sm transition-all ${
                activeTab === tab.id 
                  ? 'border-primary text-secondary' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'products' ? (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center text-primary">
                    <Package size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-secondary">{products.length}</p>
                    <p className="text-gray-500 text-sm">Productos totales</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <ImageIcon size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-secondary">
                      {products.length > 0 ? `${Math.min(...products.map(p => Number(p.price)))}€ - ${Math.max(...products.map(p => Number(p.price)))}€` : '-'}
                    </p>
                    <p className="text-gray-500 text-sm">Rango de precios</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-center">
                <button
                  onClick={openCreate}
                  className="flex items-center gap-3 bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all hover:scale-[1.02] shadow-lg w-full justify-center"
                >
                  <Plus size={20} />
                  Nuevo Producto
                </button>
              </div>
            </div>

            {/* Products Table */}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 size={32} className="animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-secondary mb-2">No hay productos</h3>
                <p className="text-gray-500 mb-6">Empieza creando tu primer producto.</p>
                <button onClick={openCreate} className="btn btn-primary">
                  <Plus size={18} className="mr-2" /> Crear primer producto
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-4 px-6 text-xs uppercase tracking-widest text-gray-400 font-bold">Producto</th>
                        <th className="text-left py-4 px-6 text-xs uppercase tracking-widest text-gray-400 font-bold">Categoría</th>
                        <th className="text-left py-4 px-6 text-xs uppercase tracking-widest text-gray-400 font-bold">Precio</th>
                        <th className="text-right py-4 px-6 text-xs uppercase tracking-widest text-gray-400 font-bold">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover bg-gray-100" />
                              <span className="font-bold text-secondary">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded text-gray-500 uppercase tracking-wider">
                              {product.categories?.name || 'Sin categoría'}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="bg-primary-light text-primary px-3 py-1 rounded-lg text-sm font-bold">
                              {Number(product.price).toFixed(2)}€
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2 justify-end">
                              <button
                                onClick={() => openEdit(product)}
                                className="p-2.5 rounded-xl bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-all"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => deleteConfirm === product.id ? handleDelete(product.id) : setDeleteConfirm(product.id)}
                                className={`p-2.5 rounded-xl transition-all ${deleteConfirm === product.id ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600'}`}
                              >
                                {deleteConfirm === product.id ? <Check size={16} /> : <Trash2 size={16} />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-100">
                  {products.map((product) => (
                    <div key={product.id} className="p-5">
                      <div className="flex gap-4">
                        <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100 shrink-0" />
                        <div className="flex-grow min-w-0">
                          <h3 className="font-bold text-secondary truncate">{product.name}</h3>
                          <p className="text-gray-500 text-sm line-clamp-2 mt-1">{product.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="bg-primary-light text-primary px-3 py-1 rounded-lg text-sm font-bold">
                              {Number(product.price).toFixed(2)}€
                            </span>
                            <div className="flex items-center gap-2">
                              <button onClick={() => openEdit(product)} className="p-2 rounded-lg bg-gray-100 text-gray-500"><Pencil size={14} /></button>
                              <button onClick={() => deleteConfirm === product.id ? handleDelete(product.id) : setDeleteConfirm(product.id)} className={`p-2 rounded-lg ${deleteConfirm === product.id ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}><Trash2 size={14} /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold">Gestión de Categorías</h2>
              <button
                onClick={() => { setEditingCategory(emptyCategory); setShowCatModal(true); }}
                className="btn btn-primary"
              >
                <Plus size={18} className="mr-2" /> Nueva Categoría
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(cat => (
                <div key={cat.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group">
                  <div>
                    <h3 className="font-bold text-secondary">{cat.name}</h3>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingCategory(cat); setShowCatModal(true); }} className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:text-primary transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && editingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-display font-bold text-secondary">
                  {editingProduct.id ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <button onClick={closeModal} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Form */}
              <div className="p-6 space-y-5">
                {/* Image Preview */}
                {editingProduct.image && (
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={editingProduct.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Categoría</label>
                  <select
                    value={editingProduct.category_id || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category_id: parseInt(e.target.value) || undefined })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                  >
                    <option value="">Sin categoría</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Nombre del producto</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="Ej: Ramo de Rosas Premium"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 block">Imagen (Max 200KB)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className={`w-full px-4 py-3 bg-gray-50 border ${uploadingImage ? 'border-primary' : 'border-gray-200 hover:border-primary/50'} rounded-xl text-secondary flex items-center gap-3 transition-all`}>
                      {uploadingImage ? (
                        <Loader2 size={18} className="animate-spin text-primary" />
                      ) : (
                        <Upload size={18} className="text-gray-400" />
                      )}
                      <span className="text-sm text-gray-500">
                        {uploadingImage ? 'Subiendo imagen...' : editingProduct.image ? 'Cambiar imagen' : 'Seleccionar imagen'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Descripción</label>
                  <textarea
                    value={editingProduct.description || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    placeholder="Describe el producto..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>

                {/* Price Options Section */}
                <div className="pt-6 border-t border-gray-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-secondary uppercase tracking-widest">Configuración de Precios</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Precio Base (€)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editingProduct.price || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => {
                          const currentOptions = editingProduct.price_options || [];
                          setEditingProduct({
                            ...editingProduct,
                            price_options: [...currentOptions, { label: '', price: 0 }]
                          });
                        }}
                        className="w-full h-[50px] border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={16} /> Añadir variante
                      </button>
                    </div>
                  </div>

                  {editingProduct.price_options && editingProduct.price_options.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Variantes adicionales</p>
                      {editingProduct.price_options.map((option, idx) => (
                        <div key={idx} className="flex gap-3 items-end bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <div className="flex-grow space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Etiqueta (ej: Pequeño)</label>
                            <input
                              type="text"
                              value={option.label}
                              onChange={(e) => {
                                const newOptions = [...(editingProduct.price_options || [])];
                                newOptions[idx].label = e.target.value;
                                setEditingProduct({ ...editingProduct, price_options: newOptions });
                              }}
                              placeholder="Etiqueta"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                            />
                          </div>
                          <div className="w-24 space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Precio (€)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={option.price}
                              onChange={(e) => {
                                const newOptions = [...(editingProduct.price_options || [])];
                                newOptions[idx].price = parseFloat(e.target.value) || 0;
                                setEditingProduct({ ...editingProduct, price_options: newOptions });
                              }}
                              placeholder="0.00"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newOptions = editingProduct.price_options?.filter((_, i) => i !== idx);
                              setEditingProduct({ ...editingProduct, price_options: newOptions });
                            }}
                            className="p-2 text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Custom Price Toggle */}
                  <div className="flex items-center justify-between bg-pastel-mint/30 p-4 rounded-xl border border-primary-light">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-secondary">Presupuesto Personalizado</p>
                      <p className="text-xs text-gray-500">Permitir que el cliente proponga un precio</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, allow_custom_price: !editingProduct.allow_custom_price })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${editingProduct.allow_custom_price ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editingProduct.allow_custom_price ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-6 border-t border-gray-100">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-6 py-3 rounded-xl bg-secondary text-white font-bold hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                >
                  {saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Save size={18} />
                      {editingProduct.id ? 'Guardar cambios' : 'Crear producto'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {showCatModal && editingCategory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowCatModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-display font-bold">{editingCategory.id ? 'Editar' : 'Nueva'} Categoría</h3>
                <button onClick={() => setShowCatModal(false)}><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold">Nombre</label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={e => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                      setEditingCategory({ ...editingCategory, name, slug });
                    }}
                    placeholder="Ej: Orquídeas"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <button
                  onClick={handleSaveCategory}
                  disabled={saving}
                  className="w-full py-4 bg-secondary text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  {saving ? 'Guardando...' : 'Guardar Categoría'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl font-bold text-sm ${
              toast.type === 'success'
                ? 'bg-primary text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
