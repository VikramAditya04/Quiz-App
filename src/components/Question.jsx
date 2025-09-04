import { motion } from "framer-motion";

/* eslint-disable react/prop-types */
export default function Question({ question, options, onAnswer, selected }) {
  return (
    <div className="space-y-6">
      <h2 
        className="text-xl md:text-2xl font-semibold leading-relaxed"
        style={{ color: '#F5F5F5' }}
      >
        {question}
      </h2>
      
      <div className="space-y-3" role="radiogroup" aria-label="Answer options">
        {options.map((opt, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onAnswer(opt)}
            className={`w-full p-4 text-left rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-sm border ${
              selected === opt 
                ? 'bg-gradient-to-r from-indigo-500 to-blue-800 border-indigo-400/50' 
                : 'border-white/10'
            }`}
            style={{
              backgroundColor: selected === opt 
                ? 'transparent' 
                : 'rgba(255, 255, 255, 0.05)',
              color: '#F5F5F5',
              boxShadow: selected === opt 
                ? '0 4px 16px rgba(30, 64, 175, 0.3)' 
                : '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              if (selected !== opt) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (selected !== opt) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            role="radio"
            aria-checked={selected === opt}
            tabIndex={0}
          >
            <span className="flex items-center">
              <span 
                className="w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
                style={{
                  borderColor: selected === opt ? '#F5F5F5' : '#9CA3AF',
                  backgroundColor: selected === opt ? '#F5F5F5' : 'transparent'
                }}
              >
                {selected === opt && (
                  <span 
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-800"
                  />
                )}
              </span>
              <span className="font-medium">{opt}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
