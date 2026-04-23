export interface B2BItem {
  id: string;
  type: 'offer' | 'request';
  title: string;
  description: string;
  materialCategory: 'Biomasse' | 'Textile' | 'Bois' | 'Argile' | 'Autre';
  quantity: string;
  price: string; // 'Gratuit', 'Échange', or a price
  location: string;
  artisanId: number;
  datePosted: string;
  status: 'active' | 'fulfilled';
}

export interface B2BMatch {
  id: string;
  supplierId: number; // The one providing waste
  consumerId: number; // The one using it
  material: string;
  description: string;
}

export const b2bItems: B2BItem[] = [
  {
    id: 'o1',
    type: 'offer',
    title: 'Déchets de bois d\'olivier (Sciure et petites branches)',
    description: 'Suite à la taille de mes oliviers et la préparation du bois, j\'ai une grande quantité de sciure et petites branches idéales pour le chauffage ou compost.',
    materialCategory: 'Biomasse',
    quantity: '500 kg',
    price: 'Gratuit (à récupérer)',
    location: 'Sfax',
    artisanId: 2, // Mohamed Trabelsi (Huiles)
    datePosted: '2023-10-15',
    status: 'active'
  },
  {
    id: 'o2',
    type: 'offer',
    title: 'Chutes de laine naturelle',
    description: 'Bouts de laine colorés (teinture naturelle) non utilisables pour les grands tapis. Parfait pour le rembourrage ou petits projets.',
    materialCategory: 'Textile',
    quantity: '15 kg',
    price: 'Échange contre produits',
    location: 'Kasserine',
    artisanId: 3, // Aïcha Mansouri (Tapis)
    datePosted: '2023-10-20',
    status: 'active'
  },
  {
    id: 'r1',
    type: 'request',
    title: 'Besoin de combustible naturel pour four',
    description: 'Je cherche du bois de chauffe, grignons d\'olive ou sciure pour alimenter mon four à poterie traditionnel.',
    materialCategory: 'Biomasse',
    quantity: '100 kg / mois',
    price: 'Achat',
    location: 'Tataouine',
    artisanId: 4, // Zahra Belhaj (Poterie)
    datePosted: '2023-10-22',
    status: 'active'
  },
  {
    id: 'o3',
    type: 'offer',
    title: 'Déchets de noyaux de dattes',
    description: 'Noyaux secs et propres, excellents pour faire du café de noyaux ou comme combustible.',
    materialCategory: 'Biomasse',
    quantity: '50 kg',
    price: 'Gratuit',
    location: 'Nabeul',
    artisanId: 1, // Fatma Ben Ali
    datePosted: '2023-10-25',
    status: 'active'
  }
];

export const b2bMatches: B2BMatch[] = [
  {
    id: 'm1',
    supplierId: 2, // Mohamed (Olive)
    consumerId: 4, // Zahra (Poterie)
    material: 'Grignons et bois d\'olivier',
    description: 'Zahra utilise les déchets de bois d\'olivier de Mohamed pour alimenter son four à poterie traditionnel de Tataouine, créant une boucle 100% naturelle.'
  },
  {
    id: 'm2',
    supplierId: 3, // Aïcha (Tapis)
    consumerId: 5, // Samir (Déco)
    material: 'Chutes de laine',
    description: 'Samir récupère les chutes de laine tissée d\'Aïcha pour créer des détails texturés sur ses luminaires contemporains.'
  }
];
