
import React from 'react';

const DecorativeBackground: React.FC = () => {
  return (
    <>
      {/* Top Wave Decoration */}
      <div className="fixed top-0 left-0 w-full pointer-events-none opacity-20 z-0">
        <svg className="w-full h-auto text-primary fill-current" preserveAspectRatio="none" viewBox="0 0 400 100">
          <path d="M0,0 C150,50 250,50 400,0 L400,-50 L0,-50 Z"></path>
        </svg>
      </div>

      {/* Cross Pattern Texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}
      />
    </>
  );
};

export default DecorativeBackground;
