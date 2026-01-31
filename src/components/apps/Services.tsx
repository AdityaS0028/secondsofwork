import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Cog, Share2, Stethoscope, ArrowRight, Check } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
}

const services: Service[] = [
  {
    id: '01',
    title: 'Conversational AI Development',
    icon: <Bot className="w-6 h-6" />,
    description: 'Custom chatbot design and implementation for customer service, sales, and internal processes.',
    features: [
      'Virtual assistant creation',
      'Customer service automation',
      'AI-powered sales conversation tools',
      'Multilingual support capabilities',
      'Voice-enabled AI assistants'
    ],
    color: '#316AC5'
  },
  {
    id: '02',
    title: 'Custom AI Solution Development',
    icon: <Cog className="w-6 h-6" />,
    description: 'Tailored AI automation tools designed specifically for your business needs.',
    features: [
      'Integration with existing software',
      'User-friendly interfaces',
      'Scalable solutions',
      'Cross-platform compatibility',
      'Mobile access support'
    ],
    color: '#4CAF50'
  },
  {
    id: '03',
    title: 'Social Media Automation',
    icon: <Share2 className="w-6 h-6" />,
    description: 'Automated content creation, scheduling, and analytics for social media management.',
    features: [
      'Automated content scheduling',
      'AI-powered content creation',
      'Cross-platform analytics dashboard',
      'Competitor analysis systems',
      'Custom reporting with insights'
    ],
    color: '#FF9800'
  },
  {
    id: '04',
    title: 'Healthcare Practice Automation',
    icon: <Stethoscope className="w-6 h-6" />,
    description: 'Patient communication, appointment systems, and HIPAA-compliant automation.',
    features: [
      'Patient communication systems',
      'Automated appointment reminders',
      'AI-powered follow-up sequences',
      'Insurance claim processing',
      'HIPAA-compliant data management'
    ],
    color: '#9C27B0'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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

export const Services: React.FC = () => {
  return (
    <div className="h-full overflow-auto p-4 mac-scrollbar">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-xl font-bold mb-2">Services</h2>
          <p className="text-xs text-gray-600">
            We build custom AI solutions that automate tedious tasks, allowing you to focus on growth while saving time and money.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="space-y-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              className="mac-service-card group cursor-pointer"
              style={{ borderLeftColor: service.color }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: service.color }}
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">{service.id}</span>
                    <h3 className="font-bold text-sm">{service.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{service.description}</p>
                  
                  <div className="grid grid-cols-1 gap-1">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Check className="w-3 h-3 text-green-600" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <motion.div
                className="flex items-center gap-1 text-xs font-bold mt-3 pt-2 border-t border-gray-200"
                style={{ color: service.color }}
                whileHover={{ x: 5 }}
              >
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold">Ready to automate?</span>
          </div>
          <p className="text-xs text-gray-600">
            Every solution is tailored specifically to your workflows and integrates seamlessly with your existing tools.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
