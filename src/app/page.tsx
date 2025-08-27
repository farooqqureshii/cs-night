'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Instagram, Users, CreditCard, Presentation, RotateCcw, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [typewriterText, setTypewriterText] = useState('');
  const [cursiveText, setCursiveText] = useState('');
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);
  const [isCursiveComplete, setIsCursiveComplete] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const welcomeText = "Welcome to uOttawa!";
  const cursiveTextContent = "From the uOttaHack Team";

  const startTypewriter = () => {
    setTypewriterText('');
    setIsTypewriterComplete(false);
    setIsCursiveComplete(false);
    setCursiveText('');
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < welcomeText.length) {
        setTypewriterText(welcomeText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTypewriterComplete(true);
        startCursive();
      }
    }, 30);
  };

  const startCursive = () => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < cursiveTextContent.length) {
        setCursiveText(cursiveTextContent.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsCursiveComplete(true);
        // Delay showing buttons for slide-in animation
        setTimeout(() => setShowButtons(true), 300);
      }
    }, 20);
  };

  useEffect(() => {
    startTypewriter();
  }, []);

  const buttons = [
    {
      title: "See Slides",
      icon: <Presentation className="w-5 h-5" />,
      href: "#",
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      title: "Visit Linktree",
      icon: <ExternalLink className="w-5 h-5" />,
      href: "#",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Visit Instagram",
      icon: <Instagram className="w-5 h-5" />,
      href: "#",
      color: "bg-pink-500 hover:bg-pink-600"
    },
    {
      title: "Apply to Team",
      icon: <Users className="w-5 h-5" />,
      href: "#",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Build Your Card",
      icon: <CreditCard className="w-5 h-5" />,
      href: "/card-builder",
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large geometric shapes */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-pink-400 transform rotate-12 rounded-2xl opacity-80"></div>
        <div className="absolute top-20 right-20 w-20 h-20 bg-blue-400 transform -rotate-6 rounded-full opacity-70"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-400 transform rotate-45 rounded-xl opacity-80"></div>
        <div className="absolute bottom-10 right-1/3 w-20 h-20 bg-green-400 transform -rotate-12 rounded-full opacity-60"></div>
        
        {/* Smaller accent shapes */}
        <div className="absolute top-1/3 left-1/2 w-12 h-12 bg-purple-400 transform rotate-30 rounded-lg opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-red-400 transform -rotate-45 rounded-md opacity-70"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-3xl mx-auto relative">
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/uOttaHack Logo.svg"
              alt="uOttaHack Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </motion.div>

          {/* Welcome Text */}
          <div className="space-y-4">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white border-3 border-gray-900 px-8 py-4 transform -rotate-1 shadow-xl">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none font-satoshi" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {typewriterText}
                </h1>
                {isTypewriterComplete && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="mt-2"
                  >
                    <p className="text-lg md:text-xl font-bold text-gray-900 tracking-wide flex items-center justify-center gap-2 font-satoshi" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      <span>{cursiveText}</span>
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    </p>
                  </motion.div>
                )}
              </div>
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-400 rounded-full"></div>
            </motion.div>

            {/* Replay Button - Positioned between welcome and team text */}
            <motion.button
              onClick={startTypewriter}
              className="absolute top-1/2 right-0 transform translate-x-10 p-2 bg-black text-white rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isTypewriterComplete ? 1 : 0, x: isTypewriterComplete ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{ top: 'calc(32% - 20px)' }}
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Action Buttons - Centered */}
          <motion.div 
            className="flex flex-col items-center gap-3 mt-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 40 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {buttons.map((button, index) => (
              <motion.div
                key={button.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="w-full max-w-sm"
              >
                <Link href={button.href}>
                  <motion.button
                    className={`w-full ${button.color} text-white font-bold py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg border-3 border-gray-900 rounded-lg`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {button.icon}
                    <span className="text-base">{button.title}</span>
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
