import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, TrendingUp, Clock, Users, ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  metric: string;
  metricLabel: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  icon: React.ReactNode;
  color: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'AI Appointment Reminders',
    client: 'Radiance Dental',
    industry: 'Healthcare',
    metric: '68%',
    metricLabel: 'Reduction in No-Shows',
    description: 'How a 5-Doctor Dental Practice Reduced No-Shows by 68% Using AI',
    challenge: 'Patient no-shows were killing the practice, causing lost revenue and inefficient scheduling.',
    solution: 'Built an automated appointment reminder system with AI-powered follow-ups and confirmations.',
    results: [
      'No-shows reduced by 68%',
      'Confirmed bookings increased by 41%',
      'Staff time saved: 15 hours weekly',
      'Patient satisfaction improved from 3.7 to 4.8/5',
      'ROI achieved within 2 months'
    ],
    icon: <Users className="w-5 h-5" />,
    color: '#10B981'
  },
  {
    id: '2',
    title: 'Campaign Brief Automation',
    client: 'DS&P',
    industry: 'Marketing',
    metric: '92%',
    metricLabel: 'Time Reduction',
    description: 'How DS&P Cut Brief Creation Time by 92% While Improving Campaign Performance',
    challenge: 'Manual brief creation was taking days and resulting in inconsistent campaign quality.',
    solution: 'Developed an AI system that auto-generates comprehensive campaign briefs from raw inputs.',
    results: [
      'Brief creation time reduced by 92%',
      'Campaign performance improved by 37%',
      'Team can focus on strategy vs paperwork',
      'Standardized quality across all briefs',
      'Faster client turnaround times'
    ],
    icon: <TrendingUp className="w-5 h-5" />,
    color: '#3B82F6'
  },
  {
    id: '3',
    title: 'AI-Driven Acquisition',
    client: 'DigitalDynamo',
    industry: 'Agency',
    metric: '64%',
    metricLabel: 'Close Rate Increase',
    description: 'How DigitalDynamo Increased Close Rates and Slashed Onboarding Time',
    challenge: 'Long sales cycles and manual onboarding were limiting growth capacity.',
    solution: 'Implemented AI-driven lead qualification and automated onboarding sequences.',
    results: [
      'Close rates increased by 64%',
      'Onboarding time significantly reduced',
      'Sales team productivity doubled',
      'Client satisfaction scores improved',
      'Revenue per sales rep increased'
    ],
    icon: <ArrowUpRight className="w-5 h-5" />,
    color: '#8B5CF6'
  },
  {
    id: '4',
    title: 'Content Production Automation',
    client: 'SocialSphere',
    industry: 'Social Media',
    metric: '300%',
    metricLabel: 'Content Increase',
    description: 'How SocialSphere Increased Content Production by 300% While Reducing Burnout',
    challenge: 'Creative team was overwhelmed, leading to burnout and inconsistent content quality.',
    solution: 'Created an AI-powered content creation and scheduling system across all platforms.',
    results: [
      'Content production increased by 300%',
      'Same team size, 5x more output',
      'Engagement rates improved by 32%',
      'Creative burnout eliminated',
      'Content planning time: 2 days to 3 hours'
    ],
    icon: <Clock className="w-5 h-5" />,
    color: '#F59E0B'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      
    }
  }
};

export const CaseStudies: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {selectedStudy ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="h-full overflow-auto p-4 mac-scrollbar"
          >
            <motion.button
              onClick={() => setSelectedStudy(null)}
              className="flex items-center gap-1 text-xs mb-4 hover:text-blue-600 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Case Studies
            </motion.button>

            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: selectedStudy.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {selectedStudy.icon}
              </motion.div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {selectedStudy.industry}
                </span>
                <h2 className="font-bold text-lg">{selectedStudy.title}</h2>
                <p className="text-xs text-gray-600">{selectedStudy.client}</p>
              </div>
            </div>

            <motion.div
              className="mac-metric-card mb-4"
              style={{ backgroundColor: `${selectedStudy.color}15` }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <motion.div
                    className="text-3xl font-bold"
                    style={{ color: selectedStudy.color }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedStudy.metric}
                  </motion.div>
                  <div className="text-xs text-gray-600">{selectedStudy.metricLabel}</div>
                </div>
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <TrendingUp className="w-8 h-8" style={{ color: selectedStudy.color }} />
                </motion.div>
              </div>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-bold text-sm mb-2">The Challenge</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{selectedStudy.challenge}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-bold text-sm mb-2">Our Solution</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{selectedStudy.solution}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-bold text-sm mb-2">Key Results</h3>
                <div className="grid gap-2">
                  {selectedStudy.results.map((result, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      className="flex items-center gap-2 text-xs p-2 bg-gray-50 rounded"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: selectedStudy.color }}
                      />
                      {result}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full overflow-auto p-4 mac-scrollbar"
          >
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="mb-4">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Folder className="w-5 h-5 text-yellow-600" />
                  Case Studies
                </h2>
                <p className="text-xs text-gray-600">
                  Real results from real clients. Explore how we've helped businesses transform with AI.
                </p>
              </motion.div>

              <motion.div variants={containerVariants} className="space-y-3">
                {caseStudies.map((study) => (
                  <motion.div
                    key={study.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedStudy(study)}
                    className="mac-case-study-card cursor-pointer group"
                    style={{ borderLeftColor: study.color }}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: study.color }}
                        whileHover={{ rotate: 10 }}
                      >
                        {study.icon}
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-gray-400">{study.client}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                        <h3 className="font-bold text-sm mb-1 truncate">{study.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">{study.description}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className="text-lg font-bold"
                            style={{ color: study.color }}
                          >
                            {study.metric}
                          </span>
                          <span className="text-xs text-gray-500">{study.metricLabel}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-center">
                <p className="text-xs text-gray-600">
                  Want similar results? <span className="font-bold text-blue-600 cursor-pointer hover:underline">Book a free consultation</span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
