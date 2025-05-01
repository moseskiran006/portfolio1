import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Calendar, Users } from 'lucide-react';

interface CertificationItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

interface LeadershipItem {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
}

const certificationsData: CertificationItem[] = [
  
  {
    id: 1,
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM via Coursera",
    date: "2024",
   
  },
  {
    id: 3,
    title: "Devops by IBM",
    issuer: "Coursera",
    date: "2023",
    
  },
];

const leadershipData: LeadershipItem[] = [
  {
    id: 1,
    title: "AI/ML Club Leader",
    organization: "IIITDM Kurnool",
    period: "2022 - Present",
    description: "Mentored 200+ students in AI/ML, organized workshops and hackathons, and facilitated industry connections.",
  },
  {
    id: 2,
    title: "Research Volunteer",
    organization: "IIITDM NLP Lab",
    period: "2023 - Present",
    description: "Contributed to research projects in multilingual NLP and information extraction.",
  },
];

const Certifications: React.FC = () => {
  const [certificationsRef, certificationsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [leadershipRef, leadershipInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="certifications" className="section-padding bg-gray-950">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">Certifications & Leadership</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Professional certifications and leadership experiences that enhance my technical expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Certifications */}
          <motion.div
            ref={certificationsRef}
            variants={containerVariants}
            initial="hidden"
            animate={certificationsInView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gradient-accent">Certifications</h3>
            <div className="space-y-4">
              {certificationsData.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="glass-card p-5 group hover:border-primary-600/30 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="mt-1">
                      <Award size={24} className="text-accent-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium group-hover:text-gradient transition-colors duration-300">
                        {item.title}
                      </h4>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <span>{item.issuer}</span>
                        <span className="mx-2">•</span>
                        <span>{item.date}</span>
                      </div>
                      {item.credentialUrl && (
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-primary-400 hover:text-primary-300 text-sm"
                        >
                          View Credential
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            ref={leadershipRef}
            variants={containerVariants}
            initial="hidden"
            animate={leadershipInView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gradient-accent">Leadership</h3>
            <div className="space-y-4">
              {leadershipData.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="glass-card p-5 group hover:border-primary-600/30 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="mt-1">
                      <Users size={24} className="text-secondary-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium group-hover:text-gradient transition-colors duration-300">
                        {item.title}
                      </h4>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <span>{item.organization}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          <span>{item.period}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;