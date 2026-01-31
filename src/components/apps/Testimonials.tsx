import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Building2, User } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  rating: number;
  avatar: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Seconds of Work transformed our agency operations. The automated reporting system they built saves us 8 hours every week, and the insights are more comprehensive than what we produced manually. This freed up our team to focus more on strategy and client communication.",
    author: 'Sarah Johnson',
    role: 'CEO',
    company: 'GrowSocial',
    industry: 'Social Media Agency',
    rating: 5,
    avatar: 'SJ',
    color: '#10B981'
  },
  {
    id: '2',
    quote: "Patient no-shows were killing our practice. Seconds of Work built a solution that reduced missed appointments by 68% and increased our confirmed bookings by 41%. The automated follow-up system saved our staff 15 hours weekly while our patient satisfaction scores improved from 3.7 to 4.8 out of 5. The ROI was remarkable—we recouped our investment within just 2 months.",
    author: 'Dr. Michael Chen',
    role: 'Dentist',
    company: 'Radiance Dental',
    industry: 'Healthcare',
    rating: 5,
    avatar: 'MC',
    color: '#3B82F6'
  },
  {
    id: '3',
    quote: "We went from creating 5 posts per client weekly to over 20 high-quality pieces—with the same team size. Engagement rates improved by 32% and our content planning time dropped from 2 days to just 3 hours. This efficiency allowed us to increase our service pricing and still retain 100% of our clients.",
    author: 'Jamie Wilson',
    role: 'Creative Director',
    company: 'Spark Creative Agency',
    industry: 'Creative Agency',
    rating: 5,
    avatar: 'JW',
    color: '#8B5CF6'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      
    }
  }
};

export const Testimonials: React.FC = () => {
  return (
    <div className="h-full overflow-auto p-4 mac-scrollbar">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Quote className="w-5 h-5 text-blue-600" />
            Client Testimonials
          </h2>
          <p className="text-xs text-gray-600">
            Don't just take our word for it. Here's what our clients say about working with us.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="space-y-4">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -3 }}
              className="mac-testimonial-card"
              style={{ borderTopColor: testimonial.color }}
            >
              <div className="flex items-start gap-3 mb-3">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: testimonial.color }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <h3 className="font-bold text-sm">{testimonial.author}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    <span>{testimonial.role}</span>
                    <span>•</span>
                    <Building2 className="w-3 h-3" />
                    <span>{testimonial.company}</span>
                  </div>
                </div>
              </div>

              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Quote className="absolute -top-1 -left-1 w-6 h-6 text-gray-200" />
                <p className="text-xs text-gray-700 leading-relaxed pl-4">
                  "{testimonial.quote}"
                </p>
              </motion.div>

              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: testimonial.color }}
                  >
                    {testimonial.industry}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-6 p-4 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 border border-gray-200 rounded-lg"
        >
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold text-gray-800 mb-1"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              100%
            </motion.div>
            <p className="text-xs text-gray-600 mb-3">Client Satisfaction Rate</p>
            <p className="text-xs text-gray-500">
              Join dozens of businesses that have transformed their operations with Seconds of Work
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
