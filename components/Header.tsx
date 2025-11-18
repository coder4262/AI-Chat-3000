
import React from 'react';

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M19 3v4M17 5h4M12 2v4M10 4h4M8 10a4 4 0 118 0 4 4 0 01-8 0zM4.5 13.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM14.5 13.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM12 21a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <SparklesIcon />
        <h1 className="text-xl md:text-2xl font-bold text-gray-100 ml-2">Gemini Chat</h1>
      </div>
    </header>
  );
};

export default Header;
