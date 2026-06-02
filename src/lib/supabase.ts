import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Faltan las variables de entorno de Supabase (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). El cliente de Supabase podría no inicializarse correctamente.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PriceOption {
  label: string;
  price: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id?: number;
  categories?: { name: string };
  price_options?: PriceOption[];
  allow_custom_price?: boolean;
  price_label?: string;
  min_custom_price?: number;
  max_custom_price?: number;
  images?: string[];
  selling_mode?: 'budget' | 'quantity';
  created_at?: string;
}


