-- Schema SQL pour Supabase (Projet Soukna)

-- Activer l'extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. TABLES
-- ==========================================

-- Table Profiles (étend la table auth.users de Supabase)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'client' CHECK (role IN ('client', 'artisan', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table Artisans
CREATE TABLE public.artisans (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id), -- Optionnel: relier un profil à cet artisan
    name TEXT NOT NULL,
    name_ar TEXT,
    location TEXT NOT NULL,
    location_ar TEXT,
    specialty TEXT NOT NULL,
    specialty_ar TEXT,
    rating NUMERIC(3, 2) DEFAULT 0.00,
    image TEXT,
    total_sales INTEGER DEFAULT 0,
    products_count INTEGER DEFAULT 0,
    bio TEXT,
    bio_ar TEXT,
    years_experience INTEGER DEFAULT 0,
    certifications JSONB DEFAULT '[]',
    social_links JSONB DEFAULT '{}',
    enda_code TEXT, -- Code client Enda Tamweel
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table Products
CREATE TABLE public.products (
    id SERIAL PRIMARY KEY,
    artisan_id INTEGER REFERENCES public.artisans(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    name_ar TEXT,
    description TEXT,
    description_ar TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 0.00,
    reviews INTEGER DEFAULT 0,
    eco_score INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 0,
    tags JSONB DEFAULT '[]',
    specifications JSONB DEFAULT '{}',
    care_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table Orders
CREATE TABLE public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    total_amount NUMERIC(10, 2) NOT NULL,
    shipping_address JSONB NOT NULL,
    items JSONB NOT NULL, -- Contient le détail du panier
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table B2B Items (Bourse Circulaire)
CREATE TABLE public.b2b_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    artisan_id INTEGER REFERENCES public.artisans(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('offer', 'request')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    material_category TEXT NOT NULL CHECK (material_category IN ('Biomasse', 'Textile', 'Bois', 'Argile', 'Autre')),
    quantity TEXT,
    price TEXT,
    location TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'fulfilled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table B2B Matches
CREATE TABLE public.b2b_matches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    supplier_id INTEGER REFERENCES public.artisans(id) ON DELETE CASCADE,
    consumer_id INTEGER REFERENCES public.artisans(id) ON DELETE CASCADE,
    material TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 2. POLITIQUES DE SÉCURITÉ (Row Level Security - RLS)
-- ==========================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.b2b_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.b2b_matches ENABLE ROW LEVEL SECURITY;

-- Profils : chacun peut lire les profils, mais seul l'utilisateur peut modifier le sien
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Artisans et Produits : tout le monde peut lire (catalogue public)
CREATE POLICY "Artisans are viewable by everyone." ON public.artisans FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone." ON public.products FOR SELECT USING (true);

-- B2B : tout le monde peut lire
CREATE POLICY "B2B Items are viewable by everyone." ON public.b2b_items FOR SELECT USING (true);
CREATE POLICY "B2B Matches are viewable by everyone." ON public.b2b_matches FOR SELECT USING (true);

-- Orders : Les utilisateurs ne voient que leurs propres commandes
CREATE POLICY "Users can view their own orders." ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders." ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 3. TRIGGERS (Création auto de profil)
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'role', 'client'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
