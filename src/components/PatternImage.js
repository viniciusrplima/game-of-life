import React, { useRef, useEffect } from 'react';


export default function PatternImage({ width, height, pattern }) {

  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.closePath();
    drawPattern(ctx);
    console.log('.');
  })

  const drawPattern = ctx => {
    const wCell = Math.min(width, height) / Math.max(pattern.width, pattern.height);
    const dy = height / 2 - wCell * pattern.height / 2;
    const dx = width / 2 - wCell * pattern.width / 2;

    ctx.beginPath();
    ctx.fillStyle = '#333';
    for(let i = 0; i < pattern.width; i++) {
      for(let j = 0; j < pattern.height; j++) {
        if(pattern.raw[i + j * pattern.width] === 'O')
          ctx.fillRect(dx + i * wCell, dy + j * wCell, wCell * 0.9, wCell * 0.8);
      }
    }
    ctx.closePath();
  }

  return (
    <canvas ref={canvas} width={width} height={height} />
  )
}
