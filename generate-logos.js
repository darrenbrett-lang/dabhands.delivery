#!/usr/bin/env node

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Neon green color
const NEON_GREEN = '#00FF00';

function createLogoCanvas(width, height) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Calculate positions for proper spacing
  const padding = Math.min(width, height) * 0.1;
  const dotRadius = (height * 0.6) / 2; // Dot is roughly 60% of height
  const dotX = padding + dotRadius;
  const dotY = height / 2;

  // Draw green circle
  ctx.fillStyle = NEON_GREEN;
  ctx.beginPath();
  ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
  ctx.fill();

  // Draw text "DAB hands" in black
  ctx.fillStyle = '#000000';
  ctx.font = `500 ${Math.floor(height * 0.5)}px "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';

  // Position text to the right of the dot
  const textX = dotX + dotRadius + padding;
  ctx.fillText('DAB hands', textX, dotY);

  return canvas;
}

async function generateLogos() {
  try {
    // Logo 1: Black on white - wider format (1200x300)
    const canvas1 = createLogoCanvas(1200, 300);
    fs.writeFileSync(
      path.join(__dirname, 'dab-hands-logo-black-on-white.png'),
      canvas1.toBuffer('image/png')
    );
    console.log('✓ Created dab-hands-logo-black-on-white.png');

    // Logo 2: Email format - square (400x400)
    const canvas2 = createLogoCanvas(400, 400);
    fs.writeFileSync(
      path.join(__dirname, 'dab-hands-email-logo.png'),
      canvas2.toBuffer('image/png')
    );
    console.log('✓ Created dab-hands-email-logo.png');

    console.log('\nLogos generated successfully!');
  } catch (error) {
    console.error('Error generating logos:', error.message);

    // Fallback message
    console.log('\nNote: The canvas module may need to be installed.');
    console.log('Run: npm install canvas');
  }
}

generateLogos();
