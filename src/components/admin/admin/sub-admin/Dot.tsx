'use client';

import React from 'react';

interface DotProps {
    color: string;
  }
  
  const Dot = ({ color }: DotProps) => (
    <span className={`inline-block w-3 h-3 rounded-full ${color}`} />
  );
  
  export default Dot;
  