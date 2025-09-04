import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions = [], answers = [] } = location.state || {};
  const [highScore, setHighScore] = useState(0);

  const score = questions.reduce((acc, q, idx) => {
    if (answers[idx] === q.correct) return acc + 1;
    return acc;
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('quizHighScore', score.toString());
    }
  }, [score, highScore]);

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F5' }}>No Results Found</h1>
          <p className="mb-6" style={{ color: '#9CA3AF' }}>Please complete a quiz first.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-indigo-500 to-blue-800 text-white border border-white/20 backdrop-blur-sm"
            style={{ boxShadow: '0 4px 16px rgba(30, 64, 175, 0.3)' }}
          >
            Start Quiz
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
        className="backdrop-blur-xl rounded-3xl p-6 md:p-8 max-w-5xl w-full border border-white/10"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-800 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
            Quiz Results
          </h1>
          
          <div
            className="text-6xl font-bold mb-4"
            style={{
              color: percentage >= 80 ? '#10B981' : 
                     percentage >= 60 ? '#6366F1' : 
                     percentage >= 40 ? '#F59E0B' : '#F43F5E'
            }}
          >
            {score}/{questions.length}
          </div>
          
          <div
            className="text-xl font-semibold mb-2"
            style={{
              color: percentage >= 80 ? '#10B981' : 
                     percentage >= 60 ? '#6366F1' : 
                     percentage >= 40 ? '#F59E0B' : '#F43F5E'
            }}
          >
            {percentage}% - {getScoreMessage()}
          </div>
          
          <div className="text-lg" style={{ color: '#9CA3AF' }}>
            High Score: {highScore}/{questions.length}
          </div>
        </div>

        {/* Question Review */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#F5F5F5' }}>Question Review</h2>
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="p-5 border rounded-xl backdrop-blur-sm"
              style={{
                backgroundColor: answers[idx] === q.correct 
                  ? 'rgba(16, 185, 129, 0.1)' 
                  : 'rgba(244, 63, 94, 0.1)',
                borderColor: answers[idx] === q.correct 
                  ? 'rgba(16, 185, 129, 0.3)' 
                  : 'rgba(244, 63, 94, 0.3)'
              }}
            >
              <p className="font-semibold mb-4 text-lg" style={{ color: '#F5F5F5' }}>{q.question}</p>
              <div className="space-y-2">
                <p style={{ color: answers[idx] === q.correct ? '#10B981' : '#F43F5E' }}>
                  <span className="font-medium">Your Answer:</span> {answers[idx] || "Not answered"}
                  {answers[idx] === q.correct && (
                    <svg className="inline w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {answers[idx] !== q.correct && answers[idx] && (
                    <svg className="inline w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </p>
                {answers[idx] !== q.correct && (
                  <p style={{ color: '#06B6D4' }}>
                    <span className="font-medium">Correct Answer:</span> {q.correct}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-indigo-500 to-blue-800 text-white border border-white/20 backdrop-blur-sm"
            style={{ boxShadow: '0 4px 16px rgba(30, 64, 175, 0.3)' }}
          >
            Take Another Quiz
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              localStorage.removeItem('quizHighScore');
              setHighScore(0);
            }}
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 backdrop-blur-sm border border-white/10"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              color: '#9CA3AF'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = '#9CA3AF';
            }}
          >
            Reset High Score
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
