import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
  };

  return (
    <section id="about" className="section-padding py-20 md:py-32">
      <div className="container mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="glass-card p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary-600/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-secondary-600/20 blur-3xl"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">About Me</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8 items-center"
            >
              <div className="md:col-span-1">
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-6xl md:text-8xl font-bold text-gradient">KP</div>
                  <div className="absolute inset-0 border border-gray-700 rounded-2xl"></div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-3">Kiran Kumar Pilli</h3>
                <p className="text-gray-300 text-lg mb-4">
                  AI/ML Engineer and NLP Specialist passionate about building intelligent systems that solve real-world problems.
                </p>
                <p className="text-gray-400 mb-6">
                  Currently pursuing B.Tech in AI & DS at IIITDM Kurnool, I specialize in developing AI solutions across computer vision, natural language processing, and machine learning systems. I'm particularly interested in multimodal AI and large language models.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/kirankumar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:border-primary-500 hover:bg-primary-900/20 transition-all duration-300"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/kirankumar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:border-primary-500 hover:bg-primary-900/20 transition-all duration-300"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="mailto:kirankumar@example.com" 
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:border-primary-500 hover:bg-primary-900/20 transition-all duration-300"
                  >
                    <Mail size={18} />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;