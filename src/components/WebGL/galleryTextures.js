import * as THREE from "three";

const PALETTE = {
  bg: ["#141310", "#17160f", "#100f0d", "#1a1712", "#121110"],
  ink: "#eeece6",
  dim: "#86847d",
  accent: "#b7935a",
};

/**
 * Draws one abstract, editorial-style composition per texture —
 * a mix of a large numeral, a rule, and a flat shape — so the
 * gallery reads as a graphic-design portfolio slide rather than a
 * generic gradient. All original, generated at runtime.
 */
function drawComposition(ctx, size, index) {
  const [w, h] = size;
  ctx.fillStyle = PALETTE.bg[index % PALETTE.bg.length];
  ctx.fillRect(0, 0, w, h);

  // Grain-free flat shape, alternating placement per index.
  ctx.save();
  const shapeSize = w * 0.62;
  const cx = index % 2 === 0 ? w * 0.68 : w * 0.32;
  const cy = h * 0.42;
  ctx.translate(cx, cy);
  ctx.rotate(((index * 37) % 360) * (Math.PI / 180));
  ctx.fillStyle = index % 3 === 0 ? PALETTE.accent : "rgba(238,236,230,0.9)";
  ctx.globalAlpha = index % 3 === 0 ? 0.9 : 0.14 + (index % 4) * 0.03;
  if (index % 2 === 0) {
    ctx.beginPath();
    ctx.arc(0, 0, shapeSize / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillRect(-shapeSize / 2, -shapeSize / 2, shapeSize, shapeSize);
  }
  ctx.restore();

  // Large index numeral, editorial style.
  ctx.fillStyle = PALETTE.ink;
  ctx.globalAlpha = 0.92;
  ctx.font = `500 ${Math.floor(h * 0.34)}px "Space Grotesk", sans-serif`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(String(index + 1).padStart(2, "0"), w * 0.06, h * 0.86);

  // Hairline rule + small caption, matching the site's meta type.
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "rgba(238,236,230,0.25)";
  ctx.lineWidth = Math.max(1, w * 0.002);
  ctx.beginPath();
  ctx.moveTo(w * 0.06, h * 0.92);
  ctx.lineTo(w * 0.94, h * 0.92);
  ctx.stroke();

  ctx.fillStyle = PALETTE.dim;
  ctx.font = `500 ${Math.floor(h * 0.045)}px "Inter", sans-serif`;
  ctx.fillText("SELECTED WORK", w * 0.06, h * 0.97);
}

export function createGalleryTextures(count = 5, size = [512, 640], images = []) {
  const textures = [];
  for (let i = 0; i < count; i++) {
    const canvas = document.createElement("canvas");
    canvas.width = size[0];
    canvas.height = size[1];
    const ctx = canvas.getContext("2d");
    drawComposition(ctx, size, i);

    const texture = new THREE.CanvasTexture(canvas);
    const imageSrc = images[i % images.length];

    if (imageSrc) {
      const image = new Image();
      image.onload = () => {
        ctx.clearRect(0, 0, size[0], size[1]);
        const ratio = Math.max(size[0] / image.width, size[1] / image.height);
        const width = image.width * ratio;
        const height = image.height * ratio;
        ctx.drawImage(image, (size[0] - width) / 2, (size[1] - height) / 2, width, height);
        texture.needsUpdate = true;
      };
      image.src = imageSrc;
    }
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    textures.push(texture);
  }
  return textures;
}
