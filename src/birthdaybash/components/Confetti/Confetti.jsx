import './Confetti.css';

export default function Confetti() {
  const confettiPieces = Array.from({ length: 100 });

  return (
    <div className="confetti-container">
      {confettiPieces.map((_, i) => {
        const size = Math.random() * 8 + 4; // 4px - 12px
        const shape = Math.random() > 0.5 ? 'circle' : 'square';
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 5 + Math.random() * 5;

        return (
          <div
            key={i}
            className={`confetti-piece ${shape}`}
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              backgroundColor: randomColor(),
            }}
          ></div>
        );
      })}
    </div>
  );
}

function randomColor() {
  const colors = [
    '#ff0a54',
    '#ff477e',
    '#ff7096',
    '#ff85a1',
    '#fbb1bd',
    '#00f0ff',
    '#00ff87',
    '#faff00',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
