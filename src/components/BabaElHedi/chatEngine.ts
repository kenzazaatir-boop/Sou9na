/**
 * Baba El Hedi - Moteur de Conversation Intelligent
 * Sans API externe - Basé sur une détection d'intention locale
 */

export type Language = 'fr' | 'ar';

export interface ChatMessage {
  id: string;
  role: 'baba' | 'user';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  products?: ProductCard[];
}

export interface ProductCard {
  name: string;
  category: string;
  price: string;
  ecoScore: number;
  emoji: string;
  link: string;
}

// ─── Catalogue de produits ────────────────────────────────────────────────────
const PRODUCTS_CATALOG = [
  { name: 'Tapis Margoum', category: 'artisanat', price: '250 TND', ecoScore: 92, emoji: '🧶', tags: ['cadeau', 'textile', 'décoration', 'luxury'], link: '/catalog' },
  { name: "Huile d'Olive Extra Vierge", category: 'alimentaire', price: '35 TND', ecoScore: 98, emoji: '🫒', tags: ['cadeau', 'alimentaire', 'eco', 'bio', 'naturel'], link: '/catalog' },
  { name: 'Poterie de Sejnane', category: 'artisanat', price: '85 TND', ecoScore: 95, emoji: '🏺', tags: ['cadeau', 'décoration', 'artisanat', 'femme'], link: '/catalog' },
  { name: 'Couffin en Halfa', category: 'ecologique', price: '45 TND', ecoScore: 99, emoji: '🧺', tags: ['eco', 'naturel', 'recyclable', 'cadeau'], link: '/catalog' },
  { name: 'Céramique de Nabeul', category: 'artisanat', price: '65 TND', ecoScore: 88, emoji: '🎨', tags: ['cadeau', 'décoration', 'coloré'], link: '/catalog' },
  { name: 'Fouta Tunisienne', category: 'textile', price: '28 TND', ecoScore: 85, emoji: '🛁', tags: ['cadeau', 'textile', 'bain', 'plage'], link: '/catalog' },
  { name: "Savon à l'Huile d'Olive", category: 'ecologique', price: '15 TND', ecoScore: 96, emoji: '🧼', tags: ['eco', 'naturel', 'bien-être', 'cadeau', 'bio'], link: '/catalog' },
  { name: 'Dattes Deglet Nour', category: 'alimentaire', price: '22 TND', ecoScore: 90, emoji: '🌴', tags: ['alimentaire', 'cadeau', 'sucré', 'naturel'], link: '/catalog' },
];

