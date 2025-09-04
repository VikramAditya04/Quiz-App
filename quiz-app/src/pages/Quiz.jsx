import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import { decodeHTML, shuffleArray } from "../utils/helpers";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch questions from API
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map(q => ({
          question: decodeHTML(q.question),
          options: shuffleArray([
            ...q.incorrect_answers.map(a => decodeHTML(a)),
            decodeHTML(q.correct_answer)
          ]),
          correct: decodeHTML(q.correct_answer),
        }));
        setQuestions(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Handle answer selection
  const handleAnswer = (answer) => {
    const updated = [...answers];
    updated[currentIndex] = answer;
    setAnswers(updated);
  };

  // Next Question
  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/results", { state: { questions, answers } });
    }
  };

  if (loading) return <p className="p-4">Loading questions...</p>;
  if (!questions.length) return <p className="p-4">No questions available.</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <Question
        question={questions[currentIndex].question}
        options={questions[currentIndex].options}
        selected={answers[currentIndex]}
        onAnswer={handleAnswer}
      />

      <div className="flex justify-between mt-4">
        <p>Question {currentIndex + 1} of {questions.length}</p>
        <button
          onClick={nextQuestion}
          disabled={!answers[currentIndex]}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          {currentIndex + 1 === questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
