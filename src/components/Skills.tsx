import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillsSphere from './3d/SkillsSphere';

interface Skill {
  name: string;
  confidence: number; // percentage from 0 to 100
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    name: "Machine Learning",
    skills: [
      { name: "PyTorch", confidence: 90 },
      { name: "TensorFlow", confidence: 80 },
      { name: "Scikit-learn", confidence: 85 },
      { name: "XGBoost", confidence: 75 },
      { name: "Random Forest", confidence: 85 },
      { name: "Linear Regression", confidence: 90 },
      { name: "Classification", confidence: 88 },
    ],
  },
  {
    name: "Natural Language Processing",
    skills: [
      { name: "Transformers", confidence: 85 },
      { name: "HuggingFace", confidence: 85 },
      { name: "BERT", confidence: 88 },
      { name: "GPT", confidence: 90 },
      { name: "BART", confidence: 80 },
      { name: "T5", confidence: 75 },
      { name: "spaCy", confidence: 85 },
      { name: "NLTK", confidence: 80 },
      { name: "LangChain", confidence: 85 },
      { name: "RAG", confidence: 70 },
    ],
  },
  {
    name: "Computer Vision",
    skills: [
      { name: "OpenCV", confidence: 85 },
      { name: "YOLO", confidence: 80 },
      { name: "EasyOCR", confidence: 75 },
      { name: "CNN", confidence: 85 },
      { name: "Object Detection", confidence: 90 },
      { name: "Image Classification", confidence: 88 },
      { name: "Segmentation", confidence: 70 },
    ],
  },
  {
    name: "Cloud & Deployment",
    skills: [
      { name: "AWS", confidence: 80 },
      { name: "Docker", confidence: 85 },
      { name: "FastAPI", confidence: 90 },
      { name: "Flask", confidence: 85 },
      { name: "MLflow", confidence: 75 },
      { name: "DVC", confidence: 70 },
      { name: "CI/CD", confidence: 80 },
    ],
  },
  {
    name: "Tools & Languages",
    skills: [
      { name: "Python", confidence: 95 },
      { name: "SQL", confidence: 85 },
      { name: "Git", confidence: 90 },
      { name: "Jupyter", confidence: 90 },
      { name: "Pandas", confidence: 95 },
      { name: "NumPy", confidence: 90 },
      { name: "Matplotlib", confidence: 85 },
      { name: "REST APIs", confidence: 85 },
    ],
  },
];

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const allSkills = skillsData.flatMap(category => category.skills.map(skill => skill.name));

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
                      <div
                        key={idx}
                        className="group relative"
                      >
                        <span
                          className="text-sm bg-gray-800/80 text-gray-300 px-3 py-1 rounded-full border border-gray-700/50 hover:border-primary-500/50 hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                        >
                          {skill.name}
                        </span>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                          {skill.confidence}% confidence
                        </div>
                      </div>
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
