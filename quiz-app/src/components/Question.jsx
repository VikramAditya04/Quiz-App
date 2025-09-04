/* eslint-disable react/prop-types */
export default function Question({ question, options, onAnswer, selected }) {
  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">{question}</h2>
      <div className="flex flex-col gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(opt)}
            className={`p-2 border rounded-lg 
              ${selected === opt ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
