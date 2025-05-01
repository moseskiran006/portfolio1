import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, X, Code, ExternalLink, Github } from 'lucide-react';

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  technologies: string[];
  github?: string;
  demo?: string;
}

const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "AI News Aggregator Bot",
    description: "An automated news aggregator that uses BART for summarization and spaCy for entity recognition, deployed on AWS. Collects tech news from various sources and creates concise summaries with relevant tags.",
    imageUrl: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["NLP", "Summarization", "AWS"],
    technologies: ["BART", "spaCy", "AWS Lambda", "Python", "FastAPI"],
    github: "https://github.com/kirankumar/ai-news-bot",
    demo: "https://news-bot.example.com",
  },
  {
    id: 2,
    title: "Multimodal AI Platform",
    description: "A platform that combines text and image processing capabilities using GPT-3.5 for text generation, CLIP for image understanding, and Stable Diffusion with LoRA fine-tuning for customized image generation.",
    imageUrl: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Multimodal", "Image Generation", "Text-to-Image"],
    technologies: ["GPT-3.5", "CLIP", "Stable Diffusion", "LoRA", "PyTorch", "React"],
    github: "https://github.com/kirankumar/multimodal-ai",
  },
  {
    id: 3,
    title: "Computer Vision for Smart Retail",
    description: "A retail analytics system using computer vision to track customer flow, analyze product interactions, and optimize store layouts. Features real-time heat maps and product attention metrics.",
    imageUrl: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Computer Vision", "Retail Analytics", "Real-time"],
    technologies: ["YOLOv8", "OpenCV", "TensorFlow", "Python", "MongoDB"],
    github: "https://github.com/kirankumar/retail-vision",
    demo: "https://retail-vision.example.com",
  },
];

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="projects" className="section-padding bg-gray-950">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">Featured Projects</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A showcase of my work in AI/ML, NLP, and Computer Vision.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="glass-card overflow-hidden group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-primary-600/70 text-white px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <div 
                        key={idx} 
                        className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-300 uppercase"
                        title={tech}
                      >
                        {tech.charAt(0)}
                      </div>
                    ))}
                    {project.technologies.length > 3 && (
                      <div 
                        className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-300"
                        title="More technologies"
                      >
                        +{project.technologies.length - 3}
                      </div>
                    )}
                  </div>
                  <ArrowUpRight size={20} className="text-primary-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto z-50 glass-card p-0"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <div className="relative h-64 md:h-80">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                      {selectedProject.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs bg-primary-600/70 text-white px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-900/80 flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3 text-white">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {selectedProject.github && (
                      <a 
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-medium transition-all duration-300"
                      >
                        <Github size={18} />
                        <span>View Code</span>
                      </a>
                    )}
                    {selectedProject.demo && (
                      <a 
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all duration-300"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;