// ─── Storytelling par produit ─────────────────────────────────────────────────
const STORIES: Record<string, Record<Language, string>> = {
  poterie: {
    fr: "🏺 *Laisse-moi te raconter...*\nL'argile de Sejnane vient des collines du Nord. Ce sont les femmes Berbères qui la ramassent, à la main, dans les vallées. Elles la façonnent sans tour de potier — juste leurs doigts habiles et une pierre polie. Les couleurs ? Extraites de feuilles de caroube et de rouille naturelle. Une poterie de Sejnane, c'est 5000 ans de savoir-faire dans tes mains ! 🤲",
    ar: "🏺 *خليني نحكيلك...*\nطين سجنان يجي من جبال الشمال. نساء أمازيغيات يلمّوه من الوديان بأيديهم. يشكّلوه بدون دولاب — بس بأصابعهم وحجر ناعم. الألوان من أوراق الخروب وصدأ طبيعي. طاجين واحد من سجنان فيه 5000 سنة من الخبرة ! 🤲"
  },
  tapis: {
    fr: "🧶 *Une histoire tissée avec amour...*\nDans les montagnes de Kasserine, des femmes se lèvent avant l'aube pour traire les brebis. La laine est lavée à l'eau de source, séchée au soleil, puis filée à la main pendant des semaines. Chaque point du Margoum raconte une fleur, un oiseau, une prière. Acheter un tapis Soukna, c'est acheter des mois de patience ! ❤️",
    ar: "🧶 *حكاية منسوجة بالحب...*\nفي جبال القصرين، نساء يصحوا قبل الفجر باش يحلبوا الغنم. الصوف يتغسل بماء الينابيع، يتجفف في الشمس، وينغزل باليد أسابيع. كل غرزة في المرقوم تحكي وردة، طير، أو دعوة. كي تشري زربية من سوقنا، تشري شهور من الصبر ! ❤️"
  },
  halfa: {
    fr: "🧺 *La magie de la Halfa...*\nLa plante Halfa pousse sauvagement dans les steppes de Gafsa et Kasserine. Nos artisans la cueillent à la main, la font sécher des jours entiers, puis la tressent pendant des heures pour créer couffins, nattes et paniers. C'est l'alternative zéro-déchet au plastique que la Tunisie offre au monde ! ♻️",
    ar: "🧺 *سحر الحلفاء...*\nنبتة الحلفاء تكبر بشكل طبيعي في سهول قفصة والقصرين. حرفيينا يلقطوها باليد، يجففوها أيام، وبعد يضفروها ساعات باش يصنعوا قفف وحصائر. هي البديل الطبيعي للبلاستيك اللي تونس تهديه للعالم ! ♻️"
  },
  olive: {
    fr: "🫒 *L'or liquide de Tunisie...*\nLa Tunisie est dans le top 3 mondial des producteurs d'huile d'olive ! Mais savais-tu que nos artisans récupèrent même les grignons (résidus d'olives) pour faire de l'engrais naturel ? Zéro déchet ! Une bouteille d'huile d'olive Soukna, c'est tout le cycle de vie respecté, du verger à ta table. 🌿",
    ar: "🫒 *الذهب السائل لتونس...*\nتونس في أول 3 دول منتجة لزيت الزيتون في العالم ! ولكن عارف أن حرفيينا يستعملوا حتى ثفل الزيتون كسماد طبيعي ؟ صفر نفايات ! قارورة زيت زيتون من سوقنا فيها كل دورة الحياة الكاملة، من البستان لطاولتك. 🌿"
  }
};

// ─── Éducation économie circulaire ───────────────────────────────────────────
const ECO_KNOWLEDGE: Record<Language, string[]> = {
  fr: [
    "♻️ **L'économie circulaire, c'est simple !**\n\nImagine l'olive : elle donne l'huile, les grignons deviennent engrais, les branches nourrissent le feu... Rien n'est jeté ! Soukna applique ce principe : emballages recyclables, circuits courts, artisans soutenus. Chaque achat ici a une \"2ème vie\" ! 🌳",
    "🌿 **Pourquoi nos produits ont un \"Score Éco\" ?**\n\nJ'ai vécu 65 ans, et j'ai vu la mer de Kerkennah changer... Le Score Éco note chaque produit selon : matières naturelles, distance parcourue, emballage, et soutien à l'artisan local. Plus le score est élevé, plus ta conscience est en paix ! 😌",
    "🤝 **Soukna & Enda Finance**\n\nNos artisans n'ont pas toujours accès aux banques. Enda leur offre des micro-crédits. Ton achat finance directement la prochaine collection d'un artisan, qui rembourse Enda, qui aide un autre artisan. C'est le vrai cycle économique vertueux ! 💚"
  ],
  ar: [
    "♻️ **الاقتصاد الدائري، بسيط !**\n\nتخيل حبة الزيتون: تعطي الزيت، والثفل يصير سماد، والأغصان تعطي الدفا... ما يتحرق شيء ! سوقنا تطبق هذا المبدأ: تغليف قابل للتدوير، مسارات قصيرة، حرفيين مدعومين. كل شراء هنا تعاش \"حياة ثانية\" ! 🌳",
    "🌿 **ليش منتجاتنا فيها \"نقطة بيئة\" ؟**\n\nعشت 65 سنة، وشفت كيف تغيّر البحر... النقطة البيئية تقيّم كل منتج حسب: مواد طبيعية، مسافة التنقل، التغليف، ودعم الحرفي المحلي. كلما كانت النقطة عالية، كلما ضميرك مرتاح ! 😌",
    "🤝 **سوقنا وأندا ميكرو-كريدي**\n\nحرفيينا ما يوصلوش دايما للبنوك. أندا تعطيهم قروض صغيرة. شراؤك يموّل مباشرة مجموعة حرفي قادمة، يسدد لأندا، اللي تساعد حرفي آخر. هذه هي الدورة الاقتصادية الحقيقية ! 💚"
  ]
};

