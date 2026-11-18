import * as THREE from 'three';

export function createMarbleTexture(maxAnisotropy = 4): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Creamy pearl-ivory base
    const baseGrad = ctx.createLinearGradient(0, 0, size, size);
    baseGrad.addColorStop(0, '#fcf7f4');
    baseGrad.addColorStop(0.5, '#f6ece7');
    baseGrad.addColorStop(1, '#faf2ee');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Soft blush mineral washes
    for (let i = 0; i < 14; i++) {
      const x = ((i * 97) % size);
      const y = ((i * 151) % size);
      const r = 90 + (i % 5) * 35;
      const wash = ctx.createRadialGradient(x, y, 4, x, y, r);
      wash.addColorStop(0, 'rgba(232, 200, 208, 0.14)');
      wash.addColorStop(1, 'rgba(232, 200, 208, 0)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, size, size);
    }

    // Delicate champagne & dusty-rose veins
    const veins = [
      { color: 'rgba(196, 152, 130, 0.24)', width: 1.8, seed: 1.1 },
      { color: 'rgba(184, 130, 146, 0.16)', width: 1.1, seed: 2.7 },
      { color: 'rgba(216, 178, 148, 0.22)', width: 0.9, seed: 4.3 },
      { color: 'rgba(170, 128, 118, 0.14)', width: 2.2, seed: 5.9 },
    ];

    veins.forEach((vein, idx) => {
      ctx.beginPath();
      ctx.strokeStyle = vein.color;
      ctx.lineWidth = vein.width;
      let x = (idx * 120) % size;
      let y = 0;
      ctx.moveTo(x, y);
      for (let step = 0; step <= 32; step++) {
        const t = step / 32;
        y = t * size;
        x =
          ((idx * 120) % size) +
          Math.sin(t * Math.PI * 3 + vein.seed) * 48 +
          Math.cos(t * Math.PI * 7 + idx) * 18;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(maxAnisotropy, 8);
  tex.needsUpdate = true;
  return tex;
}

export function createVelvetTexture(maxAnisotropy = 4): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#e7b9c7';
    ctx.fillRect(0, 0, size, size);

    // Micro weave sheen lines
    for (let y = 0; y < size; y += 2) {
      const alpha = y % 4 === 0 ? 0.06 : 0.03;
      ctx.fillStyle = `rgba(255, 240, 244, ${alpha})`;
      ctx.fillRect(0, y, size, 1);
    }
    for (let x = 0; x < size; x += 3) {
      ctx.fillStyle = 'rgba(155, 92, 112, 0.04)';
      ctx.fillRect(x, 0, 1, size);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(maxAnisotropy, 8);
  tex.needsUpdate = true;
  return tex;
}

export function createSoftGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255, 246, 224, 1)');
    grad.addColorStop(0.28, 'rgba(246, 212, 168, 0.72)');
    grad.addColorStop(0.65, 'rgba(242, 198, 210, 0.2)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}
