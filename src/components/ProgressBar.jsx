export default function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-3">
        <span className="font-medium" style={{ color: '#9CA3AF' }}>Progress</span>
        <span className="font-bold" style={{ color: '#F5F5F5' }}>{Math.round(progress)}%</span>
      </div>
      <div 
        className="w-full rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/10"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
        }}
      >
        <div
          className="h-3 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-indigo-500 to-blue-800"
          style={{ 
            width: `${progress}%`,
            boxShadow: '0 0 20px rgba(30, 64, 175, 0.5)'
          }}
        />
      </div>
    </div>
  );
}
