import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions = [], answers = [] } = location.state || {};

  const score = questions.reduce((acc, q, idx) => {
    if (answers[idx] === q.correct) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      <p className="mb-4">You scored {score} / {questions.length}</p>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={idx} className="p-3 border rounded-lg">
            <p className="font-semibold">{q.question}</p>
            <p className={`mt-1 ${answers[idx] === q.correct ? "text-green-600" : "text-red-600"}`}>
              Your Answer: {answers[idx] || "Not answered"}
            </p>
            <p className="text-blue-600">Correct Answer: {q.correct}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Restart Quiz
      </button>
    </div>
  );
}
