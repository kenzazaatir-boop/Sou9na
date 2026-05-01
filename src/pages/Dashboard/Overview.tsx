import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const stats = [
  {
    name: 'Revenu Total',
    value: '4,500 TND',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
  {
    name: 'Commandes en attente',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    name: 'Produits Actifs',
    value: '24',
    change: '0',
    trend: 'neutral',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Ahmed Ben Ali', date: 'Aujourd\'hui', amount: '120 TND', status: 'En attente' },
  { id: '#ORD-002', customer: 'Sarah Mansour', date: 'Aujourd\'hui', amount: '450 TND', status: 'En attente' },
  { id: '#ORD-003', customer: 'Mohamed Trabelsi', date: 'Hier', amount: '85 TND', status: 'Expédié' },
  { id: '#ORD-004', customer: 'Leila Karray', date: 'Hier', amount: '210 TND', status: 'Livré' },
];

export function Overview() {
  return (
    <div className="space-y-6">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-emerald-500' : 'text-gray-400'}`} />
                <span className={stat.trend === 'up' ? 'text-emerald-600 font-medium' : 'text-gray-500'}>
                  {stat.change}
                </span>
                <span className="text-gray-400 ml-2">depuis le mois dernier</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Commandes Récentes</h2>
            <Link to="/dashboard/orders">
              <Button variant="ghost" size="sm" className="text-terracotta hover:text-terracotta hover:bg-terracotta/10">
                Tout voir <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Référence</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Montant</th>
                  <th className="px-6 py-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold
                        ${order.status === 'En attente' ? 'bg-amber-100 text-amber-700' : 
                          order.status === 'Expédié' ? 'bg-blue-100 text-blue-700' : 
                          'bg-emerald-100 text-emerald-700'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-terracotta to-warm-gold rounded-2xl p-6 text-white shadow-md">
            <h3 className="font-bold text-lg mb-2">Besoin d'un coup de pouce ?</h3>
            <p className="text-sm text-white/80 mb-6">
              Améliorez la visibilité de vos produits en ajoutant des photos de haute qualité de votre atelier.
            </p>
            <Button className="w-full bg-white text-terracotta hover:bg-gray-50 font-bold">
              Mettre à jour mon profil
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-900 mb-4">Statut Enda Tamweel</h3>
             <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                   <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                 </div>
                 <div>
                   <p className="text-sm font-bold text-emerald-900">Compte Vérifié</p>
                   <p className="text-xs text-emerald-600">Avantages activés</p>
                 </div>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
