import { useState } from 'react';
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownRight, 
  History,
  CheckCircle2,
  CreditCard,
  TrendingUp,
  Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const transactions = [
  { id: 'TRX-9982', date: '01/05/2026', type: 'Vente', description: 'Commande #ORD-001', amount: '+120.00 TND', status: 'Complété' },
  { id: 'TRX-9981', date: '28/04/2026', type: 'Vente', description: 'Commande #ORD-004', amount: '+210.00 TND', status: 'Complété' },
  { id: 'TRX-9980', date: '25/04/2026', type: 'Remboursement', description: 'Enda Tamweel (Mensualité)', amount: '-150.00 TND', status: 'Complété' },
  { id: 'TRX-9979', date: '15/04/2026', type: 'Retrait', description: 'Virement bancaire (BIAT)', amount: '-500.00 TND', status: 'Complété' },
];

export function Wallet() {
  const [isRepaying, setIsRepaying] = useState(false);
  const [balance, setBalance] = useState(1250.00);
  const [endaRemaining, setEndaRemaining] = useState(450.00);

  const handleRepayEnda = () => {
    if (balance < 150) {
      toast.error("Solde insuffisant pour la mensualité.");
      return;
    }
    
    setIsRepaying(true);
    setTimeout(() => {
      setBalance(prev => prev - 150);
      setEndaRemaining(prev => Math.max(0, prev - 150));
      setIsRepaying(false);
      toast.success("Mensualité de 150 TND remboursée avec succès !", {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      });
    }, 1500);
  };

  const progressPercentage = ((2000 - endaRemaining) / 2000) * 100;

  return (
    <div className="space-y-6">
      
      {/* Top Section: Balance & Enda */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Soukna Wallet Balance */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-white/5"></div>
          <div className="absolute bottom-0 right-20 -mb-10 w-24 h-24 rounded-full bg-white/5"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                <WalletIcon className="w-6 h-6 text-terracotta" />
              </div>
              <h2 className="text-xl font-bold font-serif">Mon Portefeuille</h2>
            </div>
            
            <p className="text-gray-400 text-sm font-medium mb-1">Solde Disponible</p>
            <h3 className="text-5xl font-black mb-8 tracking-tight">{balance.toFixed(2)} <span className="text-2xl text-gray-400 font-bold">TND</span></h3>
            
            <div className="flex gap-4">
              <Button className="flex-1 bg-terracotta hover:bg-[#e05a2b] text-white font-bold h-12 rounded-xl border-none">
                <ArrowUpRight className="w-5 h-5 mr-2" /> Retirer
              </Button>
              <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold h-12 rounded-xl border-none backdrop-blur-md">
                <History className="w-5 h-5 mr-2" /> Historique
              </Button>
            </div>
          </div>
        </div>

        {/* Enda Tamweel Integration */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <span className="text-emerald-600 font-black text-[10px] leading-tight text-center">ENDA<br/>TMW</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Micro-crédit Actif</h2>
                  <p className="text-sm text-gray-500">Prêt Équipement #8876421A</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">En règle</span>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-500">Remboursé : <span className="text-gray-900 font-bold">{(2000 - endaRemaining).toFixed(0)} TND</span></span>
                <span className="text-emerald-600 font-bold">Reste : {endaRemaining.toFixed(0)} TND</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-medium text-gray-600">Prochaine Mensualité</p>
              <p className="font-black text-gray-900">150.00 TND</p>
            </div>
            <Button 
              onClick={handleRepayEnda}
              disabled={isRepaying || endaRemaining <= 0}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl shadow-[0_4px_14px_rgba(5,150,105,0.3)] transition-all"
            >
              {isRepaying ? 'Traitement en cours...' : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  {endaRemaining <= 0 ? 'Crédit Soldé !' : 'Payer avec le solde Soukna'}
                </>
              )}
            </Button>
          </div>
        </div>

      </div>

      {/* Middle Section: Offers & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100/50 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-200/50 flex items-center justify-center shrink-0">
            <Gift className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Offre de fidélité Enda</h3>
            <p className="text-sm text-gray-600 mb-3">
              Vos excellentes ventes de ce mois vous rendent éligible à un crédit d'expansion à taux réduit (jusqu'à 3000 TND).
            </p>
            <Button variant="link" className="p-0 h-auto text-emerald-700 font-bold hover:text-emerald-800">
              Découvrir l'offre <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Projection des revenus</h3>
            <p className="text-sm text-gray-600">
              Basé sur vos visites actuelles, vous devriez générer environ <span className="font-bold text-gray-900">850 TND</span> supplémentaires cette semaine.
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Historique des Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/80 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID Transaction</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Montant</th>
                <th className="px-6 py-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{trx.id}</td>
                  <td className="px-6 py-4 text-gray-600">{trx.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {trx.amount.startsWith('+') ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className="font-medium text-gray-900">{trx.description}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 font-bold ${trx.amount.startsWith('+') ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {trx.amount}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-md w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      {trx.status}
                    </div>
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
