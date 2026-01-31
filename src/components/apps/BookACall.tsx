import React, { useState } from 'react';
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

export const BookACall: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleNext = () => {
    if (step < 3 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleBack = () => {
    if (step > 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleSubmit = () => {
    setStep(4);
  };

  return (
    <div className="h-full overflow-auto p-4 mac-scrollbar">
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Book a Free Consultation
          </h2>
          <p className="text-xs text-gray-600">
            Schedule a 30-minute call to discuss how AI can transform your business operations.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 ${
                  s <= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s < step ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 rounded transition-colors duration-200 ${
                    s < step ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className={`transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {step === 1 && (
            <div>
              <h3 className="font-bold text-sm mb-3">Select a Date</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                      selectedDate === day
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{day}</div>
                    <div className="text-xs opacity-80">Jan {idx + 1}</div>
                  </button>
                ))}
              </div>

              <h3 className="font-bold text-sm mb-3">Available Times</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`p-2 rounded border text-xs flex items-center justify-center gap-2 transition-all duration-200 ${
                      !slot.available
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedTime === slot.time
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {slot.time}
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedDate || !selectedTime}
                  className="mac-button mac-button-primary flex items-center gap-1 disabled:opacity-50 transition-opacity duration-200"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-bold text-sm mb-3">Your Information</h3>
              <div className="space-y-3">
                <div>
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
                </div>

                <div>
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
                </div>

                <div>
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
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleBack}
                  className="mac-button transition-opacity duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email}
                  className="mac-button mac-button-primary flex items-center gap-1 disabled:opacity-50 transition-opacity duration-200"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-bold text-sm mb-3">Confirm Booking</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-4">
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
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-xs font-bold">Your Details:</div>
                <div className="text-xs text-gray-600">{formData.name}</div>
                <div className="text-xs text-gray-600">{formData.email}</div>
                {formData.message && (
                  <div className="text-xs text-gray-600 mt-2">&quot;{formData.message}&quot;</div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="mac-button transition-opacity duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="mac-button mac-button-primary transition-opacity duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Booking Confirmed!</h3>
              <p className="text-xs text-gray-600 mb-4">
                We&apos;ve sent a confirmation email to {formData.email} with the meeting details.
              </p>
              <p className="text-xs text-gray-500">
                Looking forward to speaking with you!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
