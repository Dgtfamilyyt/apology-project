import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swaySpeed: number;
  swayAmplitude: number;
  swayOffset: number;
  opacity: number;
  color: string;
  isHeart: boolean;
}

export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalColors = [
      'rgba(244, 63, 94, 0.45)', // Rose 500
      'rgba(251, 113, 133, 0.40)', // Rose 400
      'rgba(225, 29, 72, 0.35)', // Rose 600
      'rgba(253, 164, 175, 0.35)', // Rose 300
      'rgba(244, 114, 182, 0.30)', // Pink 400
      'rgba(254, 205, 211, 0.25)', // Rose 200
    ];

    const particleCount = Math.min(36, Math.floor(width / 35));
    const petals: Petal[] = [];

    for (let i = 0; i < particleCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 9 + Math.random() * 11,
        speedY: 0.6 + Math.random() * 0.9,
        speedX: -0.2 + Math.random() * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayAmplitude: 20 + Math.random() * 30,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: 0.35 + Math.random() * 0.45,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        isHeart: Math.random() > 0.65,
      });
    }

    let time = 0;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.isHeart) {
        // Draw miniature heart
        const s = p.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
        ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
        ctx.fill();
      } else {
        // Draw organic curved rose petal
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.5, p.size * 0.8, p.size * 0.7, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.7, -p.size * 0.9, -p.size * 0.5, 0, -p.size);
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * p.swaySpeed + p.swayOffset) * 0.5;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}