// ─── Messages d'accueil ───────────────────────────────────────────────────────
export const WELCOME_MESSAGES: Record<Language, string> = {
  fr: "السلام عليكم ☀️\n\nAna Baba El Hedi ! Ancien artisan de Kairouan, maintenant sage du souk de Soukna.\n\nJe suis là pour t'aider à trouver le produit parfait, te raconter des histoires d'artisans, ou expliquer notre mission éco-responsable.\n\nQu'est-ce qui te ferait plaisir aujourd'hui ? 🤲",
  ar: "السلام عليكم ☀️\n\nأنا بابا الهادي ! حرفي قديم من القيروان، هوما الساعة شيخ سوق سوقنا.\n\nأنا هنا باش نعاونك تلقى المنتج المناسب، نحكيلك قصص الحرفيين، أو نشرحلك مبادرتنا البيئية.\n\nاش يفرحك اليوم ؟ 🤲"
};

export const QUICK_SUGGESTIONS: Record<Language, string[]> = {
  fr: ["🎁 Je veux un cadeau", "🌿 Produits écolos", "♻️ Économie circulaire", "🏺 Raconte-moi une histoire", "👨‍🎨 Nos artisans"],
  ar: ["🎁 أريد هدية", "🌿 منتجات بيئية", "♻️ الدورة البيئية", "🏺 احكيلي قصة", "👨‍🎨 حرفيينا"]
};

// ─── Moteur de détection d'intention ─────────────────────────────────────────
type Intent =
  | 'greeting'
  | 'gift'
  | 'eco'
  | 'circular'
  | 'story_pottery'
  | 'story_carpet'
  | 'story_halfa'
  | 'story_olive'
  | 'artisans'
  | 'training'
  | 'contact'
  | 'unknown';

function detectIntent(text: string): Intent {
  const t = text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove accents
    .trim();

  if (/^(bonjour|salam|ahlen|مرحبا|السلام|hello|hi|salut|bonsoir|صباح)/.test(t)) return 'greeting';
  if (/(cadeau|هدية|gift|offrir|idee|idée|anniversaire|عيدية|عيد)/.test(t)) return 'gift';
  if (/(ecolo|écolo|ecologique|bio|naturel|nature|vert|bيئة|بيئي|طبيعي|صديق للبيئة|éco)/.test(t)) return 'eco';
  if (/(circulaire|durabilite|durable|recyclage|circuit|enda|مستدام|دورة|تدوير|مستدامة)/.test(t)) return 'circular';
  if (/(poterie|ceramique|argile|sejnane|فخار|طين|خزف|سجنان)/.test(t)) return 'story_pottery';
  if (/(tapis|margoum|tissage|laine|زربية|مرقوم|صوف|نسيج)/.test(t)) return 'story_carpet';
  if (/(halfa|couffin|panier|tressage|حلفاء|قفة|سلة|ضفيرة)/.test(t)) return 'story_halfa';
  if (/(huile|olive|zitoun|زيتون|زيت|huile d.olive)/.test(t)) return 'story_olive';
  if (/(artisan|حرفي|حرفيين|artisans|savoir.faire|qui fait)/.test(t)) return 'artisans';
  if (/(formation|train|apprendre|cours|تدريب|تعلم|دروس)/.test(t)) return 'training';
  if (/(contact|joindre|appeler|email|message|اتصل|تواصل|رسالة)/.test(t)) return 'contact';
  return 'unknown';
}

