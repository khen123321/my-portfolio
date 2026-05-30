// components/StickyHeader.jsx
import React from 'react';

export default function StickyHeader({ number, title, topOffset, zIndex }) {
  return (
    <div 
      style={{ 
        position: 'sticky', 
        top: `${topOffset}px`, 
        zIndex: zIndex,
        backgroundColor: 'rgba(255,255,255,0.95)', // Needs a background so content scrolls behind it!
        backdropFilter: 'blur(8px)',
        padding: '16px 24px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between', // Puts number on left, title on right (like your image)
        alignItems: 'center',
        margin: '0 -24px 32px -24px' // Negates container padding so it spans full width
      }}
    >
      <span style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '1.1rem' }}>
        ( {number} )
      </span>
      <h2 style={{ 
        fontFamily: "'Sora', sans-serif", 
        fontSize: '1.2rem', 
        fontWeight: '700', 
        margin: 0,
        color: '#111827'
      }}>
        {title}
      </h2>
      {/* Empty div to balance the flexbox if you want the title centered */}
      <div style={{ width: '40px' }}></div> 
    </div>
  );
}   