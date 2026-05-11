export function TwoLineTick({ x, y, payload, fontSize = 11 }) {
  if (!payload || !payload.value) return null;
  
  const text = payload.value;
  const words = text.split(' ');
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(' ');
  const line2 = words.slice(mid).join(' ');
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={12}
        dy={fontSize / 2}
        textAnchor="end"
        fill="#94A3B8"
        fontSize={fontSize}
      >
        <tspan x={0} dy={-fontSize / 2}>{line1}</tspan>
        <tspan x={0} dy={fontSize}>{line2}</tspan>
      </text>
    </g>
  );
}

export function RotatedTwoLineTick({ x, y, payload, fontSize = 10 }) {
  if (!payload || !payload.value) return null;
  
  const text = payload.value;
  const words = text.split(' ');
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(' ');
  const line2 = words.slice(mid).join(' ');
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={fontSize / 2}
        textAnchor="end"
        fill="#94A3B8"
        fontSize={fontSize}
        transform="rotate(-45)"
      >
        <tspan x={0} dy={-fontSize / 2}>{line1}</tspan>
        <tspan x={0} dy={fontSize}>{line2}</tspan>
      </text>
    </g>
  );
}
