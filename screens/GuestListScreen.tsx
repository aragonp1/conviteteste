
import React, { useState, useEffect } from 'react';

interface Guest {
  id: number;
  name: string;
  isAttending?: boolean;
  guests?: number;
  message: string;
  date: string;
}

interface GuestListScreenProps {
  onBack: () => void;
}

// COLOQUE A MESMA URL QUE VOCÊ USOU NO RSVPScreen.tsx
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycby9x2r3-Lr1sDvJXN82IdmoJfZrkTuudHXWtpNZHykWnNqsJ756E_Gzf2VzvQSxybM5iA/exec"; 

const GuestListScreen: React.FC<GuestListScreenProps> = ({ onBack }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = async () => {
    setIsLoading(true);
    setError(null);

    // Primeiro, carrega o que tem no local como fallback rápido
    const localData = JSON.parse(localStorage.getItem('wedding_guests') || '[]');
    setGuests(localData.sort((a: any, b: any) => b.id - a.id));

    if (!GOOGLE_SHEETS_WEBAPP_URL) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(GOOGLE_SHEETS_WEBAPP_URL);
      if (!response.ok) throw new Error('Erro ao buscar dados da planilha');
      
      const remoteData = await response.json();
      
      // Mapeia os dados caso as colunas da planilha tenham nomes diferentes
      // Assume-se que a planilha retorna um array de objetos
      const formattedData = remoteData.map((item: any, index: number) => ({
        id: item.id || index,
        name: item.name || item.Nome || 'Convidado',
        message: item.message || item.Mensagem || '',
        date: item.date || item.Data || new Date().toISOString(),
        isAttending: true
      }));

      setGuests(formattedData.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (err) {
      console.error("Erro ao sincronizar com a planilha:", err);
      setError("Não foi possível sincronizar com a planilha. Exibindo dados locais.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const totalPeople = guests.length;

  return (
    <div className="flex-1 flex flex-col p-6 animate-fade-in-up">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="ml-2 text-2xl font-display text-primary-dark dark:text-white">Convidados</h2>
        </div>
        <div className="text-right flex flex-col items-end">
            <div className="flex items-center gap-2">
              {isLoading && <span className="animate-spin material-symbols-outlined !text-sm text-primary">progress_activity</span>}
              <span className="block text-2xl font-bold text-primary">{totalPeople}</span>
            </div>
            <span className="text-[10px] uppercase tracking-tighter text-gray-500">Confirmados</span>
        </div>
      </header>

      {error && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-700 flex items-center gap-2">
          <span className="material-symbols-outlined !text-sm">warning</span>
          {error}
        </div>
      )}

      {guests.length === 0 && !isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-center py-20">
          <span className="material-symbols-outlined !text-6xl mb-4">group_off</span>
          <p className="font-display">Nenhuma confirmação encontrada.</p>
        </div>
      ) : (
        <div className="space-y-4 pb-20">
          {guests.map((guest, idx) => (
            <div 
              key={guest.id || idx} 
              className="p-5 rounded-2xl border transition-all bg-white/60 border-primary/10 shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-primary-dark text-lg leading-tight">{guest.name}</h3>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                    {isNaN(Date.parse(guest.date)) ? 'Recente' : new Date(guest.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="text-primary opacity-40">
                    <span className="material-symbols-outlined !text-xl">check_circle</span>
                </div>
              </div>
              
              {guest.message && (
                <div className="mt-3 pt-3 border-t border-primary/5">
                  <p className="text-sm text-gray-600 italic font-display">"{guest.message}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Botão flutuante para atualizar */}
      <button 
        onClick={fetchGuests}
        disabled={isLoading}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
      >
        <span className={`material-symbols-outlined ${isLoading ? 'animate-spin' : ''}`}>refresh</span>
      </button>

      <div className="mt-auto p-4 bg-primary/5 rounded-xl text-[11px] text-primary-dark/60 text-center italic">
        {GOOGLE_SHEETS_WEBAPP_URL ? 'Sincronizado com a nuvem.' : 'Nota: Usando apenas armazenamento local.'}
      </div>
    </div>
  );
};

export default GuestListScreen;

