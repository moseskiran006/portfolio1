import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';

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
    github: "https://github.com/moseskiran006/Ai_news_agent"
  },
  {
    id: 2,
    title: "ScholarQuery",
    description: "A smart querying tool to fetch PubMed research papers and identify authors affiliated with pharmaceutical or biotech companies, with support for advanced PubMed queries, CSV export, and CLI-based usage.",
    imageUrl: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Research", "Biomedical NLP", "CLI Tool"],
    technologies: ["Python", "Biopython", "pandas", "Poetry", "Typing", "Logging"],
    github: "https://github.com/moseskiran006/ScholarQuery"
  },
  {
    id: 3,
    title: "Vehicle Number Plate Detection in real time",
    description: "A retail analytics system using computer vision to track and detect Vehicle Number plates in real time. It uses YOLOv9 for object detection, analyze images, and store data in a MongoDB database.",
    imageUrl: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Computer Vision", "Data Analytics", "Real-time"],
    technologies: ["YOLOv9", "OpenCV", "TensorFlow", "Python", "MongoDB"],
    github: "https://github.com/moseskiran006/object-detection"
  },
];

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
            <motion.a
              key={project.id}
              variants={itemVariants}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card overflow-hidden group cursor-pointer no-underline"
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
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end">
                  <ArrowUpRight
                    size={20}
                    className="text-primary-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
