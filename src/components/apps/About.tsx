import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Zap, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const processSteps = [
  {
    id: '01',
    title: 'Discover',
    description: 'We analyze your workflows to identify automation opportunities',
    icon: <Target className="w-5 h-5" />,
    color: '#3B82F6'
  },
  {
    id: '02',
    title: 'Design',
    description: 'We create custom solutions that integrate with your existing tools',
    icon: <Sparkles className="w-5 h-5" />,
    color: '#8B5CF6'
  },
  {
    id: '03',
    title: 'Develop',
    description: 'We build robust systems that deliver immediate value',
    icon: <Zap className="w-5 h-5" />,
    color: '#F59E0B'
  },
  {
    id: '04',
    title: 'Deploy',
    description: 'We implement smoothly with no disruption to your business',
    icon: <Rocket className="w-5 h-5" />,
    color: '#10B981'
  },
  {
    id: '05',
    title: 'Refine',
    description: 'We continuously optimize for maximum performance',
    icon: <CheckCircle className="w-5 h-5" />,
    color: '#EC4899'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      
    }
  }
};

export const About: React.FC = () => {
  return (
    <div className="h-full overflow-auto p-4 mac-scrollbar">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-start gap-4 mb-6">
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Rocket className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold mb-1">Seconds of Work</h1>
            <p className="text-xs text-gray-500">AI-Powered Business Automation</p>
            <p className="text-xs text-gray-400 mt-1">EST. 2024</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mac-separator" />

        {/* Mission Statement */}
        <motion.div variants={itemVariants} className="my-4">
          <h2 className="font-bold text-sm mb-2">Our Mission</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            We build custom AI solutions that automate tedious tasks, allowing you to focus on growth while saving time and money. Your business deserves more than generic solutions—we create automation systems tailored specifically to your needs.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mac-separator" />

        {/* Process */}
        <motion.div variants={itemVariants} className="my-4">
          <h2 className="font-bold text-sm mb-3">Our Proven Approach</h2>
          <div className="space-y-2">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                className="mac-process-step flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <motion.div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: step.color }}
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.icon}
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: step.color }}>
                      {step.id}
                    </span>
                    <h3 className="font-bold text-sm">{step.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <motion.div
                    className="hidden sm:flex items-center text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mac-separator" />

        {/* Stats */}
        <motion.div variants={itemVariants} className="my-4">
          <div className="grid grid-cols-3 gap-2">
            <motion.div
              className="text-center p-2 bg-blue-50 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-lg font-bold text-blue-600">4+</div>
              <div className="text-xs text-gray-600">Services</div>
            </motion.div>
            <motion.div
              className="text-center p-2 bg-purple-50 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-lg font-bold text-purple-600">10+</div>
              <div className="text-xs text-gray-600">Case Studies</div>
            </motion.div>
            <motion.div
              className="text-center p-2 bg-green-50 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-lg font-bold text-green-600">100%</div>
              <div className="text-xs text-gray-600">Satisfaction</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mac-separator" />

        {/* Technology Partners */}
        <motion.div variants={itemVariants} className="my-4">
          <h2 className="font-bold text-sm mb-3">Technology Partners</h2>
          <div className="flex flex-wrap gap-2">
            {['OpenAI', 'Anthropic', 'Vapi', 'Make', 'Zapier', 'Stripe'].map((partner, idx) => (
              <motion.span
                key={partner}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200"
              >
                {partner}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mac-separator" />

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white"
        >
          <h3 className="font-bold text-sm mb-1">Ready to automate?</h3>
          <p className="text-xs opacity-90 mb-3">
            Book a free consultation and let's discuss how AI can transform your business.
          </p>
          <motion.button
            className="mac-button bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Call
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
