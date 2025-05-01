import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, ArrowRight } from 'lucide-react';

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    company: "AM Global",
    role: "AI/ML Engineer",
    period: "2024",
    description: "Developed computer vision solutions for industrial automation using YOLOv10 for object detection and EasyOCR for text recognition. Deployed models on AWS infrastructure.",
    technologies: ["YOLOv10", "EasyOCR", "FastAPI", "AWS", "Docker"],
  },
  {
    id: 2,
    company: "Acmegrade",
    role: "NLP Engineer",
    period: "2023",
    description: "Built Retrieval-Augmented Generation (RAG) pipelines for customer support systems. Implemented dense retrievers with FAISS for efficient vector search and improved query understanding.",
    technologies: ["RAG", "FAISS", "HuggingFace", "PyTorch", "Transformers"],
  },
];

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">Professional Experience</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My journey through real-world AI/ML projects and professional experiences.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              custom={index}
              className="mb-8"
            >
              <div className="glass-card p-6 relative overflow-hidden group">
                {/* Background accent */}
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary-600/10 blur-3xl group-hover:bg-primary-600/20 transition-all duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-wrap justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                      {item.company}
                    </h3>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar size={14} className="mr-1" />
                      {item.period}
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Briefcase size={18} className="text-primary-400 mr-2" />
                    <span className="text-gray-200 font-medium">{item.role}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors duration-300 text-sm"
                  >
                    <span>Learn more</span>
                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;