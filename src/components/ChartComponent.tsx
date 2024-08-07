"use client";

import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface GraphComponentProps {
  maxValue: number;
}

const GraphComponent: React.FC<GraphComponentProps> = ({ maxValue }) => {
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [currentValue, setCurrentValue] = useState<number>(1);
  const animationRef = useRef<number>();
  const startTime = useRef<number>(Date.now());

  const generatePoint = (time: number) => {
    const x = time / 1000; // Convert time to seconds
    const y = Math.pow(1.29, x);
    return { x, y: Math.min(y, maxValue) };
  };

  const animate = () => {
    const currentTime = Date.now() - startTime.current;
    const newPoint = generatePoint(currentTime);
    setData(prevData => [...prevData, newPoint]);
	setCurrentValue(newPoint.y);

    if (newPoint.y < maxValue) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [maxValue]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '5px',
        borderRadius: '5px'
      }}>
        {currentValue.toFixed(2)}x
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="x" axisLine={{ stroke: '#666' }} tick={false} />
          <YAxis domain={[1, maxValue]} axisLine={{ stroke: '#666' }} tick={false} />
          <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphComponent;

