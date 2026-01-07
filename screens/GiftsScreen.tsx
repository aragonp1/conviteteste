
import React, { useState } from 'react';

interface GiftsScreenProps {
  onBack: () => void;
}

const GiftsScreen: React.FC<GiftsScreenProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const pixKey = "000.000.000-00";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-fade-in-up">
      <header className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="ml-2 text-2xl font-display text-primary-dark">Presentes</h2>
      </header>

      <div className="space-y-8">
        <div className="text-center space-y-4 px-4">
          <span className="material-symbols-outlined text-5xl text-primary/60">volunteer_activism</span>
          <p className="text-gray-600 font-sans leading-relaxed italic">
            "Sua presença é o nosso maior presente, mas se você deseja nos presentear, criamos algumas opções para facilitar."
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-primary/10 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-display text-primary-dark text-center">Lista de Presentes Online</h3>
            <p className="text-gray-600 text-sm text-center">Acesse nossa lista completa em nossa loja parceira.</p>
            <button className="w-full py-4 border-2 border-primary/30 hover:border-primary text-primary-dark rounded-2xl font-bold tracking-wide transition-all bg-white/20 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">shopping_cart</span>
              Ver Lista Completa
            </button>
          </div>

          <div className="h-px bg-primary/10 w-full my-4"></div>

          <div className="space-y-4 text-center">
            <h3 className="text-xl font-display text-primary-dark">Contribuição via PIX</h3>
            <p className="text-gray-600 text-sm">Se preferir, você pode enviar um presente em dinheiro diretamente para nossa lua de mel.</p>
            
            <div className="relative group">
              <div className="bg-primary/5 rounded-2xl p-4 border border-dashed border-primary/30 flex items-center justify-between">
                <span className="font-mono text-primary-dark select-all">{pixKey}</span>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {copied ? 'done' : 'content_copy'}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>
            
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Agradecemos imensamente pelo carinho</p>
          </div>
        </div>

        {/* Gift Cards Preview */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {[
              { title: 'Jantar Romântico', price: 'R$ 200', icon: 'restaurant' },
              { title: 'Passeio Turístico', price: 'R$ 150', icon: 'beach_access' },
              { title: 'Café da Manhã', price: 'R$ 80', icon: 'coffee' }
            ].map((gift, idx) => (
              <div key={idx} className="flex-shrink-0 w-40 bg-white/60 p-4 rounded-2xl shadow-sm border border-primary/5 flex flex-col items-center gap-2 text-center">
                <span className="material-symbols-outlined text-primary/70">{gift.icon}</span>
                <p className="text-xs font-bold text-primary-dark uppercase tracking-tighter">{gift.title}</p>
                <p className="text-sm font-sans font-medium text-primary">{gift.price}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GiftsScreen;
