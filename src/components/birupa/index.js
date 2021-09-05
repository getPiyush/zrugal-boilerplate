export default function Birupa() {
  const renderArrow = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 2.5, 0 4.5, .8 3.5" />
          </marker>
        </defs>
        <line
          x1="0"
          y1="50"
          x2="290"
          y2="50"
          stroke="#000"
          stroke-width="20"
          marker-end="url(#arrowhead)"
        />
        <circle stroke="blue" cx="50" cy="50" r="15" />
        <circle stroke="green" cx="120" cy="50" r="15" />
        <circle stroke="orange" cx="220" cy="50" r="15" />
      </svg>
    );
  };
  return (
    <div>
      <h3>Creeper - Create single node creeper, for illustrative purpose</h3>
      {renderArrow()}
    </div>
  );
}
