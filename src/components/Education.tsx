import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar } from 'lucide-react';

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  years: string;
  grade: string;
  description: string;
}

const educationData: EducationItem[] = [
  {
    id: 1,
    institution: "IIITDM Kurnool",
    degree: "B.Tech in AI & Data Science",
    years: "2021 - 2025",
    grade: "CGPA: 7.0",
    description: "Coursework in Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, and Data Mining. Active member of the AI/ML Club.",
  },
  {
    id: 2,
    institution: "Sri Chaitanya Jr College",
    degree: "Higher Secondary Certificate (HSC)",
    years: "2017 - 2019",
    grade: "CGPA: 9.03",
    description: "Majored in Mathematics, Physics, and Chemistry with a focus on computer sciences. Participated in various technical competitions.",
  },
];

const Education: React.FC = () => {
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
    hidden: { x: -50, opacity: 0 },
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
    <section id="education" className="section-padding bg-gray-950">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">Education</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My academic journey in the field of Artificial Intelligence and Data Science.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="timeline-item"
              custom={index}
            >
              <div className="glass-card-light p-6 mb-6">
                <div className="flex flex-wrap justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-gradient">{item.institution}</h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {item.years}
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <GraduationCap size={18} className="text-primary-400 mr-2" />
                  <span className="text-gray-200 font-medium">{item.degree}</span>
                </div>
                
                <div className="mb-3">
                  <span className="text-sm font-medium bg-primary-900/30 text-primary-300 px-2 py-1 rounded">
                    {item.grade}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;