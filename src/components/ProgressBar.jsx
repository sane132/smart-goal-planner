export default function ProgressBar({ current, target }) {
  const percentage = Math.min(100, (current / target) * 100)

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p>{percentage.toFixed(1)}% completed (${current} of ${target})</p>
    </div>
  )
}