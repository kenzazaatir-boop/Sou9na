const fs = require('fs');

// Read scraped data
const raw = JSON.parse(fs.readFileSync('src/data_scraped.json', 'utf-8'));

// Fix prices: prices are scraped in millimes (e.g., 23000 = 23.000 TND)
const fixedProducts = raw.MOCK_PRODUCTS.map(p => ({
  ...p,
  price: +(p.price / 1000).toFixed(3), // convert millimes to TND
  rating: +p.rating.toFixed(1),
}));

// Build a rich artisan database with real Tunisian artisan photos from Unsplash
const RICH_ARTISANS = [
  {
    id: 1,
    name: "Fatma Ben Ali",
    nameAr: "فاطمة بن علي",
    location: "Nabeul",
    locationAr: "نابل",
    specialty: "Agro-alimentaire & Conserves",
    specialtyAr: "مواد غذائية ومعلبات",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    totalSales: 512,
    productCount: 18,
    productsCount: 18,
    bio: "Fatma est une maître artisane de Nabeul spécialisée dans les conserves et produits du terroir tunisien. Avec 20 ans d'expérience, elle perpétue des recettes ancestrales transmises par sa grand-mère.",
    bioAr: "فاطمة حرفية ماهرة من نابل متخصصة في المعلبات ومنتجات التراث التونسي. بخبرة 20 عامًا، تحافظ على وصفات أجدادها.",
    yearsExperience: 20,
    certifications: ["Label Bio Tunisie", "Artisan d'Art 2019"],
    socialLinks: { instagram: "@fatma_nabeul_artisan" }
  },
  {
    id: 2,
    name: "Mohamed Trabelsi",
    nameAr: "محمد الطرابلسي",
    location: "Sfax",
    locationAr: "صفاقس",
    specialty: "Huiles & Épices",
    specialtyAr: "زيوت وتوابل",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    totalSales: 389,
    productCount: 22,
    productsCount: 22,
    bio: "Mohamed, apiculteur et oléiculteur de Sfax, cultive ses oliviers depuis 3 générations. Il produit une huile d'olive extra-vierge primée internationalement et commercialise épices et produits dérivés.",
    bioAr: "محمد مزارع زيتون ونحّال من صفاقس، يزرع أشجار الزيتون منذ 3 أجيال. ينتج زيت الزيتون الحائز على جوائز دولية.",
    yearsExperience: 25,
    certifications: ["IGP Huile d'Olive Sfax", "Bio Certified EU"],
    socialLinks: { instagram: "@mohamed_sfax_huiles" }
  },
  {
    id: 3,
    name: "Aïcha Mansouri",
    nameAr: "عائشة المنصوري",
    location: "Kasserine",
    locationAr: "القصرين",
    specialty: "Tapis & Tissage Berbère",
    specialtyAr: "سجاد ونسيج أمازيغي",
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    totalSales: 274,
    productCount: 14,
    productsCount: 14,
    bio: "Tisserande depuis l'âge de 12 ans, Aïcha maîtrise l'art du Margoum berbère de Kasserine. Ses créations uniques mêlent motifs ancestraux et couleurs naturelles issues de plantes locales.",
    bioAr: "تنسج عائشة منذ سن الثانية عشرة، وتتقن فن المرقوم الأمازيغي من القصرين. إبداعاتها تجمع بين الأنماط الأجدادية والألوان الطبيعية.",
    yearsExperience: 30,
    certifications: ["Artisane d'Excellence UNESCO", "Patrimoine Immatériel Tunisie"],
    socialLinks: { instagram: "@aicha_tapis_kasserine" }
  },
  {
    id: 4,
    name: "Zahra Belhaj",
    nameAr: "زهرة بلحاج",
    location: "Tataouine",
    locationAr: "تطاوين",
    specialty: "Poterie & Céramique",
    specialtyAr: "فخار وخزف",
    rating: 4.85,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    totalSales: 198,
    productCount: 16,
    productsCount: 16,
    bio: "Zahra est potière dans la tradition des femmes du Sud tunisien. Elle façonne des pièces uniques en argile locale avec des techniques millénaires, en s'inspirant de l'architecture troglodyte de Tataouine.",
    bioAr: "زهرة خزّافة تتبع تقاليد نساء الجنوب التونسي. تصنع قطعًا فريدة من الطين المحلي بتقنيات ألفية مستوحاة من معمار الكهوف في تطاوين.",
    yearsExperience: 15,
    certifications: ["Artisane du Terroir Sud", "Prix Régional Artisanat 2022"],
    socialLinks: { instagram: "@zahra_poterie_tataouine" }
  },
  {
    id: 5,
    name: "Samir Cherni",
    nameAr: "سمير شرني",
    location: "Tunis",
    locationAr: "تونس",
    specialty: "Décoration & Luminaires",
    specialtyAr: "ديكور وإضاءة",
    rating: 4.75,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    totalSales: 431,
    productCount: 25,
    productsCount: 25,
    bio: "Designer et artisan basé à la Médina de Tunis, Samir crée des pièces de décoration et luminaires en rotin, jute et métal recyclé. Il fusionne l'esthétique traditionnelle kairouanaise avec le design contemporain.",
    bioAr: "مصمم وحرفي يعمل في المدينة العتيقة بتونس، يصنع سمير قطع ديكور ومصابيح من الروطان والجوت والمعدن المعاد تصنيعه.",
    yearsExperience: 12,
    certifications: ["Designer Certifié ISET", "Artisan Médina de Tunis"],
    socialLinks: { instagram: "@samir_deco_tunis", facebook: "SamirCherniArtisan" }
  },
  {
    id: 6,
    name: "Leila Chaabane",
    nameAr: "ليلى الشعبان",
    location: "Sidi Bou Said",
    locationAr: "سيدي بوسعيد",
    specialty: "Bijoux & Accessoires",
    specialtyAr: "مجوهرات وإكسسوارات",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    totalSales: 623,
    productCount: 35,
    productsCount: 35,
    bio: "Créatrice de bijoux de la Méditerranée, Leila conçoit des pièces uniques inspirées des symboles berbères et andalous. Ses créations en argent, perles et pierres naturelles sont portées par des clientes du monde entier.",
    bioAr: "مصممة مجوهرات من البحر الأبيض المتوسط، تصمم ليلى قطعًا فريدة من الفضة واللؤلؤ والأحجار الطبيعية مستوحاة من الرموز الأمازيغية.",
    yearsExperience: 18,
    certifications: ["Bijoutière Créatrice Certifiée", "Export Excellence Award 2023"],
    socialLinks: { instagram: "@leila_bijoux_sidibousaid" }
  },
  {
    id: 7,
    name: "Khaled Ben Youssef",
    nameAr: "خالد بن يوسف",
    location: "Djerba",
    locationAr: "جربة",
    specialty: "Cosmétiques Naturels",
    specialtyAr: "مستحضرات تجميل طبيعية",
    rating: 4.88,
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    totalSales: 356,
    productCount: 20,
    productsCount: 20,
    bio: "Pharmacien reconverti en artisan, Khaled de Djerba formule des soins naturels à base de plantes endémiques tunisiennes. Ses produits, certifiés bio, combinent savoir-faire traditionnel et approche scientifique moderne.",
    bioAr: "صيدلاني تحوّل إلى حرفي، يصنع خالد من جربة مستحضرات تجميل طبيعية من النباتات التونسية المحلية المعتمدة بيولوجيًا.",
    yearsExperience: 10,
    certifications: ["Bio Certified", "Ecocert Tunisia"],
    socialLinks: { instagram: "@khaled_cosmetics_djerba" }
  },
  {
    id: 8,
    name: "Amira Guettat",
    nameAr: "أميرة قيتات",
    location: "Gafsa",
    locationAr: "قفصة",
    specialty: "Vannerie & Halfa",
    specialtyAr: "حياكة وحلفاء",
    rating: 4.92,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    totalSales: 187,
    productCount: 12,
    productsCount: 12,
    bio: "Vannière de Gafsa, Amira maîtrise l'art de la Halfa, plante endémique des steppes tunisiennes. Elle tresse des couffins, nattes et objets décoratifs 100% naturels, faisant vivre cette tradition menacée.",
    bioAr: "حرفية قفصية، تتقن أميرة فن الحلفاء، النبات المحلي للسهوب التونسية. تضفر قففًا وحصائر ومنتجات ديكورية طبيعية 100%.",
    yearsExperience: 22,
    certifications: ["Artisane Halfa Certifiée", "Patrimoine Gafsa 2020"],
    socialLinks: { instagram: "@amira_halfa_gafsa" }
  }
];

// Map artisan names used in products to their IDs
const artisanNameToId = {
  "Fatma de Nabeul": 1,
  "Mohamed de Sfax": 2,
  "Aïcha de Kasserine": 3,
  "Zahra de Tataouine": 4,
  "Samir de Tunis": 5,
};

const artisanIdToObj = {};
RICH_ARTISANS.forEach(a => artisanIdToObj[a.id] = a);

const mappedProducts = fixedProducts.map(p => {
  const artId = artisanNameToId[p.artisan] || 1;
  const artObj = artisanIdToObj[artId];
  return {
    ...p,
    artisanId: artId,
    artisan: artObj.name,
    location: artObj.location,
  };
});

// Output
const output = { MOCK_PRODUCTS: mappedProducts, MOCK_ARTISANS: RICH_ARTISANS };
fs.writeFileSync('src/data_processed.json', JSON.stringify(output, null, 2));
console.log(`Saved ${mappedProducts.length} products and ${RICH_ARTISANS.length} artisans to src/data_processed.json`);
