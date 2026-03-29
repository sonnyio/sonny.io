import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Background = ({ children }: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [frame, setFrame] = useState(0);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  // Characters for ripple effect
  const chars = {
    medium: ['=', '+', '~', '-'],
    light: ['.', ':', "'", '`'],
    faint: ['·', '.']
  };

  const generateRippleFrame = (frameNum: number, startX: number, startY: number) => {
    const width = 20;
    const height = 6;
    const grid = Array(height).fill(undefined).map(() => Array(width).fill(' '));
    
    // Convert click position to grid coordinates
    const gridX = Math.floor((startX / 200) * width); // Assuming button is ~200px wide
    const gridY = Math.floor((startY / 50) * height);  // Assuming button is ~50px tall
    
    // Ripple expands from click position
    const rippleRadius = frameNum * 0.4;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - gridX;
        const dy = y - gridY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Create expanding ripple
        let intensity = 0;
        
        if (Math.abs(distance - rippleRadius) < 2) {
          const wave1 = Math.sin((distance - rippleRadius) * 2) * Math.exp(-Math.abs(distance - rippleRadius) * 0.5);
          const wave2 = Math.sin((distance - rippleRadius * 0.7) * 1.5) * Math.exp(-Math.abs(distance - rippleRadius) * 0.3) * 0.6;
          
          intensity = Math.abs(wave1 + wave2);
          
          // Add heartbeat pulsing
          const heartbeat = Math.sin(frameNum * 0.6) * 0.3 + 0.7;
          intensity *= heartbeat;
        }
        
        // Add some randomness
        intensity += (Math.random() - 0.5) * 0.1;
        intensity = Math.max(0, Math.min(1, intensity));
        
        // Choose character based on intensity
        if (intensity > 0.1) {
          let char = ' ';
          
          if (intensity > 0.6) {
            char = chars.medium[Math.floor(Math.random() * chars.medium.length)];
          } else if (intensity > 0.3) {
            char = chars.light[Math.floor(Math.random() * chars.light.length)];
          } else {
            char = chars.faint[Math.floor(Math.random() * chars.faint.length)];
          }
          
          grid[y][x] = char;
        }
      }
    }
    
    return grid.map(row => row.join('')).join('\n');
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (isLoading || !buttonRef?.current) return;
    
    // Get click position relative to button
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setClickPos({ x, y });
    setIsLoading(true);
    setFrame(0);
    
    // Complete loading after 3 seconds
    setTimeout(() => {
      setIsLoading(false);
      setFrame(0);
    }, 3000);
  };

  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setFrame(prev => prev + 1);
    }, 60);

    return () => clearInterval(interval);
  }, [isLoading]);

  const backgroundPattern = isLoading ? generateRippleFrame(frame, clickPos.x, clickPos.y) : '';
 
  const Cc = styled.div`
    width: 100%;
    height: 100%;
  `;

  const Xx = styled.div``;

  return (
    <Cc ref={buttonRef} onClick={handleClick}>
        {children}
        <Xx 
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            width: '100%',
            height: '100%',
            opacity: isLoading ? 0.3 : 0,
            transition: 'opacity 0.2s'
          }}
        >
          <pre 
            style={{ 
              color: '#D1D5DB', // light gray
              fontFamily: 'Courier New, monospace',
              whiteSpace: 'pre',
              letterSpacing: '1px'
            }}
          >
            {backgroundPattern}
          </pre>
        </Xx>
    </Cc>
  );
};

export default Background;