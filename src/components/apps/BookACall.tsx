import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Video, CheckCircle, ChevronRight, User, Mail, MessageSquare } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

const timeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: true },
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
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

export const BookACall: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // In real implementation, this would submit to a booking API
    setStep(4);
  };

  return (
    <div className="h-full overflow-auto p-4 mac-scrollbar">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-4">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Book a Free Consultation
          </h2>
          <p className="text-xs text-gray-600">
            Schedule a 30-minute call to discuss how AI can transform your business operations.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  s <= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}
                whileHover={s <= step ? { scale: 1.1 } : {}}
              >
                {s < step ? <CheckCircle className="w-4 h-4" /> : s}
              </motion.div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 rounded ${
                    s < step ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 variants={itemVariants} className="font-bold text-sm mb-3">
                Select a Date
              </motion.h3>
              <motion.div variants={containerVariants} className="grid grid-cols-3 gap-2 mb-6">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                  <motion.button
                    key={day}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(day)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      selectedDate === day
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{day}</div>
                    <div className="text-xs opacity-80">Jan {idx + 1}</div>
                  </motion.button>
                ))}
              </motion.div>

              <motion.h3 variants={itemVariants} className="font-bold text-sm mb-3">
                Available Times
              </motion.h3>
              <motion.div variants={containerVariants} className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot.time}
                    variants={itemVariants}
                    whileHover={slot.available ? { scale: 1.05 } : {}}
                    whileTap={slot.available ? { scale: 0.95 } : {}}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`p-2 rounded border text-xs flex items-center justify-center gap-2 transition-colors ${
                      !slot.available
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedTime === slot.time
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {slot.time}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="mt-4 flex justify-end">
                <motion.button
                  onClick={handleNext}
                  disabled={!selectedDate || !selectedTime}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mac-button mac-button-primary flex items-center gap-1 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 variants={itemVariants} className="font-bold text-sm mb-3">
                Your Information
              </motion.h3>
              <motion.div variants={containerVariants} className="space-y-3">
                <motion.div variants={itemVariants}>
                  <label className="flex items-center gap-2 text-xs font-bold mb-1">
                    <User className="w-3 h-3" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mac-input w-full"
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="flex items-center gap-2 text-xs font-bold mb-1">
                    <Mail className="w-3 h-3" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mac-input w-full"
                    placeholder="john@company.com"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="flex items-center gap-2 text-xs font-bold mb-1">
                    <MessageSquare className="w-3 h-3" />
                    What would you like to discuss?
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mac-input w-full resize-none"
                    rows={3}
                    placeholder="Tell us about your business and automation needs..."
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-4 flex justify-between">
                <motion.button
                  onClick={handleBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mac-button"
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mac-button mac-button-primary flex items-center gap-1 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 variants={itemVariants} className="font-bold text-sm mb-3">
                Confirm Booking
              </motion.h3>
              <motion.div
                variants={itemVariants}
                className="bg-gray-50 rounded-lg p-4 space-y-2 mb-4"
              >
                <div className="flex items-center gap-2 text-xs">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">{selectedDate}day, January 2025</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">{selectedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>Google Meet (link will be sent via email)</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2 mb-4">
                <div className="text-xs font-bold">Your Details:</div>
                <div className="text-xs text-gray-600">{formData.name}</div>
                <div className="text-xs text-gray-600">{formData.email}</div>
                {formData.message && (
                  <div className="text-xs text-gray-600 mt-2">"{formData.message}"</div>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-between">
                <motion.button
                  onClick={handleBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mac-button"
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mac-button mac-button-primary"
                >
                  Confirm Booking
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="font-bold text-lg mb-2">Booking Confirmed!</h3>
              <p className="text-xs text-gray-600 mb-4">
                We've sent a confirmation email to {formData.email} with the meeting details.
              </p>
              <p className="text-xs text-gray-500">
                Looking forward to speaking with you!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
