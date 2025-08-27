'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Palette, User, MapPin, Star, Code } from 'lucide-react';
import Link from 'next/link';
import html2canvas from 'html2canvas-pro';
import Image from 'next/image';

interface CardData {
  name: string;
  from: string;
  character: 'Explorer' | 'Designer' | 'Builder';
  language: string;
  colors: {
    border: string;
    character: string;
    background: string;
    mascot: string;
  };
}

const characterColors = {
  Explorer: {
    border: 'from-amber-400 to-orange-500',
    character: 'text-amber-300',
    background: 'bg-slate-900',
    mascot: '/anotherone.svg'
  },
  Designer: {
    border: 'from-emerald-400 to-teal-500',
    character: 'text-emerald-300',
    background: 'bg-slate-900',
    mascot: '/firstone.svg'
  },
  Builder: {
    border: 'from-slate-600 to-gray-700',
    character: 'text-gray-300',
    background: 'bg-slate-900',
    mascot: '/lastone.svg'
  }
};

export default function CardBuilder() {
  const [cardData, setCardData] = useState<CardData>({
    name: 'Your Name',
    from: 'Ottawa',
    character: 'Explorer',
    language: 'Python',
    colors: {
      border: 'from-amber-400 to-orange-500',
      character: 'text-amber-300',
      background: 'bg-slate-900',
      mascot: '/anotherone.svg'
    }
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const updateCharacter = (character: 'Explorer' | 'Designer' | 'Builder') => {
    setCardData(prev => ({
      ...prev,
      character,
      colors: characterColors[character]
    }));
  };

  const exportCard = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: null,
          scale: 2,
          useCORS: true
        });
        
        // Check if we're on mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
          // Mobile solution: Open in new tab for manual save
          const dataUrl = canvas.toDataURL();
          const newWindow = window.open();
          if (newWindow) {
            newWindow.document.write(`
              <html>
                <head>
                  <title>${cardData.name} - uOttawa Card</title>
                  <style>
                    body { 
                      margin: 0; 
                      padding: 20px; 
                      background: #f5f5f5; 
                      font-family: Arial, sans-serif;
                      text-align: center;
                    }
                    img { 
                      max-width: 100%; 
                      height: auto; 
                      border-radius: 12px;
                      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    }
                    .instructions {
                      margin: 20px 0;
                      padding: 15px;
                      background: white;
                      border-radius: 8px;
                      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .download-btn {
                      display: inline-block;
                      background: #2563eb;
                      color: white;
                      padding: 12px 24px;
                      border-radius: 8px;
                      text-decoration: none;
                      margin: 10px;
                      font-weight: bold;
                    }
                  </style>
                </head>
                <body>
                  <div class="instructions">
                    <h2>Your uOttawa Card is Ready!</h2>
                    <p>Long press the image below to save it to your device.</p>
                  </div>
                  <img src="${dataUrl}" alt="${cardData.name} - uOttawa Card" />
                  <br>
                  <a href="${dataUrl}" download="${cardData.name}-uottawa-card.png" class="download-btn">
                    Download Card
                  </a>
                </body>
              </html>
            `);
            newWindow.document.close();
          }
        } else {
          // Desktop solution: Direct download
          const link = document.createElement('a');
          link.download = `${cardData.name}-uottawa-card.png`;
          link.href = canvas.toDataURL();
          link.click();
        }
      } catch (error) {
        console.error('Error exporting card:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-16 h-16 bg-pink-400 transform rotate-12 rounded-xl opacity-60"></div>
        <div className="absolute top-20 right-10 w-12 h-12 bg-blue-400 transform -rotate-6 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-1/3 w-10 h-10 bg-yellow-400 transform rotate-45 rounded-lg opacity-70"></div>
      </div>

      <div className="relative z-10 min-h-screen p-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors mb-6 font-bold border-3 border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white rounded-lg"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>

                     <div className="mb-6">
             <h1 className="text-3xl font-black text-gray-900 border-b-3 border-gray-900 pb-3 font-satoshi">Build Your Card</h1>
           </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Editor Panel */}
            <motion.div
              className="bg-white border-3 border-gray-900 p-6 shadow-xl rounded-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3 border-b-3 border-gray-900 pb-3">
                <Palette className="w-6 h-6" />
                Customize Your Card
              </h2>

              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Name
                  </label>
                  <input
                    type="text"
                    value={cardData.name}
                    onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border-3 border-gray-900 focus:ring-3 focus:ring-blue-500 focus:border-transparent font-mono bg-white text-gray-900 text-base rounded-lg"
                    placeholder="Enter your name"
                  />
                </div>

                {/* From Input */}
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    From
                  </label>
                  <input
                    type="text"
                    value={cardData.from}
                    onChange={(e) => setCardData(prev => ({ ...prev, from: e.target.value }))}
                    className="w-full px-4 py-3 border-3 border-gray-900 focus:ring-3 focus:ring-blue-500 focus:border-transparent font-mono bg-white text-gray-900 text-base rounded-lg"
                    placeholder="Where are you from?"
                  />
                </div>

                {/* Programming Language Input */}
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Favorite Language
                  </label>
                  <input
                    type="text"
                    value={cardData.language}
                    onChange={(e) => setCardData(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-4 py-3 border-3 border-gray-900 focus:ring-3 focus:ring-blue-500 focus:border-transparent font-mono bg-white text-gray-900 text-base rounded-lg"
                    placeholder="e.g., Python, JavaScript, C++"
                  />
                </div>

                {/* Character Selection */}
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Character Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Explorer', 'Designer', 'Builder'] as const).map((character) => (
                      <motion.button
                        key={character}
                        onClick={() => updateCharacter(character)}
                        className={`p-4 border-3 font-bold text-sm transition-all duration-300 rounded-lg ${
                          cardData.character === character
                            ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                            : 'border-gray-900 bg-white text-gray-900 hover:bg-gray-100 hover:scale-105'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {character}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Export Button */}
                <motion.button
                  onClick={exportCard}
                  className="w-full bg-gray-900 text-white font-bold py-4 px-6 border-3 border-gray-700 hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg rounded-lg shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5 inline mr-2" />
                  Export as PNG
                </motion.button>
              </div>
            </motion.div>

            {/* Preview Panel */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                {/* Card */}
                <div
                  ref={cardRef}
                  className={`w-96 h-[32rem] ${cardData.colors.background} rounded-xl p-8 relative overflow-hidden border-3 bg-gradient-to-br ${cardData.colors.border} shadow-xl`}
                >
                                     {/* Background Pattern */}
                   <div className="absolute inset-0 opacity-10">
                     <div className="absolute top-6 right-6 w-20 h-20 border-2 border-white rounded-full"></div>
                     <div className="absolute bottom-10 left-6 w-10 h-10 border border-white rounded-full"></div>
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white rounded-full opacity-30"></div>
                   </div>

                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div className="text-white text-base font-bold">uOttaHack @ CS Night 2025</div>
                      <div className="text-white text-xs font-bold">{cardData.language}</div>
                    </div>
                    
                    {/* Date */}
                    <div className="text-white text-sm font-medium opacity-90 mt-2">
                      Sep 3 2025
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex items-center justify-between">
                      {/* Left side - User Info */}
                      <div className="flex flex-col justify-center space-y-4">
                        <div className="text-white text-3xl font-bold leading-tight">{cardData.name}</div>
                        <div className="text-white text-lg font-medium opacity-90">{cardData.from}</div>
                        <div className={`text-xl font-bold ${cardData.colors.character} tracking-wider`}>
                          {cardData.character}
                        </div>
                      </div>

                      {/* Right side - Mascot */}
                      <div className="relative">
                        {/* Window Frame */}
                        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/20 shadow-2xl">
                          {/* Window Border */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-white/30"></div>
                          
                          {/* Window Panes */}
                          <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full"></div>
                          <div className="absolute top-2 right-2 w-3 h-3 bg-white/40 rounded-full"></div>
                          <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/40 rounded-full"></div>
                          <div className="absolute bottom-2 right-2 w-3 h-3 bg-white/40 rounded-full"></div>
                          
                          {/* Mascot */}
                          <div className="relative z-10 flex items-center justify-center">
                            <Image
                              src={cardData.colors.mascot}
                              alt={`${cardData.character} Mascot`}
                              width={140}
                              height={140}
                              className="drop-shadow-xl"
                            />
                          </div>
                          
                          {/* Window Reflection */}
                          <div className="absolute top-1 left-1 w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end">
                        <div className="text-white text-sm font-bold space-y-1">
                          <div>uottahack.ca</div>
                          <div>2026.uottahack.ca</div>
                      </div>
                      <div className="opacity-80">
                        <Image
                          src="/uOttaHack Logo White.png"
                          alt="uOttaHack Logo"
                          width={60}
                          height={60}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
