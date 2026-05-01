import { useState } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockOrders = [
  { id: '#ORD-001', customer: 'Ahmed Ben Ali', date: '01/05/2026', amount: '120 TND', status: 'En attente', items: 2 },
  { id: '#ORD-002', customer: 'Sarah Mansour', date: '01/05/2026', amount: '450 TND', status: 'En attente', items: 1 },
  { id: '#ORD-003', customer: 'Mohamed Trabelsi', date: '30/04/2026', amount: '85 TND', status: 'Expédié', items: 3 },
  { id: '#ORD-004', customer: 'Leila Karray', date: '28/04/2026', amount: '210 TND', status: 'Livré', items: 1 },
  { id: '#ORD-005', customer: 'Sami Bouzid', date: '25/04/2026', amount: '60 TND', status: 'Annulé', items: 1 },
];

export function Orders() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Rechercher une commande..." 
            className="pl-10 h-12 bg-white border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto h-12 bg-white font-bold rounded-xl shadow-sm border-gray-200">
          <Filter className="w-5 h-5 mr-2 text-gray-500" />
          Filtrer
        </Button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Commande</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4 text-center">Articles</th>
                <th className="px-6 py-4">Montant</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{order.customer}</td>
                  <td className="px-6 py-4 text-center text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold
                      ${order.status === 'En attente' ? 'bg-amber-100 text-amber-700' : 
                        order.status === 'Expédié' ? 'bg-blue-100 text-blue-700' : 
                        order.status === 'Livré' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-red-100 text-red-700'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-terracotta">
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
