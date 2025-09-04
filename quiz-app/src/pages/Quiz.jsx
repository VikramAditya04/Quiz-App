import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Question from "../components/Question";
import ProgressBar from "../components/ProgressBar";
import { decodeHTML, shuffleArray } from "../utils/helpers";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [showDifficultySelector, setShowDifficultySelector] = useState(false);
  const navigate = useNavigate();

  // Fetch questions from API
  useEffect(() => {
    if (!showDifficultySelector) {
      const fetchQuestions = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch questions');
          }
          
          const data = await response.json();
          
          if (data.response_code !== 0) {
            throw new Error('No questions available');
          }
          
          const formatted = data.results.map(q => ({
            question: decodeHTML(q.question),
            options: shuffleArray([
              ...q.incorrect_answers.map(a => decodeHTML(a)),
              decodeHTML(q.correct_answer)
            ]),
            correct: decodeHTML(q.correct_answer),
          }));
          setQuestions(formatted);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [difficulty, showDifficultySelector]);

  // Show difficulty selector on first load
  useEffect(() => {
    setShowDifficultySelector(true);
    setLoading(false);
  }, []);

  // Timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && timerActive) {
      // Auto-advance when time runs out
      nextQuestion();
    }
  }, [timeLeft, timerActive]);

  // Start timer when question changes
  useEffect(() => {
    if (questions.length > 0) {
      setTimeLeft(30);
      setTimerActive(true);
    }
  }, [currentIndex, questions.length]);

  // Handle difficulty selection
  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setShowDifficultySelector(false);
    setLoading(true);
  };

  // Handle answer selection
  const handleAnswer = (answer) => {
    const updated = [...answers];
    updated[currentIndex] = answer;
    setAnswers(updated);
    setTimerActive(false); // Stop timer when answer is selected
  };

  // Next Question
  const nextQuestion = () => {
    setTimerActive(false); // Stop current timer
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/results", { state: { questions, answers } });
    }
  };

  // Difficulty Selector
  if (showDifficultySelector) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/10"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-blue-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F5' }}>Quiz Challenge</h2>
            <p style={{ color: '#9CA3AF' }}>Choose your difficulty level</p>
          </div>

          <div className="space-y-3">
            {[
              { level: 'easy', label: 'Easy', color: 'from-emerald-500 to-teal-500' },
              { level: 'medium', label: 'Medium', color: 'from-amber-500 to-orange-500' },
              { level: 'hard', label: 'Hard', color: 'from-red-500 to-rose-500' }
            ].map(({ level, label, color }) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDifficultySelect(level)}
                className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-200 bg-gradient-to-r ${color} text-white border border-white/20 backdrop-blur-sm`}
                style={{ 
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-white/20 border-t-indigo-400 rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-semibold" style={{ color: '#F5F5F5' }}>Loading questions...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="backdrop-blur-xl rounded-3xl p-8 text-center max-w-md border border-white/10"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>Error Loading Questions</h2>
          <p className="mb-6" style={{ color: '#9CA3AF' }}>{error}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDifficultySelector(true)}
            className="w-full px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-red-500 to-rose-500 text-white border border-white/20"
            style={{ boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)' }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#F5F5F5' }}>No Questions Available</h2>
          <p className="mb-6" style={{ color: '#9CA3AF' }}>Please try again later or check your internet connection.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDifficultySelector(true)}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-indigo-500 to-blue-800 text-white border border-white/20"
            style={{ boxShadow: '0 4px 16px rgba(30, 64, 175, 0.3)' }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="backdrop-blur-xl rounded-3xl p-6 md:p-8 max-w-4xl w-full border border-white/10"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#F5F5F5' }}>
                Quiz Challenge
              </h1>
              <p className="capitalize" style={{ color: '#9CA3AF' }}>Difficulty: {difficulty}</p>
            </div>
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl backdrop-blur-sm border ${
                timeLeft <= 10 
                  ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                  : timeLeft <= 20 
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold text-lg">{timeLeft}s</span>
            </div>
          </div>
          
          <ProgressBar current={currentIndex} total={questions.length} />
          
          <div className="flex justify-between items-center mt-4">
            <p className="font-medium" style={{ color: '#9CA3AF' }}>
              Question {currentIndex + 1} of {questions.length}
            </p>
            <button
              onClick={() => setShowDifficultySelector(true)}
              className="text-sm transition-colors duration-200 hover:text-white px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10"
              style={{ color: '#9CA3AF' }}
            >
              Change Difficulty
            </button>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Question
            question={questions[currentIndex].question}
            options={questions[currentIndex].options}
            selected={answers[currentIndex]}
            onAnswer={handleAnswer}
          />
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm border border-white/10"
            style={{ 
              backgroundColor: currentIndex === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
              color: currentIndex === 0 ? '#6B7280' : '#F5F5F5',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Previous
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextQuestion}
            disabled={!answers[currentIndex]}
            className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-indigo-500 to-blue-800 text-white border border-white/20 backdrop-blur-sm"
            style={{ 
              opacity: !answers[currentIndex] ? 0.5 : 1,
              cursor: !answers[currentIndex] ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(30, 64, 175, 0.3)'
            }}
          >
            {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question →"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
