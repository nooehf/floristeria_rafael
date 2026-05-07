import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wlqsiypzyktdacubuwmt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscXNpeXB6eWt0ZGFjdWJ1d210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4OTMyODEsImV4cCI6MjA5MzQ2OTI4MX0.-I7XDpH7rCFAFaOokwqt_f43RUcpZAIWSgFg7-MMooI';

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


