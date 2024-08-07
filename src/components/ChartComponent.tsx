"use client";

import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface GraphComponentProps {
  maxValue: number;
}

const GraphComponent: React.FC<GraphComponentProps> = ({ maxValue }) => {
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
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
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="x" />
      <YAxis />
      <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
    </LineChart>
  );
};

export default GraphComponent;

