
import React from 'react';
import { Page } from '../App';

interface HomeScreenProps {
  onNavigate: (page: Page) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col h-full animate-fade-in-up">
      {/* Header / Hero Section */}
      <header className="flex-1 flex flex-col justify-center items-center text-center space-y-6 pt-10 px-6">
        {/* Decorative Icon */}
        <div className="text-primary/60 mb-2 animate-fade-in-down">
          <span className="material-symbols-outlined !text-5xl">spa</span>
        </div>

        {/* Names */}
        <div className="space-y-2">
          <h1 className="text-primary-dark dark:text-[#e0e2d8] text-5xl md:text-6xl font-light tracking-tight italic leading-tight font-display">
            Janny <br /> <span className="text-4xl not-italic text-primary/70 font-sans">&amp;</span> Vitória
          </h1>
          <p>Ainda bem que o amor parou na minha porta.</p>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col items-center gap-1 mt-4">
          <div className="h-px w-16 bg-primary/40 mb-3"></div>
          <p className="text-primary-dark dark:text-[#d3d6cc] text-lg font-sans font-medium uppercase tracking-widest">
            24 de Outubro de 2024 ~ (a definir)
          </p>
          <p className="text-primary/80 dark:text-primary/60 text-base font-sans">
            16:00 horas
          </p>
        </div>

        {/* Visual Element */}
        <div className="w-full max-w-[450px] aspect-[4/3] mt-8 rounded-t-[9rem] overflow-hidden shadow-xl shadow-primary/10 border-4 border-white/50 dark:border-white/5 mx-auto relative group">
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('https://i.ibb.co/V0zpMDJ8/foto2.png')` }}
          ></div>
        </div>
      </header>

      {/* Action Buttons */}
      <main className="mt-10 px-6 pb-8 w-full flex flex-col gap-4 items-center">
        <button 
          onClick={() => onNavigate(Page.RSVP)}
          className="group relative w-full overflow-hidden rounded-2xl bg-primary hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98]"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <div className="relative flex items-center justify-between px-6 py-4">
            <span className="material-symbols-outlined !text-[#FFFAF4] opacity-80 group-hover:scale-110 transition-transform">check_circle</span>
            <span className="text-[#FFFAF4] text-lg font-semibold tracking-wide font-sans flex-1 text-center pr-6">Confirmação de Presença</span>
          </div>
        </button>

        <button 
          onClick={() => onNavigate(Page.LOCATION)}
          className="group w-full relative overflow-hidden rounded-2xl border border-primary/30 bg-white/50 dark:bg-white/5 hover:bg-primary/5 dark:hover:bg-primary/20 transition-all duration-300 active:scale-[0.98]"
        >
          <div className="relative flex items-center justify-between px-6 py-4">
            <span className="material-symbols-outlined !text-primary dark:text-primary-light opacity-80 group-hover:scale-110 transition-transform">location_on</span>
            <span className="text-primary-dark dark:text-[#e0e2d8] text-lg font-medium tracking-wide font-sans flex-1 text-center pr-6">Local do Evento</span>
          </div>
        </button>

        <button 
          onClick={() => onNavigate(Page.GIFTS)}
          className="group w-full relative overflow-hidden rounded-2xl border border-primary/30 bg-white/50 dark:bg-white/5 hover:bg-primary/5 dark:hover:bg-primary/20 transition-all duration-300 active:scale-[0.98]"
        >
          <div className="relative flex items-center justify-between px-6 py-4">
            <span className="material-symbols-outlined !text-primary dark:text-primary-light opacity-80 group-hover:scale-110 transition-transform">redeem</span>
            <span className="text-primary-dark dark:text-[#e0e2d8] text-lg font-medium tracking-wide font-sans flex-1 text-center pr-6">Presentear as Noivas</span>
          </div>
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center pb-8 px-6">
        <p className="text-primary/60 text-sm font-display italic leading-relaxed">
          Com amor,<br />esperamos vocês.
        </p>
      </footer>
    </div>
  );
};

export default HomeScreen;
