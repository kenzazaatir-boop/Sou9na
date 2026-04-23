import { useState } from 'react';
import { motion } from 'framer-motion';
import { Recycle, Package, HandCoins, MapPin, Search, Filter, Plus, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks';
import { b2bItems, b2bMatches } from '@/lib/b2bData';
import { Link } from 'react-router-dom';

export function B2BMarket() {
  const { SEOComponent } = useSEO();
  const [activeTab, setActiveTab] = useState<'offers' | 'requests' | 'matches'>('offers');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const offers = b2bItems.filter(item => item.type === 'offer');
  const requests = b2bItems.filter(item => item.type === 'request');

  const filteredItems = (activeTab === 'offers' ? offers : requests).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.materialCategory === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24 pb-24">
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-olive/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-olive/10 text-olive text-xs font-bold uppercase tracking-wider mb-4">
                  <Recycle className="w-4 h-4" />
                  Soukna Loops B2B
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                  Bourse Circulaire
                </h1>
                <p className="text-gray-600 max-w-2xl text-lg">
                  L'espace dédié aux artisans et producteurs pour échanger, donner ou vendre leurs sous-produits. Rien ne se perd, tout se transforme.
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="gradient-terracotta text-white rounded-xl shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Publier une annonce
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-white p-1 rounded-2xl shadow-sm border border-gray-100 max-w-md mb-8">
            <button
              onClick={() => setActiveTab('offers')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'offers' ? 'bg-olive text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Offres disponibles
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'requests' ? 'bg-olive text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Demandes
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'matches' ? 'bg-terracotta text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Matchmaking
            </button>
          </div>

          {/* Tab Content: Offers & Requests */}
          {(activeTab === 'offers' || activeTab === 'requests') && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }}
            >
              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une matière (ex: bois, laine...)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-olive focus:ring-2 focus:ring-olive/20 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <select
                    className="w-full sm:w-48 pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:border-olive focus:ring-2 focus:ring-olive/20 outline-none appearance-none bg-white font-medium text-gray-700"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">Toutes catégories</option>
                    <option value="Biomasse">Biomasse & Végétal</option>
                    <option value="Textile">Textile & Laine</option>
                    <option value="Bois">Bois & Dérivés</option>
                    <option value="Argile">Argile & Minéral</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-card transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                        item.materialCategory === 'Biomasse' ? 'bg-green-100 text-green-700' :
                        item.materialCategory === 'Textile' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {item.materialCategory}
                      </span>
                      <span className="text-xs text-gray-400">{item.datePosted}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-olive transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Package className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">{item.quantity}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <HandCoins className="w-4 h-4 mr-2 text-terracotta" />
                        <span className="font-bold text-terracotta">{item.price}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gray-50 text-gray-900 hover:bg-olive hover:text-white transition-colors border border-gray-200">
                      Contacter l'artisan
                    </Button>
                  </motion.div>
                ))}
                
                {filteredItems.length === 0 && (
                  <div className="col-span-full py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Aucun résultat</h3>
                    <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Tab Content: Matches */}
          {activeTab === 'matches' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }}
            >
              <div className="bg-terracotta/5 rounded-3xl p-8 border border-terracotta/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">L'Intelligence Circulaire</h2>
                  <p className="text-gray-600 max-w-xl">
                    Notre algorithme identifie automatiquement les synergies entre vos déchets et les besoins des autres artisans de votre région.
                  </p>
                </div>
                <Button className="gradient-terracotta text-white shrink-0">
                  Calculer mes synergies
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 px-2">Histoires à succès (Soukna Loops)</h3>
                {b2bMatches.map((match) => (
                  <div key={match.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                    
                    <div className="flex-1 text-center md:text-right">
                      <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto md:ml-auto md:mr-0 mb-3 overflow-hidden border-2 border-white shadow-md">
                         <img src={`https://i.pravatar.cc/150?u=${match.supplierId}`} alt="Supplier" />
                      </div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Fournisseur</p>
                      <Link to={`/artisan/${match.supplierId}`} className="font-bold text-gray-900 hover:text-olive">Artisan #{match.supplierId}</Link>
                    </div>

                    <div className="flex flex-col items-center shrink-0 px-4">
                      <span className="text-xs font-bold text-olive bg-olive/10 px-3 py-1 rounded-full mb-2 border border-olive/20">
                        {match.material}
                      </span>
                      <ArrowLeftRight className="w-8 h-8 text-gray-300" />
                      <div className="w-px h-8 bg-gradient-to-b from-gray-200 to-transparent mt-2 hidden md:block" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto md:mr-auto md:ml-0 mb-3 overflow-hidden border-2 border-white shadow-md">
                         <img src={`https://i.pravatar.cc/150?u=${match.consumerId}`} alt="Consumer" />
                      </div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Utilisateur</p>
                      <Link to={`/artisan/${match.consumerId}`} className="font-bold text-gray-900 hover:text-terracotta">Artisan #{match.consumerId}</Link>
                    </div>

                    <div className="flex-[2] bg-gray-50 rounded-xl p-4 text-sm text-gray-600 italic border border-gray-100">
                      "{match.description}"
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </>
  );
}