function getRandomProducts(tags: string[], count = 3): ProductCard[] {
  const filtered = PRODUCTS_CATALOG.filter(p => p.tags.some(t => tags.includes(t)));
  const pool = filtered.length >= count ? filtered : PRODUCTS_CATALOG;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(p => ({
    name: p.name,
    category: p.category,
    price: p.price,
    ecoScore: p.ecoScore,
    emoji: p.emoji,
    link: p.link,
  }));
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ─── Générateur de réponse principal ──────────────────────────────────────────
export function generateResponse(userText: string, lang: Language): Omit<ChatMessage, 'id' | 'timestamp' | 'role'> {
  const intent = detectIntent(userText);

  switch (intent) {
    case 'greeting':
      return {
        content: lang === 'fr'
          ? "مرحبا يا صديقي ! 😄\nRavi de te voir ici ! Je suis Baba El Hedi, ton guide dans le souk de l'artisanat tunisien.\nQu'est-ce que tu cherches aujourd'hui ?"
          : "مرحبا يا صاحبي ! 😄\nسعيد بيك هنا ! أنا بابا الهادي، مرشدك في سوق الصنع التونسي.\nاش تحب تلقى اليوم ؟",
        suggestions: QUICK_SUGGESTIONS[lang],
      };

    case 'gift':
      return {
        content: lang === 'fr'
          ? "🎁 Quelle belle intention ! Voici mes coups de cœur pour offrir un cadeau authentiquement tunisien :"
          : "🎁 نيّة حلوة ! هازلك مختاراتي للهدايا التونسية الأصيلة :",
        products: getRandomProducts(['cadeau']),
        suggestions: lang === 'fr'
          ? ["💸 Moins de 30 TND", "🌿 Bio & Éco", "🏺 Décoration", "Autre idée ?"]
          : ["💸 أقل من 30 دينار", "🌿 بيو وبيئي", "🏺 ديكور", "فكرة أخرى ؟"],
      };

    case 'eco':
      return {
        content: lang === 'fr'
          ? "🌿 Voilà mes produits les plus écolos — Score Éco au maximum !"
          : "🌿 هازلك أكثر منتجاتنا صداقة للطبيعة — نقطة بيئية في أعلاها !",
        products: PRODUCTS_CATALOG
          .filter(p => p.ecoScore >= 90)
          .slice(0, 3)
          .map(p => ({ name: p.name, category: p.category, price: p.price, ecoScore: p.ecoScore, emoji: p.emoji, link: p.link })),
        suggestions: lang === 'fr'
          ? ["♻️ Économie circulaire", "🤝 Nos artisans", "🎁 Idée cadeau"]
          : ["♻️ الدورة البيئية", "🤝 حرفيينا", "🎁 فكرة هدية"],
      };

    case 'circular':
      return {
        content: getRandomItem(ECO_KNOWLEDGE[lang]),
        suggestions: lang === 'fr'
          ? ["En savoir plus 🌱", "🎁 Acheter local", "👨‍🎨 Voir les artisans"]
          : ["إعرف أكثر 🌱", "🎁 اشتري محلي", "👨‍🎨 شوف الحرفيين"],
      };

    case 'story_pottery':
      return {
        content: STORIES.poterie[lang],
        products: getRandomProducts(['décoration', 'artisanat']).slice(0, 2),
        suggestions: lang === 'fr'
          ? ["🧶 Histoire du tapis", "🫒 Histoire de l'olive", "🛍️ Voir la poterie"]
          : ["🧶 قصة الزربية", "🫒 قصة الزيتون", "🛍️ شوف الفخار"],
      };

    case 'story_carpet':
      return {
        content: STORIES.tapis[lang],
        products: getRandomProducts(['textile']).slice(0, 2),
        suggestions: lang === 'fr'
          ? ["🏺 Histoire de la poterie", "🫒 Histoire de l'olive", "🛍️ Voir les tapis"]
          : ["🏺 قصة الفخار", "🫒 قصة الزيتون", "🛍️ شوف الزرابي"],
      };

    case 'story_halfa':
      return {
        content: STORIES.halfa[lang],
        products: getRandomProducts(['eco', 'naturel']).slice(0, 2),
        suggestions: lang === 'fr'
          ? ["🏺 Histoire de la poterie", "🎁 Idée cadeau éco", "🛍️ Voir les couffins"]
          : ["🏺 قصة الفخار", "🎁 هدية بيئية", "🛍️ شوف القفف"],
      };

    case 'story_olive':
      return {
        content: STORIES.olive[lang],
        products: getRandomProducts(['alimentaire', 'bio']).slice(0, 2),
        suggestions: lang === 'fr'
          ? ["🧶 Histoire du tapis", "🏺 Histoire de la poterie", "🛍️ Voir l'huile"]
          : ["🧶 قصة الزربية", "🏺 قصة الفخار", "🛍️ شوف الزيت"],
      };

    case 'artisans':
      return {
        content: lang === 'fr'
          ? "👨‍🎨 Nos artisans sont le cœur de Soukna ! On soutient plus de 120 artisans à travers 15 régions de Tunisie.\n\n✅ Fatma de Nabeul — Poterie & Conserves\n✅ Mohamed de Sfax — Huile d'Olive\n✅ Aïcha de Kasserine — Tapis Margoum\n\nChaque profil a une histoire. Veux-tu que j'en raconte une ? 🤲"
          : "👨‍🎨 حرفيينا هم قلب سوقنا ! نحنا ندعموا أكثر من 120 حرفي في 15 ولاية تونسية.\n\n✅ فاطمة من نابل — فخار ومعلبات\n✅ محمد من صفاقس — زيت زيتون\n✅ عائشة من القصرين — زرابي مرقوم\n\nكل واحد عندو قصة. تحب نحكيلك ؟ 🤲",
        suggestions: lang === 'fr'
          ? ["🏺 Histoire de la poterie", "🧶 Histoire du tapis", "🌿 Voir leurs produits"]
          : ["🏺 قصة الفخار", "🧶 قصة الزربية", "🌿 شوف منتجاتهم"],
      };

    case 'training':
      return {
        content: lang === 'fr'
          ? "📚 Soukna propose des formations gratuites pour nos artisans partenaires !\n\n🎯 Gestion de boutique en ligne\n🎯 Photographie produit\n🎯 Packaging éco-responsable\n🎯 Micro-finance avec Enda\n\nLa prochaine session commence bientôt — places limitées !"
          : "📚 سوقنا تقدم تكوينات مجانية لحرفيينا الشركاء !\n\n🎯 إدارة المتجر الإلكتروني\n🎯 تصوير المنتجات\n🎯 تغليف صديق للبيئة\n🎯 تمويل أندا\n\nالدورة القادمة قريباً — الأماكن محدودة !",
        suggestions: lang === 'fr'
          ? ["📅 S'inscrire", "🤝 Nos artisans", "🛍️ Explorer le catalogue"]
          : ["📅 سجّل الآن", "🤝 حرفيينا", "🛍️ استكشف المتجر"],
      };

    case 'contact':
      return {
        content: lang === 'fr'
          ? "📞 Tu peux nous joindre facilement !\n\n📍 12 Rue Habib Bourguiba, Tunis\n📱 +216 71 000 000\n✉️ contact@soukna.tn\n⏰ Lun–Ven, 9h–18h\n\nOu envoie-nous un message depuis la page Contact — on répond en moins de 24h ! 😊"
          : "📞 تنجم تتواصل معانا بسهولة !\n\n📍 12 شارع الحبيب بورقيبة، تونس\n📱 71 000 000 216+\n✉️ contact@soukna.tn\n⏰ الإثنين–الجمعة، 9:00–18:00\n\nأو ابعثلنا رسالة من صفحة الاتصال — نردوا في أقل من 24 ساعة ! 😊",
        suggestions: lang === 'fr'
          ? ["📝 Page contact", "🛍️ Explorer", "🎁 Idée cadeau"]
          : ["📝 صفحة الاتصال", "🛍️ استكشف", "🎁 فكرة هدية"],
      };

    default:
      return {
        content: lang === 'fr'
          ? "🤔 Hmm, je n'ai pas bien compris, yamma ! Mais voici ce que je sais faire :"
          : "🤔 مش فهمت مليح، يمّا ! ولكن هازلك اش نعرف نعمل :",
        suggestions: QUICK_SUGGESTIONS[lang],
      };
  }
}

export function createMessage(role: 'baba' | 'user', content: string, extra?: Partial<ChatMessage>): ChatMessage {
  return {
    id: makeId(),
    role,
    content,
    timestamp: new Date(),
    ...extra,
  };
}
