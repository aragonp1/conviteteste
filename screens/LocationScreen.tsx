
import React from 'react';

interface LocationScreenProps {
  onBack: () => void;
}

const LocationScreen: React.FC<LocationScreenProps> = ({ onBack }) => {
  const address = "Rua das Flores, 123 - Jardim Botânico, São Paulo - SP";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="flex-1 flex flex-col p-6 animate-fade-in-up">
      <header className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="ml-2 text-2xl font-display text-primary-dark">Onde será?</h2>
      </header>

      <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-primary/10 space-y-6">
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner relative group">
            <img 
              src="https://picsum.photos/id/10/800/450" 
              alt="Venue" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/20"></div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <h3 className="font-bold text-primary-dark font-sans">Local do Evento</h3>
              <p className="text-gray-600 leading-relaxed">{address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div>
              <h3 className="font-bold text-primary-dark font-sans">Horário</h3>
              <p className="text-gray-600">A cerimônia começará pontualmente às 16:00.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <span className="material-symbols-outlined">info</span>
            </div>
            <div>
              <h3 className="font-bold text-primary-dark font-sans">Traje</h3>
              <p className="text-gray-600">Passeio completo (Garden Party Style).</p>
            </div>
          </div>
        </div>

        <a 
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl text-center font-bold tracking-wide transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">map</span>
          Abrir no Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationScreen;
