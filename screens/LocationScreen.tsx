
import React from 'react';

interface LocationScreenProps {
  onBack: () => void;
}

const LocationScreen: React.FC<LocationScreenProps> = ({ onBack }) => {
  const address = "Rua 10, 191. Parque Dois Irmãos esquina com Bernardo Manuel, 10341, Fortaleza - CE, 60761-340";
  const googleMapsUrl = `https://maps.app.goo.gl/414uk7xb8kfuhE117`;

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
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.0052727971683!2d-38.55424566560161!3d-3.80893973489055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74dd7915e7713%3A0x5fef5b9274df7594!2sCart%C3%B3rio%20Mondubim!5e0!3m2!1spt-BR!2sbr!4v1779189377210!5m2!1spt-BR!2sbr" width="350" height="200"></iframe>
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
              <p className="text-gray-600">A cerimônia começará pontualmente às 11:00.</p>
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
