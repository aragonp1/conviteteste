
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface RSVPScreenProps {
  onBack: () => void;
}

const RSVPScreen: React.FC<RSVPScreenProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState(1);
  const [isAttending, setIsAttending] = useState(true);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleGenerateAiMessage = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Escreva uma mensagem curta e carinhosa de um convidado para as noivas Ana e Clara, confirmando presença no casamento. Seja poético e amigável.`,
      });
      if (response.text) {
        setMessage(response.text.trim());
      }
    } catch (err) {
      console.error("AI Generation failed", err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
        <span className="material-symbols-outlined text-7xl text-primary mb-4">check_circle</span>
        <h2 className="text-3xl font-display text-primary-dark mb-2">Obrigado!</h2>
        <p className="text-gray-600 mb-8 font-sans">Sua confirmação foi enviada com sucesso. Mal podemos esperar para te ver!</p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 animate-fade-in-up">
      <header className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="ml-2 text-2xl font-display text-primary-dark">Confirmação</h2>
      </header>

      <form onSubmit={handleSubmit} className="flex-col gap-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-primary/80 uppercase tracking-wider font-sans">
            Seu Nome Completo
          </label>
          <input 
            required
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: João Silva"
            className="w-full px-4 py-3 rounded-xl border-primary/20 focus:ring-primary focus:border-primary bg-white/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-primary/80 uppercase tracking-wider font-sans">
            Você irá ao evento?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setIsAttending(true)}
              className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${isAttending ? 'bg-primary border-primary text-white shadow-md' : 'border-primary/20 text-primary-dark bg-white/30'}`}
            >
              Sim, com certeza!
            </button>
            <button
              type="button"
              onClick={() => setIsAttending(false)}
              className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${!isAttending ? 'bg-red-600 border-red-600 text-white shadow-md' : 'border-primary/20 text-primary-dark bg-white/30'}`}
            >
              Infelizmente não
            </button>
          </div>
        </div>

        {isAttending && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-primary/80 uppercase tracking-wider font-sans">
              Número de acompanhantes
            </label>
            <div className="flex items-center gap-4">
              <button 
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <span className="text-xl font-bold w-8 text-center">{guests}</span>
              <button 
                type="button"
                onClick={() => setGuests(guests + 1)}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="block text-sm font-semibold text-primary/80 uppercase tracking-wider font-sans">
              Mensagem para as Noivas
            </label>
            <button 
              type="button"
              onClick={handleGenerateAiMessage}
              disabled={isGenerating}
              className="text-xs text-primary flex items-center gap-1 hover:underline disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              {isGenerating ? 'Gerando...' : 'Gerar com IA'}
            </button>
          </div>
          <textarea 
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Deixe um recado carinhoso..."
            className="w-full px-4 py-3 rounded-xl border-primary/20 focus:ring-primary focus:border-primary bg-white/50"
          />
        </div>

        <button 
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold tracking-wide transition-all shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="animate-spin material-symbols-outlined">progress_activity</span>
          ) : (
            'Enviar Confirmação'
          )}
        </button>
      </form>
    </div>
  );
};

export default RSVPScreen;
