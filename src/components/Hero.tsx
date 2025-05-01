import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowDown, Download } from 'lucide-react';
import HeroScene from './3d/HeroScene';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const opacity = 1 - scrollY / heroHeight;
      
      if (heroRef.current) {
        heroRef.current.style.opacity = Math.max(opacity, 0).toString();
        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden" 
      id="home"
      ref={heroRef}
    >
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>
      
      <div className="container mx-auto px-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1] 
          }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="block text-gradient">Kiran Kumar Pilli</span>
            <span className="block text-xl md:text-2xl lg:text-3xl font-light mt-2 text-gray-300">
              Building the Future with AI, ML & NLP
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            AI/ML Engineer • NLP Specialist • Computer Vision Developer • Data Science
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              View Projects
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
            <a 
              href="https://drive.google.com/file/d/1z_DYRiaLLHxDRLdVLU_Drxk3BIaEvde7/view?usp=sharing" 
              className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 border border-gray-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
              <Download size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default Hero;