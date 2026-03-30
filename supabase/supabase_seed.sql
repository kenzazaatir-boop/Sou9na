-- Seed data for Soukna Supabase Backend

-- Clear existing data (optional, be careful!)
-- DELETE FROM public.products;
-- DELETE FROM public.artisans;

-- 1. Insert Artisans
INSERT INTO public.artisans (id, name, specialty, location, description, image, rating, products_count)
VALUES 
    ('a1b1b1b1-1111-1111-1111-111111111111', 'Fatma Ben Ali', 'Agro-alimentaire', 'Nabeul', 'Spécialiste des produits du terroir et épices traditionnelles.', 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80', 4.9, 12),
    ('a2b2b2b2-2222-2222-2222-222222222222', 'Mohamed Trabelsi', 'Agro-alimentaire', 'Sfax', 'Expert en huiles d’olive extra vierges et produits dérivés.', 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80', 4.8, 8),
    ('a3b3b3b3-3333-3333-3333-333333333333', 'Ahmed Gharbi', 'Agro-alimentaire', 'Zaghouan', 'Producteur de miel naturel et produits de la ruche.', 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80', 5.0, 15),
    ('a4b4b4b4-4444-4444-4444-444444444444', 'Salma Hamdi', 'Agro-alimentaire', 'Tozeur', 'Spécialiste des dattes et produits à base de dattes du Sud.', 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80', 4.9, 20),
    ('a5b5b5b5-5555-5555-5555-555555555555', 'Amina Bouaziz', 'Artisanat', 'Kairouan', 'Tissage traditionnel et tapis de Kairouan faits main.', 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80', 4.7, 18),
    ('a6b6b6b6-6666-6666-6666-666666666666', 'Karim Jaziri', 'Artisanat', 'Nabeul', 'Maître potier perpétuant le savoir-faire de Nabeul.', 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80', 4.8, 10);

-- 2. Insert Products
INSERT INTO public.products (name, description, price, category, image, artisan_id, rating, reviews, eco_score, stock, tags)
VALUES 
    ('Huile d''Olive Extra Vierge', 'Huile pressée à froid issue des oliviers centenaires de Sfax.', 35.00, 'alimentaire', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80', 'a2b2b2b2-2222-2222-2222-222222222222', 4.8, 189, 95, 30, ARRAY['Bio', 'Traditionnel']),
    ('Harissa Artisanale', 'Harissa préparée selon la recette traditionnelle au pilon.', 12.00, 'alimentaire', 'https://images.unsplash.com/photo-1589113103503-496664010522?auto=format&fit=crop&q=80', 'a1b1b1b1-1111-1111-1111-111111111111', 4.9, 234, 92, 45, ARRAY['Bio', 'Local']),
    ('Miel de Thym', 'Miel pur récolté dans les montagnes de Zaghouan.', 45.00, 'alimentaire', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80', 'a3b3b3b3-3333-3333-3333-333333333333', 5.0, 156, 88, 20, ARRAY['Naturel', 'Montagne']),
    ('Dattes Deglet Nour', 'Dattes de qualité supérieure branchées.', 28.00, 'alimentaire', 'https://images.unsplash.com/photo-1506477331477-33d3d7890f5c?auto=format&fit=crop&q=80', 'a4b4b4b4-4444-4444-4444-444444444444', 4.9, 312, 90, 50, ARRAY['Désert', 'Premium']),
    ('Margoum Traditionnel', 'Tapis berbère tissé main avec des motifs ancestraux.', 450.00, 'artisanat', 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80', 'a5b5b5b5-5555-5555-5555-555555555555', 4.7, 89, 85, 5, ARRAY['Traditionnel', 'Fait main']),
    ('Service à Café en Céramique', 'Ensemble de 6 tasses et plateau décorés à la main.', 85.00, 'artisanat', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80', 'a6b6b6b6-6666-6666-6666-666666666666', 4.8, 145, 78, 15, ARRAY['Céramique', 'Décoratif']),
    ('Fouta Tunisienne', 'Tissage en coton bio pour le hammam ou la plage.', 55.00, 'textile', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80', 'a1b1b1b1-1111-1111-1111-111111111111', 4.7, 234, 87, 35, ARRAY['Coton bio', 'Plage']),
    ('Sacs Éco-responsables', 'Lot de sacs réutilisables en textile recyclé.', 15.00, 'ecologique', 'https://images.unsplash.com/photo-1591336397302-00082983273b?auto=format&fit=crop&q=80', 'a5b5b5b5-5555-5555-5555-555555555555', 4.9, 234, 98, 100, ARRAY['Recyclé', 'Zéro déchet']);
