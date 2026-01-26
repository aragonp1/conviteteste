
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface RSVPScreenProps {
  onBack: () => void;
}

/**
 * NOVO CÓDIGO PARA O GOOGLE APPS SCRIPT (Substitua o anterior por este):
 * 
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   
 *   // Cria o cabeçalho se a planilha estiver nova
 *   if (sheet.getLastRow() === 0) {
 *     sheet.appendRow(["Data", "Nome", "Mensagem"]);
 *   }
 *   
 *   try {
 *     var data = JSON.parse(e.postData.contents);
 *     sheet.appendRow([
 *       new Date(), 
 *       data.name, 
 *       data.message
 *     ]);
 *     return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
 *   } catch (f) {
 *     return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": f.toString()})).setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 */
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycby9x2r3-Lr1sDvJXN82IdmoJfZrkTuudHXWtpNZHykWnNqsJ756E_Gzf2VzvQSxybM5iA/exec"; 

const RSVPScreen: React.FC<RSVPScreenProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const saveLocally = (data: any) => {
    const existing = JSON.parse(localStorage.getItem('wedding_guests') || '[]');
    // Mantemos isAttending e guests internamente para compatibilidade com a tela de Lista
    existing.push({ 
      ...data, 
      isAttending: true, 
      guests: 1, 
      id: Date.now(), 
      date: new Date().toISOString() 
    });
    localStorage.setItem('wedding_guests', JSON.stringify(existing));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = { 
      name, 
      message 
    };

    saveLocally(formData);

    if (GOOGLE_SHEETS_WEBAPP_URL) {
      try {
        await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (err) {
        console.warn("Erro ao enviar para o Sheets", err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleGenerateAiMessage = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Escreva uma mensagem curtíssima e carinhosa de um convidado para as noivas Ana e Clara, confirmando presença no casamento.`,
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
        <span className="material-symbols-outlined !text-7xl text-primary mb-4">check_circle</span>
        <h2 className="text-3xl font-display text-primary-dark mb-2">Obrigado!</h2>
        <p className="text-gray-600 mb-8 font-sans">Sua confirmação foi registrada. Mal podemos esperar para celebrar com você!</p>
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
            placeholder="Seu nome aqui"
            className="w-full px-4 py-3 rounded-xl border-primary/20 focus:ring-primary focus:border-primary bg-white/50 dark:bg-white/5 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="block text-sm font-semibold text-primary/80 uppercase tracking-wider font-sans">
              Mensagem para as Noivas
            </label>
           
          </div>
          <textarea 
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Deixe um recado especial..."
            className="w-full px-4 py-3 rounded-xl border-primary/20 focus:ring-primary focus:border-primary bg-white/50 dark:bg-white/5 dark:text-white"
          />
        </div>

        <div className="py-4 text-center">
            <p className="text-sm text-primary/60 italic font-display">Ao enviar, sua presença será confirmada.</p>
        </div>

        <button 
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold tracking-wide transition-all shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="animate-spin material-symbols-outlined">progress_activity</span>
          ) : (
            'Confirmar Presença'
          )}
        </button>
      </form>
    </div>
  );
};

export default RSVPScreen;
