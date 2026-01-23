
import React, { useState, useEffect } from 'react';

interface Guest {
  id: number;
  name: string;
  isAttending: boolean;
  guests: number;
  message: string;
  date: string;
}

interface GuestListScreenProps {
  onBack: () => void;
}

const GuestListScreen: React.FC<GuestListScreenProps> = ({ onBack }) => {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wedding_guests') || '[]');
    setGuests(data.sort((a: Guest, b: Guest) => b.id - a.id));
  }, []);

  const totalPeople = guests.filter(g => g.isAttending).length;

  return (
    <div className="flex-1 flex flex-col p-6 animate-fade-in-up">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          
          <h2 className="ml-2 text-2xl font-display text-primary-dark dark:text-white">Convidados</h2>
        </div>
        <div className="text-right">
            <span className="block text-2xl font-bold text-primary">{totalPeople}</span>
            <span className="text-[10px] uppercase tracking-tighter text-gray-500">Confirmados</span>
        </div>
      </header>

      {guests.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-center py-20">
          <span className="material-symbols-outlined !text-6xl mb-4">group_off</span>
          <p className="font-display">Nenhuma confirmação ainda.</p>
        </div>
      ) : (
        <div className="space-y-4 pb-10">
          {guests.map((guest) => (
            <div 
              key={guest.id} 
              className="p-5 rounded-2xl border transition-all bg-white/60 border-primary/10 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-primary-dark text-lg leading-tight">{guest.name}</h3>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                    {new Date(guest.date).toLocaleDateString('pt-BR')}
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
    </div>
  );
};

export default GuestListScreen;
