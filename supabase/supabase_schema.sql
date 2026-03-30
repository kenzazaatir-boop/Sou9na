-- SQL Schema for Soukna Supabase Backend

-- 1. Artisans Table
CREATE TABLE IF NOT EXISTS public.artisans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    specialty TEXT,
    location TEXT,
    description TEXT,
    image TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    products_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT,
    image TEXT,
    artisan_id UUID REFERENCES public.artisans(id),
    rating DECIMAL(3,2) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    eco_score INTEGER,
    stock INTEGER DEFAULT 0,
    tags TEXT[], -- Array of strings
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    type TEXT DEFAULT 'client', -- 'client' or 'artisan'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Public Read Artisans" ON public.artisans FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
