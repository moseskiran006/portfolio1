import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillsSphere from './3d/SkillsSphere';

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillsData: SkillCategory[] = [
  {
    name: "Machine Learning",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "Random Forest", "Linear Regression", "Classification"],
  },
  {
    name: "Natural Language Processing",
    skills: ["Transformers", "HuggingFace", "BERT", "GPT", "BART", "T5", "spaCy", "NLTK", "LangChain", "RAG"],
  },
  {
    name: "Computer Vision",
    skills: ["OpenCV", "YOLO", "EasyOCR", "CNN", "Object Detection", "Image Classification", "Segmentation"],
  },
  {
    name: "Cloud & Deployment",
    skills: ["AWS", "Docker", "FastAPI", "Flask", "MLflow", "DVC", "CI/CD"],
  },
  {
    name: "Tools & Languages",
    skills: ["Python", "SQL", "Git", "Jupyter", "Pandas", "NumPy", "Matplotlib", "REST APIs"],
  },
];

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Get all skills for the 3D sphere
  const allSkills = skillsData.flatMap(category => category.skills);

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-primary-900/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto container-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">Skills & Expertise</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My technical toolkit spans across AI/ML domains, with specialized expertise in NLP and Computer Vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="order-2 lg:order-1">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {skillsData.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-gradient-accent">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-gray-800/80 text-gray-300 px-3 py-1 rounded-full border border-gray-700/50 hover:border-primary-500/50 hover:bg-gray-800 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center items-center h-[400px]" ref={containerRef}>
            <SkillsSphere skills={allSkills} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;