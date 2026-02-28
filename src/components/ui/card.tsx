// src/components/ui/Card.tsx
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`card-container ${className ?? ''}`} style={{ border: '1px solid #bfdbfe', background: '#ffffff', borderRadius: 8, padding: 16, boxShadow: '0 4px 12px rgba(30, 64, 175, 0.12)' }}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`card-content ${className ?? ''}`} style={{ padding: 12 }}>
      {children}
    </div>
  );
};
